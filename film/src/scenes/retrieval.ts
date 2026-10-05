import { Scene, type Frame } from '../engine/scene';
import { Cam3, Lines3, fillText3, fogK, type Plane } from '../engine/space';
import { rgba } from '../engine/palette';
import { font, outline } from '../engine/type';
import { clamp, ease, lerp, prog, mulberry32 } from '../engine/math';
import { signalHead, signalStroke } from '../engine/signal';
import { VERTICAL, W, CX, CY } from '../engine/format';

export const R = {
  start: 21,
  arrive: 23.3,
  hit: 23.3,
  morph: [23.55, 24.15] as const,
  scrub: [24.15, 24.7] as const,
  answer: 24.7,
  leader: [25.25, 25.75] as const,
  policy: 25.8,
  run: [26.12, 26.45] as const,
  whip: [26.3, 26.72] as const,
  end: 26.72,
};

const SPACING = 1000;
const Z_END = -3250;

const UNITS = [
  'LÍMITES Y CONTINUIDAD',
  'DERIVADAS',
  'APLICACIONES DE LA DERIVADA',
  'TÉCNICAS DE INTEGRACIÓN',
  'INTEGRAL DEFINIDA',
  'ÁREAS Y VOLÚMENES',
  'SERIES',
  'ECUACIONES DIFERENCIALES',
];

interface Passage {
  kind: 'video' | 'page';
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  dur: string;
  score: number;
  hit?: boolean;
}

function makeUnit(k: number): Passage[] {
  const r = mulberry32(100 + k);
  if (k === 3) {
    return [
      { kind: 'video', x: -720, y: -330, w: 380, h: 64, name: 'VIDEO 01 · SUSTITUCIÓN', dur: '14:05', score: 0.58 },
      { kind: 'page', x: -700, y: 90, w: 230, h: 150, name: 'PÁGINA 4.1', dur: '', score: 0.44 },
      { kind: 'video', x: 180, y: -380, w: 380, h: 64, name: 'VIDEO 02 · INMEDIATAS', dur: '09:40', score: 0.51 },
      { kind: 'video', x: 150, y: 150, w: 420, h: 70, name: 'VIDEO 03 · INTEGRACIÓN POR PARTES', dur: '18:30', score: 0.91, hit: true },
      { kind: 'page', x: 560, y: -120, w: 210, h: 150, name: 'PÁGINA 4.3', dur: '', score: 0.63 },
    ];
  }
  const out: Passage[] = [];
  const slots = [
    [-760, -360], [-720, 120], [140, -400], [180, 170], [560, -140], [-300, 300],
  ];
  slots.forEach(([x, y], i) => {
    if (r() < 0.2 && i > 3) return;
    const video = r() < 0.6;
    out.push({
      kind: video ? 'video' : 'page',
      x: x + (r() - 0.5) * 80,
      y: y + (r() - 0.5) * 60,
      w: video ? 330 + r() * 80 : 190 + r() * 50,
      h: video ? 60 : 130 + r() * 30,
      name: video ? `VIDEO 0${i + 1}` : `PÁGINA ${k + 1}.${i + 1}`,
      dur: video ? `${10 + Math.floor(r() * 12)}:${String(Math.floor(r() * 60)).padStart(2, '0')}` : '',
      score: 0.18 + r() * 0.36,
    });
  });
  return out;
}

const DATA = UNITS.map((_, k) =>
  makeUnit(k).map((p) => (VERTICAL ? { ...p, x: p.hit ? -190 : Math.min(p.x * 0.5 - 50, 460 - Math.min(p.w, 420)), y: p.y * 1.65, w: Math.min(p.w, 420) } : p)),
);
const PW = VERTICAL ? 520 : 900, PH = VERTICAL ? 900 : 500;
const TS = VERTICAL ? 1.6 : 1;

function camZ(t: number) {
  return lerp(420, Z_END, ease.outQuart(prog(t, R.start, R.arrive + 0.2)));
}

export function passT(k: number) {
  const zp = -(k + 1) * SPACING;
  const target = (420 - zp) / (420 - Z_END);
  const x = 1 - Math.pow(1 - target, 0.25);
  return R.start + x * (R.arrive + 0.2 - R.start);
}

