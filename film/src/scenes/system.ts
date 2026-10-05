import { Scene, type Frame } from '../engine/scene';
import { Cam3, Lines3, fillText3, glyphPath3, type Plane, type V3, fogK } from '../engine/space';
import { rgba } from '../engine/palette';
import { outline, font } from '../engine/type';
import { clamp, ease, lerp, prog, spring } from '../engine/math';
import { signalHead, signalStroke } from '../engine/signal';
import { VERTICAL, CX, CY } from '../engine/format';
import { FOCUS_SCREEN } from './fragments';
import {
  SYS, PILLARS, BOX_W, BOX_H, TAP, GATES, COURSE_LEN, FRAGS, STUDENTS, SELECTED, DATA_Y, DATA_X0, DATA_Z0, CELL_X, CELL_Z,
  bendAt, pathPoint, pathZ, pathTangent, headS, pillarFlat, studentFloor, studentCell, dropK,
} from './system-world';

const H0 = CY / Math.tan((15 * Math.PI) / 180);
const ORIGIN_SCREEN: [number, number] = FOCUS_SCREEN;

interface Orbit {
  tx: number;
  ty: number;
  tz: number;
  D: number;
  el: number;
  az: number;
  fov: number;
}

const blend = (a: Orbit, b: Orbit, k: number): Orbit => ({
  tx: lerp(a.tx, b.tx, k), ty: lerp(a.ty, b.ty, k), tz: lerp(a.tz, b.tz, k), D: lerp(a.D, b.D, k), el: lerp(a.el, b.el, k), az: lerp(a.az, b.az, k), fov: lerp(a.fov, b.fov, k),
});

const LET = { x: 1560, size: 250, depth: 46 };
const FLOOR_TXT = { x: 2330, size: 190 };
const DATA_TXT = { x: DATA_X0, z: DATA_Z0 - 210, size: 150 };

function letZ() {
  return pathZ(LET.x + 600, 1) - 330;
}

function stateTop(t: number): Orbit {
  const cut = ease.outQuart(prog(t, SYS.cut, SYS.cut + 0.95));
  let D = H0 * Math.exp(Math.log(0.03) * (1 - cut)) * lerp(1, 0.66, ease.inOutCubic(prog(t, 8.7, 9.6)));
  for (const s of SYS.snaps) D *= 1 - 0.012 * (spring(t - s, 3, 0.5) - spring(t - s - 0.12, 3, 0.5));
  const shift = ease.inOutCubic(prog(t, 8.9, 11.2));
  const k = D / H0;
  if (VERTICAL) {
    const c0x = (CY - ORIGIN_SCREEN[1]) * k, c0z = -(CX - ORIGIN_SCREEN[0]) * k;
    return { tx: lerp(c0x, 560, shift), ty: 0, tz: lerp(c0z, 0, shift), D: D * lerp(1, 0.92, shift), el: 90, az: 180, fov: 30 };
  }
  const c0x = (CX - ORIGIN_SCREEN[0]) * k, c0z = (CY - ORIGIN_SCREEN[1]) * k;
  return { tx: lerp(c0x, 540, shift), ty: 0, tz: lerp(c0z, 10, shift), D, el: 90, az: -90, fov: 30 };
}

function stateChase(t: number): Orbit {
  const s = headS(t);
  const p = pathPoint(s + 380, 1);
  const k = prog(t, 12.4, 13.4);
  if (VERTICAL) return { tx: p[0] - 120, ty: 30, tz: p[2], D: lerp(1250, 1050, k), el: lerp(30, 22, ease.inOutSine(k)), az: lerp(336, 326, k), fov: 58 };
  return { tx: p[0], ty: 30, tz: p[2], D: lerp(980, 820, k), el: lerp(26, 17, ease.inOutSine(k)), az: lerp(-24, -34, k), fov: 42 };
}

function stateMarca(t: number): Orbit {
  const k = ease.inOutSine(prog(t, 13.8, 15.2));
  if (VERTICAL) return { tx: LET.x + 470, ty: 260, tz: letZ() + 40, D: lerp(2050, 1930, k), el: lerp(4, 8, k), az: lerp(297, 302, k), fov: 58 };
  return { tx: LET.x + 690, ty: 105, tz: letZ() + 40, D: lerp(1380, 1290, k), el: lerp(5, 8, k), az: lerp(-63, -58, k), fov: 38 };
}

function stateAlumnos(t: number): Orbit {
  const k = ease.inOutSine(prog(t, 15.2, 16.6));
  if (VERTICAL) return { tx: FLOOR_TXT.x + 640 + 30 * k, ty: 0, tz: pathZ(FLOOR_TXT.x + 700, 1) - 40, D: lerp(2150, 2050, k), el: lerp(58, 62, k), az: lerp(274, 278, k), fov: 58 };
  return { tx: FLOOR_TXT.x + 700 + 60 * k, ty: 0, tz: pathZ(FLOOR_TXT.x + 700, 1) + 60, D: lerp(1480, 1400, k), el: lerp(54, 58, k), az: lerp(-86, -80, k), fov: 38 };
}

