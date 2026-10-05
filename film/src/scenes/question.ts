import { Scene, type Frame } from '../engine/scene';
import { rgba, mixTone } from '../engine/palette';
import { font, measure } from '../engine/type';
import { clamp, ease, lerp, prog } from '../engine/math';
import { signalHead, signalStroke, emit } from '../engine/signal';
import { VERTICAL, CX, CY, W } from '../engine/format';

export const Q = {
  start: 18,
  caret: 18.28,
  type: [18.3, 19.3] as const,
  parse: 19.5,
  labels: [19.55, 19.72, 19.89],
  collapse: 20.2,
  vector: 20.45,
  launch: 20.72,
  end: 21,
};

const TEXT = '¿Dónde explicaba integración por partes?';
const SIZE = VERTICAL ? 124 : 104;
const X0 = VERTICAL ? 72 : 150;
const TS = VERTICAL ? 1.6 : 1;
const LINES = VERTICAL ? [0, 17, 29] : [0];
const BASES = VERTICAL ? [720, 930, 1100] : [590];
const META_Y = VERTICAL ? 520 : 420;
const SPREAD = VERTICAL ? 14 : 20;

const SPANS = [
  { from: 0, to: 6, label: 'INTENCIÓN', value: 'ubicar', dim: true },
  { from: 7, to: 16, label: 'REFERENCIA', value: 'clase ya dictada', dim: true },
  { from: 17, to: 39, label: 'CONCEPTO', value: 'integración por partes', dim: false },
];

function lineOf(i: number) {
  let l = 0;
  for (let k = 0; k < LINES.length; k++) if (i >= LINES[k]) l = k;
  return l;
}

const WORD_IN_LINE = (() => {
  const w: number[] = [];
  let k = 0;
  for (let i = 0; i < TEXT.length; i++) {
    if (LINES.includes(i)) k = 0;
    else if (TEXT[i] === ' ') k++;
    w.push(k);
  }
  return w;
})();

let xs: number[] | null = null;
function glyphX() {
  if (xs) return xs;
  xs = [];
  for (let i = 0; i <= TEXT.length; i++) {
    const l = lineOf(Math.min(i, TEXT.length - 1));
    const start = LINES[l];
    xs.push(measure(TEXT.slice(start, i), 'serif', SIZE, 400, 0, true));
  }
  return xs;
}

export default class Question extends Scene {
  samples(t: number) {
    if (t < Q.caret + 0.05) return 20;
    if (t > Q.collapse && t < Q.vector + 0.1) return 16;
    if (t > Q.launch) return 24;
    return 8;
  }

