import type { FrameInfo } from './scene';
import { rgba } from './palette';
import { font } from './type';
import { clamp } from './math';
import { LW } from './format';

export function drawHud(g: CanvasRenderingContext2D, t: number, info: FrameInfo, W: number, H: number, FPS = 60) {
  const vs = LW > 1 ? 1.45 : 1;
  const a = clamp(info.hud ?? 1);
  const m = clamp(info.marks ?? a);
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  if (m > 0) {
    g.strokeStyle = rgba('muted', 0.55 * m);
    g.lineWidth = 1;
    const i = 40, L = 16;
    g.beginPath();
    g.moveTo(i, i + L); g.lineTo(i, i); g.lineTo(i + L, i);
    g.moveTo(W - i - L, i); g.lineTo(W - i, i); g.lineTo(W - i, i + L);
    g.moveTo(i, H - i - L); g.lineTo(i, H - i); g.lineTo(i + L, H - i);
    g.moveTo(W - i - L, H - i); g.lineTo(W - i, H - i); g.lineTo(W - i, H - i - L);
    g.stroke();
  }
  if (a > 0) {
    g.font = font('mono', 10.5 * vs, 400);
    g.letterSpacing = '0.7px';
    g.textBaseline = 'alphabetic';
    const y0 = 66 * vs;
    if (info.sheet) {
      g.textAlign = 'left';
      g.fillStyle = rgba('bone', 0.62 * a);
      g.fillText(info.sheet, 64, y0);
      if (info.title) {
        const w = g.measureText(info.sheet + '  ').width;
        g.fillStyle = rgba('muted', 0.75 * a);
        g.fillText(info.title, 64 + w, y0);
      }
    }
    const fr = Math.round(t * FPS);
    const s = Math.floor(fr / FPS);
    const ff = fr % FPS;
    const tc = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
    g.textAlign = 'right';
    g.fillStyle = rgba('muted', 0.7 * a);
    g.fillText(tc, W - 64, H - 58 * vs);
    if (info.coords) {
      g.textAlign = 'left';
      const [x, y] = info.coords;
      const fx = (v: number) => (v < 0 ? '−' : '+') + Math.abs(v).toFixed(1).padStart(6, '0');
      g.fillStyle = rgba('signal', 0.85 * a);
      g.fillText('●', 64, H - 58 * vs);
      g.fillStyle = rgba('muted', 0.8 * a);
      g.fillText(`SEÑAL   X ${fx(x)}   Y ${fx(y)}`, 64 + 18 * vs, H - 58 * vs);
    }
    g.letterSpacing = '0px';
  }
  g.restore();
}