function stateDatos(t: number): Orbit {
  const k = ease.inOutSine(prog(t, 16.8, 17.6));
  if (VERTICAL) return { tx: DATA_X0 + 330, ty: DATA_Y, tz: DATA_Z0 + 60, D: lerp(1050, 980, k), el: lerp(40, 44, k), az: lerp(280, 284, k), fov: 62 };
  return { tx: DATA_X0 + 520, ty: DATA_Y, tz: DATA_Z0 + 170, D: lerp(760, 700, k), el: lerp(30, 32, k), az: lerp(-78, -74, k), fov: 44 };
}

function stateSelect(): Orbit {
  const c = studentCell(SELECTED);
  if (VERTICAL) return { tx: c[0], ty: c[1], tz: c[2], D: 14, el: 38, az: 286, fov: 62 };
  return { tx: c[0], ty: c[1], tz: c[2], D: 14, el: 34, az: -74, fov: 44 };
}

function orbitAt(t: number): Orbit {
  if (t < SYS.pitch[0]) return stateTop(t);
  if (t < SYS.pitch[1]) return blend(stateTop(SYS.pitch[0]), stateChase(t), ease.inOutCubic(prog(t, SYS.pitch[0], SYS.pitch[1])));
  if (t < 13.35) return stateChase(t);
  if (t < 13.95) return blend(stateChase(t), stateMarca(t), ease.outExpo(prog(t, 13.35, 13.9)));
  if (t < 14.85) return stateMarca(t);
  if (t < 15.4) return blend(stateMarca(t), stateAlumnos(t), ease.inOutCubic(prog(t, 14.85, 15.3)));
  if (t < 16.3) return stateAlumnos(t);
  if (t < 16.95) return blend(stateAlumnos(t), stateDatos(t), ease.inOutCubic(prog(t, 16.3, 16.9)));
  if (t < SYS.punch) return stateDatos(t);
  const a = stateDatos(t), b = stateSelect();
  const kp = ease.inOutCubic(prog(t, SYS.punch, SYS.end - 0.06));
  const o = blend(a, b, kp);
  o.D = Math.exp(lerp(Math.log(a.D), Math.log(b.D), ease.inQuart(prog(t, SYS.punch, SYS.end))));
  return o;
}

function applyOrbit(cam: Cam3, o: Orbit) {
  const el = (o.el * Math.PI) / 180, az = (o.az * Math.PI) / 180;
  const hx = Math.cos(az), hz = Math.sin(az);
  const f: V3 = [Math.cos(el) * hx, -Math.sin(el), Math.cos(el) * hz];
  const up: V3 = [Math.sin(el) * hx, Math.cos(el), Math.sin(el) * hz];
  const pos: V3 = [o.tx - f[0] * o.D, o.ty - f[1] * o.D, o.tz - f[2] * o.D];
  cam.set(pos, [o.tx, o.ty, o.tz], { fov: o.fov, up });
}

