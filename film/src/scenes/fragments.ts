import { Scene, type Frame } from '../engine/scene';
import type { Pen } from '../engine/draw';
import { rgba, mixTone } from '../engine/palette';
import { clamp, ease, lerp, mulberry32, prog, spring, tween, noise1 } from '../engine/math';
import { signalHead, signalStroke } from '../engine/signal';
import { FRAG } from '../timeline/cues';
import { VERTICAL, CX, CY } from '../engine/format';
import { keys } from '../engine/math';

export const FOCUS: [number, number] = [736, 560];
export const FOCUS_SCREEN: [number, number] = VERTICAL ? [430, 1000] : [736, 560];

type Kind = 'video' | 'pagos' | 'alumnos' | 'drive' | 'cursos' | 'whatsapp' | 'eval';

interface Node {
  kind: Kind;
  name: string;
  idx: string;
  code: string;
  x: number;
  y: number;
  w: number;
  h: number;
  at: number;
}

export const NODES: Node[] = [
  { kind: 'video', name: 'VIDEO', idx: '01', code: 'MP4 · 1080P', x: 1040, y: 236, w: 340, h: 118, at: FRAG.nodes[0] },
  { kind: 'cursos', name: 'CURSOS', idx: '02', code: 'TREE', x: 648, y: 300, w: 236, h: 196, at: FRAG.nodes[1] },
  { kind: 'whatsapp', name: 'WHATSAPP', idx: '03', code: 'QUEUE', x: 1440, y: 330, w: 262, h: 150, at: FRAG.nodes[2] },
  { kind: 'eval', name: 'EVALUACIONES', idx: '04', code: 'FORM', x: 890, y: 690, w: 262, h: 150, at: FRAG.nodes[3] },
  { kind: 'alumnos', name: 'ALUMNOS', idx: '05', code: 'XLSX', x: 1300, y: 650, w: 292, h: 142, at: FRAG.nodes[4] },
  { kind: 'drive', name: 'DRIVE', idx: '06', code: 'FS', x: 214, y: 286, w: 300, h: 176, at: FRAG.nodes[5] },
  { kind: 'pagos', name: 'PAGOS', idx: '07', code: 'LEDGER', x: 330, y: 700, w: 318, h: 132, at: FRAG.nodes[6] },
];

const N = Object.fromEntries(NODES.map((n) => [n.kind, n])) as Record<Kind, Node>;

type WireKind = 'ok' | 'dead' | 'manual';
interface Wire {
  pts: number[];
  at: number;
  dur: number;
  kind: WireKind;
  alpha: number;
}

function route(ax: number, ay: number, bx: number, by: number, midX?: number, midY?: number): number[] {
  if (midY !== undefined) return [ax, ay, ax, midY, bx, midY, bx, by];
  const mx = midX ?? (ax + bx) / 2;
  return [ax, ay, mx, ay, mx, by, bx, by];
}

export const PRIMARY: Wire[] = [
  { pts: route(514, 360, 648, 372, 584), at: 2.8, dur: 0.35, kind: 'ok', alpha: 0.7 },
  { pts: route(884, 340, 1040, 290, 962), at: 2.95, dur: 0.4, kind: 'ok', alpha: 0.7 },
  { pts: [648, 742, 790, 742, 790, 632, 1244, 632, 1244, 700, 1300, 700], at: 3.05, dur: 0.55, kind: 'manual', alpha: 0.8 },
  { pts: route(364, 462, 1110, 236, undefined, 190), at: 3.3, dur: 0.6, kind: 'dead', alpha: 0.55 },
  { pts: route(1152, 780, 1300, 760, 1226), at: 3.55, dur: 0.3, kind: 'dead', alpha: 0.55 },
  { pts: [1440, 440, 1400, 440, 1400, 612, 1446, 612, 1446, 650], at: 3.6, dur: 0.45, kind: 'manual', alpha: 0.6 },
  { pts: route(766, 496, 520, 700, undefined, 590), at: 3.9, dur: 0.4, kind: 'dead', alpha: 0.5 },
  { pts: route(1021, 690, 1060, 354, undefined, 560), at: 4.05, dur: 0.4, kind: 'dead', alpha: 0.5 },
];

