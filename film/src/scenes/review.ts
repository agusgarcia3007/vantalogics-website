import { Scene, type Frame } from '../engine/scene';
import { rgba } from '../engine/palette';
import { clamp, ease, lerp, prog, spring, polyLength, pointAt } from '../engine/math';
import { signalHead, signalStroke } from '../engine/signal';
import { R } from './retrieval';
import { VERTICAL, W, CX, CY } from '../engine/format';

export const V = {
  start: R.whip[0],
  enter: [26.62, 26.95] as const,
  analysis: [26.95, 27.5] as const,
  toSwitch: [27.5, 27.78] as const,
  approve: 28.5,
  toRecord: [28.56, 28.86] as const,
  record: 28.9,
  back: [28.95, 29.55] as const,
  shrink: [29.62, 30.0] as const,
  end: 30,
};

const TS = VERTICAL ? 1.5 : 1;
const DS = VERTICAL ? 1.3 : 1;
const Y = 520;
const MX = 540;
const ENT = VERTICAL ? { x: 330, y: 300, w: 420, h: 180 } : { x: 176, y: 440, w: 224, h: 150 };
const ANA = VERTICAL ? { x: 90, y: 570, w: 900, h: 430 } : { x: 520, y: 380, w: 470, h: 276 };
const SWA: [number, number] = VERTICAL ? [MX, 1085] : [1100, Y];
const SWB: [number, number] = VERTICAL ? [MX, 1205] : [1196, Y];
const REC = VERTICAL ? { x: 90, y: 1280, w: 900, h: 215 } : { x: 1320, y: 420, w: 424, h: 190 };
const TOP = 268;
const A0 = VERTICAL ? Math.PI / 2 : 0;

const IN_PATH = VERTICAL ? [-40, 1340, 50, 1340, 50, ENT.y + ENT.h / 2, ENT.x, ENT.y + ENT.h / 2] : [-40, 800, 288, 800, 288, ENT.y + ENT.h];
const MAIN = VERTICAL ? [MX, ENT.y + ENT.h, MX, ANA.y] : [ENT.x + ENT.w, Y, ANA.x, Y];
const ANA_IN = VERTICAL ? [MX, ANA.y, MX, ANA.y + ANA.h] : [ANA.x, Y, ANA.x + ANA.w, Y];
const ANA_OUT = VERTICAL ? [MX, ANA.y + ANA.h, SWA[0], SWA[1]] : [ANA.x + ANA.w, Y, SWA[0], SWA[1]];
const SW_SEG = [SWA[0], SWA[1], SWB[0], SWB[1]];
const SW_OUT = VERTICAL ? [SWB[0], SWB[1], MX, REC.y] : [SWB[0], SWB[1], REC.x, Y];
const BACK = VERTICAL
  ? [REC.x + REC.w, REC.y + REC.h / 2, 1030, REC.y + REC.h / 2, 1030, ENT.y + ENT.h / 2, ENT.x + ENT.w, ENT.y + ENT.h / 2]
  : [REC.x + REC.w / 2, REC.y, REC.x + REC.w / 2, TOP, 288, TOP, 288, ENT.y];
const BACK_END: [number, number] = [BACK[BACK.length - 2], BACK[BACK.length - 1]];

export const LOOP_CENTER: [number, number] = VERTICAL ? [540, (ENT.y + REC.y + REC.h) / 2] : [(176 + 1744) / 2, (TOP + 800) / 2];
export const LOOP_SIZE: [number, number] = VERTICAL ? [1070, REC.y + REC.h - ENT.y] : [1744 - 176, 800 - TOP];

const RUBRIC = [
  ['1', 'Planteo', 2, 3],
  ['2', 'Elección de u y dv', 3, 3],
  ['3', 'Procedimiento', 1, 2],
  ['4', 'Resultado', 1, 2],
] as const;

function partial(pts: number[], k: number) {
  const L = polyLength(pts);
  const out = [pts[0], pts[1]];
  let acc = 0;
  for (let i = 2; i < pts.length; i += 2) {
    const l = Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]);
    const q = clamp((k * L - acc) / l);
    if (q <= 0) break;
    out.push(lerp(pts[i - 2], pts[i], q), lerp(pts[i - 1], pts[i + 1], q));
    acc += l;
  }
  return out;
}

export default class Review extends Scene {
  samples(t: number) {
    if (t < V.enter[0] + 0.1) return 28;
    if (t > V.shrink[0]) return 20;
    if (Math.abs(t - V.approve) < 0.15) return 16;
    return 8;
  }