  render(f: Frame) {
    const t = f.t;
    const g = f.g;
    const p = f.pen;
    const X = glyphX();
    const spread = ease.outExpo(prog(t, Q.parse, Q.parse + 0.5));
    const pos = (i: number): [number, number] => [X0 + X[i] + WORD_IN_LINE[i] * SPREAD * spread, BASES[lineOf(i)]];
    const endOf = (i: number): [number, number] => {
      const l = lineOf(i);
      return [X0 + X[i + 1] + WORD_IN_LINE[i] * SPREAD * spread, BASES[l]];
    };
    const cA = pos(17), cB = endOf(38);
    const cMid: [number, number] = VERTICAL ? [X0 + (X[28] - X[17]) / 2 + 40, (BASES[1] + BASES[2]) / 2 - 30] : [(cA[0] + cB[0]) / 2, BASES[0] - 26];

    const lk = prog(t, Q.launch, Q.end);
    const zoom = Math.exp(Math.log(9) * ease.inQuart(lk));
    const anchor = cMid;
    const mk = ease.inOutCubic(lk);
    const dst: [number, number] = [lerp(anchor[0], CX, mk), lerp(anchor[1], CY, mk)];
    const tx = dst[0] - zoom * anchor[0], ty = dst[1] - zoom * anchor[1];
    g.setTransform(zoom, 0, 0, zoom, tx, ty);
    p.u = 1 / zoom;
    const toScreen = (x: number, y: number): [number, number] => [x * zoom + tx, y * zoom + ty];
    const fade = 1 - prog(t, Q.launch + 0.05, Q.end - 0.02);

    const collapse = (i: number) => {
      if (i < 17 || i >= 39) return 0;
      const d = (i - 17) / 22;
      return ease.inOutCubic(prog(t, Q.collapse + d * 0.12, Q.collapse + 0.2 + d * 0.12));
    };

    const meta = prog(t, Q.start + 0.12, Q.start + 0.4);
    const mw = VERTICAL ? W - 2 * X0 : 1560;
    p.typed('CONSULTA', meta, X0, META_Y, { size: 10.5 * TS, weight: 500, tracking: 0.14, color: rgba('bone', 0.8 * fade) });
    if (VERTICAL) {
      p.typed('ALUMNO A-18204  ·  MATEMÁTICA II', meta, X0, META_Y + 30, { size: 10.5 * TS, tracking: 0.06, color: rgba('muted', fade) });
      p.typed('UNIDAD 05  ·  21:43', meta, X0, META_Y + 58, { size: 10.5 * TS, tracking: 0.06, color: rgba('muted', fade) });
    } else p.typed('ALUMNO A-18204  ·  MATEMÁTICA II  ·  UNIDAD 05  ·  21:43', meta, X0 + 104, META_Y, { size: 10.5, tracking: 0.06, color: rgba('muted', fade) });
    const ly = VERTICAL ? META_Y + 80 : META_Y + 16;
    p.lineK(X0, ly, X0 + mw, ly, ease.outExpo(meta), rgba('muted', 0.35 * fade));
    p.typed('Q/0418', meta, X0 + mw, META_Y, { size: 10.5 * TS, color: rgba('muted', 0.7 * fade), align: 'right' });

    const typed = Math.floor(clamp(prog(t, Q.type[0], Q.type[1])) * TEXT.length + 1e-6);
    g.font = font('serif', SIZE, 400, true);
    g.textBaseline = 'alphabetic';
    g.textAlign = 'left';
    for (let i = 0; i < typed; i++) {
      const ch = TEXT[i];
      if (ch === ' ') continue;
      const span = SPANS.find((s) => i >= s.from && i < s.to);
      const dimK = span?.dim ? spread : 0;
      const ck = collapse(i);
      const [x0, y0] = pos(i);
      const x = lerp(x0, cMid[0], ck), y = lerp(y0, cMid[1] + 26, ck);
      const a = (1 - ck) * fade * (1 - 0.72 * dimK) * (i === 39 ? 1 - spread : 1);
      if (a <= 0.003) continue;
      g.fillStyle = mixTone('bone', 'muted', dimK * 0.6, a);
      if (ck > 0) {
        g.save();
        g.translate(x, y);
        g.scale(1 - ck * 0.9, 1 - ck * 0.9);
        g.fillText(ch, 0, 0);
        g.restore();
      } else g.fillText(ch, x, y);
    }

    const labelsK = SPANS.map((_, i) => ease.outExpo(prog(t, Q.labels[i], Q.labels[i] + 0.3)));
    const labelsOut = 1 - prog(t, Q.collapse - 0.05, Q.collapse + 0.15);
    SPANS.forEach((s, i) => {
      const k = labelsK[i] * labelsOut * fade;
      if (k <= 0) return;
      const groups: [number, number][] = [];
      for (let c = s.from; c < s.to; c++) {
        const l = lineOf(c);
        const last = groups[groups.length - 1];
        if (last && lineOf(last[0]) === l) last[1] = c;
        else groups.push([c, c]);
      }
      groups.forEach(([ga, gb], gi) => {
        let bEnd = gb;
        while (bEnd > ga && TEXT[bEnd] === ' ') bEnd--;
        const a = pos(ga)[0];
        const b = endOf(bEnd)[0];
        const y = BASES[lineOf(ga)] + (VERTICAL ? 30 : 36);
        const c = rgba(s.dim ? 'muted' : 'bone', 0.9 * k);
        p.line(a, y, a, y + 12 * k, c, 1);
        p.line(b, y, b, y + 12 * k, c, 1);
        p.lineK(a, y + 12, b, y + 12, k, c, 1);
        if (gi !== groups.length - 1) return;
        const lx = VERTICAL && s.from === 7 ? b - 8 : (a + b) / 2 + 8;
        const align: CanvasTextAlign = VERTICAL && s.from === 7 ? 'right' : 'left';
        p.line((a + b) / 2, y + 12, (a + b) / 2, y + 12 + (VERTICAL ? 16 : 22) * k, c, 1);
        p.typed(s.label, k, lx, y + (VERTICAL ? 32 + 6 * TS : 36), { size: 10 * TS, weight: 500, tracking: 0.12, color: rgba(s.dim ? 'muted' : 'bone', k), align });
        p.typed(s.value, k, lx, y + (VERTICAL ? 50 + 12 * TS : 52), { size: 10 * TS, tracking: 0.04, color: rgba('muted', 0.85 * k), align });
      });
    });

    const tokK = spread * labelsOut * fade;
    if (tokK > 0) {
      let wStart = 0;
      for (let i = 0; i <= TEXT.length; i++) {
        if (i === TEXT.length || TEXT[i] === ' ') {
          const [x, y] = pos(wStart);
          p.line(x - 6, y - SIZE * 0.83, x - 6, y - SIZE * 0.71, rgba('muted', 0.6 * tokK), 1);
          p.text(String(wStart).padStart(2, '0'), x - 2, y - SIZE * 0.73, { size: 8.5 * TS, color: rgba('muted', 0.6 * tokK) });
          wStart = i + 1;
        }
      }
    }

    let cx: number, cy: number;
    const [sx0, sy0] = pos(0);
    if (t < Q.caret) {
      const k = ease.outExpo(prog(t, Q.start, Q.caret));
      cx = lerp(CX, sx0 - 14, k);
      cy = lerp(CY, sy0 - 30, k);
    } else if (t < Q.parse) {
      const idx = Math.max(0, typed - 1);
      const [ex, ey] = typed === 0 ? [sx0 - 8, sy0] : endOf(idx);
      const nextLine = typed < TEXT.length && LINES.includes(typed) && typed > 0;
      cx = nextLine ? pos(typed)[0] - 8 : ex + 6;
      cy = (nextLine ? BASES[lineOf(typed)] : ey) - 30;
    } else {
      const k = ease.inOutCubic(prog(t, Q.collapse, Q.collapse + 0.4));
      const e = endOf(38);
      cx = lerp(e[0] + 14, cMid[0], k);
      cy = lerp(e[1] - 30, cMid[1], k);
    }

    const caretK = t < Q.collapse + 0.25 ? 1 : 0;
    g.setTransform(1, 0, 0, 1, 0, 0);
    const [sx, sy] = toScreen(cx, cy);
    const ch = SIZE * 0.75;
    if (t < Q.start + 0.02) {
      signalHead(f, CX, CY, 1, 3.2);
    } else if (caretK && t >= Q.caret - 0.08) {
      const blink = t > Q.type[1] && t < Q.parse ? (Math.floor((t - Q.type[1]) / 0.12) % 2 === 0 ? 1 : 0.35) : 1;
      g.fillStyle = rgba('signal', blink);
      g.fillRect(sx - 1.2, sy - ch * 0.62, 2.6 * (VERTICAL ? 1.3 : 1), ch);
      emit(f, sx, sy - 10, 60, 0.5 * blink);
    } else if (t < Q.caret) {
      const k = prog(t, Q.start, Q.caret);
      signalHead(f, sx, sy, 1, lerp(3.2, 1.2, ease.outExpo(k)));
    }

    const vk = ease.outExpo(prog(t, Q.vector, Q.vector + 0.35));
    if (t >= Q.collapse + 0.25 || vk > 0) {
      const [ox, oy] = toScreen(cMid[0], cMid[1]);
      const len = (VERTICAL ? 560 : 520) * vk;
      const ex = ox + len * zoom, ey = oy;
      if (vk > 0) {
        signalStroke(f, [ox, oy, ex, ey], fade, 1.4, 0.35);
        g.save();
        g.setTransform(1, 0, 0, 1, 0, 0);
        p.u = 1;
        p.arrowHead(ex, ey, 0, 12, rgba('signal', fade), 1.4);
        const lk2 = prog(t, Q.vector + 0.1, Q.vector + 0.3) * fade;
        const comps = ['0.12', '−0.48', '0.91', '0.03', '−0.27', '0.66'];
        const bx = VERTICAL ? X0 : ox + 6, by = oy + 42 * TS;
        const step = 62 * TS * (VERTICAL ? 0.92 : 1);
        p.text('q =', bx, by, { size: 12 * TS, color: rgba('muted', lk2) });
        comps.forEach((c, i) => {
          const kk = prog(t, Q.vector + 0.12 + i * 0.03, Q.vector + 0.2 + i * 0.03);
          p.text(c, bx + 38 * TS + i * step, by, { size: 12 * TS, color: rgba('bone', 0.9 * kk * fade) });
        });
        p.text('…  ∈ ℝ¹⁵³⁶', VERTICAL ? bx : bx + 38 + 6 * step, VERTICAL ? by + 34 : by, { size: 12 * TS, color: rgba('muted', lk2) });
        p.text('EMBEDDING DE LA CONSULTA', VERTICAL ? X0 : ox + 6, oy - 22 * TS, { size: 9.5 * TS, tracking: 0.12, color: rgba('muted', lk2) });
        g.restore();
      }
      signalHead(f, ox, oy, 1, 1.1);
    }

    f.info.sheet = 'VL—03';
    f.info.title = '/ INTELIGENCIA · CONSULTA';
    f.info.hud = fade;
    f.info.coords = [cx - X0, 0];
  }
}