function rotY(v: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function rotX(v: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

export default class System extends Scene {
  cam = new Cam3(30, 2, 200000);
  L!: Lines3;

  init() {
    this.L = new Lines3(this.cam);
  }

  samples(t: number) {
    if (t < SYS.cut + 0.7) return 16;
    if (t > 13.3 && t < 13.95) return 20;
    if (t > 17.5) return 20;
    if (t > 11 && t < 12.5) return 12;
    return 10;
  }

  render(f: Frame) {
    const t = f.t;
    const cam = this.cam;
    applyOrbit(cam, orbitAt(t));
    const bend = bendAt(t);
    const fog = { near: 900, far: 5200, close: 30 };
    const L = this.L;
    const g = f.g;

    const gridK = ease.outCubic(prog(t, 8.25, 9.2));
    if (gridK > 0) {
      for (let x = -800; x <= 4200; x += 100) L.seg(x, 0, -1200, x, 0, 1200, 0.22 * gridK);
      for (let z = -1200; z <= 1200; z += 100) L.seg(-800, 0, z, 4200, 0, z, 0.22 * gridK);
      L.flush(g, 'iron', 1, fog);
    }

    this.axes(f, t, fog);
    this.nodes(f, t, bend, fog);
    this.gates(f, t, bend, fog);
    this.path(f, t, bend, fog);
    this.marca(f, t, fog);
    this.students(f, t, fog);
    this.overlay(f, t, bend);

    f.info.sheet = 'VL—02';
    f.info.title = t < 13.4 ? '/ SISTEMA · TOPOLOGÍA' : '/ SISTEMA · TU PLATAFORMA';
    f.info.hud = 1;
    const s = headS(t);
    const hp = t < SYS.travel[0] ? [this.spineHead(t), 0] : [s, pathZ(s, bend)];
    f.info.coords = [hp[0], -hp[1]];
  }

  spineHead(t: number) {
    if (t < SYS.cut + 0.5) return 0;
    let x = 0;
    const ss = SYS.snaps;
    for (let i = 0; i < ss.length; i++) {
      const a = i === 0 ? SYS.cut + 0.5 : ss[i - 1] + 0.05;
      const b = ss[i] - 0.02;
      const x0 = i === 0 ? 0 : PILLARS[i - 1].s;
      const x1 = PILLARS[i].s;
      if (t < b) return lerp(x0, x1, ease.inOutExpo(prog(t, a, b)));
      x = x1;
    }
    return lerp(x, COURSE_LEN, ease.outExpo(prog(t, ss[4] + 0.05, 12.2)));
  }

  axes(f: Frame, t: number, fog: { near: number; far: number }) {
    const L = this.L;
    const k = 1 - ease.inOutCubic(prog(t, 11.2, 12.2));
    if (k <= 0) return;
    const a0 = 1;
    L.seg(-6000, 0, 0, 0, 0, 0, 0.6 * k * a0);
    L.seg(0, 0, -6000, 0, 0, 6000, 0.6 * k * a0);
    for (let i = -120; i <= 120; i++) {
      if (i === 0) continue;
      const x = i * 10;
      const big = i % 10 === 0, mid = i % 5 === 0;
      const h = big ? 9 : mid ? 5 : 2.5;
      const a = (big ? 0.7 : mid ? 0.45 : 0.28) * k * a0;
      if (x < 0) L.seg(x, 0, -h, x, 0, h, a);
      L.seg(-h, 0, x, h, 0, x, a);
    }
    L.flush(f.g, 'bone', 1, fog);
    const cam = this.cam;
    const g = f.g;
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.font = font('mono', 9, 400);
    g.fillStyle = rgba('muted', 0.8 * k * a0);
    g.textAlign = 'center';
    const p0 = cam.project(0, 0, 0), p10 = cam.project(0, 0, 10);
    const step = p0 && p10 && Math.hypot(p10[0] - p0[0], p10[1] - p0[1]) > 70 ? 10 : 100;
    for (let i = -1200; i <= 1200; i += step) {
      if (i === 0) continue;
      const x = i;
      const p = cam.project(x < 0 ? x : 0, 0, x < 0 ? 0 : x);
      if (!p || p[0] < -50 || p[0] > 1970 || p[1] < -50 || p[1] > 1130) continue;
      if (x < 0) g.fillText(String(x).replace('-', '−'), p[0], p[1] + 22);
      else {
        g.textAlign = 'right';
        g.fillText(String(x), p[0] - 16, p[1] + 3);
        g.textAlign = 'center';
      }
    }
    const o = cam.project(0, 0, 0);
    if (o) {
      const lk = prog(t, SYS.cut + 0.15, SYS.cut + 0.5);
      g.textAlign = 'left';
      g.font = font('mono', 10.5, 500);
      g.letterSpacing = '1.2px';
      g.fillStyle = rgba('bone', 0.95 * k * lk);
      const tx = 'ORIGEN';
      g.fillText(tx.slice(0, Math.ceil(tx.length * lk)), o[0] + 16, o[1] - 34);
      g.font = font('mono', 10, 400);
      g.fillStyle = rgba('muted', 0.9 * k * lk);
      g.fillText('X 0.000   Z 0.000', o[0] + 16, o[1] - 18);
      g.letterSpacing = '0px';
    }
    g.restore();
  }

  box(f: Frame, pl: Plane, w: number, h: number, a: number, draw = 1) {
    const L = this.L;
    const P = (x: number, y: number): V3 => [pl.o[0] + pl.u[0] * x + pl.v[0] * y, pl.o[1] + pl.u[1] * x + pl.v[1] * y, pl.o[2] + pl.u[2] * x + pl.v[2] * y];
    const pts = [P(0, 0), P(w, 0), P(w, h), P(0, h)];
    const per = 2 * (w + h);
    let rem = draw * per;
    for (let i = 0; i < 4 && rem > 0; i++) {
      const A = pts[i], B = pts[(i + 1) % 4];
      const len = i % 2 === 0 ? w : h;
      const k = Math.min(1, rem / len);
      L.seg(A[0], A[1], A[2], lerp(A[0], B[0], k), lerp(A[1], B[1], k), lerp(A[2], B[2], k), a);
      rem -= len;
    }
  }

  nodes(f: Frame, t: number, bend: number, fog: { near: number; far: number }) {
    const g = f.g;
    const L = this.L;
    const cam = this.cam;
    const pitch = ease.inOutCubic(prog(t, SYS.pitch[0] + 0.1, SYS.pitch[1] - 0.1));
    const texts: { pl: Plane; s: string; fam: 'display' | 'mono'; size: number; w: number; x: number; y: number; a: number; tone: 'bone' | 'muted' | 'signal' }[] = [];

    FRAGS.forEach((n, i) => {
      const at = SYS.nodesIn + i * 0.0625;
      const appear = ease.outExpo(prog(t, at, at + 0.3));
      if (appear <= 0) return;
      const snapT = SYS.snaps[n.pillar];
      const k = spring(t - snapT, 2.6, 0.74);
      const kk = clamp(k);
      const target = VERTICAL ? { x: PILLARS[n.pillar].s, z: PILLARS[n.pillar].side * (TAP + BOX_W / 2) } : pillarFlat(n.pillar);
      const nx0 = VERTICAL ? n.z * 2.3 + 260 : n.x, nz0 = VERTICAL ? -(n.x - 120) * 0.75 : n.z;
      const cx = lerp(nx0, target.x, k), cz = lerp(nz0, target.z, k);
      const rot = n.rot * (1 - k);
      const w = lerp(n.w, BOX_W, kk), h = lerp(n.h, BOX_H, kk);
      const first = FRAGS.findIndex((m) => m.pillar === n.pillar) === i;
      if (kk > 0.97 && !first) return;
      if (t > SYS.snaps[4] + 0.3 && first) return;
      const u = rotY(VERTICAL ? [0, 0, -1] : [1, 0, 0], -rot), v = rotY(VERTICAL ? [1, 0, 0] : [0, 0, 1], -rot);
      const o: V3 = [cx - u[0] * w / 2 - v[0] * h / 2, 0, cz - u[2] * w / 2 - v[2] * h / 2];
      const pl: Plane = { o, u, v };
      const merged = kk > 0.6;
      this.box(f, pl, w, h, (merged ? 0.9 : 0.62) * appear, appear);
      if (!merged) {
        texts.push({ pl, s: n.name, fam: 'mono', size: 10.5, w, x: 8, y: 16, a: 0.9 * appear * (1 - kk / 0.6), tone: 'bone' });
        const wa = 0.42 * appear * (1 - clamp(kk * 2));
        if (wa > 0) {
          L.seg(0, 0, 0, cx, 0, 0, wa * 0.6);
          L.seg(cx, 0, 0, cx, 0, cz, wa);
        }
        if (n.name === 'ALUMNOS') {
          const d = 1 - kk;
          this.box(f, { o: [o[0] + 14 * d, 0, o[2] + 12 * d], u, v }, w, h, 0.4 * appear * d, 1);
        }
      }
    });

    PILLARS.forEach((p, i) => {
      const snapT = SYS.snaps[i];
      const k = ease.outExpo(prog(t, snapT - 0.02, snapT + 0.25));
      if (k <= 0) return;
      const sp = pathPoint(p.s, bend);
      const [tx, tz] = pathTangent(p.s, bend);
      const nx = -tz, nz = tx;
      const tapLen = TAP * lerp(1, 1.25, pitch);
      const tapEnd: V3 = [sp[0] + nx * p.side * tapLen * k, 0, sp[2] + nz * p.side * tapLen * k];
      L.seg(sp[0], 0, sp[2], tapEnd[0], 0, tapEnd[2], 0.8);
      const lk = spring(t - snapT - 0.04, 2.6, 0.74);
      if (lk < 0.6 && t < SYS.snaps[4] + 0.3) return;
      const ap = clamp((lk - 0.6) / 0.4);
      const flatO: V3 = VERTICAL ? [p.s - BOX_H / 2, 0, p.side < 0 ? -TAP : TAP + BOX_W] : [p.s - BOX_W / 2, 0, p.side < 0 ? -TAP - BOX_H : TAP];
      const stand = ease.inOutCubic(prog(t, SYS.pitch[0] + 0.25 + i * 0.08, SYS.pitch[1] + 0.1 + i * 0.08));
      const standO: V3 = [tapEnd[0], BOX_H + 10, tapEnd[2] - BOX_W / 2];
      const tilt = (Math.PI / 2) * stand, yaw = (-Math.PI / 2) * stand;
      let u = rotY([1, 0, 0], yaw);
      let v = rotY(rotX([0, 0, 1], tilt), yaw);
      if (VERTICAL) {
        const th = (Math.PI / 2) * stand, ph = Math.PI * stand;
        v = [Math.cos(th), -Math.sin(th), 0];
        const ur: V3 = [-Math.sin(ph), 0, -Math.cos(ph)];
        const d = ur[0] * v[0] + ur[1] * v[1] + ur[2] * v[2];
        const uo: V3 = [ur[0] - d * v[0], ur[1] - d * v[1], ur[2] - d * v[2]];
        const ul = Math.hypot(uo[0], uo[1], uo[2]) || 1;
        u = [uo[0] / ul, uo[1] / ul, uo[2] / ul];
      }
      const o: V3 = [lerp(flatO[0], standO[0], stand), lerp(flatO[1], standO[1], stand), lerp(flatO[2], standO[2], stand)];
      const pl: Plane = { o, u, v };
      const a = t < SYS.snaps[4] + 0.3 ? ap : 1;
      this.box(f, pl, BOX_W, BOX_H, 0.92 * a, 1);
      L.seg(o[0] + v[0] * 22, o[1] + v[1] * 22, o[2] + v[2] * 22, o[0] + v[0] * 22 + u[0] * BOX_W, o[1] + v[1] * 22 + u[1] * BOX_W, o[2] + v[2] * 22 + u[2] * BOX_W, 0.3 * a);
      texts.push({ pl, s: `0${i + 1}`, fam: 'mono', size: 10, w: BOX_W, x: 8, y: 15, a: 0.7 * a, tone: 'muted' });
      texts.push({ pl, s: p.name, fam: 'display', size: 17, w: BOX_W, x: 8, y: 44, a: a, tone: 'bone' });
      texts.push({ pl, s: p.sub, fam: 'mono', size: 8.5, w: BOX_W, x: 34, y: 15, a: 0.8 * a, tone: 'muted' });
      if (stand > 0.01) L.seg(tapEnd[0], 0, tapEnd[2], tapEnd[0], BOX_H + 10, tapEnd[2], 0.5 * stand);
    });

    L.flush(g, 'bone', 1, fog);

    for (const tx of texts) {
      if (tx.a <= 0.01) continue;
      const o = outline(tx.s, tx.fam, tx.size, tx.fam === 'display' ? 600 : 400, { tracking: tx.fam === 'mono' ? 0.06 : -0.01 });
      const d = cam.view(tx.pl.o[0], tx.pl.o[1], tx.pl.o[2]);
      const fk = fogK(-d[2], fog);
      fillText3(g, cam, tx.pl, o, rgba(tx.tone, tx.a * fk), tx.x, tx.y);
    }
  }

  gates(f: Frame, t: number, bend: number, fog: { near: number; far: number }) {
    const L = this.L;
    const cam = this.cam;
    const g = f.g;
    const s = headS(t);
    const labels: [V3, string, number, boolean][] = [];
    GATES.forEach((gs, k) => {
      const at = SYS.gates + k * 0.125;
      const rise = ease.outBack(clamp(prog(t, at, at + 0.35)));
      if (rise <= 0) return;
      const c = pathPoint(gs, bend);
      const [tx, tz] = pathTangent(gs, bend);
      const nx = -tz, nz = tx;
      const hw = 44, hh = 64 * rise;
      const passed = s > gs;
      const a = passed ? 0.95 : 0.45;
      const A: V3 = [c[0] - nx * hw, 0, c[2] - nz * hw];
      const B: V3 = [c[0] + nx * hw, 0, c[2] + nz * hw];
      L.seg(A[0], 0, A[2], A[0], hh, A[2], a);
      L.seg(B[0], 0, B[2], B[0], hh, B[2], a);
      L.seg(A[0], hh, A[2], B[0], hh, B[2], a);
      L.seg(A[0], hh - 10, A[2], B[0], hh - 10, B[2], a * 0.4);
      labels.push([[A[0], hh + 8, A[2]], `M0${k + 1}`, rise, passed]);
    });
    L.flush(g, 'bone', 1, fog);
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    for (const [p, s2, a, passed] of labels) {
      const pr = cam.project(p[0], p[1], p[2]);
      if (!pr) continue;
      const fk = fogK(pr[2], fog);
      g.font = font('mono', 10, passed ? 500 : 400);
      g.fillStyle = rgba(passed ? 'bone' : 'muted', a * fk);
      g.fillText(s2, pr[0], pr[1]);
    }
    g.restore();
  }

  path(f: Frame, t: number, bend: number, fog: { near: number; far: number }) {
    const cam = this.cam;
    const L = this.L;
    const g = f.g;
    const travelling = t >= SYS.travel[0];
    const head = travelling ? headS(t) : this.spineHead(t);
    if (t < SYS.cut + 0.5) {
      const o = cam.project(0, 0, 0);
      if (o) signalHead(f, o[0], o[1], 1, 1);
      return;
    }
    const ahead = travelling || t > SYS.snaps[4] ? 3800 : head;
    for (let s = 0; s < ahead; s += 20) {
      if (s + 20 <= head) continue;
      const a = pathPoint(s, bend), b = pathPoint(Math.min(ahead, s + 20), bend);
      L.seg(a[0], 0, a[2], b[0], 0, b[2], travelling ? 0.55 : 0.4);
    }
    L.flush(g, 'bone', 1, fog);

    const pts: number[] = [];
    const bone: number[] = [];
    const trail = travelling ? 1e9 : 170;
    for (let s = 0; s <= head + 0.01; s += 10) {
      const q = pathPoint(Math.min(s, head), bend);
      const pr = cam.project(q[0], q[1], q[2]);
      if (!pr) continue;
      if (head - s <= trail) pts.push(pr[0], pr[1]);
      if (head - s >= trail - 10) bone.push(pr[0], pr[1]);
    }
    const hp = pathPoint(head, bend);
    const hpr = cam.project(hp[0], hp[1], hp[2]);
    if (hpr) pts.push(hpr[0], hpr[1]);
    if (bone.length >= 4) {
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.strokeStyle = rgba('bone', 0.85);
      g.lineWidth = 1.2;
      g.beginPath();
      g.moveTo(bone[0], bone[1]);
      for (let i = 2; i < bone.length; i += 2) g.lineTo(bone[i], bone[i + 1]);
      g.stroke();
      g.restore();
    }
    signalStroke(f, pts, travelling ? 0.9 : 1, 1.4, 0.3);
    if (hpr && t < SYS.punch + 0.02) {
      const d = hpr[2];
      const sz = clamp(900 / d, 0.7, 1.4);
      signalHead(f, hpr[0], hpr[1], 1, sz);
    }
  }

  marca(f: Frame, t: number, fog: { near: number; far: number }) {
    const vis = prog(t, 13.3, 13.45) * (1 - prog(t, 16.2, 16.6));
    if (vis <= 0) return;
    const g = f.g;
    const cam = this.cam;
    const size = VERTICAL ? LET.size * 1.25 : LET.size;
    const lines = VERTICAL ? ['TU', 'MARCA.'] : ['TU MARCA.'];
    const outs = lines.map((l) => outline(l, 'display', size, 900, { tracking: -0.02 }));
    const o = outs[outs.length - 1];
    const z0 = letZ();
    const rise = (i: number) => ease.outExpo(prog(t, SYS.marca - 0.1 + i * 0.045, SYS.marca + 0.35 + i * 0.045));
    const entries: { gl: (typeof o.glyphs)[number]; i: number; up: number }[] = [];
    let gi = 0;
    outs.forEach((ol, li) => {
      const up = (outs.length - 1 - li) * size * 0.86;
      ol.glyphs.forEach((gl) => entries.push({ gl, i: gi++, up }));
    });
    const order = entries.map((e) => ({ ...e, d: cam.view(LET.x + (e.gl.box[0] + e.gl.box[2]) / 2, 100 + e.up, z0)[2] })).sort((a, b) => a.d - b.d);
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.lineJoin = 'round';
    for (const { gl, i, up } of order) {
      const r = rise(i);
      if (r <= 0 || !gl.contours.length) continue;
      const dep = LET.depth * r * (VERTICAL ? 1.3 : 1);
      const front: Plane = { o: [LET.x, up * r, z0], u: [1, 0, 0], v: [0, -r, 0] };
      const back: Plane = { o: [LET.x, up * r, z0 - dep], u: [1, 0, 0], v: [0, -r, 0] };
      const fa = fogK(-cam.view(LET.x + gl.x, 100, z0)[2], fog) * vis;
      g.beginPath();
      glyphPath3(g, cam, back, gl);
      g.strokeStyle = rgba('muted', 0.55 * fa);
      g.lineWidth = 1;
      g.stroke();
      g.beginPath();
      for (const c of gl.contours) {
        const n = c.length / 2;
        for (let j = 0; j < n - 1; j++) {
          const px = c[j * 2], py = c[j * 2 + 1];
          const qx = c[((j + 1) % n) * 2], qy = c[((j + 1) % n) * 2 + 1];
          const rx = c[((j - 1 + n) % n) * 2], ry = c[((j - 1 + n) % n) * 2 + 1];
          const a1 = Math.atan2(py - ry, px - rx), a2 = Math.atan2(qy - py, qx - px);
          let da = Math.abs(a2 - a1);
          if (da > Math.PI) da = 2 * Math.PI - da;
          if (da < 0.5) continue;
          const A = cam.project(LET.x + px, (up - py) * r, z0);
          const B = cam.project(LET.x + px, (up - py) * r, z0 - dep);
          if (!A || !B) continue;
          g.moveTo(A[0], A[1]);
          g.lineTo(B[0], B[1]);
        }
      }
      g.strokeStyle = rgba('muted', 0.7 * fa);
      g.stroke();
      g.beginPath();
      glyphPath3(g, cam, front, gl);
      g.fillStyle = rgba('bone', 0.96 * fa);
      g.fill('nonzero');
    }
    g.restore();
    const L = this.L;
    const bx = LET.x - 40, ex = LET.x + o.width + 40;
    const lk = ease.outExpo(prog(t, SYS.marca + 0.3, SYS.marca + 0.9));
    L.seg(bx, 0, z0 + 30, lerp(bx, ex, lk), 0, z0 + 30, 0.7 * vis);
    for (let x = bx; x <= lerp(bx, ex, lk); x += 50) L.seg(x, 0, z0 + 24, x, 0, z0 + 36, 0.5 * vis);
    L.seg(bx, 0, z0 + 20, bx, 0, z0 + 40, 0.8 * vis);
    L.flush(g, 'bone', 1, fog);
    const lp = cam.project(bx, 0, z0 + 60);
    if (lp && lk > 0.5) {
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.font = font('mono', 10, 400);
      g.letterSpacing = '1px';
      g.fillStyle = rgba('muted', vis * (lk - 0.5) * 2);
      g.fillText(`FACHADA · DOMINIO PROPIO · ${Math.round(o.width)} U`, lp[0], lp[1] + 14);
      g.restore();
    }
  }

  students(f: Frame, t: number, fog: { near: number; far: number }) {
    const vis = prog(t, 14.8, 15.1);
    if (vis <= 0) return;
    const g = f.g;
    const cam = this.cam;
    const L = this.L;
    const fsz = VERTICAL ? FLOOR_TXT.size * 1.3 : FLOOR_TXT.size;
    const floorLines = (VERTICAL ? ['TUS', 'ALUMNOS.'] : ['TUS ALUMNOS.']).map((l) => outline(l, 'display', fsz, 700, { tracking: -0.02 }));
    const floorTxt = floorLines[floorLines.length - 1];
    const fz = pathZ(FLOOR_TXT.x + floorTxt.width / 2, 1) - 70 - (floorLines.length - 1) * fsz * 0.5;
    const fk = ease.outExpo(prog(t, SYS.alumnos - 0.05, SYS.alumnos + 0.4));
    const floorFade = 1 - 0.75 * prog(t, SYS.datos + 0.2, SYS.datos + 0.6);
    if (fk > 0) {
      const pl: Plane = { o: [FLOOR_TXT.x, 0, fz], u: [1, 0, 0], v: [0, 0, 1] };
      let base = 0;
      const tot = floorLines.reduce((a, l) => a + l.glyphs.length, 0);
      floorLines.forEach((ol, li) => {
        const b0 = base;
        fillText3(g, cam, pl, ol, rgba('bone', 0.93 * floorFade), 0, li * fsz * 0.96, 1, (i) => b0 + i < Math.ceil(fk * tot));
        base += ol.glyphs.length;
      });
    }
    const dsz = VERTICAL ? DATA_TXT.size * 1.25 : DATA_TXT.size;
    const dataLines = (VERTICAL ? ['TUS', 'DATOS.'] : ['TUS DATOS.']).map((l) => outline(l, 'display', dsz, 700, { tracking: -0.02 }));
    const dk = ease.outExpo(prog(t, SYS.datos + 0.15, SYS.datos + 0.55));
    if (dk > 0) {
      const pl: Plane = { o: [DATA_TXT.x, DATA_Y, DATA_TXT.z - (dataLines.length - 1) * dsz * 0.96], u: [1, 0, 0], v: [0, 0, 1] };
      let base = 0;
      const tot = dataLines.reduce((a, l) => a + l.glyphs.length, 0);
      dataLines.forEach((ol, li) => {
        const b0 = base;
        fillText3(g, cam, pl, ol, rgba('bone', 0.95), 0, li * dsz * 0.96, 1, (i) => b0 + i < Math.ceil(dk * tot));
        base += ol.glyphs.length;
      });
    }

    const planeK = ease.outCubic(prog(t, SYS.datos, SYS.datos + 0.5));
    if (planeK > 0) {
      const x1 = DATA_X0 + 24 * CELL_X, z1 = DATA_Z0 + 30 * CELL_Z;
      for (let r = 0; r <= 30; r++) L.seg(DATA_X0 - 30, DATA_Y, DATA_Z0 + r * CELL_Z - 14, lerp(DATA_X0 - 30, x1, planeK), DATA_Y, DATA_Z0 + r * CELL_Z - 14, 0.16);
      L.seg(DATA_X0 - 30, DATA_Y, DATA_Z0 - 14, DATA_X0 - 30, DATA_Y, lerp(DATA_Z0 - 14, z1, planeK), 0.5);
      L.flush(g, 'bone', 1, fog);
    }

    const pts: number[][] = [[], [], [], []];
    const sel = SELECTED;
    let selP: [number, number, number] | null = null;
    for (let i = 0; i < STUDENTS.length; i++) {
      const st = STUDENTS[i];
      const born = SYS.alumnos - 0.1 + (i % 60) * 0.004;
      if (t < born) continue;
      const a = studentFloor(i, t);
      const k = dropK(i, t);
      const c = studentCell(i);
      const kd = clamp(k / 0.55), ks = ease.inOutCubic(clamp((k - 0.55) / 0.45));
      const p: [number, number, number] = [lerp(a[0], c[0], ks), lerp(0, DATA_Y, ease.inQuad(kd)), lerp(a[2], c[2], ks)];
      if (kd > 0 && kd < 1) L.seg(a[0], 0, a[2], a[0], p[1], a[2], 0.28);
      if (ks > 0 && ks < 1) L.seg(a[0], DATA_Y, a[2], p[0], DATA_Y, p[2], 0.18);
      if (k >= 1) {
        const bk = ease.outExpo(prog(t, SYS.datos + 0.5 + (i % 97) * 0.0045, SYS.datos + 0.9 + (i % 97) * 0.0045));
        L.seg(c[0] + 5, DATA_Y, c[2], c[0] + 5 + 30 * st.prog * bk, DATA_Y, c[2], 0.55);
        if (st.pay > 0.12) L.seg(c[0] + 5, DATA_Y, c[2] + 6, c[0] + 5 + 8 * bk, DATA_Y, c[2] + 6, 0.35);
        if (st.ev > 0.3) L.seg(c[0] + 16, DATA_Y, c[2] + 6, c[0] + 16 + 10 * st.ev * bk, DATA_Y, c[2] + 6, 0.35);
      }
      const pr = cam.project(p[0], p[1], p[2]);
      if (!pr) continue;
      if (i === sel && t > SYS.select) {
        selP = pr;
        continue;
      }
      const fa = fogK(pr[2], fog) * vis;
      const b = Math.min(3, Math.floor(fa * 4));
      pts[b].push(pr[0], pr[1], clamp(2600 / pr[2], 1.6, 4));
    }
    L.flush(g, 'bone', 1, fog);
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    pts.forEach((arr, b) => {
      g.fillStyle = rgba('bone', (b + 0.8) / 4);
      for (let i = 0; i < arr.length; i += 3) {
        const r = arr[i + 2];
        g.fillRect(arr[i] - r / 2, arr[i + 1] - r / 2, r, r);
      }
    });
    g.restore();
    if (selP) {
      const k = ease.outExpo(prog(t, SYS.select, SYS.select + 0.2));
      const grow = 1 + 2.2 * ease.inExpo(prog(t, SYS.punch + 0.15, SYS.end));
      signalHead(f, selP[0], selP[1], k, clamp(grow * clamp(700 / selP[2], 1, 1.5), 1, 3.2));
      const lk = prog(t, SYS.select + 0.05, SYS.select + 0.3) * (1 - prog(t, SYS.punch + 0.1, SYS.punch + 0.2));
      if (lk > 0) {
        const p = f.pen;
        g.save();
        g.setTransform(1, 0, 0, 1, 0, 0);
        p.u = 1;
        p.line(selP[0] + 8, selP[1] - 8, selP[0] + 60, selP[1] - 60, rgba('bone', 0.8 * lk), 1);
        p.line(selP[0] + 60, selP[1] - 60, selP[0] + 150, selP[1] - 60, rgba('bone', 0.8 * lk), 1);
        p.typed('A-18204', lk, selP[0] + 66, selP[1] - 68, { size: 11, weight: 500, tracking: 0.08, color: rgba('bone', 0.95) });
        p.typed('PROGRESO 0.62 · PAGO OK · TP 2/3', lk, selP[0] + 66, selP[1] - 44, { size: 9.5, tracking: 0.04, color: rgba('muted', 0.95) });
        g.restore();
      }
    }
  }

  overlay(f: Frame, t: number, bend: number) {
    const g = f.g;
    const p = f.pen;
    const cam = this.cam;
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    p.u = 1;
    const vis = prog(t, SYS.travel[0] + 0.05, SYS.travel[0] + 0.3) * (1 - prog(t, SYS.marca - 0.25, SYS.marca - 0.05));
    if (vis > 0) {
      const s = headS(t);
      const val = Math.min(1, s / COURSE_LEN);
      const hp = pathPoint(s, bend);
      const pr = cam.project(hp[0], hp[1], hp[2]);
      if (pr) {
        const x = pr[0] + 26, y = pr[1] - 96;
        p.line(pr[0] + 6, pr[1] - 6, x - 4, y + 18, rgba('bone', 0.5 * vis), 1);
        p.text('PROGRESO', x, y - 34, { size: 10, tracking: 0.12, color: rgba('muted', vis) });
        p.text(val.toFixed(2), x - 2, y + 4, { fam: 'display', size: 44, weight: 500, tracking: -0.02, color: rgba('bone', vis) });
        p.text('= s / L', x + 108, y + 4, { size: 10, color: rgba('muted', 0.8 * vis) });
        p.line(x, y + 16, x + 160, y + 16, rgba('muted', 0.5 * vis), 1);
        p.line(x, y + 16, x + 160 * val, y + 16, rgba('signal', vis), 1.5);
      }
    }
    g.restore();
  }
}
