const q = typeof location !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams(typeof process !== 'undefined' ? (process.env.FILM_QUERY ?? '') : '');

export const VERTICAL = q.get('fmt') === 'v';
export const CUT: 'film' | 'reel' = q.get('cut') === 'reel' ? 'reel' : 'film';
export const W = VERTICAL ? 1080 : 1920;
export const H = VERTICAL ? 1920 : 1080;
export const CX = W / 2;
export const CY = H / 2;
export const LW = VERTICAL ? 1.6 : 1;
export const GRAIN = VERTICAL ? 0.62 : 1;

export function pick<T>(horizontal: T, vertical: T): T {
  return VERTICAL ? vertical : horizontal;
}

export const SAFE = VERTICAL ? { top: 260, bottom: 1500, left: 72, right: 960 } : { top: 96, bottom: 984, left: 96, right: 1824 };
