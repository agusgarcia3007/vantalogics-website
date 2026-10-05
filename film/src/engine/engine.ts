import { Pen } from './draw';
import type { Entry, Frame, FrameInfo, Scene } from './scene';
import { drawHud } from './hud';
import { mulberry32, hash } from './math';
import { HEX } from './palette';
import { W, H, GRAIN } from './format';

export { W, H };
const GW = Math.round(W / 2), GH = Math.round(H / 2);

export interface EngineOpts {
  map?: (tau: number) => number;
  overlay?: Scene;
  duration?: number;
  fps?: number;
}

function canvas(w: number, h: number, read = true) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { willReadFrequently: read, alpha: true })!;
  return { c, g };
}

export interface RenderOpts {
  samples?: number;
  shutter?: number;
  grain?: boolean;
  post?: boolean;
}

export class Engine {
  S = canvas(W, H, true);
  G = canvas(GW, GH, true);
  F = canvas(W, H, true);
  HH = canvas(GW, GH);
  B1 = canvas(GW / 2, GH / 2);
  B2 = canvas(GW / 4, GH / 4);
  B3 = canvas(GW / 8, GH / 8);
  pen = new Pen(this.S.g);
  accRB = new Uint32Array(W * H);
  accGA = new Uint32Array(W * H);
  accGRB = new Uint32Array(GW * GH);
  accGGA = new Uint32Array(GW * GH);
  grain8: Int8Array;
  amp: Int32Array;
  vig16: Uint16Array;
  lastInfo: FrameInfo = {};
  lastSamples = 1;
  errors: string[] = [];

  map: (tau: number) => number;
  overlay?: Scene;
  fps: number;
  private dur?: number;