const FRAME = VERTICAL ? { x: 72, y: 690, w: 936, h: 526 } : { x: 1000, y: 232, w: 744, h: 418 };
const TL = VERTICAL ? { x0: 72, x1: 1008, y: 1340 } : { x0: 176, x1: 1744, y: 800 };
const ANS = VERTICAL ? { x: 72, label: 300, l1: 380, l2: 450, size: 58, tag: 530, tagSub: 566 } : { x: 176, label: 238, l1: 306, l2: 368, size: 50, tag: 426, tagSub: 452 };
const POL = VERTICAL ? { y: 1430, dy: 28, kx: 72, vx: 250 } : { y: 890, dy: 20, kx: 176, vx: 300 };
const HIT_T = 11 * 60 + 42;
const HIT_D = 18 * 60 + 30;

export default class Retrieval extends Scene {
  cam = new Cam3(52, 5, 100000);
  L = new Lines3(this.cam);

  samples(t: number) {
    if (t < 22.3) return 24;
    if (t > R.whip[0] - 0.05) return 28;
    if (t > R.morph[0] && t < R.scrub[1]) return 14;
    return 8;
  }

  render(f: Frame) {
    const t = f.t;
    const g = f.g;
    const whip = ease.inOutQuart(prog(t, R.whip[0], R.whip[1]));
    const ox = -W * whip;
    const z = camZ(t);
    const drift = ease.inOutSine(prog(t, R.start, R.arrive + 0.3));
    const roll = lerp(-0.05, 0, drift);
    this.cam.set([lerp(-60, 60, drift), lerp(40, 0, drift), z], [lerp(-60, 60, drift), lerp(20, 0, drift), z - 1000], { roll, shift: [ox, 0], fov: VERTICAL ? 74 : 52 });
    const worldK = (1 - ease.inOutCubic(prog(t, R.morph[0], R.morph[1]))) * ease.outCubic(prog(t, R.start, R.start + 0.14));
    const fog = { near: 1400, far: 6500, close: 160 };

    if (worldK > 0.01) this.world(f, t, fog, worldK);
    if (t < R.morph[0] + 0.2) {
      const sig = this.cam.project(this.cam.pos[0], this.cam.pos[1] - 30, this.cam.pos[2] - 420);
      const ek = ease.inOutCubic(prog(t, R.start, R.start + 0.2));
      const sx = sig ? lerp(960, sig[0], ek) : 960, sy = sig ? lerp(540, sig[1], ek) : 540;
      signalHead(f, sx, sy, 1 - prog(t, R.morph[0], R.morph[0] + 0.2), 1.3);
    }
    this.source(f, t, ox);

    f.info.sheet = 'VL—04';
    f.info.title = t < R.hit ? '/ INTELIGENCIA · BÚSQUEDA SEMÁNTICA' : '/ INTELIGENCIA · RESPUESTA CON FUENTE';
    f.info.hud = 1;
    const sp = this.signalPos(t);
    f.info.coords = [sp[0] - CX, CY - sp[1]];
  }

  signalPos(t: number): [number, number] {
    if (t < R.morph[0]) return [CX, CY];
    const s = ease.outExpo(prog(t, R.scrub[0], R.scrub[1]));
    const tx = lerp(TL.x0, TL.x0 + ((TL.x1 - TL.x0) * HIT_T) / HIT_D, s);
    if (t >= R.run[0]) {
      const k = ease.inQuart(prog(t, R.run[0], R.run[1] + 0.25));
      return [lerp(tx, W + 480, k), TL.y];
    }
    if (t >= R.scrub[0]) return [tx, TL.y];
    const mk = ease.inOutCubic(prog(t, R.morph[0] + 0.2, R.scrub[0]));
    return [lerp(CX, TL.x0, mk), lerp(CY, TL.y, mk)];
  }