function makeDense(): Wire[] {
  const r = mulberry32(42);
  const out: Wire[] = [];
  const ports = (n: Node) => {
    const s = Math.floor(r() * 4);
    const k = 0.15 + r() * 0.7;
    if (s === 0) return [n.x + n.w * k, n.y];
    if (s === 1) return [n.x + n.w, n.y + n.h * k];
    if (s === 2) return [n.x + n.w * k, n.y + n.h];
    return [n.x, n.y + n.h * k];
  };
  for (let i = 0; i < 30; i++) {
    const a = NODES[Math.floor(r() * NODES.length)];
    let b = NODES[Math.floor(r() * NODES.length)];
    if (b === a) b = NODES[(NODES.indexOf(a) + 3) % NODES.length];
    const [ax, ay] = ports(a);
    const [bx, by] = ports(b);
    const vertical = r() < 0.5;
    const jitter = (r() - 0.5) * 160;
    const pts = vertical ? route(ax, ay, bx, by, undefined, (ay + by) / 2 + jitter) : route(ax, ay, bx, by, (ax + bx) / 2 + jitter);
    const kind: WireKind = r() < 0.3 ? 'dead' : r() < 0.35 ? 'manual' : 'ok';
    out.push({ pts, at: FRAG.dense + r() * 1.25, dur: 0.25 + r() * 0.35, kind, alpha: 0.18 + r() * 0.22 });
  }
  return out;
}

export const DENSE = makeDense();

export const VERSIONS: { text: string; x: number; y: number; at: number }[] = [
  { text: 'clase_03_final_v2.mp4', x: 1040, y: 384, at: 4.95 },
  { text: 'clase_03_final_v3_OK.mp4', x: 1040, y: 400, at: 5.2 },
  { text: 'clase_03_FINAL_final.mp4', x: 1040, y: 416, at: 5.5 },
  { text: 'alumnos_2024.xlsx', x: 1300, y: 900, at: 5.05 },
  { text: 'alumnos_2024 (1).xlsx', x: 1300, y: 916, at: 5.35 },
  { text: 'alumnos_2024_nuevo.xlsx', x: 1300, y: 932, at: 5.7 },
  { text: 'pagos_marzo_revisar.csv', x: 330, y: 862, at: 5.15 },
  { text: 'pagos_marzo_revisar (2).csv', x: 330, y: 878, at: 5.6 },
  { text: 'TP2_entregas_whatsapp.zip', x: 890, y: 870, at: 5.45 },
];

export const GHOSTS: { n: Kind; dx: number; dy: number; at: number }[] = [
  { n: 'drive', dx: 22, dy: 18, at: 5.0 },
  { n: 'drive', dx: 44, dy: 36, at: 5.4 },
  { n: 'pagos', dx: -18, dy: 16, at: 5.25 },
  { n: 'video', dx: 18, dy: -16, at: 5.55 },
  { n: 'eval', dx: 16, dy: 18, at: 5.8 },
];

function bright(f: Frame, x: number) {
  const hx = headX(f.t);
  const passed = clamp((hx - x) / 260 + 0.4);
  return 1 - 0.58 * passed * prog(f.t, FRAG.signalIn, FRAG.signalIn + 0.2);
}

function headX(t: number) {
  const k = ease.outQuart(prog(t, FRAG.signalIn, FRAG.signalStop));
  return lerp(-60, FOCUS[0], k);
}

const ZSTEPS = [3.1, 2.45, 1.95, 1.62, 1.38, 1.18, 1.04];
const CSTEPS: [number, number][] = [
  [1180, 300],
  [1010, 360],
  [1200, 400],
  [1130, 520],
  [1080, 540],
  [880, 520],
  [960, 540],
];