  render(f: Frame) {
    const t = f.t;
    const g = f.g;
    const p = f.pen;
    const whip = ease.inOutQuart(prog(t, R.whip[0], R.whip[1]));
    const ox = W * (1 - whip);
    const shK = ease.inOutCubic(prog(t, V.shrink[0], V.shrink[1]));
    const sh = shK;
    const push = ease.inOutCubic(prog(t, V.toSwitch[0], V.toSwitch[1] + 0.35)) * (1 - ease.inOutCubic(prog(t, V.approve + 0.1, V.back[0] + 0.3)));
    const pc: [number, number] = [(SWA[0] + SWB[0]) / 2, (SWA[1] + SWB[1]) / 2];
    const s = Math.exp(Math.log(0.035) * shK) * (1 + 0.38 * push);
    const [lx, ly] = LOOP_CENTER;
    const fx = lerp(lx, pc[0], push), fy = lerp(ly, pc[1], push);
    const gx = lerp(fx, CX, shK), gy = lerp(fy, CY, shK);
    const tx = ox + gx - fx * s, ty = gy - fy * s;
    g.setTransform(s, 0, 0, s, tx, ty);
    p.u = 1 / s;
    const sp = (x: number, y: number): [number, number] => [x * s + tx, y * s + ty];
    const detail = 1 - prog(t, V.shrink[0], V.shrink[0] + 0.15);
    const bone = (a: number) => rgba('bone', a);

    const appear = (at: number) => ease.outExpo(prog(t, at, at + 0.35));
    const aE = appear(V.start + 0.15), aA = appear(V.start + 0.22), aS = appear(V.start + 0.3), aR = appear(V.start + 0.36);

    p.rectDraw(ENT.x, ENT.y, ENT.w, ENT.h, aE, bone(0.9));
    p.line(ENT.x + ENT.w - 26, ENT.y, ENT.x + ENT.w, ENT.y + 26, bone(0.6 * aE));
    p.text('ENTREGA', ENT.x + 16, ENT.y + 30 * TS, { size: 11 * TS, weight: 500, tracking: 0.12, color: bone(aE * detail) });
    p.text('TP 03', ENT.x + 16, ENT.y + 74 * TS, { fam: 'display', size: 36 * DS, weight: 500, tracking: -0.02, color: bone(aE * detail) });
    p.text('alumno A-18204', ENT.x + 16, ENT.y + 104 * TS, { size: 10 * TS, color: rgba('muted', aE * detail) });
    p.text('3 págs · pdf', VERTICAL ? ENT.x + 230 : ENT.x + 16, VERTICAL ? ENT.y + 104 * TS : ENT.y + 124, { size: 10 * TS, color: rgba('muted', aE * detail) });

    p.rectDraw(ANA.x, ANA.y, ANA.w, ANA.h, aA, bone(0.9));
    p.text('ANÁLISIS', ANA.x + 18, ANA.y + 30 * TS, { size: 11 * TS, weight: 500, tracking: 0.12, color: bone(aA * detail) });
    p.text('rúbrica del curso · borrador', ANA.x + ANA.w - 18, ANA.y + 30 * TS, { size: 10 * TS, color: rgba('muted', aA * detail), align: 'right' });
    p.line(ANA.x, ANA.y + 46 * TS, ANA.x + ANA.w, ANA.y + 46 * TS, rgba('muted', 0.4 * aA));
    RUBRIC.forEach(([n, name, got, max], i) => {
      const y = ANA.y + (84 + i * 38) * TS;
      const k = ease.outExpo(prog(t, V.analysis[0] + i * 0.1, V.analysis[0] + 0.3 + i * 0.1));
      p.text(n, ANA.x + 18, y, { size: 10 * TS, color: rgba('muted', aA * detail) });
      p.text(name, ANA.x + 44 * TS, y, { size: 11 * TS, color: bone(0.9 * aA * detail) });
      const bx = ANA.x + (VERTICAL ? 470 : 250), bw = VERTICAL ? 280 : 150, bh = 10 * TS;
      for (let q = 0; q < max; q++) {
        const cw = bw / max - 6;
        const x = bx + q * (bw / max);
        p.rect(x, y - bh, cw, bh, rgba('muted', 0.5 * aA * detail), 1);
        if (q < got && k > 0) p.fillRect(x, y - bh, cw * clamp(k * max - q), bh, rgba('ash', 0.85 * detail));
      }
      if (k > 0.6) p.text(`${got}/${max}`, ANA.x + ANA.w - 18, y, { size: 11 * TS, color: bone(detail), align: 'right' });
    });
    const sk = ease.outExpo(prog(t, V.analysis[1] - 0.1, V.analysis[1] + 0.2));
    p.line(ANA.x, ANA.y + ANA.h - 50 * TS, ANA.x + ANA.w, ANA.y + ANA.h - 50 * TS, rgba('muted', 0.4 * aA));
    p.text('SUGERENCIA', ANA.x + 18, ANA.y + ANA.h - 20 * TS, { size: 10 * TS, weight: 500, tracking: 0.12, color: rgba('muted', sk * detail) });
    p.text('7 / 10', ANA.x + 150 * TS, ANA.y + ANA.h - 18 * TS, { fam: 'display', size: 24 * DS, weight: 500, color: bone(sk * detail) });
    p.text('no vinculante', ANA.x + ANA.w - 18, ANA.y + ANA.h - 20 * TS, { size: 10 * TS, color: rgba('muted', sk * detail), align: 'right' });

    const close = spring(t - V.approve, 4.2, 0.42);
    const ang = A0 + lerp(-0.6, 0, clamp(close, -0.2, 1.2));
    const len = Math.hypot(SWB[0] - SWA[0], SWB[1] - SWA[1]);
    p.dot(SWA[0], SWA[1], 4 * Math.sqrt(TS), bone(aS));
    p.ring(SWB[0], SWB[1], 4 * Math.sqrt(TS), bone(aS), 1.2);
    p.line(SWA[0], SWA[1], SWA[0] + Math.cos(ang) * len, SWA[1] + Math.sin(ang) * len, bone(aS), 1.6);
    const pend = t < V.approve;
    const swx = VERTICAL ? SWA[0] - 60 : (SWA[0] + SWB[0]) / 2;
    const swy = VERTICAL ? (SWA[1] + SWB[1]) / 2 - 8 : Y - 92;
    const la: CanvasTextAlign = VERTICAL ? 'right' : 'center';
    p.text('REVISIÓN DOCENTE', swx, swy, { size: 11 * TS, weight: 500, tracking: 0.12, color: bone(aS * detail), align: la });
    if (VERTICAL) p.line(SWA[0] - 50, swy - 6, SWA[0] - 14, swy - 6, rgba('muted', 0.6 * aS * detail));
    else p.line((SWA[0] + SWB[0]) / 2, Y - 80, (SWA[0] + SWB[0]) / 2, Y - 46, rgba('muted', 0.6 * aS * detail));
    const sx2 = VERTICAL ? swx : (SWA[0] + SWB[0]) / 2, sy2 = VERTICAL ? swy + 34 : Y + 44;
    const blink = pend && t > V.toSwitch[1] ? 0.75 + 0.25 * Math.cos((t - V.toSwitch[1]) * Math.PI * 4) : 1;
    if (pend) p.text('PENDIENTE', sx2, sy2, { size: 10 * TS, weight: 500, tracking: 0.14, color: rgba('ash', aS * blink * detail), align: la });
    else {
      const ak = prog(t, V.approve + 0.05, V.approve + 0.25);
      p.typed('APROBADO', ak, sx2, sy2, { size: 10 * TS, weight: 700, tracking: 0.14, color: bone(detail), align: la });
      p.typed('docente · 21:58', ak, sx2, sy2 + 18 * TS, { size: 10 * TS, color: rgba('muted', detail), align: la });
    }
    if (t > V.toSwitch[1] - 0.05 && pend) {
      p.dashed(2, 4);
      p.poly(VERTICAL ? [SWB[0], SWB[1] + 16, MX, REC.y] : [SWB[0] + 16, Y, REC.x, Y], rgba('muted', 0.5 * detail), 1);
      p.solid();
    }

    p.rectDraw(REC.x, REC.y, REC.w, REC.h, aR, bone(0.9));
    p.text('REGISTRO', REC.x + 18, REC.y + 30 * TS, { size: 11 * TS, weight: 500, tracking: 0.12, color: bone(aR * detail) });
    p.text('libro de calificaciones', REC.x + REC.w - 18, REC.y + 30 * TS, { size: 10 * TS, color: rgba('muted', aR * detail), align: 'right' });
    p.line(REC.x, REC.y + 46 * TS, REC.x + REC.w, REC.y + 46 * TS, rgba('muted', 0.4 * aR));
    p.text('CALIFICACIÓN FINAL', REC.x + 18, REC.y + 88 * (VERTICAL ? 1.25 : 1), { size: 10 * TS, tracking: 0.1, color: rgba('muted', aR * detail) });
    const rk = prog(t, V.record, V.record + 0.2);
    p.text(rk > 0 ? '7 / 10' : '—', REC.x + 18, REC.y + 142 * (VERTICAL ? 1.18 : 1), { fam: 'display', size: 44 * DS, weight: 500, tracking: -0.02, color: bone((rk > 0 ? 1 : 0.4) * aR * detail) });
    p.typed('confirmada por docente', rk, REC.x + 190 * DS, REC.y + 138 * (VERTICAL ? 1.18 : 1), { size: 10 * TS, color: rgba('muted', detail) });
    p.text('SOLO DOCENTES', VERTICAL ? REC.x + REC.w - 18 : REC.x + 18, REC.y + REC.h - 16, { align: VERTICAL ? 'right' : 'left', size: 9 * TS, tracking: 0.12, color: rgba('muted', 0.8 * aR * detail) });

    const wires = [MAIN, ANA_OUT, SW_OUT, BACK];
    wires.forEach((w, i) => p.poly(w, rgba('muted', 0.55 * [aA, aS, aR, aR][i] * (i === 3 ? 0.7 : 1))));
    p.poly(IN_PATH, rgba('muted', 0.5 * aE));
    p.text('DEVOLUCIÓN AL ALUMNO', VERTICAL ? 1016 : 300, VERTICAL ? ENT.y + ENT.h / 2 - 14 : TOP - 12, { align: VERTICAL ? 'right' : 'left', size: 9.5 * TS, tracking: 0.12, color: rgba('muted', aR * detail) });

    const segs: [number[], number, number][] = [
      [IN_PATH, V.enter[0], V.enter[1]],
      [MAIN, V.enter[1] + 0.02, V.analysis[0] + 0.05],
      [ANA_IN, V.analysis[0] + 0.05, V.analysis[1]],
      [ANA_OUT, V.toSwitch[0], V.toSwitch[1]],
      [SW_SEG, V.approve + 0.02, V.toRecord[0]],
      [SW_OUT, V.toRecord[0], V.toRecord[1]],
      [BACK, V.back[0], V.back[1]],
    ];
    let head: [number, number] | null = null;
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    const loopDone = t > V.back[1];
    const pulse = loopDone ? Math.exp(-(t - V.back[1]) / 0.25) : 0;
    segs.forEach(([pts, a, b], i) => {
      const k = prog(t, a, b);
      if (k <= 0) return;
      if (i === 2) return;
      const part = partial(pts, k);
      const scr: number[] = [];
      for (let j = 0; j < part.length; j += 2) {
        const q = sp(part[j], part[j + 1]);
        scr.push(q[0], q[1]);
      }
      const faded = i === 6 ? 0.5 : 0.9;
      signalStroke(f, scr, faded + 0.4 * pulse, 1.4, 0.25 + 0.4 * pulse);
      if (k < 1 || (i === segs.length - 1 && k >= 1)) {
        const e = pointAt(pts, polyLength(pts) * k);
        head = sp(e[0], e[1]);
      }
    });
    g.restore();
    if (t >= V.analysis[0] && t < V.analysis[1]) {
      const bx0 = ANA.x + (VERTICAL ? 470 : 250), bw0 = VERTICAL ? 280 : 150;
      let hx = bx0, hy = ANA.y + 74 * TS;
      RUBRIC.forEach(([, , got, max], i) => {
        const a0 = V.analysis[0] + i * 0.1;
        if (t < a0) return;
        const k = ease.outExpo(prog(t, a0, a0 + 0.3));
        hx = bx0 + (bw0 / max) * got * k;
        hy = ANA.y + (84 + i * 38) * TS - 5 * TS;
      });
      head = sp(hx, hy);
    }
    if (t >= V.toSwitch[1] && t < V.approve + 0.02) head = sp(SWA[0], SWA[1]);
    if (t >= V.back[1]) head = sp(BACK_END[0], BACK_END[1]);
    if (!head && t >= V.analysis[1] && t < V.toSwitch[0]) head = sp(ANA_OUT[0], ANA_OUT[1]);
    if (head) {
      const h = head as [number, number];
      const wait = t >= V.toSwitch[1] && t < V.approve ? 0.25 * Math.sin((t - V.toSwitch[1]) * 9) : 0;
      signalHead(f, h[0], h[1], 1 + wait + 0.5 * pulse, lerp(1, 0.6, sh));
    }
    if (t < V.enter[0] && t >= R.whip[0]) {
      const q = sp(IN_PATH[0], IN_PATH[1]);
      signalHead(f, q[0], q[1], 1, 1);
    }

    f.info.sheet = 'VL—05';
    f.info.title = '/ EVALUACIÓN · CONTROL HUMANO';
    f.info.hud = 1;
    if (head) f.info.coords = [(head as [number, number])[0] - CX, CY - (head as [number, number])[1]];
  }
}
