import { Scene, type Frame } from '../engine/scene';
import { Cam3 } from '../engine/space';
import { rgba } from '../engine/palette';
import { font, measure } from '../engine/type';
import { TAU, clamp, ease, lerp, prog } from '../engine/math';
import { signalHead, signalStroke, emit } from '../engine/signal';
import { FIELD, FIELD_N } from './field';
import { scaleOrbit, applyOrbit, drawField, NUM, type Orbit } from './scale';
import { VERTICAL, CX, CY, W } from '../engine/format';
import { PILLARS } from './system-world';

export const E = {
  start: 36,
  spokes: [36.05, 36.7] as const,
  merge: [36.75, 37.12] as const,
  contract: [37.1, 37.5] as const,
  traceV: [37.5, 38.12] as const,
  hop: [38.12, 38.26] as const,
  traceA: [38.26, 38.86] as const,
  widenV: [38.14, 38.5] as const,
  widenA: [38.86, 39.2] as const,
  word: [39.0, 39.85] as const,
  drop: [39.9, 40.55] as const,
  desc: 40.2,
  tagline: [40.6, 41.85] as const,
  period: 41.9,
  url: 42.5,
  end: 45,
};

const V_POLY = [0, 0, 97, 0, 197, 283, 300, 0, 392, 0, 205, 500, 190, 500];
const A_POLY = [476, 10, 490, 10, 680, 510, 583, 510, 483, 228, 380, 510, 287, 510];
const V_TRACE = [48.5, 0, 197, 488, 346, 0];
const A_TRACE = [333.5, 510, 483, 22, 631.5, 510];
const HW = 48.5;

const V_ARMS: [(y: number) => number, (y: number) => number] = [(y) => 48.5 + 0.367 * y, (y) => 346 - 0.369 * y];
const A_ARMS: [(y: number) => number, (y: number) => number] = [(y) => 333.5 + (510 - y) * 0.371, (y) => 631.5 - (510 - y) * 0.367];

const WORD = 'VANTALOGICS';
const TAG = VERTICAL ? ['Construimos la inteligencia', 'detrás de los productos', 'educativos'] : ['Construimos la inteligencia detrás', 'de los productos educativos'];
const RIGHT = VERTICAL ? 1008 : 1744;
const LEFT = VERTICAL ? 72 : 176;
const TAG_SIZE = 64;
const TAG_LH = VERTICAL ? 80 : 76;

interface Layout {
  size: number;
  ms: number;
  mx: number;
  my: number;
  wx: number;
  base: number;
  ww: number;
}

let LAY: Layout | null = null;
function layout(): Layout {
  if (LAY) return LAY;
  if (VERTICAL) {
    const mh = 320, ms = mh / 510, base = 1000;
    let size = 160;
    for (let i = 0; i < 6; i++) size *= (RIGHT - LEFT) / measure(WORD, 'display', size, 600, 0.06);
    const ww = measure(WORD, 'display', size, 600, 0.06);
    LAY = { size, ms, mx: LEFT, my: 420, wx: LEFT, base, ww };
    return LAY;
  }
  const left = 176, right = 1744;
  const base = 548;
  let size = 180;
  for (let i = 0; i < 6; i++) {
    const ww = measure(WORD, 'display', size, 600, 0.06);
    const mh = size * 0.727 * 1.18;
    const mw = (mh / 510) * 680;
    const total = mw + size * 0.3 + ww;
    size *= (right - left) / total;
  }
  const ww = measure(WORD, 'display', size, 600, 0.06);
  const mh = size * 0.727 * 1.18;
  const ms = mh / 510;
  const mw = 680 * ms;
  LAY = { size, ms, mx: left, my: base - mh, wx: left + mw + size * 0.3, base, ww };
  return LAY;
}

function mpt(L: Layout, x: number, y: number): [number, number] {
  return [L.mx + x * L.ms, L.my + y * L.ms];
}