  constructor(public timeline: Entry[], opts: EngineOpts = {}) {
    this.map = opts.map ?? ((x) => x);
    this.overlay = opts.overlay;
    this.fps = opts.fps ?? 60;
    this.dur = opts.duration;
    const N = 1024;
    this.grain8 = new Int8Array(N * N);
    const r = mulberry32(7);
    for (let i = 0; i < N * N; i += 2) {
      const u = Math.max(1e-9, r()), v = r();
      const m = Math.sqrt(-2 * Math.log(u));
      this.grain8[i] = Math.max(-127, Math.min(127, Math.round(m * Math.cos(2 * Math.PI * v) * 32)));
      this.grain8[i + 1] = Math.max(-127, Math.min(127, Math.round(m * Math.sin(2 * Math.PI * v) * 32)));
    }
    this.amp = new Int32Array(256);
    for (let l = 0; l < 256; l++) {
      const k = l / 255;
      this.amp[l] = Math.round((((1.6 + 7.5 * k * (1 - k)) * GRAIN) / 32) * 4096);
    }
    this.vig16 = new Uint16Array(W * H);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const dx = (x - W / 2) / (W / 2), dy = ((y - H / 2) / (H / 2)) * 0.72;
        const d = Math.sqrt(dx * dx + dy * dy);
        const s = Math.min(1, Math.max(0, (d - 0.45) / 0.85));
        this.vig16[y * W + x] = Math.round((1 - 0.3 * s * s * (3 - 2 * s)) * 32768);
      }
  }

  get duration() {
    return this.dur ?? Math.max(...this.timeline.map((e) => e.end));
  }

  active(t: number) {
    return this.timeline.filter((e) => t >= e.start && t < e.end);
  }

  samplesAt(tau: number, base: number) {
    const t = this.map(tau);
    let n = base;
    if (this.overlay) n = Math.max(n, this.overlay.samples(tau));
    for (const e of this.active(t)) n = Math.max(n, e.scene.samples(t));
    return n;
  }

  private sub(tau: number): FrameInfo {
    const t = this.map(tau);
    const { g } = this.S;
    const gl = this.G.g;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1;
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = HEX.vanta;
    g.fillRect(0, 0, W, H);
    gl.setTransform(1, 0, 0, 1, 0, 0);
    gl.globalCompositeOperation = 'source-over';
    gl.clearRect(0, 0, GW, GH);
    gl.fillStyle = '#000';
    gl.fillRect(0, 0, GW, GH);
    gl.setTransform(0.5, 0, 0, 0.5, 0, 0);
    gl.globalCompositeOperation = 'lighter';
    const info: FrameInfo = {};
    for (const e of this.active(t)) {
      const f: Frame = { t, lt: t - e.start, p: (t - e.start) / (e.end - e.start), dur: e.end - e.start, g, pen: this.pen, glow: gl, info };
      this.pen.u = 1;
      g.save();
      gl.save();
      try {
        e.scene.render(f);
      } catch (err) {
        const msg = `[${e.id}] ${(err as Error)?.stack ?? err}`;
        if (!this.errors.includes(msg)) this.errors.push(msg);
        console.error(msg);
      }
      g.restore();
      gl.restore();
      g.setLineDash([]);
    }
    if (this.overlay) {
      const f: Frame = { t: tau, lt: tau, p: 0, dur: this.duration, g, pen: this.pen, glow: gl, info };
      this.pen.u = 1;
      g.save();
      gl.save();
      try {
        this.overlay.render(f);
      } catch (err) {
        const msg = `[overlay] ${(err as Error)?.stack ?? err}`;
        if (!this.errors.includes(msg)) this.errors.push(msg);
      }
      g.restore();
      gl.restore();
      g.setLineDash([]);
    }
    return info;
  }

  render(t: number, o: RenderOpts = {}) {
    const shutter = o.shutter ?? 0.5;
    const n = Math.max(1, o.samples ?? 1);
    let info: FrameInfo;
    if (n === 1) {
      info = this.sub(t);
    } else {
      this.accRB.fill(0);
      this.accGA.fill(0);
      this.accGRB.fill(0);
      this.accGGA.fill(0);
      let best = Infinity;
      info = {};
      for (let k = 0; k < n; k++) {
        const u = (k + 0.5) / n - 0.5;
        const i = this.sub(Math.max(0, t + (u * shutter) / this.fps));
        if (Math.abs(u) < best) {
          best = Math.abs(u);
          info = i;
        }
        accumulate(this.S.g.getImageData(0, 0, W, H).data, this.accRB, this.accGA);
        accumulate(this.G.g.getImageData(0, 0, GW, GH).data, this.accGRB, this.accGGA);
      }
      const img = this.S.g.createImageData(W, H);
      resolve(img.data, this.accRB, this.accGA, n);
      this.S.g.putImageData(img, 0, 0);
      const imgG = this.G.g.createImageData(GW, GH);
      resolve(imgG.data, this.accGRB, this.accGGA, n);
      this.G.g.putImageData(imgG, 0, 0);
    }
    this.lastSamples = n;
    this.lastInfo = info;
    this.composite(t, info, o.post !== false);
    return info;
  }

  private composite(t: number, info: FrameInfo, post: boolean) {
    const g = this.F.g;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1;
    g.globalCompositeOperation = 'source-over';
    g.drawImage(this.S.c, 0, 0);
    if (post) {
      const b1 = this.B1.g, b2 = this.B2.g, b3 = this.B3.g;
      b1.globalCompositeOperation = 'copy';
      b1.filter = 'blur(2px)';
      b1.drawImage(this.G.c, 0, 0, GW / 2, GH / 2);
      b1.filter = 'none';
      b2.globalCompositeOperation = 'copy';
      b2.filter = 'blur(2px)';
      b2.drawImage(this.B1.c, 0, 0, GW / 4, GH / 4);
      b2.filter = 'none';
      b3.globalCompositeOperation = 'copy';
      b3.filter = 'blur(2px)';
      b3.drawImage(this.B2.c, 0, 0, GW / 8, GH / 8);
      b3.filter = 'none';
      const hh = this.HH.g;
      hh.imageSmoothingEnabled = true;
      hh.imageSmoothingQuality = 'low';
      hh.globalCompositeOperation = 'copy';
      hh.globalAlpha = 0.85;
      hh.drawImage(this.G.c, 0, 0);
      hh.globalCompositeOperation = 'lighter';
      hh.globalAlpha = 0.75;
      hh.drawImage(this.B1.c, 0, 0, GW, GH);
      hh.globalAlpha = 0.6;
      hh.drawImage(this.B2.c, 0, 0, GW, GH);
      hh.globalAlpha = 0.45;
      hh.drawImage(this.B3.c, 0, 0, GW, GH);
      hh.globalAlpha = 1;
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = 'low';
      g.globalCompositeOperation = 'lighter';
      g.drawImage(this.HH.c, 0, 0, W, H);
      g.globalCompositeOperation = 'source-over';
    }
    drawHud(g, t, info, W, H, this.fps);
  }

  finish(t: number, grain = true): ImageData {
    const img = this.F.g.getImageData(0, 0, W, H);
    const d = img.data;
    const vig = this.vig16;
    const fi = Math.round(t * this.fps);
    const ox = Math.floor(hash(fi, 11) * 1024), oy = Math.floor(hash(fi, 29) * 1024);
    if (grain) grainPass(d, vig, this.grain8, this.amp, ox, oy);
    else vignettePass(d, vig);
    return img;
  }
}

