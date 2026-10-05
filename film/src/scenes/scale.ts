import { Scene, type Frame } from '../engine/scene';
import { Cam3, Lines3, type V3 } from '../engine/space';
import { rgba } from '../engine/palette';
import { font } from '../engine/type';
import { clamp, ease, lerp, prog, hash } from '../engine/math';
import { signalHead, signalStroke } from '../engine/signal';
import { FIELD, FIELD_N, FIELD_R, radiusFor, fmtThousands } from './field';
import { LOOP_SIZE } from './review';
import { VERTICAL, CX, CY, W, H } from '../engine/format';

export const SC = {
  start: 30,
  seed: [30.0, 30.22] as const,
  count: [30.22, 33.0] as const,
  tilt: [31.0, 33.3] as const,
  plus: 33.08,
  detach: [33.12, 33.55] as const,
  words: [33.6, 33.9] as const,
  end: 36,
};

export interface Orbit {
  tx: number;
  ty: number;
  tz: number;
  D: number;
  el: number;
  az: number;
  fov: number;
  shift: number;
  shiftY: number;
}

export const NUM = VERTICAL
  ? { x: 60, y: 1300, size: 208, wx: 72, wy: 1382, wsize: 60, sx: 74, sy: 1432, ssize: 21, lx: 74, ly: 1050, lw: 520, lsize: 16 }
  : { x: 164, y: 812, size: 250, wx: 176, wy: 884, wsize: 46, sx: 178, sy: 926, ssize: 14, lx: 178, ly: 600, lw: 440, lsize: 10 };

export function countAt(t: number) {
  const u = prog(t, SC.count[0], SC.count[1]);
  return Math.min(FIELD_N, Math.floor(FIELD_N * u * u * u + (u > 0 ? 1 : 0)));
}

export function scaleOrbit(t: number): Orbit {
  const n = countAt(t);
  const r = Math.max(radiusFor(n), 6);
  const tk = ease.inOutCubic(prog(t, SC.tilt[0], SC.tilt[1]));
  const fit = lerp(2.7, 2.25, tk);
  const late = ease.inOutSine(prog(t, 33.2, SC.end));
  const D = Math.max(40, r * fit * (VERTICAL ? 2.15 : 1) * lerp(1, 1.3, ease.inOutCubic(prog(t, SC.detach[0] - 0.1, SC.detach[1] + 0.4))) * lerp(1, 0.95, late));
  return {
    tx: 0,
    ty: 0,
    tz: lerp(0, 60, tk),
    D,
    el: lerp(90, 31, tk) + lerp(0, 3, late),
    az: lerp(-90, -76, tk) + lerp(0, 9, late),
    fov: 36,
    shift: VERTICAL ? 0 : lerp(0, 430, ease.inOutCubic(prog(t, SC.detach[0] - 0.1, SC.detach[1] + 0.25))),
    shiftY: VERTICAL ? lerp(0, -330, ease.inOutCubic(prog(t, SC.detach[0] - 0.1, SC.detach[1] + 0.25))) : -0.2 * lerp(0, 430, ease.inOutCubic(prog(t, SC.detach[0] - 0.1, SC.detach[1] + 0.25))),
  };
}

export function applyOrbit(cam: Cam3, o: Orbit) {
  const el = (o.el * Math.PI) / 180, az = (o.az * Math.PI) / 180;
  const hx = Math.cos(az), hz = Math.sin(az);
  const f: V3 = [Math.cos(el) * hx, -Math.sin(el), Math.cos(el) * hz];
  const up: V3 = [Math.sin(el) * hx, Math.cos(el), Math.sin(el) * hz];
  cam.set([o.tx - f[0] * o.D, o.ty - f[1] * o.D, o.tz - f[2] * o.D], [o.tx, o.ty, o.tz], { fov: o.fov, up, shift: [o.shift, o.shiftY] });
}

