import { chromium, type Page, type Browser } from 'playwright-core';
import { mkdirSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const argv = process.argv.slice(2);
const mode = argv[0] ?? 'stills';
const opt = (k: string, d?: string) => {
  const i = argv.indexOf(`--${k}`);
  return i >= 0 ? argv[i + 1] : d;
};
const flag = (k: string) => argv.includes(`--${k}`);

const APP = path.resolve(import.meta.dir, '..');
const OUT = path.join(APP, 'out');
const FFMPEG = process.env.FFMPEG ?? (existsSync(path.join(os.homedir(), '.local/bin/ffmpeg')) ? path.join(os.homedir(), '.local/bin/ffmpeg') : 'ffmpeg');
const CHROME =
  process.env.CHROME ??
  path.join(os.homedir(), '.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell');
const SAMPLES = +opt('samples', '0')!;
const SHUTTER = +opt('shutter', '0.5')!;

async function reachable(url: string) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(1500) });
    return r.ok;
  } catch {
    return false;
  }
}

async function ensureServer() {
  const want = opt('url');
  if (want && (await reachable(want))) return { url: want, stop: () => {} };
  const port = 5400 + Math.floor((Date.now() / 7) % 400);
  const proc = Bun.spawn(['bunx', 'vite', '--port', String(port), '--strictPort'], {
    cwd: APP,
    stdout: 'ignore',
    stderr: 'ignore',
    env: { ...process.env, FILM_NO_HMR: '1' },
  });
  const url = `http://localhost:${port}`;
  for (let i = 0; i < 200 && !(await reachable(url)); i++) await Bun.sleep(100);
  return { url, stop: () => proc.kill() };
}

async function openPage(url: string): Promise<{ browser: Browser; page: Page; logs: string[] }> {
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-gpu', '--js-flags=--max-old-space-size=4096'],
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1920 }, deviceScaleFactor: 1 });
  const logs: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text()}`);
  });
  page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
  const only = opt('only');
  const extra = [opt('fmt') ? `fmt=${opt('fmt')}` : '', opt('cut') ? `cut=${opt('cut')}` : '', opt('fps') ? `fps=${opt('fps')}` : ''].filter(Boolean).join('&');
  await page.goto(`${url}/?export=1${only ? `&only=${only}` : ''}${extra ? `&${extra}` : ''}`);
  await page.waitForFunction(() => (window as any).__film?.ready || (window as any).__film?.error, null, { timeout: 180000 });
  const err = await page.evaluate(() => (window as any).__film.error);
  if (err) throw new Error(`boot failed:\n${err}\n${logs.join('\n')}`);
  return { browser, page, logs };
}

async function stills(page: Page, times: number[], dir: string) {
  mkdirSync(dir, { recursive: true });
  const files: string[] = [];
  for (const t of times) {
    const n = await page.evaluate(([t, s, sh]) => (window as any).__film.still(t, s, sh), [t, SAMPLES || 1, SHUTTER] as const);
    const f = path.join(dir, `f_${t.toFixed(3).padStart(7, '0')}.png`);
    const png: string = await page.evaluate(() => (window as any).__film.png());
    writeFileSync(f, Buffer.from(png.split(',')[1]!, 'base64'));
    files.push(`${f}  (${n} samples)`);
  }
  return files;
}

async function sheet(page: Page, times: number[], cols: number, cw: number, out: string) {
  const url: string = await page.evaluate(([times, cols, cw, s]) => (window as any).__film.sheet(times, cols, cw, s), [times, cols, cw, SAMPLES || 1] as const);
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(url.split(',')[1]!, 'base64'));
}

async function streamSegment(page: Page, from: number, to: number, fps: number, out: string, crf: string, preset: string, size: [number, number]) {
  mkdirSync(path.dirname(out), { recursive: true });
  const args = [
    FFMPEG, '-y', '-loglevel', 'error',
    '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${size[0]}x${size[1]}`, '-r', String(fps), '-i', 'pipe:0',
    '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
    '-c:v', 'libx264', '-preset', preset, '-crf', crf, '-tune', 'grain',
    '-x264-params', 'aq-mode=3:rc-lookahead=40',
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-threads', opt('threads', '2')!,
    ...(opt('maxrate') ? ['-maxrate', opt('maxrate')!, '-bufsize', String(parseInt(opt('maxrate')!) * 2) + 'M'] : []),
    out,
  ];
  const ff = Bun.spawn(args, { stdin: 'pipe', stdout: 'inherit', stderr: 'inherit' });
  let frames = 0;
  const total = Math.round(to * fps) - Math.round(from * fps);
  const t0 = performance.now();
  const server = Bun.serve({
    port: 0,
    fetch(req, srv) {
      return srv.upgrade(req) ? undefined : new Response('ws', { status: 400 });
    },
    websocket: {
      maxPayloadLength: size[0] * size[1] * 4 + 4096,
      async message(ws, msg) {
        ff.stdin.write(msg as Uint8Array);
        await ff.stdin.flush();
        frames++;
        ws.send(String(frames));
        if (frames % 30 === 0 || frames === total) {
          const el = (performance.now() - t0) / 1000;
          process.stdout.write(`\r[${path.basename(out)}] ${frames}/${total}  ${(frames / el).toFixed(2)} fps  eta ${((total - frames) / (frames / el)).toFixed(0)}s   `);
        }
      },
    },
  });
  const used = await page.evaluate((o) => (window as any).__film.stream(o), {
    from, to, fps, ws: `ws://localhost:${server.port}`, samples: SAMPLES, shutter: SHUTTER, inflight: 3,
  });
  while (frames < total) await Bun.sleep(20);
  ff.stdin.end();
  await ff.exited;
  server.stop();
  process.stdout.write('\n');
  return { used, secs: (performance.now() - t0) / 1000 };
}

