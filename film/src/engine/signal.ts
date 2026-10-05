import type { Frame } from './scene';
import { rgba } from './palette';
import { clamp } from './math';
import { LW } from './format';

export function signalHead(f: Frame, x: number, y: number, k = 1, size = 1) {
  if (k <= 0) return;
  const g = f.g;
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.fillStyle = rgba('signal', 0.28 * k);
  g.beginPath();
  g.arc(x, y, 4.6 * size * Math.sqrt(LW), 0, Math.PI * 2);
  g.fill();
  g.fillStyle = rgba('core', clamp(k));
  g.beginPath();
  g.arc(x, y, 2.3 * size * Math.sqrt(LW), 0, Math.PI * 2);
  g.fill();
  g.restore();
  emit(f, x, y, 30 * size, k);
}

export function emit(f: Frame, x: number, y: number, r: number, k = 1) {
  if (k <= 0) return;
  const h = f.glow;
  const grd = h.createRadialGradient(x, y, 0, x, y, r);
  grd.addColorStop(0, `rgba(255,214,160,${clamp(0.95 * k)})`);
  grd.addColorStop(0.12, `rgba(242,138,46,${clamp(0.7 * k)})`);
  grd.addColorStop(0.45, `rgba(184,72,26,${clamp(0.16 * k)})`);
  grd.addColorStop(1, 'rgba(184,72,26,0)');
  h.fillStyle = grd;
  h.fillRect(x - r, y - r, r * 2, r * 2);
}

export function signalStroke(f: Frame, pts: ArrayLike<number>, k = 1, w = 1.25, glowK = 0.35) {
  if (pts.length < 4 || k <= 0) return;
  const g = f.g;
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.strokeStyle = rgba('signal', k);
  g.lineWidth = w * Math.sqrt(LW);
  g.lineJoin = 'round';
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
  g.stroke();
  g.restore();
  if (glowK > 0) {
    const h = f.glow;
    h.strokeStyle = `rgba(242,138,46,${clamp(glowK * k)})`;
    h.lineWidth = 3 * w;
    h.lineJoin = 'round';
    h.lineCap = 'round';
    h.beginPath();
    h.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) h.lineTo(pts[i], pts[i + 1]);
    h.stroke();
  }
}