const ZV = [4.0, 3.1, 2.6, 2.2, 1.95, 1.8, 1.7];
const CV: [number, number][] = [
  [1210, 300],
  [1000, 380],
  [1300, 440],
  [1150, 600],
  [1260, 600],
  [700, 520],
  [620, 560],
];

function focusCenter(z: number): [number, number] {
  const [fx, fy] = FOCUS, [sx, sy] = FOCUS_SCREEN;
  return [fx - (sx - CX) / z, fy - (sy - CY) / z];
}

function cameraV(t: number) {
  const tf = Math.min(t, FRAG.freeze);
  let z = ZV[0], cx = CV[0][0], cy = CV[0][1];
  for (let i = 1; i < ZV.length; i++) {
    const k = spring(tf - FRAG.nodes[i] + 0.02, 2.4, 0.78);
    z += (ZV[i] - ZV[i - 1]) * k;
    cx += (CV[i][0] - CV[i - 1][0]) * k;
    cy += (CV[i][1] - CV[i - 1][1]) * k;
  }
  if (tf > 2.9) {
    const zk = keys(tf, [[2.9, z], [4.8, 1.62], [6.3, 1.55], [7.5, 1.62, ease.inOutSine]]);
    const fc = focusCenter(zk);
    const ck = keys(tf, [[2.9, cx], [3.35, 1010], [3.85, 1430], [4.35, 1230], [4.85, 1400], [5.7, 950], [6.3, fc[0]], [7.5, fc[0]]]);
    const cyk = keys(tf, [[2.9, cy], [3.35, 600], [3.85, 740], [4.35, 520], [4.85, 420], [5.7, 540], [6.3, fc[1]], [7.5, fc[1]]]);
    const lock = ease.inOutCubic(prog(tf, 6.2, 6.4));
    const fz = focusCenter(zk);
    z = zk;
    cx = lerp(ck, fz[0], lock);
    cy = lerp(cyk, fz[1], lock);
  }
  const rot = ((-0.55 * Math.PI) / 180) * ease.inOutSine(prog(tf, 0, FRAG.freeze));
  return { z, rot, cx, cy };
}

function camera(t: number) {
  if (VERTICAL) return cameraV(t);
  const tf = Math.min(t, FRAG.freeze);
  let z = ZSTEPS[0], cx = CSTEPS[0][0], cy = CSTEPS[0][1];
  for (let i = 1; i < ZSTEPS.length; i++) {
    const k = spring(tf - FRAG.nodes[i] + 0.02, 2.4, 0.78);
    z += (ZSTEPS[i] - ZSTEPS[i - 1]) * k;
    cx += (CSTEPS[i][0] - CSTEPS[i - 1][0]) * k;
    cy += (CSTEPS[i][1] - CSTEPS[i - 1][1]) * k;
  }
  const push = ease.inOutSine(prog(tf, 3.0, FRAG.freeze)) * 0.03 + ease.inOutCubic(prog(tf, FRAG.dense, FRAG.freeze)) * 0.05;
  const z1 = z * (1 + push);
  const [fx, fy] = FOCUS;
  const pk = prog(tf, 2.9, 3.4);
  const fcx = fx - (fx - 960) / z1, fcy = fy - (fy - 540) / z1;
  cx = lerp(cx, fcx, ease.inOutCubic(pk));
  cy = lerp(cy, fcy, ease.inOutCubic(pk));
  const rot = ((-0.55 * Math.PI) / 180) * ease.inOutSine(prog(tf, 0, FRAG.freeze));
  return { z: z1, rot, cx, cy };
}

