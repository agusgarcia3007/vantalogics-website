import { Engine, W, H } from './engine/engine';
import { loadFonts } from './engine/type';
import { buildTimeline } from './timeline/timeline';
import { DURATION } from './timeline/cues';
import { CUT } from './engine/format';
import { reelMap, REEL_DURATION } from './timeline/reel';
import Hook from './scenes/hook';

const q = new URLSearchParams(location.search);
const exporting = q.has('export');
const only = q.get('only')?.split(',').filter(Boolean);

const view = document.getElementById('view') as HTMLCanvasElement;
view.width = W;
view.height = H;
document.documentElement.style.setProperty('--ar', `${W} / ${H}`);
const vg = view.getContext('2d')!;
const FPS = +(q.get('fps') ?? (CUT === 'reel' ? 30 : 60));
const api: Record<string, unknown> = { ready: false, error: null };
(window as unknown as { __film: typeof api }).__film = api;

async function boot() {
  await loadFonts();
  const timeline = await buildTimeline(only);
  const reel = CUT === 'reel';
  const engine = new Engine(timeline, reel ? { map: reelMap, overlay: new Hook(), duration: REEL_DURATION, fps: FPS } : { fps: FPS });
  const TOTAL = reel ? REEL_DURATION : DURATION;
  api.engine = engine;
  api.duration = TOTAL;
  api.width = W;
  api.height = H;
  api.fps = FPS;
  api.cut = CUT;
  api.timeline = timeline.map((e) => ({ id: e.id, start: e.start, end: e.end }));

  const present = (t: number, samples: number, shutter: number, grain: boolean) => {
    engine.render(t, { samples, shutter });
    const img = engine.finish(t, grain);
    vg.putImageData(img, 0, 0);
    return img;
  };

  api.still = (t: number, samples = 1, shutter = 0.5) => {
    const n = samples > 0 ? samples : engine.samplesAt(t, 6);
    present(t, n, shutter, true);
    return n;
  };
  api.png = () => view.toDataURL('image/png');
  api.errors = () => engine.errors;

  api.sheet = (times: number[], cols: number, cw: number, samples = 1) => {
    const ch = Math.round((cw * H) / W);
    const lab = 16, pad = 4;
    const rows = Math.ceil(times.length / cols);
    const cv = document.createElement('canvas');
    cv.width = cols * (cw + pad) + pad;
    cv.height = rows * (ch + lab + pad) + pad;
    const c = cv.getContext('2d')!;
    c.fillStyle = '#1a1a1a';
    c.fillRect(0, 0, cv.width, cv.height);
    times.forEach((t, i) => {
      present(t, samples, 0.5, true);
      const x = pad + (i % cols) * (cw + pad), y = pad + Math.floor(i / cols) * (ch + lab + pad);
      c.imageSmoothingQuality = 'high';
      c.drawImage(view, x, y + lab, cw, ch);
      c.fillStyle = '#bbb';
      c.font = '11px monospace';
      c.fillText(`${t.toFixed(2)}s`, x + 2, y + 12);
    });
    return cv.toDataURL('image/png');
  };

  api.stream = async (o: { from: number; to: number; fps: number; ws: string; samples: number; shutter: number; inflight?: number }) => {
    const sock = new WebSocket(o.ws);
    sock.binaryType = 'arraybuffer';
    await new Promise((r, j) => {
      sock.onopen = r;
      sock.onerror = j;
    });
    let acked = 0;
    sock.onmessage = (m) => (acked = +m.data);
    const f0 = Math.round(o.from * o.fps), f1 = Math.round(o.to * o.fps);
    const used: Record<number, number> = {};
    let sent = 0;
    for (let fi = f0; fi < f1; fi++) {
      const t = fi / o.fps;
      const n = o.samples > 0 ? o.samples : engine.samplesAt(t, 6);
      used[n] = (used[n] ?? 0) + 1;
      engine.render(t, { samples: n, shutter: o.shutter });
      const img = engine.finish(t, true);
      while (sent - acked >= (o.inflight ?? 3)) await new Promise((r) => setTimeout(r, 2));
      sock.send(img.data.buffer.slice(0));
      sent++;
    }
    while (acked < sent) await new Promise((r) => setTimeout(r, 5));
    sock.close();
    return used;
  };

  api.ready = true;

  if (exporting) {
    document.body.classList.add('export');
    return;
  }

  const scrub = document.getElementById('scrub') as HTMLInputElement;
  const tc = document.getElementById('tc')!;
  const info = document.getElementById('info')!;
  scrub.max = String(TOTAL);
  const audio = new Audio(reel ? '/audio/vantalogics-reel.wav' : '/audio/vantalogics.wav');
  let t = +(q.get('t') ?? 0);
  let playing = false;
  let grain = q.get('grain') !== '0';
  let samples = +(q.get('samples') ?? 1);
  let loop: [number, number] | null = null;
  let wall0 = 0, t0 = 0;

  const draw = () => {
    if (grain || samples > 1) present(t, samples, 0.5, grain);
    else {
      engine.render(t, { samples: 1 });
      vg.drawImage(engine.F.c, 0, 0, W, H);
    }
    tc.textContent = t.toFixed(3);
    scrub.value = String(t);
    const tm = engine.map(t);
    const e = timeline.find((x) => tm >= x.start && tm < x.end);
    info.textContent = `${e?.id ?? '—'}  f${Math.round(t * FPS)}  ${grain ? 'grain' : ''} ×${samples}`;
  };

  const tick = () => {
    if (playing) {
      if (!audio.paused && audio.readyState >= 2) t = audio.currentTime;
      else t = t0 + (performance.now() - wall0) / 1000;
      if (loop && t >= loop[1]) seek(loop[0]);
      if (t >= TOTAL) {
        playing = false;
        audio.pause();
        t = TOTAL - 1 / FPS;
      }
    }
    draw();
    requestAnimationFrame(tick);
  };

  const seek = (x: number) => {
    t = Math.max(0, Math.min(TOTAL - 1 / FPS, x));
    audio.currentTime = t;
    t0 = t;
    wall0 = performance.now();
  };

  const toggle = () => {
    playing = !playing;
    if (playing) {
      seek(t);
      audio.play().catch(() => undefined);
    } else audio.pause();
  };

  scrub.oninput = () => seek(+scrub.value);
  window.addEventListener('keydown', (e) => {
    if (e.key === ' ') toggle();
    else if (e.key === 'ArrowRight') seek(t + (e.shiftKey ? 5 : 1));
    else if (e.key === 'ArrowLeft') seek(t - (e.shiftKey ? 5 : 1));
    else if (e.key === '.') seek(Math.round(t * FPS + 1) / FPS);
    else if (e.key === ',') seek(Math.round(t * FPS - 1) / FPS);
    else if (e.key === ']') {
      const n = timeline.find((x) => x.start > t + 1e-3);
      if (n) seek(n.start);
    } else if (e.key === '[') {
      const c = [...timeline].reverse().find((x) => x.start < t - 0.05);
      if (c) seek(c.start);
    } else if (e.key === 'l') {
      const c = timeline.find((x) => t >= x.start && t < x.end);
      loop = loop ? null : c ? [c.start, c.end] : null;
    } else if (e.key === 'g') grain = !grain;
    else if (e.key === 'm') samples = samples === 1 ? 6 : 1;
    else if (e.key === 'h') document.body.classList.toggle('hide');
  });
  seek(t);
  tick();
}

boot().catch((e) => {
  api.error = String((e as Error)?.stack ?? e);
  console.error(e);
});
