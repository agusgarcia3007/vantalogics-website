import { clamp, ease, lerp, mulberry32, prog, smooth } from '../engine/math';
import type { V3 } from '../engine/space';

export const SYS = {
  cut: 8,
  nodesIn: 8.45,
  snaps: [9, 9.5, 10, 10.5, 11],
  pitch: [11, 12.4] as const,
  gates: 11.55,
  travel: [12.0, 13.4] as const,
  marca: 13.5,
  alumnos: 15,
  datos: 16.5,
  select: 17.4,
  punch: 17.62,
  end: 18,
};

export const PILLARS = [
  { name: 'CONTENIDO', sub: 'video · páginas · archivos', s: 150, side: -1 },
  { name: 'IDENTIDAD', sub: 'un alumno · un registro', s: 350, side: 1 },
  { name: 'PAGOS', sub: 'pago → acceso', s: 550, side: -1 },
  { name: 'PROGRESO', sub: 'por lección · por video', s: 750, side: 1 },
  { name: 'EVALUACIÓN', sub: 'entregas · rúbricas', s: 950, side: -1 },
];

export const BOX_W = 168;
export const BOX_H = 62;
export const TAP = 96;

export const COURSE_LEN = 1500;
export const GATES = Array.from({ length: 8 }, (_, k) => 70 + k * 170);

export function bendAt(t: number) {
  return ease.inOutCubic(prog(t, SYS.pitch[0] + 0.15, SYS.pitch[1] + 0.2));
}

export function pathZ(s: number, bend: number) {
  const w = smooth(0, 380, s);
  return bend * w * (150 * Math.sin((s - 120) / 340) + 60 * Math.sin(s / 157));
}

export function pathPoint(s: number, bend: number): V3 {
  return [s, 0, pathZ(s, bend)];
}

export function pathTangent(s: number, bend: number): [number, number] {
  const a = pathZ(s - 2, bend), b = pathZ(s + 2, bend);
  const dx = 4, dz = b - a;
  const l = Math.hypot(dx, dz);
  return [dx / l, dz / l];
}

export function headS(t: number) {
  if (t < SYS.travel[0]) return 0;
  const a = ease.inOutCubic(prog(t, SYS.travel[0], SYS.travel[1])) * 0.62 * COURSE_LEN;
  const b = ease.inOutSine(prog(t, SYS.travel[1], SYS.select)) * 1500;
  return a + b;
}

export interface FragNode {
  name: string;
  x: number;
  z: number;
  rot: number;
  w: number;
  h: number;
  pillar: number;
}

export const FRAGS: FragNode[] = [
  { name: 'VIDEO', x: 261, z: -146, rot: 0.12, w: 150, h: 48, pillar: 0 },
  { name: 'CURSOS', x: 16, z: -140, rot: -0.2, w: 104, h: 76, pillar: 0 },
  { name: 'WHATSAPP', x: 459, z: -85, rot: 0.16, w: 132, h: 60, pillar: 1 },
  { name: 'EVALUACIONES', x: 157, z: 150, rot: -0.1, w: 128, h: 66, pillar: 4 },
  { name: 'ALUMNOS', x: 390, z: 89, rot: 0.22, w: 132, h: 62, pillar: 1 },
  { name: 'DRIVE', x: -205, z: -102, rot: -0.14, w: 128, h: 74, pillar: 0 },
  { name: 'PAGOS', x: -136, z: 135, rot: 0.09, w: 136, h: 58, pillar: 2 },
  { name: 'PROGRESO ?', x: 437, z: -196, rot: -0.24, w: 96, h: 40, pillar: 3 },
];

export function pillarFlat(i: number): { x: number; z: number } {
  const p = PILLARS[i];
  return { x: p.s, z: p.side * (TAP + BOX_H / 2) };
}

export const STUDENTS = (() => {
  const r = mulberry32(2024);
  const n = 720;
  const out: { s0: number; lane: number; v: number; row: number; col: number; prog: number; pay: number; ev: number }[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      s0: 2050 + r() * 1700,
      lane: (r() - 0.5) * 2,
      v: 140 + r() * 90,
      row: Math.floor(i / 24),
      col: i % 24,
      prog: 0.1 + 0.9 * Math.pow(r(), 0.7),
      pay: r(),
      ev: r(),
    });
  }
  return out;
})();

export const SELECTED = 9 * 24 + 13;

export function studentFloor(i: number, t: number): V3 {
  const st = STUDENTS[i];
  const tt = Math.min(t, SYS.datos);
  const s = st.s0 + st.v * (tt - SYS.alumnos + 1.4);
  const z = pathZ(s, 1) + st.lane * 150;
  return [s, 0, z];
}

export const DATA_Y = -320;
export const DATA_X0 = 2380;
export const DATA_Z0 = -60;
export const CELL_X = 42;
export const CELL_Z = 30;

export function studentCell(i: number): V3 {
  const st = STUDENTS[i];
  return [DATA_X0 + st.col * CELL_X, DATA_Y, DATA_Z0 + st.row * CELL_Z];
}

export function dropK(i: number, t: number) {
  const d = SYS.datos + 0.02 + (i % 97) * 0.004 + Math.floor(i / 97) * 0.015;
  return prog(t, d, d + 0.6);
}

export const clamp01 = clamp;
export const mix = lerp;