function drawWire(p: Pen, w: Wire, t: number, dim: number, freeze: number) {
  const k = ease.outExpo(prog(t, w.at, w.at + w.dur));
  if (k <= 0) return;
  let L = 0;
  for (let i = 2; i < w.pts.length; i += 2) L += Math.hypot(w.pts[i] - w.pts[i - 2], w.pts[i + 1] - w.pts[i - 1]);
  const color = rgba('ash', w.alpha * dim);
  const reach = w.kind === 'dead' ? L * 0.72 : L;
  if (w.kind === 'manual') p.dashed(3, 4);
  const head = p.polyPartial(w.pts, reach * k, color, 1);
  p.solid();
  if (!head) return;
  if (w.kind === 'dead' && k > 0.98) {
    const s = 4 * (1 + 0.5 * spring(freeze - w.at - w.dur, 5, 0.5) - 0.5);
    p.cross(head[0], head[1], s, rgba('bone', 0.75 * dim), 1);
  } else if (w.kind !== 'dead' && k > 0.98) {
    const n = w.pts.length;
    p.dot(w.pts[n - 2], w.pts[n - 1], 2, rgba('bone', 0.8 * dim));
  }
  if (k > 0) p.dot(w.pts[0], w.pts[1], 1.6, rgba('ash', 0.8 * dim));
}

function nodeFrame(p: Pen, n: Node, t: number, dim: number) {
  const k = ease.outExpo(prog(t, n.at, n.at + 0.32));
  if (k <= 0) return 0;
  const bone = rgba('bone', 0.82 * dim);
  p.rectDraw(n.x, n.y, n.w, n.h, k, bone, 1);
  const tk = prog(t, n.at + 0.04, n.at + 0.24);
  p.typed(n.idx, tk * 3, n.x, n.y - 10, { size: 10, color: rgba('muted', dim) });
  p.typed(n.name, tk, n.x + 24, n.y - 10, { size: 11, weight: 500, tracking: 0.08, color: bone });
  p.typed(n.code, tk, n.x + n.w, n.y - 10, { size: 9.5, tracking: 0.08, color: rgba('muted', 0.8 * dim), align: 'right' });
  const c = 5;
  const cc = rgba('bone', 0.6 * dim * k);
  for (const [cx, cy] of [[n.x, n.y + n.h + 14], [n.x + n.w, n.y + n.h + 14]]) {
    p.line(cx - c, cy, cx + c, cy, cc, 1);
    p.line(cx, cy - c, cx, cy + c, cc, 1);
  }
  p.typed(`${n.x.toFixed(0)}.${n.y.toFixed(0)}`, tk, n.x + 10, n.y + n.h + 17, { size: 8.5, color: rgba('muted', 0.55 * dim) });
  return prog(t, n.at + 0.12, n.at + 0.5);
}

