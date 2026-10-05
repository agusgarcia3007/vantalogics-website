export type Segment = [number, number, number, number];

export const REEL: Segment[] = [
  [0.0, 1.3, 5.4, 6.25],
  [1.3, 2.55, 6.25, 7.5],
  [2.55, 2.9, 7.5, 7.85],
  [2.9, 9.8, 8.0, 18.0],
  [9.8, 12.3, 18.0, 21.0],
  [12.3, 16.54, 21.0, 26.72],
  [16.54, 19.2, 26.72, 30.0],
  [19.2, 21.9, 30.0, 33.6],
  [21.9, 22.7, 33.6, 36.0],
  [22.7, 24.1, 36.0, 37.5],
  [24.1, 26.1, 37.5, 39.9],
  [26.1, 28.0, 39.9, 42.2],
  [28.0, 29.4, 42.2, 43.6],
];

export const REEL_DURATION = REEL[REEL.length - 1][1];

export const HOOK = { line1: 0, line2: 0.45, out: 2.9 };

export function reelMap(tau: number) {
  for (const [a, b, c, d] of REEL) if (tau < b) return c + ((Math.max(tau, a) - a) * (d - c)) / (b - a);
  const [a, b, c, d] = REEL[REEL.length - 1];
  return c + ((tau - a) * (d - c)) / (b - a);
}

export function reelSegmentOf(t: number): Segment | null {
  for (const s of REEL) if (t >= s[2] && t < s[3]) return s;
  return null;
}

export function reelInverse(t: number): number | null {
  const s = reelSegmentOf(t);
  if (!s) return null;
  const [a, b, c, d] = s;
  return a + ((t - c) * (b - a)) / (d - c);
}