function accumulate(d: Uint8ClampedArray, rb: Uint32Array, ga: Uint32Array) {
  const u = new Uint32Array(d.buffer, d.byteOffset, d.length >> 2);
  const n = u.length;
  for (let i = 0; i < n; i++) {
    const px = u[i];
    rb[i] += px & 0x00ff00ff;
    ga[i] += (px >>> 8) & 0x00ff00ff;
  }
}

function resolve(d: Uint8ClampedArray, rb: Uint32Array, ga: Uint32Array, n: number) {
  const u = new Uint32Array(d.buffer, d.byteOffset, d.length >> 2);
  const m = Math.round(65536 / n);
  const h = n >> 1;
  const len = u.length;
  for (let i = 0; i < len; i++) {
    const a = rb[i], b = ga[i];
    const r = (((a & 0xffff) + h) * m) >>> 16;
    const bl = (((a >>> 16) + h) * m) >>> 16;
    const g = (((b & 0xffff) + h) * m) >>> 16;
    u[i] = (0xff000000 | (bl << 16) | (g << 8) | r) >>> 0;
  }
}

function vignettePass(d: Uint8ClampedArray, vig: Uint16Array) {
  const n = W * H;
  for (let p = 0, i = 0; p < n; p++, i += 4) {
    const v = vig[p];
    d[i] = (d[i] * v) >> 15;
    d[i + 1] = (d[i + 1] * v) >> 15;
    d[i + 2] = (d[i + 2] * v) >> 15;
  }
}

function grainPass(d: Uint8ClampedArray, vig: Uint16Array, tile: Int8Array, amp: Int32Array, ox: number, oy: number) {
  const u32 = new Uint32Array(d.buffer, d.byteOffset, d.length >> 2);
  for (let y = 0; y < H; y++) {
    const row = ((y + oy) & 1023) << 10;
    let p = y * W;
    for (let x = 0; x < W; x++, p++) {
      const px = u32[p];
      const v = vig[p];
      let r = ((px & 255) * v) >> 15;
      let g = (((px >> 8) & 255) * v) >> 15;
      let b = (((px >> 16) & 255) * v) >> 15;
      const nz = (tile[row | ((x + ox) & 1023)] * amp[(r * 54 + g * 183 + b * 19) >> 8] + 2048) >> 12;
      r += nz;
      g += nz;
      b += nz;
      r = r < 0 ? 0 : r > 255 ? 255 : r;
      g = g < 0 ? 0 : g > 255 ? 255 : g;
      b = b < 0 ? 0 : b > 255 ? 255 : b;
      u32[p] = 0xff000000 | (b << 16) | (g << 8) | r;
    }
  }
}