  world(f: Frame, t: number, fog: { near: number; far: number; close: number }, alpha: number) {
    const g = f.g;
    const cam = this.cam;
    const L = this.L;
    const texts: { pl: Plane; s: string; fam: 'display' | 'mono'; size: number; w: number; a: number; tone: 'bone' | 'muted' | 'signal' }[] = [];
    const scores: [number, number, number, string, boolean, number][] = [];
    const sig = cam.project(this.cam.pos[0], this.cam.pos[1] - 30, this.cam.pos[2] - 420);
    for (let k = UNITS.length - 1; k >= 0; k--) {
      const zp = -(k + 1) * SPACING;
      const d = cam.pos[2] - zp;
      if (d < -60) continue;
      const pk = passT(k);
      const scoring = k === 3 ? prog(t, 22.55, 23.1) : prog(t, pk - 0.4, pk - 0.1);
      L.seg(-PW, -PH, zp, PW, -PH, zp, 0.55);
      L.seg(PW, -PH, zp, PW, PH, zp, 0.55);
      L.seg(PW, PH, zp, -PW, PH, zp, 0.55);
      L.seg(-PW, PH, zp, -PW, -PH, zp, 0.55);
      for (const c of [[-PW, -PH], [PW, -PH], [PW, PH], [-PW, PH]]) {
        L.seg(c[0], c[1], zp, c[0] + Math.sign(-c[0]) * 30, c[1], zp, 0.9);
        L.seg(c[0], c[1], zp, c[0], c[1] + Math.sign(-c[1]) * 30, zp, 0.9);
      }
      texts.push({ pl: { o: VERTICAL ? [-PW + 30, 520, zp] : [-PW + 20, -PH - 20, zp], u: [1, 0, 0], v: [0, -1, 0] }, s: `UNIDAD 0${k + 1}`, fam: 'display', size: 44 * (VERTICAL ? 1.4 : 1), w: 0, a: 1, tone: 'bone' });
      texts.push({ pl: VERTICAL ? { o: [-PW + 30, 470, zp], u: [1, 0, 0], v: [0, -1, 0] } : { o: [-560, -520, zp], u: [1, 0, 0], v: [0, -1, 0] }, s: UNITS[k], fam: 'mono', size: 16 * (VERTICAL ? 1.5 : 1), w: 0, a: 0.8, tone: 'muted' });
      DATA[k].forEach((ps, j) => {
        const hit = ps.hit && t >= R.hit;
        const a = hit ? 1 : 0.62;
        const x0 = ps.x, y0 = ps.y;
        const Y = (y: number) => -y;
        const add = (ax: number, ay: number, bx: number, by: number, al: number) => L.seg(ax, Y(ay), zp, bx, Y(by), zp, al);
        if (!hit) {
          add(x0, y0, x0 + ps.w, y0, a);
          add(x0 + ps.w, y0, x0 + ps.w, y0 + ps.h, a);
          add(x0 + ps.w, y0 + ps.h, x0, y0 + ps.h, a);
          add(x0, y0 + ps.h, x0, y0, a);
        }
        if (ps.kind === 'video') {
          const ty = y0 + ps.h - 18;
          add(x0 + 14, ty, x0 + ps.w - 14, ty, 0.5);
          for (let q = 0; q <= 30; q++) {
            const xx = lerp(x0 + 14, x0 + ps.w - 14, q / 30);
            add(xx, ty, xx, ty - (q % 5 === 0 ? 8 : 4), 0.35);
          }
        } else {
          for (let q = 0; q < 6; q++) {
            const w = (0.55 + ((q * 37 + j * 11) % 40) / 100) * (ps.w - 28);
            add(x0 + 14, y0 + 38 + q * 16, x0 + 14 + w, y0 + 38 + q * 16, 0.3);
          }
        }
        texts.push({ pl: { o: [x0 + 14, -(y0 + 24), zp], u: [1, 0, 0], v: [0, -1, 0] }, s: ps.name, fam: 'mono', size: 13 * (VERTICAL ? 1.35 : 1), w: 0, a: hit ? 1 : 0.85, tone: 'bone' });
        if (ps.dur) texts.push({ pl: { o: [x0 + ps.w - 60, -(y0 + 24), zp], u: [1, 0, 0], v: [0, -1, 0] }, s: ps.dur, fam: 'mono', size: 12, w: 0, a: 0.7, tone: 'muted' });
        if (scoring > 0) {
          const st = j * 0.12;
          const sk = clamp((scoring - st) / 0.4);
          if (sk > 0) {
            const val = ps.score * ease.outExpo(sk);
            scores.push([x0 + ps.w + 12, -(y0 + 8), zp, val.toFixed(2), !!ps.hit && t >= R.hit, sk]);
          }
        }
        if (hit) {
          const pts: number[] = [];
          for (const [cx, cy] of [[x0, y0], [x0 + ps.w, y0], [x0 + ps.w, y0 + ps.h], [x0, y0 + ps.h], [x0, y0]]) {
            const pr = cam.project(cx, -cy, zp);
            if (pr) pts.push(pr[0], pr[1]);
          }
          const hk = ease.outExpo(prog(t, R.hit, R.hit + 0.25));
          if (t < R.morph[0]) signalStroke(f, pts, hk * alpha, 1.6, 0.5);
        }
      });
    }
    L.flush(g, 'bone', 1, fog, alpha);
    for (const tx of texts) {
      const o = outline(tx.s, tx.fam, tx.size, tx.fam === 'display' ? 600 : 400, { tracking: tx.fam === 'mono' ? 0.06 : -0.01 });
      const d = -cam.view(tx.pl.o[0], tx.pl.o[1], tx.pl.o[2])[2];
      if (d < 20) continue;
      fillText3(g, cam, tx.pl, o, rgba(tx.tone, tx.a * fogK(d, fog) * alpha), 0, 0);
    }
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    for (const [x, y, zz, s, hit, sk] of scores) {
      const pr = cam.project(x, y, zz);
      if (!pr) continue;
      const fk = fogK(pr[2], fog) * alpha * (t < R.morph[0] ? 1 : 0);
      if (sig && !hit) {
        g.strokeStyle = rgba('muted', 0.35 * fk * (1 - prog(t, R.hit, R.hit + 0.4)));
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(sig[0], sig[1]);
        g.lineTo(pr[0], pr[1]);
        g.stroke();
      }
      g.font = font('mono', clamp(9000 / pr[2], 10, 22), hit ? 700 : 400);
      g.fillStyle = hit ? rgba('signal', fk) : rgba('ash', fk * sk);
      g.fillText(s, pr[0], pr[1]);
    }
    g.restore();
  }