export function drawField(g: CanvasRenderingContext2D, cam: Cam3, n: number, t: number, opts: { pos?: (i: number) => [number, number]; wave?: boolean; alpha?: number } = {}) {
  const e = cam.e;
  const fx = cam.fx, fy = cam.fy, cx = cam.cx, cy = cam.cy;
  const buckets: number[][] = [[], [], [], [], []];
  const hot: number[] = [];
  const alpha = opts.alpha ?? 1;
  const waves = opts.wave ? [33.5, 34.0, 34.5, 35.0, 35.5].filter((w) => t > w).map((w) => (t - w) * 1400) : [];
  let far = 0;
  for (let i = 0; i < n; i++) {
    let x = FIELD.xs[i], z = FIELD.zs[i];
    if (opts.pos) [x, z] = opts.pos(i);
    const vx = e[0] * x + e[8] * z + e[12];
    const vy = e[1] * x + e[9] * z + e[13];
    const vz = e[2] * x + e[10] * z + e[14];
    const d = -vz;
    if (d < 1) continue;
    const sx = cx + (vx / d) * fx, sy = cy - (vy / d) * fy;
    if (sx < -10 || sx > 1930 || sy < -10 || sy > 1090) continue;
    if (d > far) far = d;
    let b = 0.55 + 0.45 * FIELD.jit[i];
    const age = n - i;
    if (age < 40) b *= clamp(age / 40 + 0.2);
    let w = 0;
    for (const wr of waves) {
      const q = (FIELD.rs[i] - wr) / 70;
      w += Math.exp(-q * q) * Math.exp(-wr / 2200);
    }
    if (w > 0.45 && FIELD.jit[i] > 0.86) {
      hot.push(sx, sy);
      continue;
    }
    const k = Math.min(4, Math.floor(b * 5 * alpha));
    buckets[k].push(sx, sy, clamp(fy / d * 2.2, 1.1, 2.6));
  }
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  buckets.forEach((arr, k) => {
    g.fillStyle = rgba('bone', (k + 0.6) / 5.2);
    for (let i = 0; i < arr.length; i += 3) {
      const s = arr[i + 2];
      g.fillRect(arr[i] - s / 2, arr[i + 1] - s / 2, s, s);
    }
  });
  g.fillStyle = rgba('bone', 1);
  for (let i = 0; i < hot.length; i += 2) g.fillRect(hot[i] - 1.4, hot[i + 1] - 1.4, 2.8, 2.8);
  g.restore();
}

export default class Scale extends Scene {
  cam = new Cam3(36, 1, 1e6);
  L = new Lines3(this.cam);

  samples(t: number) {
    if (t < SC.count[0] + 0.3) return 16;
    if (t > SC.detach[0] - 0.05 && t < SC.detach[1] + 0.1) return 20;
    return 8;
  }

