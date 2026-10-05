export const HEX = {
  vanta: '#050505',
  panel: '#101010',
  graphite: '#2B2A27',
  iron: '#45433E',
  muted: '#7C7A74',
  ash: '#B3B0A8',
  bone: '#EEECE5',
  signal: '#F28A2E',
  core: '#FFF0DA',
  ember: '#B8481A',
} as const;

export type Tone = keyof typeof HEX;

const RGB: Record<Tone, [number, number, number]> = Object.fromEntries(
  Object.entries(HEX).map(([k, v]) => [k, [parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16)]]),
) as Record<Tone, [number, number, number]>;

export function rgb(tone: Tone): [number, number, number] {
  return RGB[tone];
}

export function rgba(tone: Tone, a = 1): string {
  const c = RGB[tone];
  return `rgba(${c[0]},${c[1]},${c[2]},${a < 0 ? 0 : a > 1 ? 1 : +a.toFixed(4)})`;
}

export function mixTone(a: Tone, b: Tone, k: number, alpha = 1): string {
  const x = RGB[a], y = RGB[b];
  const q = k < 0 ? 0 : k > 1 ? 1 : k;
  return `rgba(${Math.round(x[0] + (y[0] - x[0]) * q)},${Math.round(x[1] + (y[1] - x[1]) * q)},${Math.round(x[2] + (y[2] - x[2]) * q)},${alpha < 0 ? 0 : alpha > 1 ? 1 : +alpha.toFixed(4)})`;
}