  source(f: Frame, t: number, ox: number) {
    const g = f.g;
    const p = f.pen;
    const cam = this.cam;
    g.save();
    g.setTransform(1, 0, 0, 1, ox, 0);
    p.u = 1;
    const mk = ease.inOutCubic(prog(t, R.morph[0], R.morph[1]));
    if (mk > 0) {
      const hitP = DATA[3].find((d) => d.hit)!;
      const zp = -4 * SPACING;
      const corners = [[hitP.x, hitP.y], [hitP.x + hitP.w, hitP.y], [hitP.x + hitP.w, hitP.y + hitP.h], [hitP.x, hitP.y + hitP.h]].map(([x, y]) => cam.project(x, -y, zp) ?? [CX, CY, 1]);
      const tgt = [[FRAME.x, FRAME.y], [FRAME.x + FRAME.w, FRAME.y], [FRAME.x + FRAME.w, FRAME.y + FRAME.h], [FRAME.x, FRAME.y + FRAME.h]];
      const q = corners.map((c, i) => [lerp(c[0] - ox, tgt[i][0], mk), lerp(c[1], tgt[i][1], mk)]);
      const pts = [...q.flat(), q[0][0], q[0][1]];
      const g2 = f.g;
      g2.save();
      g2.setTransform(1, 0, 0, 1, 0, 0);
      const cool = ease.inOutCubic(prog(t, R.morph[1] + 0.2, R.morph[1] + 0.8));
      const sp2 = pts.map((v, i) => (i % 2 === 0 ? v + ox : v));
      signalStroke(f, sp2, 1 - cool, 1.4, 0.3 * (1 - cool));
      if (cool > 0) {
        g2.strokeStyle = rgba('bone', 0.85 * cool);
        g2.lineWidth = 1;
        g2.beginPath();
        g2.moveTo(sp2[0], sp2[1]);
        for (let i = 2; i < sp2.length; i += 2) g2.lineTo(sp2[i], sp2[i + 1]);
        g2.stroke();
      }
      g2.restore();
      const inner = prog(t, R.morph[1] - 0.05, R.morph[1] + 0.35);
      if (inner > 0) {
        p.text('VIDEO 03 · INTEGRACIÓN POR PARTES', FRAME.x, FRAME.y - 14 * TS, { size: 11 * TS, weight: 500, tracking: 0.08, color: rgba('bone', inner) });
        p.text(VERTICAL ? '' : 'UNIDAD 04', FRAME.x + FRAME.w, FRAME.y - 14, { size: 11, tracking: 0.08, color: rgba('muted', inner), align: 'right' });
        const fk = ease.outExpo(prog(t, R.morph[1], R.morph[1] + 0.5));
        p.text('∫ u dv = uv − ∫ v du', FRAME.x + 48, FRAME.y + 210 * (VERTICAL ? 1.18 : 1), { fam: 'display', size: 64 * (VERTICAL ? 1.25 : 1), weight: 300, tracking: -0.01, color: rgba('bone', fk) });
        p.text('u = x      dv = eˣ dx', FRAME.x + 52, FRAME.y + 270 * (VERTICAL ? 1.22 : 1), { fam: 'display', size: 28 * (VERTICAL ? 1.3 : 1), weight: 300, color: rgba('ash', fk * 0.9) });
        p.typed('“…elegimos u de modo que su derivada sea más simple…”', prog(t, R.morph[1] + 0.1, R.morph[1] + 0.7), FRAME.x + 52, FRAME.y + FRAME.h - 38, { size: 12 * (VERTICAL ? 1.35 : 1), color: rgba('muted', 1) });
        p.text('11:42', FRAME.x + FRAME.w - 18, FRAME.y + 28 * TS, { size: 11 * TS, color: rgba('bone', inner), align: 'right' });
        for (const [cx, cy, dx, dy] of [[FRAME.x, FRAME.y, 1, 1], [FRAME.x + FRAME.w, FRAME.y, -1, 1], [FRAME.x, FRAME.y + FRAME.h, 1, -1], [FRAME.x + FRAME.w, FRAME.y + FRAME.h, -1, -1]]) {
          p.line(cx + dx * 8, cy + dy * 8, cx + dx * 22, cy + dy * 8, rgba('bone', 0.5 * inner), 1);
          p.line(cx + dx * 8, cy + dy * 8, cx + dx * 8, cy + dy * 22, rgba('bone', 0.5 * inner), 1);
        }
      }
    }

    const tk = ease.outExpo(prog(t, R.morph[1] - 0.1, R.scrub[0] + 0.2));
    if (tk > 0) {
      const { x0, x1, y } = TL;
      p.lineK(x0, y, x1, y, tk, rgba('bone', 0.7), 1);
      for (let m = 0; m <= 18; m++) {
        const x = lerp(x0, x1, (m * 60) / HIT_D);
        if ((x - x0) / (x1 - x0) > tk) break;
        p.line(x, y, x, y + (m % 5 === 0 ? 12 : 6), rgba('bone', m % 5 === 0 ? 0.7 : 0.4), 1);
        if (m % 5 === 0) p.text(`${String(m).padStart(2, '0')}:00`, x, y + 30 * TS, { size: 10 * TS, color: rgba('muted', 0.9), align: 'center' });
      }
      p.text('18:30', x1, y + 30 * TS, { size: 10 * TS, color: rgba('muted', tk), align: 'right' });
      const chapters = [[0, 'definición'], [4 * 60 + 10, 'ejemplo 1'], [HIT_T, 'u·v − ∫ v du'], [15 * 60, 'ejercicios']] as const;
      chapters.forEach(([c, s]) => {
        const x = lerp(x0, x1, c / HIT_D);
        p.line(x, y - 18, x, y, rgba('muted', 0.6 * tk), 1);
        p.text(s, x + 6, y - 10, { size: 9.5 * (VERTICAL ? 1.4 : 1), color: rgba('muted', 0.8 * tk) });
      });
      const sp = this.signalPos(t);
      const played = clamp((Math.min(sp[0], x1) - x0) / (x1 - x0));
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      signalStroke(f, [x0 + ox, y, Math.min(sp[0], x1 + 400) + ox, y], 1, 1.6, 0.3);
      g.restore();
      const secs = Math.round(played * HIT_D);
      if (t < R.run[0]) {
        p.text(`${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`, sp[0], y - 40 * TS, { size: 13 * TS, weight: 500, color: rgba('bone'), align: 'center' });
        const lk = ease.outExpo(prog(t, R.scrub[1] - 0.1, R.scrub[1] + 0.3));
        if (lk > 0) {
          p.dashed(2, 3);
          p.lineK(sp[0], y - 56 * TS, sp[0], FRAME.y + FRAME.h + 4, lk, rgba('bone', 0.5), 1);
          p.solid();
        }
      }
    }

    const ak = prog(t, R.answer, R.answer + 0.45);
    if (ak > 0) {
      p.text('RESPUESTA', ANS.x, ANS.label, { size: 10.5 * TS, weight: 500, tracking: 0.14, color: rgba('muted', clamp(ak * 3)) });
      const l1 = 'Se explica en la Unidad 04,';
      const l2 = 'video 03, a partir de 11:42.';
      const k1 = clamp(ak * 2), k2 = clamp(ak * 2 - 1);
      p.typed(l1, k1, ANS.x - 4, ANS.l1, { fam: 'display', size: ANS.size, weight: 400, tracking: -0.02, color: rgba('bone') });
      p.typed(l2, k2, ANS.x - 4, ANS.l2, { fam: 'display', size: ANS.size, weight: 400, tracking: -0.02, color: rgba('bone') });
      const ck = ease.outExpo(prog(t, R.answer + 0.45, R.answer + 0.7));
      if (ck > 0) {
        const tag = '[ U04 · V03 · 11:42 ]';
        p.text(tag, ANS.x, ANS.tag, { size: 14 * TS, weight: 500, tracking: 0.04, color: rgba('signal', ck) });
        p.text('FUENTE CITADA', ANS.x, ANS.tagSub, { size: 9.5 * TS, tracking: 0.14, color: rgba('muted', ck) });
      }
    }

    const lk = ease.inOutCubic(prog(t, R.leader[0], R.leader[1]));
    if (lk > 0 && t < R.run[0] + 0.1) {
      const sx = TL.x0 + ((TL.x1 - TL.x0) * HIT_T) / HIT_D;
      const tagEnd = ANS.x + f.pen.width2('[ U04 · V03 · 11:42 ]', { size: 14 * TS, weight: 500, tracking: 0.04 }) + 12;
      const ty0 = ANS.tag - 5 * TS;
      const route = VERTICAL ? [tagEnd, ty0, 1040, ty0, 1040, TL.y - 70, sx, TL.y - 70, sx, TL.y - 8] : [400, 421, 540, 421, 540, 716, sx, 716, sx, TL.y - 8];
      const out: number[] = [];
      let L = 0;
      for (let i = 2; i < route.length; i += 2) L += Math.hypot(route[i] - route[i - 2], route[i + 1] - route[i - 1]);
      let acc = 0;
      out.push(route[0] + ox, route[1]);
      for (let i = 2; i < route.length; i += 2) {
        const l = Math.hypot(route[i] - route[i - 2], route[i + 1] - route[i - 1]);
        const k = clamp((lk * L - acc) / l);
        if (k <= 0) break;
        out.push(lerp(route[i - 2], route[i], k) + ox, lerp(route[i - 1], route[i + 1], k));
        acc += l;
      }
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      signalStroke(f, out, 1, 1.2, 0.25);
      g.restore();
      p.dot(route[0], route[1], 2.6, rgba('signal'));
      if (lk >= 1) p.dot(sx, TL.y - 8, 2.6, rgba('signal'));
    }

    const pk = prog(t, R.policy, R.policy + 0.4);
    if (pk > 0) {
      const rows: [string, string][] = [
        ['FUENTE', 'material del curso · Matemática II'],
        ['ACCESO', 'verificado · inscripción activa'],
        ['SIN FUENTE', 'no responde'],
        ['ENTREGAS', 'no resuelve trabajos evaluados'],
      ];
      rows.forEach(([k, v], i) => {
        const q = clamp(pk * 4 - i);
        p.text(k, POL.kx, POL.y + i * POL.dy, { size: 10 * TS, weight: 500, tracking: 0.1, color: rgba('bone', 0.85 * q) });
        p.typed(v, q, POL.vx, POL.y + i * POL.dy, { size: 10 * TS, tracking: 0.03, color: rgba('muted', q) });
      });
    }
    g.restore();

    const sp = this.signalPos(t);
    if (t >= R.morph[0] + 0.15) signalHead(f, sp[0] + ox, sp[1], 1, 1.2);
  }
}