function content(p: Pen, n: Node, t: number, k: number, dim: number) {
  if (k <= 0) return;
  const a = dim * ease.outCubic(k);
  const bone = rgba('bone', 0.78 * a);
  const muted = rgba('muted', 0.9 * a);
  const faint = rgba('muted', 0.4 * a);
  const x = n.x, y = n.y, w = n.w, h = n.h;
  const lines = ease.outExpo(k);
  switch (n.kind) {
    case 'video': {
      p.text('clase_03_final.mp4', x + 14, y + 24, { size: 10, color: bone });
      p.text('18:30', x + w - 14, y + 24, { size: 10, color: muted, align: 'right' });
      const ty = y + 70, x0 = x + 14, x1 = x + w - 14;
      p.lineK(x0, ty, x1, ty, lines, rgba('bone', 0.6 * a), 1);
      for (let i = 0; i <= 60; i++) {
        const tx = lerp(x0, x1, i / 60);
        if (i / 60 > lines) break;
        p.line(tx, ty - (i % 10 === 0 ? 7 : 3), tx, ty, i % 10 === 0 ? muted : faint, 1);
      }
      const ph = lerp(x0, x1, 0.37 + 0.02 * Math.sin(t * 0.7));
      p.line(ph, ty - 14, ph, ty + 8, bone, 1);
      p.text('00:00', x0, ty + 26, { size: 9, color: muted });
      p.text('06:51', ph, ty + 26, { size: 9, color: bone, align: 'center' });
      p.ring(x + w, y + h / 2, 3.5, rgba('bone', 0.8 * a), 1);
      p.text('PROGRESO', x + w + 10, y + h / 2 + 3, { size: 9, color: muted, tracking: 0.08 });
      break;
    }
    case 'pagos': {
      const cols = [x + 14, x + 108, x + 212];
      p.text('TX', cols[0], y + 24, { size: 9, color: muted, tracking: 0.08 });
      p.text('MONTO', cols[1], y + 24, { size: 9, color: muted, tracking: 0.08 });
      p.text('ESTADO', cols[2], y + 24, { size: 9, color: muted, tracking: 0.08 });
      p.lineK(x + 14, y + 32, x + w - 14, y + 32, lines, rgba('muted', 0.6 * a));
      const rows = [
        ['48213', 'ARS 45.000', 'OK'],
        ['48214', 'USD 60', 'PENDIENTE'],
        ['48215', 'ARS 45.000', 'OK'],
        ['48216', 'MXN 900', '¿ALUMNO?'],
      ];
      rows.forEach((r, i) => {
        const kk = prog(k, 0.1 + i * 0.15, 0.5 + i * 0.15);
        const yy = y + 52 + i * 20;
        p.typed(r[0], kk, cols[0], yy, { size: 10, color: bone });
        p.typed(r[1], kk, cols[1], yy, { size: 10, color: bone });
        p.typed(r[2], kk, cols[2], yy, { size: 10, color: i === 3 ? rgba('bone', a) : muted });
      });
      break;
    }
    case 'alumnos':
      record(p, x, y, w, 'm.garcia@gmail.com', '0192', k, a);
      break;
    case 'drive': {
      const items: [number, string][] = [
        [0, '/cursos/2024'],
        [1, 'matematica_II/'],
        [2, 'clase_03_final.mp4'],
        [2, 'clase_03_notas.docx'],
        [2, 'TP2_consigna_v4.pdf'],
        [1, 'inscriptos_marzo.xlsx'],
        [1, 'comprobantes/'],
      ];
      items.forEach(([d, s], i) => {
        const kk = prog(k, i * 0.1, 0.35 + i * 0.1);
        if (kk <= 0) return;
        const yy = y + 26 + i * 20;
        const xx = x + 16 + d * 18;
        if (d > 0) {
          p.line(xx - 12, yy - 16, xx - 12, yy - 4, faint, 1);
          p.line(xx - 12, yy - 4, xx - 4, yy - 4, faint, 1);
        }
        p.typed(s, kk, xx, yy, { size: 10, color: d === 0 ? muted : bone });
      });
      break;
    }
    case 'cursos': {
      const mx = x + 22;
      const mods = ['M01', 'M02', 'M03', 'M04'];
      mods.forEach((m, i) => {
        const kk = prog(k, i * 0.12, 0.4 + i * 0.12);
        if (kk <= 0) return;
        const yy = y + 34 + i * 42;
        p.typed(m, kk, mx, yy, { size: 10, color: bone });
        const lc = [3, 4, 2, 3][i];
        for (let j = 0; j < lc; j++) {
          const lx = x + 90 + j * 34;
          const kj = prog(kk, j * 0.15, 0.6 + j * 0.15);
          if (kj <= 0) continue;
          p.line(mx + 30, yy - 4, lx, yy - 4 + (j - (lc - 1) / 2) * 5 * ease.outExpo(kj), faint, 1);
          p.rect(lx, yy - 8 + (j - (lc - 1) / 2) * 5, 14 * ease.outExpo(kj), 8, rgba('bone', 0.6 * a), 1);
        }
        p.text(`${lc} lecciones`, mx, yy + 14, { size: 8.5, color: faint });
      });
      break;
    }
    case 'whatsapp': {
      const msgs = [
        ['21:43', 'no puedo entrar al curso'],
        ['21:44', '¿me pasan el link?'],
        ['22:10', 'ya pagué, ¿y ahora?'],
        ['22:31', '¿la clase 3 dónde está?'],
      ];
      msgs.forEach((m, i) => {
        const kk = prog(k, i * 0.12, 0.4 + i * 0.12);
        if (kk <= 0) return;
        if (i === 2 && t > FRAG.notes[2]) return;
        const yy = y + 28 + i * 30;
        p.line(x + 14, yy - 11, x + 14, yy + 3, rgba('bone', 0.7 * a), 1);
        p.text(m[0], x + 24, yy, { size: 9, color: muted });
        p.typed(m[1], kk, x + 68, yy, { size: 10, color: bone });
      });
      break;
    }
    case 'eval': {
      const rows = 4, opts = ['A', 'B', 'C', 'D'];
      for (let i = 0; i < rows; i++) {
        const kk = prog(k, i * 0.1, 0.45 + i * 0.1);
        if (kk <= 0) continue;
        const yy = y + 30 + i * 28;
        p.text(`P${i + 1}`, x + 14, yy + 4, { size: 10, color: muted });
        opts.forEach((o, j) => {
          const cx = x + 64 + j * 44;
          const on = [1, 3, 0, 2][i] === j;
          p.ring(cx, yy, 7 * ease.outExpo(clamp(kk * 1.4 - j * 0.1)), rgba('bone', 0.55 * a), 1);
          if (on && kk > 0.8) p.dot(cx, yy, 3.2, rgba('bone', 0.85 * a));
          p.text(o, cx + 11, yy + 3.5, { size: 8.5, color: faint });
        });
      }
      p.text('corrección: manual', x + w - 14, y + h - 10, { size: 8.5, color: muted, align: 'right' });
      break;
    }
  }
}