  render(f: Frame) {
    const t = f.t;
    const g = f.g;
    const p = f.pen;
    const cam = this.cam;
    applyOrbit(cam, scaleOrbit(t));
    const n = countAt(t);
    const r = radiusFor(n);

    if (t < SC.seed[1]) {
      const k = ease.inExpo(prog(t, SC.seed[0], SC.seed[1]));
      const w = lerp(LOOP_SIZE[0] * 0.035, 0, k), h = lerp(LOOP_SIZE[1] * 0.035, 0, k);
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.strokeStyle = rgba('signal', 0.9);
      g.lineWidth = 1.2;
      g.strokeRect(CX - w / 2, CY - h / 2, w, h);
      g.restore();
      signalHead(f, CX - w / 2, CY - h / 2 + h, 1, 0.8);
      f.info.sheet = 'VL—06';
      f.info.title = '/ ESCALA';
      return;
    }

    drawField(g, cam, n, t, { wave: false });

    const L = this.L;
    const tk = ease.inOutCubic(prog(t, SC.tilt[0], SC.tilt[1]));
    const ringK = prog(t, 30.4, 31);
    for (let k = 0; k < 96; k++) {
      const a0 = (k / 96) * Math.PI * 2, a1 = ((k + 1) / 96) * Math.PI * 2;
      const rr = FIELD_R * 1.04;
      L.seg(Math.cos(a0) * rr, 0, Math.sin(a0) * rr, Math.cos(a1) * rr, 0, Math.sin(a1) * rr, 0.22 * ringK * (k % 2 ? 1 : 0.4));
    }
    for (let k = 0; k < 360; k += 5) {
      const a = (k * Math.PI) / 180, r0 = FIELD_R * 1.04, r1 = FIELD_R * (k % 30 === 0 ? 1.1 : 1.065);
      L.seg(Math.cos(a) * r0, 0, Math.sin(a) * r0, Math.cos(a) * r1, 0, Math.sin(a) * r1, 0.4 * ringK);
    }
    L.flush(g, 'bone', 1);

    const dimOut = 1 - prog(t, SC.detach[0], SC.detach[0] + 0.25);
    const zD = 0;
    const A = cam.project(-r, 0, zD), B = cam.project(r, 0, zD);
    const a0 = cam.project(-r, 0, 0), b0 = cam.project(r, 0, 0);
    let mid: [number, number] | null = null;
    if (A && B && a0 && b0) {
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.strokeStyle = rgba('bone', 0.75 * dimOut);
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(A[0], A[1]); g.lineTo(B[0], B[1]);
      g.moveTo(A[0], A[1] - 9); g.lineTo(A[0], A[1] + 9);
      g.moveTo(B[0], B[1] - 9); g.lineTo(B[0], B[1] + 9);
      g.stroke();
      p.u = 1;
      const ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
      p.arrowHead(A[0], A[1], ang + Math.PI, 9, rgba('bone', 0.8 * dimOut), 1);
      g.restore();
      mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      if (t < SC.detach[0] + 0.1) {
        signalStroke(f, [mid[0], mid[1], B[0], B[1]], 0.9 * dimOut, 1.3, 0.3);
        signalHead(f, B[0], B[1], dimOut, 1);
      }
    }

    const final = t >= SC.plus;
    const label = final ? '24.000+' : fmtThousands(n);
    const dk = ease.outExpo(prog(t, SC.detach[0], SC.detach[1]));
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (mid) {
      const size = lerp(16 * (VERTICAL ? 1.4 : 1), NUM.size, dk);
      const x = lerp(mid[0], NUM.x, dk);
      const y = lerp(mid[1] - 16, NUM.y, dk);
      const fam = dk > 0.25 ? 'display' : 'mono';
      g.font = font(fam, size, fam === 'display' ? 700 : 500);
      g.letterSpacing = fam === 'display' ? `${-0.045 * size}px` : '0.5px';
      g.textAlign = dk > 0.25 ? 'left' : 'center';
      g.fillStyle = rgba('bone', 1);
      if (dk <= 0.25) {
        g.fillText(label, x, y);
        g.font = font('mono', 10 * (VERTICAL ? 1.5 : 1), 400);
        g.letterSpacing = '1px';
        g.fillStyle = rgba('muted', dimOut);
        g.fillText('n  =  ESTUDIANTES', x, y - 22 * (VERTICAL ? 1.5 : 1));
      } else {
        g.fillText('24.000', x, y);
        const w = g.measureText('24.000').width;
        g.fillStyle = rgba('signal', 1);
        g.fillText('+', x + w + size * 0.02, y);
      }
      g.letterSpacing = '0px';
    }
    g.restore();

    const wk = prog(t, SC.words[0], SC.words[1]);
    if (wk > 0) {
      p.u = 1;
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      p.typed('ESTUDIANTES', clamp(wk * 2), NUM.wx, NUM.wy, { fam: 'display', size: NUM.wsize, weight: 600, tracking: 0.01, color: rgba('bone') });
      p.typed('EN PRODUCTOS EN PRODUCCIÓN', clamp(wk * 2 - 0.6), NUM.sx, NUM.sy, { size: NUM.ssize, weight: 500, tracking: 0.16, color: rgba('muted') });
      const lk = ease.outExpo(prog(t, SC.words[1], SC.words[1] + 0.5));
      p.lineK(NUM.lx, NUM.ly, NUM.lx + NUM.lw, NUM.ly, lk, rgba('muted', 0.5), 1);
      p.typed('1 punto = 1 estudiante', lk, NUM.lx, NUM.ly - 12, { size: NUM.lsize, tracking: 0.08, color: rgba('muted') });
      g.restore();
    }

    if (t > 33.4) {
      const lk = prog(t, 33.5, 34.2);
      const rnd = (i: number) => Math.floor(hash(i, 5) * FIELD_N * 0.9);
      const e = cam.e;
      const pr = (i: number): [number, number] | null => {
        const x = FIELD.xs[i], z = FIELD.zs[i];
        const d = -(e[2] * x + e[10] * z + e[14]);
        if (d < 1) return null;
        return [cam.cx + ((e[0] * x + e[8] * z + e[12]) / d) * cam.fx, cam.cy - ((e[1] * x + e[9] * z + e[13]) / d) * cam.fy];
      };
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.strokeStyle = rgba('bone', 0.3);
      g.lineWidth = 1;
      g.beginPath();
      const count = Math.floor(28 * lk);
      for (let k = 0; k < count; k++) {
        const i = rnd(k);
        const j = i + 21 + Math.floor(hash(k, 9) * 34);
        const a = pr(i), b = pr(j);
        if (!a || !b) continue;
        g.moveTo(a[0], a[1]);
        g.lineTo(b[0], b[1]);
      }
      g.stroke();
      g.restore();
    }

    f.info.sheet = 'VL—06';
    f.info.title = '/ ESCALA · PRODUCCIÓN';
    f.info.hud = 1;
    f.info.coords = [r, 0];
  }
}