function tracePartial(L: Layout, pts: number[], k: number): { pts: number[]; head: [number, number] } {
  const seg = [Math.hypot(pts[2] - pts[0], pts[3] - pts[1]), Math.hypot(pts[4] - pts[2], pts[5] - pts[3])];
  const tot = seg[0] + seg[1];
  const d = k * tot;
  const out: number[] = [...mpt(L, pts[0], pts[1])];
  let head: [number, number];
  if (d <= seg[0]) {
    const q = d / seg[0];
    head = mpt(L, lerp(pts[0], pts[2], q), lerp(pts[1], pts[3], q));
  } else {
    out.push(...mpt(L, pts[2], pts[3]));
    const q = (d - seg[0]) / seg[1];
    head = mpt(L, lerp(pts[2], pts[4], q), lerp(pts[3], pts[5], q));
  }
  out.push(head[0], head[1]);
  return { pts: out, head };
}

function fillMark(g: CanvasRenderingContext2D, L: Layout, poly: number[], arms: [(y: number) => number, (y: number) => number], w: number, a: number) {
  if (w <= 0 || a <= 0) return;
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.beginPath();
  for (let i = 0; i < poly.length; i += 2) {
    const [x, y] = mpt(L, poly[i], poly[i + 1]);
    if (i === 0) g.moveTo(x, y);
    else g.lineTo(x, y);
  }
  g.closePath();
  g.clip();
  g.fillStyle = rgba('bone', a);
  g.beginPath();
  const hw = HW * w + 0.9 / L.ms;
  for (const arm of arms) {
    const y0 = -20, y1 = 530;
    const p = [mpt(L, arm(y0) - hw, y0), mpt(L, arm(y0) + hw, y0), mpt(L, arm(y1) + hw, y1), mpt(L, arm(y1) - hw, y1)];
    g.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < 4; i++) g.lineTo(p[i][0], p[i][1]);
    g.closePath();
  }
  g.fill();
  g.restore();
}

function nearAngle(target: number, ref: number) {
  return target + TAU * Math.round((ref - target) / TAU);
}

export default class Resolve extends Scene {
  cam = new Cam3(36, 1, 1e6);

  samples(t: number) {
    if (t < E.contract[1] + 0.05) return 16;
    if (t < E.word[1]) return 14;
    if (t < E.period + 0.2) return 10;
    return 6;
  }