function record(p: Pen, x: number, y: number, w: number, email: string, id: string, k: number, a: number) {
  const bone = rgba('bone', 0.78 * a);
  const muted = rgba('muted', 0.9 * a);
  const rows: [string, string][] = [
    ['ID', id],
    ['NOMBRE', 'María García'],
    ['EMAIL', email],
    ['CURSO', 'Matemática II'],
    ['ESTADO', 'activo'],
  ];
  rows.forEach(([kk, v], i) => {
    const q = prog(k, i * 0.1, 0.4 + i * 0.1);
    if (q <= 0) return;
    const yy = y + 26 + i * 23;
    p.text(kk, x + 14, yy, { size: 9, color: muted, tracking: 0.08 });
    p.typed(v, q, x + 92, yy, { size: 10, color: bone });
    p.lineK(x + 92, yy + 7, x + w - 14, yy + 7, q, rgba('muted', 0.2 * a));
  });
}

export default class Fragments extends Scene {
  samples(t: number) {
    return t > FRAG.signalIn - 0.1 && t < FRAG.signalStop + 0.3 ? 16 : 8;
  }

  render(f: Frame) {
    const { g, pen: p } = f;
    const t = f.t;
    const tf = Math.min(t, FRAG.freeze);
    const cam = camera(t);
    const [fx, fy] = FOCUS;
    const cs = Math.cos(cam.rot) * cam.z, sn = Math.sin(cam.rot) * cam.z;
    const A = cs, B = sn, C = -sn, D = cs;
    g.setTransform(A, B, C, D, CX - (A * cam.cx + C * cam.cy), CY - (B * cam.cx + D * cam.cy));
    p.u = 1 / cam.z;

    const gridK = ease.outCubic(prog(t, 0.1, 1.6));
    if (gridK > 0) {
      g.fillStyle = rgba('iron', 0.55 * gridK);
      const s = 40;
      for (let gx = -40; gx <= 2000; gx += s)
        for (let gy = -40; gy <= 1120; gy += s) {
          const d = Math.hypot(gx - fx, gy - fy);
          if (d / 1300 > gridK) continue;
          g.fillRect(gx - 0.6, gy - 0.6, 1.2, 1.2);
        }
    }

    for (const n of NODES) {
      const dim = bright(f, n.x + n.w / 2);
      const ck = nodeFrame(p, n, tf, dim);
      content(p, n, tf, ck, dim);
    }

    for (const gh of GHOSTS) {
      const n = N[gh.n];
      const k = ease.outExpo(prog(tf, gh.at, gh.at + 0.4));
      if (k <= 0) continue;
      const dim = bright(f, n.x);
      p.rect(n.x + gh.dx * k, n.y + gh.dy * k, n.w, n.h, rgba('muted', 0.28 * dim), 1);
    }

    for (const w of PRIMARY) drawWire(p, w, tf, bright(f, w.pts[0]), tf);
    for (const w of DENSE) drawWire(p, w, tf, bright(f, w.pts[0]), tf);

    for (const v of VERSIONS) {
      const k = prog(tf, v.at, v.at + 0.25);
      if (k <= 0) continue;
      p.typed(v.text, k, v.x, v.y, { size: 9.5, color: rgba('muted', 0.85 * bright(f, v.x)) });
    }

    this.notes(f, tf);
    this.signal(f, t);

    f.info.sheet = 'VL—01';
    f.info.title = '/ ESTADO ACTUAL';
    f.info.hud = ease.outCubic(prog(t, FRAG.marks, FRAG.marks + 0.4));
    if (t > FRAG.signalIn) f.info.coords = [headX(t) - fx, 0];
  }

