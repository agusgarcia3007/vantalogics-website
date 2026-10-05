export const TAU = Math.PI * 2;

export const clamp = (x: number, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const invLerp = (a: number, b: number, x: number) => (b === a ? 0 : (x - a) / (b - a));
export const prog = (t: number, a: number, b: number) => clamp(invLerp(a, b, t));
export const fract = (x: number) => x - Math.floor(x);
export const smooth = (a: number, b: number, x: number) => {
  const k = clamp(invLerp(a, b, x));
  return k * k * (3 - 2 * k);
};

export type Ease = (x: number) => number;

export const ease = {
  linear: ((x) => x) as Ease,
  inQuad: ((x) => x * x) as Ease,
  outQuad: ((x) => 1 - (1 - x) * (1 - x)) as Ease,
  inCubic: ((x) => x * x * x) as Ease,
  outCubic: ((x) => 1 - Math.pow(1 - x, 3)) as Ease,
  inOutCubic: ((x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)) as Ease,
  inQuart: ((x) => x * x * x * x) as Ease,
  outQuart: ((x) => 1 - Math.pow(1 - x, 4)) as Ease,
  inOutQuart: ((x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)) as Ease,
  inExpo: ((x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10))) as Ease,
  outExpo: ((x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x))) as Ease,
  inOutExpo: ((x) =>
    x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2) as Ease,
  outBack: ((x) => {
    const c1 = 1.4, c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }) as Ease,
  inOutSine: ((x) => -(Math.cos(Math.PI * x) - 1) / 2) as Ease,
  outSine: ((x) => Math.sin((x * Math.PI) / 2)) as Ease,
};

export function tween(t: number, a: number, b: number, e: Ease = ease.outExpo) {
  return e(prog(t, a, b));
}

export function spring(t: number, freq = 6, damping = 0.55) {
  if (t <= 0) return 0;
  const w = TAU * freq;
  const z = damping;
  if (z >= 1) return 1 - (1 + w * t) * Math.exp(-w * t);
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t));
}

export function springAt(t: number, start: number, freq = 6, damping = 0.55) {
  return spring(t - start, freq, damping);
}

export type Key = [number, number] | [number, number, Ease];

export function keys(t: number, k: Key[]): number {
  if (t <= k[0][0]) return k[0][1];
  for (let i = 1; i < k.length; i++) {
    const [t1, v1, e] = k[i] as [number, number, Ease | undefined];
    const [t0, v0] = k[i - 1];
    if (t < t1) return lerp(v0, v1, (e ?? ease.inOutCubic)(invLerp(t0, t1, t)));
  }
  return k[k.length - 1][1];
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hash(n: number, seed = 0) {
  let h = Math.imul((n | 0) ^ Math.imul(seed + 0x9e3779b9, 0x85ebca6b), 0xc2b2ae35);
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function noise1(x: number, seed = 0) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return lerp(hash(i, seed), hash(i + 1, seed), u) * 2 - 1;
}

export function fbm1(x: number, seed = 0, oct = 3) {
  let s = 0, a = 0.5, fr = 1;
  for (let i = 0; i < oct; i++) {
    s += a * noise1(x * fr, seed + i * 17);
    fr *= 2;
    a *= 0.5;
  }
  return s;
}

export const FPS = 60;
export const frameIdx = (t: number) => Math.round(t * FPS);

export function beatPulse(t: number, at: number, decay = 0.18) {
  const d = t - at;
  return d < 0 ? 0 : Math.exp(-d / decay);
}

export function polyLength(pts: ArrayLike<number>) {
  let L = 0;
  for (let i = 2; i < pts.length; i += 2) L += Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]);
  return L;
}

export function pointAt(pts: ArrayLike<number>, d: number): [number, number, number] {
  let acc = 0;
  for (let i = 2; i < pts.length; i += 2) {
    const dx = pts[i] - pts[i - 2], dy = pts[i + 1] - pts[i - 1];
    const l = Math.hypot(dx, dy);
    if (acc + l >= d && l > 0) {
      const k = (d - acc) / l;
      return [pts[i - 2] + dx * k, pts[i - 1] + dy * k, Math.atan2(dy, dx)];
    }
    acc += l;
  }
  const n = pts.length;
  return [pts[n - 2], pts[n - 1], n >= 4 ? Math.atan2(pts[n - 1] - pts[n - 3], pts[n - 2] - pts[n - 4]) : 0];
}
