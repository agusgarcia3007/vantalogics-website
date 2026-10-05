import { TAU, mulberry32 } from '../engine/math';

export const FIELD_N = 24000;
export const FIELD_R = 1000;
const GOLDEN = TAU * (1 - 1 / ((1 + Math.sqrt(5)) / 2));

export const FIELD = (() => {
  const xs = new Float32Array(FIELD_N);
  const zs = new Float32Array(FIELD_N);
  const rs = new Float32Array(FIELD_N);
  const th = new Float32Array(FIELD_N);
  const jit = new Float32Array(FIELD_N);
  const r = mulberry32(24000);
  const c = FIELD_R / Math.sqrt(FIELD_N);
  for (let i = 0; i < FIELD_N; i++) {
    const rad = c * Math.sqrt(i + 0.5);
    const a = i * GOLDEN;
    rs[i] = rad;
    th[i] = a;
    xs[i] = Math.cos(a) * rad;
    zs[i] = Math.sin(a) * rad;
    jit[i] = r();
  }
  return { xs, zs, rs, th, jit };
})();

export function radiusFor(n: number) {
  return (FIELD_R / Math.sqrt(FIELD_N)) * Math.sqrt(Math.max(0, n));
}

export function fmtThousands(n: number) {
  const s = Math.floor(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