  notes(f: Frame, t: number) {
    const p = f.pen;
    const [n1, n2, n3, n4] = FRAG.notes;
    const note = (label: string, idx: string, x: number, y: number, lx: number, ly: number, at: number) => {
      const k = ease.outExpo(prog(t, at, at + 0.3));
      if (k <= 0) return;
      const dim = bright(f, x);
      const c = rgba('bone', 0.9 * dim);
      p.lineK(x, y, lx, ly, k, rgba('bone', 0.55 * dim), 1);
      p.dot(x, y, 2.2, c);
      const tk = prog(t, at + 0.1, at + 0.35);
      p.fillRect(lx - 2, ly - 9, 16, 12, rgba('bone', 0.9 * dim * tk));
      p.typed(idx, tk * 2, lx + 1.5, ly + 0.5, { size: 8.5, weight: 700, color: rgba('vanta', 1) });
      p.typed(label, tk, lx + 20, ly + 0.5, { size: 10, weight: 500, tracking: 0.1, color: c });
    };

    note('ACCESO MANUAL', 'A1', 1010, 632, 972, 604, n1);
    if (t > 3.1) {
      const dim = bright(f, 1010);
      const k = ease.outExpo(prog(t, 3.35, 3.7));
      p.fillRect(990, 626, 44, 12, rgba('vanta', 1));
      p.line(990, 624, 990, 640, rgba('bone', 0.7 * dim * k), 1);
      p.line(1034, 624, 1034, 640, rgba('bone', 0.7 * dim * k), 1);
      p.dashed(2, 3);
      p.arc(1012, 632, 22, Math.PI, Math.PI * (1 + k), rgba('bone', 0.7 * dim), 1);
      p.solid();
    }

    const al = N.alumnos;
    const dk = spring(t - n2, 3.4, 0.7);
    if (t > n2) {
      const dim = bright(f, al.x);
      const ox = 96 * dk, oy = 84 * dk;
      const bx = al.x + ox, by = al.y + oy;
      p.fillRect(bx, by, al.w, al.h, rgba('vanta', 1));
      p.rect(bx, by, al.w, al.h, rgba('bone', 0.82 * dim), 1);
      record(p, bx, by, al.w, 'mgarcia@hotmail.com', '1147', clamp((t - n2) * 3), dim);
      p.text('05′', bx + al.w + 8, by + 14, { size: 10, color: rgba('muted', dim) });
      const ek = prog(t, n2 + 0.2, n2 + 0.4);
      p.text('≠', al.x + al.w + 14, al.y + 26 + 2 * 23 + 44 * dk, { size: 16, weight: 500, color: rgba('bone', dim * ek), fam: 'mono' });
    }
    note('DATO DUPLICADO', 'A2', al.x + al.w + 40, al.y + al.h + 84, 1560, 952, n2 + 0.15);

    const wa = N.whatsapp;
    if (t > n3) {
      const dim = bright(f, wa.x);
      const d = t - n3;
      const dx = -70 * ease.outCubic(clamp(d / 1.6)) - 14 * d, dy = 120 * ease.outCubic(clamp(d / 1.6)) + 22 * d;
      const rot = 0.05 * ease.outCubic(clamp(d / 2)) + 0.012 * noise1(d * 0.8, 3);
      const mx = wa.x + 14 + dx, my = wa.y + 88 + dy;
      const g = f.g;
      g.save();
      g.translate(mx, my);
      g.rotate(rot);
      p.line(0, -11, 0, 3, rgba('bone', 0.8 * dim), 1);
      p.text('22:10', 10, 0, { size: 9, color: rgba('muted', dim) });
      p.text('ya pagué, ¿y ahora?', 54, 0, { size: 10, color: rgba('bone', 0.85 * dim) });
      g.restore();
      p.dashed(2, 4);
      p.line(wa.x + 14, wa.y + 88, mx, my - 6, rgba('muted', 0.5 * dim), 1);
      p.solid();
      p.rect(wa.x + 10, wa.y + 74, 200, 20, rgba('muted', 0.35 * dim), 1);
    }
    note('SIN CONTEXTO', 'A3', 1392, 540, 1190, 552, n3 + 0.35);

    const vd = N.video;
    if (t > n4 - 0.1) {
      const dim = bright(f, vd.x + vd.w);
      const k = ease.outExpo(prog(t, n4 - 0.1, n4 + 0.3));
      p.dashed(3, 4);
      p.lineK(vd.x + vd.w + 4, vd.y + vd.h / 2, vd.x + vd.w + 150, vd.y + vd.h / 2, k, rgba('bone', 0.6 * dim), 1);
      p.solid();
      if (k > 0.95) p.text('?', vd.x + vd.w + 158, vd.y + vd.h / 2 + 4, { size: 13, color: rgba('bone', 0.9 * dim), weight: 500 });
    }
    note('FUERA DEL FLUJO', 'A4', vd.x + vd.w + 120, vd.y + vd.h / 2, 1470, 196, n4 + 0.1);
  }

  signal(f: Frame, t: number) {
    if (t < FRAG.signalIn) return;
    const g = f.g;
    const [fx, fy] = FOCUS;
    const hx = headX(t);
    const m = g.getTransform();
    const sp = (x: number, y: number): [number, number] => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f];
    const a = sp(-400, fy), b = sp(hx, fy);
    signalStroke(f, [a[0], a[1], b[0], b[1]], 1, 1.2, 0.3);
    const pulse = Math.exp(-Math.max(0, t - 7.62) / 0.12) * (t > 7.62 ? 1 : 0);
    const arrive = spring(t - FRAG.signalStop + 0.05, 4, 0.5);
    signalHead(f, b[0], b[1], 1 + 0.7 * pulse, 1 + 0.25 * pulse + 0.1 * (1 - arrive) * (t < FRAG.signalStop ? 1 : 0));
    const lk = prog(t, FRAG.signalStop - 0.1, FRAG.signalStop + 0.2);
    if (lk > 0) {
      const p = f.pen;
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      p.u = 1;
      p.typed('0.000', lk, b[0] + 14, b[1] - 14, { size: 10, color: mixTone('muted', 'bone', 0.4, 0.9) });
      g.restore();
    }
  }
}