  render(f: Frame) {
    const t = f.t;
    const g = f.g;
    const p = f.pen;
    const L = layout();
    const start = mpt(L, V_TRACE[0], V_TRACE[1]);

    if (t < E.contract[1] + 0.02) this.collapse(f, t, start);
    this.leftovers(f, t);

    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    p.u = 1;

    const tv = ease.inOutCubic(prog(t, E.traceV[0], E.traceV[1]));
    const ta = ease.inOutCubic(prog(t, E.traceA[0], E.traceA[1]));
    const wv = ease.outExpo(prog(t, E.widenV[0], E.widenV[1]));
    const wa = ease.outExpo(prog(t, E.widenA[0], E.widenA[1]));
    fillMark(g, L, V_POLY, V_ARMS, wv, 1);
    fillMark(g, L, A_POLY, A_ARMS, wa, 1);
    let head: [number, number] | null = null;
    if (t >= E.traceV[0]) {
      const tr = tracePartial(L, V_TRACE, tv);
      signalStroke(f, tr.pts, 1 - wv, 1.4, 0.35 * (1 - wv));
      if (t < E.hop[0]) head = tr.head;
    }
    if (t >= E.hop[0] && t < E.traceA[0]) {
      const k = ease.inOutCubic(prog(t, E.hop[0], E.hop[1]));
      const a = mpt(L, V_TRACE[4], V_TRACE[5]), b = mpt(L, A_TRACE[0], A_TRACE[1]);
      const arc = Math.sin(k * Math.PI) * 40;
      head = [lerp(a[0], b[0], k) + arc, lerp(a[1], b[1], k)];
      p.dashed(2, 4);
      p.line(a[0], a[1], head[0], head[1], rgba('muted', 0.5 * (1 - k)), 1);
      p.solid();
    }
    if (t >= E.traceA[0]) {
      const tr = tracePartial(L, A_TRACE, ta);
      signalStroke(f, tr.pts, 1 - wa, 1.4, 0.35 * (1 - wa));
      if (t < E.word[0]) head = tr.head;
    }

    const wordEndX = L.wx + L.ww;
    if (t >= E.word[0]) {
      const k = ease.inOutCubic(prog(t, E.word[0], E.word[1]));
      const aEnd = mpt(L, A_TRACE[4], A_TRACE[5]);
      const x0 = VERTICAL ? L.wx : aEnd[0];
      const kk = VERTICAL ? ease.inOutCubic(prog(t, E.word[0] + 0.18, E.word[1])) : k;
      const sx = lerp(x0, wordEndX + 18, kk);
      if (t < E.drop[0]) head = [sx, L.base];
      if (VERTICAL && t < E.word[0] + 0.18) {
        const q = ease.inOutCubic(prog(t, E.word[0], E.word[0] + 0.18));
        head = [lerp(aEnd[0], x0, q), lerp(aEnd[1], L.base, q)];
      }
      const lineK = 1 - prog(t, E.word[1], E.word[1] + 0.3);
      if (lineK > 0) signalStroke(f, [x0, L.base + 0.5, sx, L.base + 0.5], 0.8 * lineK, 1.1, 0.2 * lineK);
      const bk = ease.inOutCubic(prog(t, E.word[1] - 0.1, E.word[1] + 0.5));
      p.line(x0, L.base + 22, lerp(x0, RIGHT, bk), L.base + 22, rgba('iron', 0.9), 1);
      p.line(L.mx, L.base + 22, lerp(L.mx, x0, bk), L.base + 22, rgba('iron', 0.9), 1);
      for (let q = 0; q <= 16; q++) {
        const xq = lerp(L.mx, RIGHT, q / 16);
        if (xq > lerp(L.mx, RIGHT, bk)) break;
        p.line(xq, L.base + 22, xq, L.base + (q % 4 === 0 ? 32 : 27), rgba('iron', 0.9), 1);
      }
      g.font = font('display', L.size, 600);
      g.letterSpacing = `${0.06 * L.size}px`;
      g.textBaseline = 'alphabetic';
      g.fillStyle = rgba('bone', 1);
      for (let i = 0; i < WORD.length; i++) {
        const lx = L.wx + measure(WORD.slice(0, i), 'display', L.size, 600, 0.06) + (i > 0 ? 0.06 * L.size : 0);
        const lw = measure(WORD[i], 'display', L.size, 600, 0);
        const on = clamp((sx - lx) / Math.max(1, lw));
        if (on <= 0) break;
        const rise = 1 - ease.outExpo(clamp(on * 1.4));
        g.save();
        g.beginPath();
        g.rect(lx - 4, 0, lw * on + 6, L.base + 40);
        g.clip();
        g.fillText(WORD[i], lx, L.base + rise * 14);
        g.restore();
      }
      g.letterSpacing = '0px';
    }

    const dk = prog(t, E.desc, E.desc + 0.45);
    if (dk > 0) p.typed('PRODUCTO  ·  IA APLICADA  ·  INGENIERÍA', dk, LEFT + 4, L.base + 86, { size: VERTICAL ? 21 : 15, weight: 500, tracking: 0.2, color: rgba('ash') });

    const ty = TAG.map((_, i) => L.base + (VERTICAL ? 210 : 236) + i * TAG_LH);
    const wl = TAG.map((l) => measure(l, 'display', TAG_SIZE, 300, -0.02));
    if (t >= E.drop[0]) {
      const k = ease.inOutCubic(prog(t, E.drop[0], E.drop[1]));
      const from: [number, number] = [wordEndX + 18, L.base];
      const to: [number, number] = [LEFT, ty[0] - 18];
      if (t < E.tagline[0]) {
        head = [lerp(from[0], to[0], ease.inOutCubic(clamp(k * 1.25 - 0.25))), lerp(from[1], to[1], ease.inOutCubic(clamp(k * 1.25)))];
      }
    }
    const tk = prog(t, E.tagline[0], E.tagline[1]);
    const lastI = TAG.length - 1;
    if (tk > 0) {
      const total = TAG.reduce((a2, l) => a2 + l.length, 0);
      let n = Math.floor(tk * total + 1e-6);
      let cx = LEFT - 4, cy = ty[0];
      for (let i = 0; i < TAG.length; i++) {
        const m = Math.min(TAG[i].length, n);
        if (m > 0 || i === 0) {
          p.text(TAG[i].slice(0, m), LEFT - 4, ty[i], { fam: 'display', size: TAG_SIZE, weight: 300, tracking: -0.02, color: rgba('bone', 0.96) });
          cx = LEFT - 4 + measure(TAG[i].slice(0, m), 'display', TAG_SIZE, 300, -0.02);
          cy = ty[i];
          if (m === TAG[i].length && n > m && i < lastI) {
            cx = LEFT - 4;
            cy = ty[i + 1];
          }
        }
        n -= m;
        if (n <= 0) break;
      }
      if (t < E.period) head = [cx + 4, cy - 18];
    }
    let caret = t >= E.tagline[0] && t < E.period;
    const periodX = LEFT - 4 + wl[lastI] + 6, periodY = ty[lastI] - 4.5;
    if (t >= E.period) {
      const k = ease.outExpo(prog(t, E.period, E.period + 0.25));
      head = [lerp(periodX + 4, periodX, k), lerp(ty[lastI] - 18, periodY, k)];
      caret = false;
    }

    const uk = prog(t, E.url, E.url + 0.4);
    if (uk > 0) {
      p.typed('vantalogics.com', uk, LEFT + 2, VERTICAL ? 1470 : 944, { size: VERTICAL ? 24 : 16, weight: 500, tracking: 0.06, color: rgba('bone', 0.9) });
    }
    g.restore();

    if (head) {
      if (caret) {
        g.save();
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.fillStyle = rgba('signal', 1);
        g.fillRect(head[0] - 1.2, head[1] - 34, 2.6, 52);
        g.restore();
        emit(f, head[0], head[1] - 8, 50, 0.45);
      } else {
        const settle = t >= E.period ? 1 : 0;
        const breathe = settle ? 0.9 + 0.1 * Math.cos((t - E.period) * 2.2) : 1;
        signalHead(f, head[0], head[1], breathe, settle ? lerp(1.2, 1.55, ease.outExpo(prog(t, E.period, E.period + 0.3))) : 1.1);
      }
    }

    f.info.sheet = t < E.traceV[0] ? 'VL—07' : 'VL—08';
    f.info.title = t < E.traceV[0] ? '/ REDUCCIÓN' : '/ VANTALOGICS';
    f.info.hud = t < E.traceV[0] ? 1 : 1 - prog(t, E.traceV[0], E.traceV[0] + 0.4);
    f.info.marks = 1;
    f.info.coords = head && t < E.traceV[0] ? [head[0] - CX, CY - head[1]] : null;
  }

