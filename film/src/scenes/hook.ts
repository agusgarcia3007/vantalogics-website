import { Scene, type Frame } from '../engine/scene';
import { rgba } from '../engine/palette';
import { font } from '../engine/type';
import { clamp, ease, prog, spring } from '../engine/math';
import { HOOK } from '../timeline/reel';
import { W, VERTICAL } from '../engine/format';

const L1 = '7 herramientas.';
const L2 = 'Ningún sistema.';

export default class Hook extends Scene {
  samples(tau: number) {
    return tau < 0.7 ? 12 : 0;
  }

  render(f: Frame) {
    const tau = f.t;
    if (tau >= HOOK.out) return;
    const g = f.g;
    const size = VERTICAL ? 118 : 104;
    const x = VERTICAL ? 72 : 176;
    const y1 = VERTICAL ? 470 : 250, y2 = y1 + size * 1.02;
    const k1 = 1, k2 = spring(tau - HOOK.line2, 5, 0.62);
    const panelK = ease.outExpo(prog(tau, 0, 0.2));
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.font = font('display', size, 700);
    g.letterSpacing = `${-0.035 * size}px`;
    const w = Math.max(g.measureText(L1).width, g.measureText(L2).width);
    const px = x - 28, py = y1 - size * 0.95, pw = Math.min(W - px - 24, w + 70), ph = size * 2.35;
    g.fillStyle = rgba('vanta', 0.9 * panelK);
    g.fillRect(px, py, pw, ph);
    g.strokeStyle = rgba('bone', 0.5 * panelK);
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(px, py + 18); g.lineTo(px, py); g.lineTo(px + 18, py);
    g.moveTo(px + pw - 18, py + ph); g.lineTo(px + pw, py + ph); g.lineTo(px + pw, py + ph - 18);
    g.stroke();
    g.fillStyle = rgba('bone', k1);
    g.fillText(L1, x, y1);
    if (tau >= HOOK.line2) {
      const dy = (1 - clamp(k2, 0, 1.2)) * 60;
      g.fillStyle = rgba('bone', clamp(k2 * 1.4));
      g.fillText(L2, x, y2 + dy);
    }
    g.letterSpacing = '0px';
    g.font = font('mono', VERTICAL ? 17 : 12, 500);
    g.letterSpacing = '2px';
    g.fillStyle = rgba('muted', panelK);
    g.fillText('ACADEMIA  ·  ESTADO ACTUAL', x, py - 16);
    g.restore();
  }
}