async function video() {
  const from = +opt('from', '0')!;
  const { url, stop } = await ensureServer();
  let dur = +opt('to', '0')!;
  let fps = +opt('fps', '0')!;
  let size: [number, number] = [1920, 1080];
  let cut = 'film';
  const out = path.resolve(opt('out', path.join(OUT, 'draft.mp4'))!);
  const workers = Math.max(1, +opt('workers', '1')!);
  const crf = opt('crf', '16')!;
  const preset = opt('preset', 'slow')!;
  try {
    {
      const probe = await openPage(url);
      const meta: { duration: number; width: number; height: number; fps: number; cut: string } = await probe.page.evaluate(() => {
        const f = (window as any).__film;
        return { duration: f.duration, width: f.width, height: f.height, fps: f.fps, cut: f.cut };
      });
      await probe.browser.close();
      if (!dur) dur = meta.duration;
      if (!fps) fps = meta.fps;
      size = [meta.width, meta.height];
      cut = meta.cut;
    }
    const segDir = path.join(OUT, `.seg-${path.basename(out, '.mp4')}`);
    rmSync(segDir, { recursive: true, force: true });
    mkdirSync(segDir, { recursive: true });
    const totalF = Math.round((dur - from) * fps);
    const bounds: [number, number][] = [];
    for (let i = 0; i < workers; i++) {
      const a = Math.round((totalF * i) / workers), b = Math.round((totalF * (i + 1)) / workers);
      bounds.push([from + a / fps, from + b / fps]);
    }
    const t0 = performance.now();
    const results = await Promise.all(
      bounds.map(async ([a, b], i) => {
        const { browser, page, logs } = await openPage(url);
        try {
          const r = await streamSegment(page, a, b, fps, path.join(segDir, `seg${i}.mp4`), crf, preset, size);
          if (logs.length) console.error(logs.slice(0, 20).join('\n'));
          return r;
        } finally {
          await browser.close();
        }
      }),
    );
    console.log(`rendered in ${((performance.now() - t0) / 1000).toFixed(1)}s`, results.map((r) => r.used));
    const list = path.join(segDir, 'list.txt');
    writeFileSync(list, bounds.map((_, i) => `file 'seg${i}.mp4'`).join('\n'));
    const audio = opt('audio', path.join(APP, cut === 'reel' ? 'public/audio/vantalogics-reel.wav' : 'public/audio/vantalogics.wav'))!;
    const args = [FFMPEG, '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list];
    const withAudio = !flag('noaudio') && existsSync(audio);
    if (withAudio) args.push('-ss', String(from), '-t', String(dur - from), '-i', audio);
    args.push('-map', '0:v');
    if (withAudio) args.push('-map', '1:a', '-c:a', 'aac', '-b:a', '320k');
    args.push('-c:v', 'copy', '-movflags', '+faststart', out);
    const p = Bun.spawn(args, { stdout: 'inherit', stderr: 'inherit' });
    await p.exited;
    if (!flag('keep')) rmSync(segDir, { recursive: true, force: true });
    console.log(`wrote ${out}`);
  } finally {
    stop();
  }
}

if (mode === 'video') {
  await video();
} else {
  const { url, stop } = await ensureServer();
  const { browser, page, logs } = await openPage(url);
  try {
    if (mode === 'stills') {
      const times = (opt('t') ?? '0').split(',').map(Number);
      console.log((await stills(page, times, opt('out', path.join(OUT, 'stills'))!)).join('\n'));
    } else if (mode === 'sheet') {
      const from = +opt('from', '0')!, to = +opt('to', '10')!, n = +opt('n', '12')!;
      let times = Array.from({ length: n }, (_, i) => from + ((to - from) * i) / Math.max(1, n - 1));
      if (opt('times')) times = opt('times')!.split(',').map(Number);
      if (flag('cuts')) {
        const tl: { start: number }[] = await page.evaluate(() => (window as any).__film.timeline);
        times = tl.slice(1).flatMap((e) => [e.start - 0.25, e.start - 1 / 60, e.start, e.start + 0.25]);
      }
      const out = opt('out', path.join(OUT, 'sheets', `sheet_${from}-${to}.png`))!;
      await sheet(page, times, +opt('cols', '4')!, +opt('cw', '480')!, out);
      console.log(out);
    } else if (mode === 'perf') {
      const from = +opt('from', '0')!, to = +opt('to', '2')!;
      const r = await page.evaluate(
        ({ from, to, s, sh }) => {
          const E = (window as any).__film.engine;
          const ms: number[] = [];
          for (let t = from; t < to; t += 1 / 60) {
            const a = performance.now();
            E.render(t, { samples: s || E.samplesAt(t, 6), shutter: sh });
            E.finish(t, true);
            ms.push(performance.now() - a);
          }
          ms.sort((a, b) => a - b);
          return { n: ms.length, avg: ms.reduce((a, b) => a + b, 0) / ms.length, p95: ms[Math.floor(ms.length * 0.95)] };
        },
        { from, to, s: SAMPLES, sh: SHUTTER },
      );
      console.log(r);
    }
    const errs: string[] = await page.evaluate(() => (window as any).__film.errors());
    if (errs.length) console.error('SCENE ERRORS:\n' + errs.join('\n'));
    if (logs.length) console.error('BROWSER LOG:\n' + logs.slice(0, 30).join('\n'));
  } finally {
    await browser.close();
    stop();
  }
}