  collapse(f: Frame, t: number, start: [number, number]) {
    const g = f.g;
    const cam = this.cam;
    const k = ease.inOutCubic(prog(t, E.start, E.merge[0] + 0.1));
    const a = scaleOrbit(Math.min(t, E.start + 0.001) + 0);
    const top: Orbit = { tx: 0, ty: 0, tz: 0, D: VERTICAL ? 5200 : 3500, el: 90, az: -90, fov: 36, shift: 0, shiftY: 0 };
    const o: Orbit = {
      tx: 0, ty: 0, tz: lerp(a.tz, 0, k), D: lerp(a.D, top.D, k), el: lerp(a.el, 90, k), az: lerp(a.az, -90, k), fov: 36, shift: 0, shiftY: 0,
    };
    const el = (o.el * Math.PI) / 180, az = (o.az * Math.PI) / 180;
    const hx = Math.cos(az), hz = Math.sin(az);
    const fw = [Math.cos(el) * hx, -Math.sin(el), Math.cos(el) * hz];
    const up: [number, number, number] = [Math.sin(el) * hx, Math.cos(el), Math.sin(el) * hz];
    const shx = lerp(a.shift, start[0] - CX, k), shy = lerp(a.shiftY, start[1] - CY, k);
    cam.set([o.tx - fw[0] * o.D, o.ty - fw[1] * o.D, o.tz - fw[2] * o.D], [o.tx, o.ty, o.tz], { fov: 36, up, shift: [shx, shy] });
    void applyOrbit;

    const c1 = ease.inOutCubic(prog(t, E.spokes[0], E.spokes[1]));
    const c2 = ease.inOutCubic(prog(t, E.merge[0], E.merge[1]));
    const c3 = ease.inExpo(prog(t, E.contract[0], E.contract[1]));
    const target = 0;
    const spokeA = (s: number) => -Math.PI / 2 + (s * TAU) / 5;
    const pos = (i: number): [number, number] => {
      const th = FIELD.th[i];
      const s = i % 5;
      const sa = nearAngle(spokeA(s), th);
      let ang = lerp(th, sa, c1);
      ang = lerp(ang, nearAngle(target, ang), c2);
      const r = FIELD.rs[i] * (1 - 0.25 * c1) * (1 - c3);
      return [Math.cos(ang) * r, Math.sin(ang) * r];
    };
    const alpha = 1 - 0.3 * c2;
    if (c3 < 0.995) drawField(g, cam, FIELD_N, t, { pos, alpha });

    const lk = prog(t, 36.35, 36.6) * (1 - prog(t, E.merge[0], E.merge[0] + 0.15));
    if (lk > 0) {
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.font = font('mono', 11, 500);
      g.letterSpacing = '1.4px';
      PILLARS.forEach((pl, s) => {
        const ang = spokeA(s);
        const pr = cam.project(Math.cos(ang) * 820, 0, Math.sin(ang) * 820);
        if (!pr) return;
        g.fillStyle = rgba('bone', 0.85 * lk);
        g.textAlign = Math.cos(ang) > 0.2 ? 'left' : Math.cos(ang) < -0.2 ? 'right' : 'center';
        g.fillText(pl.name, pr[0] + Math.cos(ang) * 18, pr[1] + Math.sin(ang) * 18 + 4);
      });
      g.restore();
    }
    const c = cam.project(0, 0, 0);
    if (c) signalHead(f, c[0], c[1], 1, 1 + 0.6 * c3);
  }

  leftovers(f: Frame, t: number) {
    const k = 1 - prog(t, E.start, E.start + 0.3);
    if (k <= 0) return;
    const g = f.g;
    const p = f.pen;
    g.save();
    g.setTransform(1, 0, 0, 1, 0, -30 * (1 - k));
    p.u = 1;
    g.font = font('display', NUM.size, 700);
    g.letterSpacing = `${-0.045 * NUM.size}px`;
    g.fillStyle = rgba('bone', k);
    g.fillText('24.000', NUM.x, NUM.y);
    const w = g.measureText('24.000').width;
    g.fillStyle = rgba('signal', k);
    g.fillText('+', NUM.x + w + 5, NUM.y);
    g.letterSpacing = '0px';
    p.text('ESTUDIANTES', NUM.wx, NUM.wy, { fam: 'display', size: NUM.wsize, weight: 600, tracking: 0.01, color: rgba('bone', k) });
    p.text('EN PRODUCTOS EN PRODUCCIÓN', NUM.sx, NUM.sy, { size: NUM.ssize, weight: 500, tracking: 0.16, color: rgba('muted', k) });
    g.restore();
  }
}
