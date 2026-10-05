import { font, measure, type Family } from './type';
import { rgba, type Tone } from './palette';
import { clamp } from './math';
import { LW } from './format';

export type Ctx = CanvasRenderingContext2D;

export interface TextOpts {
  fam?: Family;
  size?: number;
  weight?: number;
  color?: string;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
  tracking?: number;
  italic?: boolean;
  alpha?: number;
}

export class Pen {
  u = 1;
  constructor(public g: Ctx) {}

  width(px: number) {
    this.g.lineWidth = px * this.u * LW;
  }

  line(x1: number, y1: number, x2: number, y2: number, color: string, w = 1) {
    const g = this.g;
    g.strokeStyle = color;
    g.lineWidth = w * this.u * LW;
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke();
  }

  lineK(x1: number, y1: number, x2: number, y2: number, k: number, color: string, w = 1) {
    if (k <= 0) return;
    this.line(x1, y1, x1 + (x2 - x1) * clamp(k), y1 + (y2 - y1) * clamp(k), color, w);
  }

  poly(pts: ArrayLike<number>, color: string, w = 1, closed = false) {
    if (pts.length < 4) return;
    const g = this.g;
    g.strokeStyle = color;
    g.lineWidth = w * this.u * LW;
    g.beginPath();
    g.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
    if (closed) g.closePath();
    g.stroke();
  }

  polyPartial(pts: ArrayLike<number>, len: number, color: string, w = 1, from = 0): [number, number] | null {
    if (len <= from || pts.length < 4) return null;
    const g = this.g;
    g.strokeStyle = color;
    g.lineWidth = w * this.u * LW;
    g.beginPath();
    let acc = 0;
    let started = false;
    let hx = pts[0], hy = pts[1];
    for (let i = 2; i < pts.length; i += 2) {
      const x0 = pts[i - 2], y0 = pts[i - 1], x1 = pts[i], y1 = pts[i + 1];
      const l = Math.hypot(x1 - x0, y1 - y0);
      const a = acc, b = acc + l;
      acc = b;
      if (b <= from) continue;
      const k0 = l > 0 ? clamp((from - a) / l) : 0;
      const k1 = l > 0 ? clamp((len - a) / l) : 1;
      if (!started) {
        g.moveTo(x0 + (x1 - x0) * k0, y0 + (y1 - y0) * k0);
        started = true;
      }
      hx = x0 + (x1 - x0) * k1;
      hy = y0 + (y1 - y0) * k1;
      g.lineTo(hx, hy);
      if (b >= len) break;
    }
    g.stroke();
    return [hx, hy];
  }

  rect(x: number, y: number, w: number, h: number, color: string, lw = 1) {
    const g = this.g;
    g.strokeStyle = color;
    g.lineWidth = lw * this.u * LW;
    g.strokeRect(x, y, w, h);
  }

  rectDraw(x: number, y: number, w: number, h: number, k: number, color: string, lw = 1) {
    if (k <= 0) return;
    if (k >= 1) return this.rect(x, y, w, h, color, lw);
    this.polyPartial([x, y, x + w, y, x + w, y + h, x, y + h, x, y], k * 2 * (w + h), color, lw);
  }

  fillRect(x: number, y: number, w: number, h: number, color: string) {
    this.g.fillStyle = color;
    this.g.fillRect(x, y, w, h);
  }

  dot(x: number, y: number, r: number, color: string) {
    const g = this.g;
    g.fillStyle = color;
    g.beginPath();
    g.arc(x, y, r * this.u, 0, Math.PI * 2);
    g.fill();
  }

  ring(x: number, y: number, r: number, color: string, w = 1) {
    const g = this.g;
    g.strokeStyle = color;
    g.lineWidth = w * this.u * LW;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.stroke();
  }

  arc(x: number, y: number, r: number, a0: number, a1: number, color: string, w = 1) {
    const g = this.g;
    g.strokeStyle = color;
    g.lineWidth = w * this.u * LW;
    g.beginPath();
    g.arc(x, y, r, a0, a1, a1 < a0);
    g.stroke();
  }

  dashed(on: number, off: number) {
    this.g.setLineDash([on * this.u, off * this.u]);
  }

  solid() {
    this.g.setLineDash([]);
  }

  cross(x: number, y: number, r: number, color: string, w = 1) {
    this.line(x - r, y - r, x + r, y + r, color, w);
    this.line(x - r, y + r, x + r, y - r, color, w);
  }

  plus(x: number, y: number, r: number, color: string, w = 1) {
    this.line(x - r, y, x + r, y, color, w);
    this.line(x, y - r, x, y + r, color, w);
  }

  text(s: string, x: number, y: number, o: TextOpts = {}) {
    if (!s) return;
    const g = this.g;
    const size = o.size ?? 12;
    g.font = font(o.fam ?? 'mono', size, o.weight ?? 400, o.italic);
    g.fillStyle = o.color ?? rgba('bone');
    g.textAlign = o.align ?? 'left';
    g.textBaseline = o.baseline ?? 'alphabetic';
    const tr = o.tracking ?? 0;
    g.letterSpacing = tr ? `${tr * size}px` : '0px';
    if (o.alpha !== undefined) {
      const a = g.globalAlpha;
      g.globalAlpha = a * clamp(o.alpha);
      g.fillText(s, x, y);
      g.globalAlpha = a;
    } else g.fillText(s, x, y);
    if (tr) g.letterSpacing = '0px';
  }

  typed(s: string, k: number, x: number, y: number, o: TextOpts = {}) {
    const n = Math.floor(clamp(k) * s.length + 1e-6);
    if (n <= 0) return;
    this.text(s.slice(0, n), x, y, o);
  }

  label(s: string, x: number, y: number, o: TextOpts = {}) {
    this.text(s, x, y, { fam: 'mono', size: 11, tracking: 0.06, color: rgba('muted'), ...o });
  }

  width2(s: string, o: TextOpts = {}) {
    return measure(s, o.fam ?? 'mono', o.size ?? 12, o.weight ?? 400, o.tracking ?? 0, o.italic);
  }

  arrowHead(x: number, y: number, ang: number, size: number, color: string, w = 1) {
    const a1 = ang + Math.PI - 0.42, a2 = ang + Math.PI + 0.42;
    const s = size * this.u;
    this.line(x, y, x + Math.cos(a1) * s, y + Math.sin(a1) * s, color, w);
    this.line(x, y, x + Math.cos(a2) * s, y + Math.sin(a2) * s, color, w);
  }

  bracketDown(x0: number, x1: number, y: number, h: number, color: string, w = 1) {
    this.poly([x0, y, x0, y + h, x1, y + h, x1, y], color, w);
  }

  dimension(x0: number, y0: number, x1: number, y1: number, color: string, tick = 6) {
    const a = Math.atan2(y1 - y0, x1 - x0);
    const nx = -Math.sin(a) * tick * this.u, ny = Math.cos(a) * tick * this.u;
    this.line(x0, y0, x1, y1, color, 1);
    this.line(x0 - nx, y0 - ny, x0 + nx, y0 + ny, color, 1);
    this.line(x1 - nx, y1 - ny, x1 + nx, y1 + ny, color, 1);
  }
}

export function tone(t: Tone, a = 1) {
  return rgba(t, a);
}
