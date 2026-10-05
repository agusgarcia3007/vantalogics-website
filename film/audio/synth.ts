import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { Bus, Reverb, SR, mulberry32, writeWav, buf, Biquad } from './dsp';
import { kick, tick, relay, sine, bell, impact, drone, whoosh, plotter, key, blip, reverseSwell, glide } from './instruments';
import { FRAG, DURATION, BEAT } from '../src/timeline/cues';
import { PRIMARY, DENSE, VERSIONS, GHOSTS } from '../src/scenes/fragments';
import { SYS, GATES } from '../src/scenes/system-world';
import { Q } from '../src/scenes/question';
import { R, passT } from '../src/scenes/retrieval';
import { V } from '../src/scenes/review';
import { SC, countAt } from '../src/scenes/scale';
import { E } from '../src/scenes/resolve';
import { CUT } from '../src/engine/format';
import { REEL, REEL_DURATION, reelInverse, HOOK } from '../src/timeline/reel';

const IS_REEL = CUT === 'reel';
const OUT_DUR = IS_REEL ? REEL_DURATION : DURATION;

class MappedBus extends Bus {
  writeRaw(t0: number, b: Float32Array, gain = 1, pan = 0) {
    super.write(t0, b, gain, pan);
  }

  write(t0: number, b: Float32Array, gain = 1, pan = 0) {
    if (!IS_REEL) return super.write(t0, b, gain, pan);
    const tau = reelInverse(t0);
    if (tau !== null) return super.write(tau, b, gain, pan);
    const first = REEL[0];
    const dur = b.length / SR;
    if (t0 < first[2] && t0 + dur > first[2]) {
      const off = Math.round((first[2] - t0) * SR);
      super.write(first[0], b.subarray(off), gain, pan);
    }
  }
}

const LEN = OUT_DUR + 0.5;
const dry = new MappedBus(LEN);
const wet = new MappedBus(LEN);
const sub = new MappedBus(LEN);
const r = mulberry32(7);

const D1 = 36.71, D2 = 73.42, F2 = 87.31, A2 = 110, C3 = 130.81, D3 = 146.83, E3 = 164.81, F3 = 174.61, Fs3 = 185, G3 = 196, A3 = 220, C4 = 261.63, D4 = 293.66, E4 = 329.63, Fs4 = 369.99, A4 = 440, E5 = 659.26, B5 = 987.77;

const send = (t: number, b: Float32Array, g: number, pan = 0, w = 0.25) => {
  dry.write(t, b, g, pan);
  if (w > 0) wet.write(t, b, g * w, pan);
};

const ACT1_END = FRAG.freeze;

send(0.0, buf(0.01), 0);
{
  const room = drone([55, 55.3], 7.5, 0.03, () => 400, (t) => Math.min(1, t / 2), 3);
  send(0, room, 0.4, 0, 0);
}
send(FRAG.marks, tick(0.25, 6200, 0.004, 2), 1, -0.6, 0.3);

const nodePitch = [1.0, 1.06, 0.94, 1.12, 0.89, 1.03, 0.97];
FRAG.nodes.forEach((t, i) => {
  send(t, relay(0.5, 10 + i, nodePitch[i]), 1, (i % 2 ? 0.35 : -0.35) * (0.4 + i * 0.1), 0.35);
  send(t, blip([880, 932, 830, 988, 784, 1047, 740][i], 0.07, 0.09), 1, 0, 0.6);
  sub.write(t + 0.01, kick(0.35, 70, 38, 0.12), 1);
});

PRIMARY.forEach((w, i) => {
  send(w.at, tick(0.35, 4200, 0.005, 30 + i), 1, (i % 3) * 0.3 - 0.3, 0.2);
  send(w.at, plotter(w.dur, (t) => Math.sin((Math.PI * t) / w.dur), 0.05, 40 + i, 1800), 1, 0.2 - (i % 2) * 0.4, 0.15);
  if (w.kind === 'dead') send(w.at + w.dur, tick(0.4, 1700, 0.012, 50 + i, 3), 1, 0, 0.2);
});
FRAG.notes.forEach((t, i) => {
  send(t, tick(0.4, 3000, 0.006, 60 + i), 1, -0.2, 0.2);
  send(t + 0.05, tick(0.3, 3000, 0.006, 70 + i), 1, 0.2, 0.2);
  send(t + 0.03, blip(1046.5, 0.06, 0.08), 1, -0.3, 0.4);
  send(t + 0.03, blip(1108.7, 0.06, 0.08), 1, 0.3, 0.4);
});
send(FRAG.notes[1] + 0.02, relay(0.35, 90, 0.8), 1, -0.7, 0.2);
send(FRAG.notes[1] + 0.05, relay(0.35, 91, 0.82), 1, 0.7, 0.2);

DENSE.forEach((w, i) => {
  const t = w.at;
  if (t >= ACT1_END) return;
  send(t, tick(0.18 + r() * 0.12, 2500 + r() * 5000, 0.004, 100 + i), 1, r() * 1.6 - 0.8, 0.25);
  if (w.kind === 'dead' && w.at + w.dur < ACT1_END) send(w.at + w.dur, tick(0.15, 1500, 0.01, 200 + i, 3), 1, r() - 0.5, 0.2);
});
[...VERSIONS.map((v) => v.at), ...GHOSTS.map((g) => g.at)].forEach((t, i) => {
  if (t < ACT1_END) send(t, relay(0.2, 300 + i, 0.7 + r() * 0.6), 1, r() * 1.4 - 0.7, 0.3);
});
{
  const t0 = FRAG.wires;
  const len = ACT1_END - t0;
  const d = drone([D2, D2 * 1.059, D3 * 1.004, A2 * 0.997], len, 0.2, (t) => 250 + 1600 * Math.pow(t / len, 2), (t) => Math.pow(t / len, 1.6), 5);
  send(t0, d, 1, 0, 0.3);
  const hi = drone([1174.7, 1244.5], len, 0.02, () => 5000, (t) => Math.pow(t / len, 3), 6);
  send(t0, hi, 1, 0, 0.5);
  for (let k = 0; k < 90; k++) {
    const u = Math.pow(r(), 0.5);
    const t = FRAG.dense + u * (ACT1_END - FRAG.dense - 0.05);
    send(t, tick(0.1 + 0.15 * u, 3000 + r() * 6000, 0.003, 400 + k), 1, r() * 1.8 - 0.9, 0.15);
  }
}
{
  const len = FRAG.signalStop - FRAG.signalIn + 0.25;
  send(FRAG.signalIn, plotter(len, (t) => Math.max(0, 1.3 * Math.pow(1 - t / len, 2)), 0.28, 500, 1100), 1, -0.3, 0.15);
  send(FRAG.signalIn, glide([[0, 1760], [len * 0.9, 880], [len + 0.3, 880]], len + 0.3, 0.035), 1, 0, 0.4);
  send(FRAG.signalStop, tick(0.4, 5000, 0.004, 510), 1, 0, 0.3);
  send(7.62, blip(1760, 0.05, 0.12), 1, 0, 0.6);
}

const hardCut = (t0: number, t1: number) => {
  const a = Math.round(t0 * SR), b = Math.round(t1 * SR), fade = Math.round(0.006 * SR);
  for (const bus of [dry, wet, sub]) {
    for (let i = a; i < b && i < bus.L.length; i++) {
      const g = i < a + fade ? 1 - (i - a) / fade : 0;
      bus.L[i] *= g;
      bus.R[i] *= g;
    }
  }
};

const cutAt = SYS.cut;
function afterCut() {
  send(cutAt, impact([D2, A2, D3, F3, A3], 0.7, 4, 1), 1, 0, 0.5);
  sub.write(cutAt, kick(1.2, 120, 34, 0.9), 1);
  send(cutAt, tick(0.8, 7000, 0.003, 600), 1, 0, 0.2);

  const pulseBeats: number[] = [];
  for (let t = 9; t < 13.49; t += BEAT) pulseBeats.push(t);
  for (let t = 13.5; t < 17.49; t += BEAT) pulseBeats.push(t);
  pulseBeats.forEach((t) => sub.write(t, kick(0.75, 105, 40, 0.26), 1));
  for (let t = 9; t < 17.5; t += BEAT / 4) {
    const s = Math.round((t - 9) / (BEAT / 4)) % 4;
    if (s === 0) continue;
    send(t, tick(s === 2 ? 0.2 : 0.09, 7800, 0.004, 700 + Math.round(t * 100)), 1, s === 2 ? 0.25 : -0.25, 0.1);
  }
  const bassNotes = [D2, D2, F2, C3 / 2, D2];
  for (let b = 0; b < 5; b++) {
    const t = 9 + b * 2 - (b > 2 ? 0 : 0);
    if (t >= 17.5) break;
    send(t, sine(bassNotes[b % bassNotes.length], 2, 0.16, 0.02, 1.2), 1, 0, 0);
  }
  SYS.snaps.forEach((t, i) => {
    send(t, relay(0.8, 800 + i, 1 - i * 0.03), 1, -0.3 + i * 0.15, 0.35);
    send(t, bell([D4, F3 * 2, A4, C4 * 2, D4 * 2][i] / 2, 1.2, 0.08, 2, 1.5, 0.5), 1, -0.3 + i * 0.15, 0.5);
  });
  send(SYS.nodesIn, whoosh(0.5, 900, 4000, 0.05, 810), 1, 0, 0.3);
  FRAGS_IN.forEach((t, i) => send(t, tick(0.2, 5000 + i * 300, 0.004, 820 + i), 1, (i % 2) * 0.6 - 0.3, 0.2));
  send(SYS.pitch[0], whoosh(1.5, 120, 900, 0.18, 830, (k) => Math.sin(Math.PI * Math.min(1, k * 1.2)) ** 2), 1, 0, 0.4);
  send(SYS.pitch[0], sine(D1 * 2, 1.6, 0.18, 0.4, 0.8), 1, 0, 0);
  GATES.forEach((_, k) => {
    const t = SYS.gates + k * 0.125;
    send(t, blip([D4, E4, F3 * 2, A4, C4 * 2, D4 * 2, E4 * 2, A4 * 2][k], 0.05, 0.12), 1, -0.5 + k * 0.14, 0.4);
    send(t, tick(0.25, 6000, 0.004, 840 + k), 1, -0.5 + k * 0.14, 0.2);
  });
  send(SYS.travel[0], plotter(SYS.travel[1] - SYS.travel[0], (t) => Math.sin((Math.PI * t) / 1.4) * 1.1, 0.16, 850, 1300), 1, 0, 0.2);

  const hits: [number, number[]][] = [
    [SYS.marca, [D2, D3, F3, A3, D4]],
    [SYS.alumnos, [F2, C3, F3, A3, E4]],
    [SYS.datos, [A2 / 1, E3, G3, C4, E4]],
  ];
  hits.forEach(([t, f], i) => {
    send(t, impact(f, 0.55, 3, 10 + i), 1, 0, 0.55);
    sub.write(t, kick(1.0, 115, 36, 0.5), 1);
  });
  for (let k = 0; k < 140; k++) {
    const t = SYS.alumnos + 0.1 + r() * 1.35;
    send(t, blip(2400 + r() * 3000, 0.018, 0.02), 1, r() * 2 - 1, 0.3);
  }
  for (let k = 0; k < 110; k++) {
    const u = r();
    const t = SYS.datos + 0.05 + u * 0.95;
    send(t, blip(3200 - 1800 * u + r() * 300, 0.02, 0.025, 0.7), 1, r() * 1.6 - 0.8, 0.25);
  }
  send(SYS.select, blip(1760, 0.08, 0.15), 1, 0.2, 0.5);
  send(SYS.select, tick(0.5, 6000, 0.004, 900), 1, 0.2, 0.2);
  send(SYS.punch - 0.05, reverseSwell([D4, A4], SYS.end - SYS.punch + 0.05, 0.25, 910), 1, 0, 0.2);
}
const FRAGS_IN = Array.from({ length: 8 }, (_, i) => SYS.nodesIn + i * 0.0625);

function actThree() {
  send(Q.start, drone([D2, A2 * 1.002], 3, 0.06, () => 500, (t) => Math.min(1, t / 0.4) * (t < 2.7 ? 1 : Math.max(0, (3 - t) / 0.3)), 20), 1, 0, 0.4);
  send(Q.start, blip(1760, 0.05, 0.1, 0.5), 1, 0, 0.5);
  const chars = '¿Dónde explicaba integración por partes?'.length;
  for (let i = 0; i < chars; i++) {
    const t = Q.type[0] + (i / chars) * (Q.type[1] - Q.type[0]);
    send(t + (r() - 0.5) * 0.008, key(0.35 + r() * 0.1, 1000 + i), 1, -0.4 + (i / chars) * 0.8, 0.2);
  }
  send(Q.parse, whoosh(0.25, 2000, 5000, 0.05, 1100), 1, 0, 0.3);
  Q.labels.forEach((t, i) => send(t, blip([A4, C4 * 2, E4 * 2][i], 0.07, 0.08), 1, -0.4 + i * 0.4, 0.4));
  Q.labels.forEach((t, i) => send(t, tick(0.3, 5500, 0.004, 1110 + i), 1, -0.4 + i * 0.4, 0.2));
  send(Q.collapse, whoosh(0.3, 5000, 900, 0.07, 1120), 1, 0, 0.3);
  send(Q.vector, blip(600, 0.12, 0.14, 3), 1, 0, 0.4);
  send(Q.vector, tick(0.4, 4500, 0.005, 1130), 1, 0, 0.2);
  send(Q.launch - 0.1, reverseSwell([D3, A3], Q.end - Q.launch + 0.1, 0.25, 1140), 1, 0, 0.3);

  send(R.start, whoosh(2.4, 3000, 400, 0.22, 1200, (k) => Math.pow(1 - k, 1.5) * Math.min(1, k * 20)), 1, 0, 0.3);
  sub.write(R.start, kick(0.9, 110, 38, 0.4), 1);
  [0, 1, 2].forEach((k) => {
    const t = passT(k);
    sub.write(t, kick(0.55, 90, 40, 0.18), 1);
    send(t, tick(0.4, 3500, 0.01, 1210 + k, 2), 1, k % 2 ? 0.4 : -0.4, 0.3);
    send(t - 0.03, whoosh(0.18, 800, 3000, 0.12, 1215 + k), 1, 0, 0.2);
  });
  for (let k = 0; k < 5; k++) send(22.55 + k * 0.12, blip(1318 + k * 110, 0.035, 0.05), 1, -0.4 + k * 0.2, 0.4);
  send(R.hit, bell(E5, 3, 0.2, 1.0, 1.6, 1.4), 1, 0.15, 0.7);
  send(R.hit, bell(B5, 3, 0.08, 2.0, 1.2, 1.0), 1, -0.15, 0.7);
  send(R.hit, sine(E3, 2.5, 0.12, 0.01, 1.5), 1, 0, 0.3);
  sub.write(R.hit, kick(0.6, 90, 40, 0.3), 1);
  send(R.morph[0], whoosh(0.6, 600, 2500, 0.08, 1230), 1, 0.3, 0.3);
  send(R.scrub[0], plotter(R.scrub[1] - R.scrub[0], (t) => 1.2 * Math.pow(1 - t / 0.55, 2), 0.2, 1240, 2000), 1, -0.2, 0.2);
  send(R.scrub[1] - 0.05, tick(0.5, 5200, 0.004, 1245), 1, 0, 0.2);
  const words = 'Se explica en la Unidad 04, video 03, a partir de 11:42.'.length;
  for (let i = 0; i < words; i += 2) {
    const t = R.answer + (i / words) * 0.45;
    send(t, key(0.18, 1300 + i), 1, -0.6 + (i / words) * 0.5, 0.2);
  }
  send(R.answer + 0.47, tick(0.5, 4800, 0.005, 1350), 1, -0.5, 0.2);
  send(R.leader[0], plotter(R.leader[1] - R.leader[0], (t) => Math.sin((Math.PI * t) / 0.5), 0.12, 1360, 2400), 1, 0, 0.2);
  send(R.leader[1], blip(E5, 0.09, 0.2), 1, 0, 0.5);
  for (let i = 0; i < 4; i++) send(R.policy + i * 0.1, tick(0.2, 6000, 0.004, 1370 + i), 1, -0.6, 0.15);
  for (let t = 23.5; t < 26.3; t += BEAT) sub.write(t, kick(0.35, 90, 40, 0.2), 1);
  send(R.run[0], plotter(0.5, (t) => Math.min(1.4, t * 4), 0.2, 1380, 1600), 1, 0.4, 0.2);
  send(R.whip[0], whoosh(0.45, 400, 6000, 0.3, 1390, (k) => Math.sin(Math.PI * k) ** 1.5), 1, 0.3, 0.3);

  send(V.enter[0], plotter(V.enter[1] - V.enter[0], () => 0.9, 0.12, 1400, 1300), 1, -0.5, 0.2);
  sub.write(V.enter[1], kick(0.5, 90, 40, 0.2), 1);
  for (let i = 0; i < 4; i++) {
    send(V.analysis[0] + i * 0.1, tick(0.35, 3800 + i * 400, 0.006, 1410 + i), 1, -0.1, 0.2);
    send(V.analysis[0] + i * 0.1 + 0.05, blip([D4, F3 * 2, A4, D4 * 2][i], 0.04, 0.08), 1, -0.1, 0.4);
  }
  send(V.analysis[1] - 0.05, bell(A4, 1.2, 0.07, 2, 1, 0.5), 1, 0, 0.4);
  send(V.toSwitch[0], plotter(V.toSwitch[1] - V.toSwitch[0], () => 1, 0.1, 1420, 1500), 1, 0.2, 0.2);
  send(V.toSwitch[1], tick(0.5, 2500, 0.01, 1430, 3), 1, 0.2, 0.3);
  {
    const hold = V.approve - V.toSwitch[1];
    const h = buf(hold + 0.05);
    for (let i = 0; i < h.length; i++) {
      const t = i / SR;
      h[i] = Math.sin(2 * Math.PI * D4 * t) * 0.05 * (0.6 + 0.4 * Math.cos(2 * Math.PI * 4 * t)) * Math.min(1, t / 0.1);
    }
    send(V.toSwitch[1], h, 1, 0.2, 0.5);
  }
  send(V.approve, relay(1.4, 1440, 0.72), 1, 0.2, 0.35);
  send(V.approve + 0.012, relay(0.8, 1441, 0.6), 1, 0.2, 0.3);
  send(V.approve, impact([D3, Fs3, A3, D4, Fs4], 0.5, 3, 30), 1, 0.1, 0.5);
  sub.write(V.approve, kick(1.1, 110, 36, 0.45), 1);
  send(V.toRecord[0], plotter(V.toRecord[1] - V.toRecord[0], () => 1, 0.12, 1450, 1500), 1, 0.5, 0.2);
  send(V.record, tick(0.5, 4200, 0.006, 1460), 1, 0.5, 0.2);
  for (let t = V.approve + BEAT; t < 29.7; t += BEAT) sub.write(t, kick(0.5, 100, 40, 0.22), 1);
  send(V.back[0], plotter(V.back[1] - V.back[0], (t) => Math.sin((Math.PI * t) / 0.6), 0.14, 1470, 1200), 1, -0.2, 0.2);
  send(V.back[1], bell(D4 * 2, 2, 0.12, 1.0, 1.2, 1.0), 1, -0.3, 0.6);
  send(V.shrink[0] - 0.05, reverseSwell([D3, A3], V.shrink[1] - V.shrink[0] + 0.05, 0.25, 1480), 1, 0, 0.3);
}

function actFour() {
  sub.write(SC.start, kick(1.1, 120, 36, 0.5), 1);
  send(SC.start, impact([D2, A2, D3], 0.35, 2, 40), 1, 0, 0.4);
  let last = 0;
  for (let t = SC.count[0]; t < SC.count[1]; t += 1 / 400) {
    const n = countAt(t);
    const dn = n - last;
    last = n;
    const p = Math.min(1, dn / 12);
    if (dn > 0 && r() < 0.15 + 0.85 * p) {
      const u = (t - SC.count[0]) / (SC.count[1] - SC.count[0]);
      send(t, blip(1800 + 2600 * u + r() * 400, 0.012 + 0.012 * u, 0.012), 1, r() * 1.6 - 0.8, 0.25);
    }
  }
  send(SC.count[0], whoosh(SC.count[1] - SC.count[0], 300, 5000, 0.1, 1500, (k) => Math.pow(k, 2)), 1, 0, 0.3);
  for (let t = 31; t < 36; t += BEAT) {
    if (Math.abs(t - SC.plus) < 0.1) continue;
    sub.write(t, kick(t < 33 ? 0.5 : 0.75, 105, 40, 0.24), 1);
  }
  for (let t = 31; t < 36; t += BEAT / 4) {
    const s = Math.round((t - 31) / (BEAT / 4)) % 4;
    if (s === 0 || (t > 32.9 && t < 33.3)) continue;
    send(t, tick(s === 2 ? 0.18 : 0.07, 8000, 0.004, 1600 + Math.round(t * 100)), 1, s === 2 ? 0.25 : -0.25, 0.1);
  }
  send(SC.plus, impact([D2, D3, A3, D4, E4], 0.7, 3, 50), 1, 0, 0.5);
  sub.write(SC.plus, kick(1.3, 125, 34, 0.7), 1);
  send(SC.detach[1], tick(0.4, 4200, 0.005, 1700), 1, -0.4, 0.2);
  send(SC.words[0], key(0.3, 1710), 1, -0.4, 0.2);
  send(SC.words[0] + 0.15, key(0.25, 1711), 1, -0.4, 0.2);
  [D2, D2, F2, C3 / 2].forEach((f, i) => send(33 + i * 0.75, sine(f, 1, 0.15, 0.02, 0.6), 1, 0, 0));
  send(33.5, drone([D3, A3, E4], 2.6, 0.05, (t) => 600 + 900 * t, (t) => Math.min(1, t / 1.2), 51), 1, 0, 0.5);
}

function actFive() {
  send(E.start, reverseSwell([D3, A3, D4], E.contract[1] - E.start, 0.3, 1800), 1, 0, 0.5);
  send(E.spokes[1] - 0.05, relay(0.5, 1810, 0.9), 1, 0, 0.3);
  send(E.merge[1] - 0.03, relay(0.5, 1811, 0.8), 1, 0, 0.3);
  send(E.contract[1] - 0.01, tick(0.7, 6000, 0.004, 1820), 1, 0, 0.3);
  const f = (y: number) => 880 * Math.pow(2, -y / 510);
  const Vt = E.traceV, At = E.traceA;
  const pts: [number, number][] = [];
  const add = (t0: number, t1: number, ys: number[]) => {
    for (let k = 0; k <= 20; k++) {
      const u = k / 20;
      const e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
      const seg = e * 2;
      const i = Math.min(1, Math.floor(seg));
      const q = seg - i;
      const y = ys[i] + (ys[i + 1] - ys[i]) * q;
      pts.push([t0 + u * (t1 - t0) - Vt[0], f(y)]);
    }
  };
  add(Vt[0], Vt[1], [0, 488, 0]);
  add(At[0], At[1], [510, 22, 510]);
  send(Vt[0], glide(pts, At[1] - Vt[0] + 0.1, 0.06), 1, 0, 0.5);
  sub.write(E.widenV[0], kick(0.7, 100, 38, 0.3), 1);
  send(E.widenV[0], bell(D3, 1.5, 0.12, 1.0, 1.0, 0.8), 1, -0.2, 0.4);
  sub.write(E.widenA[0], kick(0.8, 100, 36, 0.35), 1);
  send(E.widenA[0], bell(A3, 1.5, 0.12, 1.0, 1.0, 0.8), 1, 0.2, 0.4);
  for (let i = 0; i < 11; i++) {
    const t = E.word[0] + 0.12 + (i / 11) * (E.word[1] - E.word[0] - 0.15);
    send(t, relay(0.22, 1900 + i, 1.2 - i * 0.02), 1, -0.5 + i * 0.1, 0.25);
  }
  send(E.drop[0], plotter(E.drop[1] - E.drop[0], (t) => Math.sin((Math.PI * t) / 0.65), 0.1, 1950, 1200), 1, 0, 0.2);
  send(E.desc, tick(0.3, 5000, 0.004, 1960), 1, -0.4, 0.2);
  const n = 'Construimos la inteligencia detrás de los productos educativos'.length;
  for (let i = 0; i < n; i++) {
    const t = E.tagline[0] + (i / n) * (E.tagline[1] - E.tagline[0]);
    send(t, key(0.2 + r() * 0.06, 2000 + i), 1, -0.5 + (i / n) * 0.6, 0.2);
  }
  send(E.period, impact([D2, A2, D3, Fs3, A3, E4], 0.6, 4.6, 60), 1, 0, 0.6);
  sub.write(E.period, kick(1.1, 110, 34, 0.9), 1);
  send(E.period, sine(D1 * 2, 4, 0.2, 0.01, 2.2), 1, 0, 0);
  send(E.url, tick(0.25, 5200, 0.004, 2100), 1, -0.4, 0.2);
}

function beds() {
  const pad = (t0: number, t1: number, f: number[], amp: number, c0: number, c1: number, seed: number, fadeIn = 0.4, fadeOut = 0.3) => {
    const len = t1 - t0;
    const d = drone(f, len, amp, (t) => c0 + (c1 - c0) * (t / len), (t) => Math.min(1, t / fadeIn) * Math.min(1, (len - t) / fadeOut), seed);
    send(t0, d, 1, 0, 0.45);
  };
  pad(8.2, 13.5, [D3, A3 * 1.003, D3 * 0.997], 0.05, 300, 1100, 70, 1.2, 0.2);
  pad(13.5, 17.62, [D3, F3 * 1.002, A3, C4 * 0.998], 0.05, 700, 1500, 71, 0.1, 0.3);
  pad(23.3, 26.3, [E3, B5 / 4, E4 * 1.002], 0.035, 600, 900, 72, 0.3, 0.3);
  pad(28.5, 29.9, [D3, Fs3, A3 * 1.002], 0.05, 900, 1400, 73, 0.05, 0.3);
  pad(30.0, 33.08, [D3, A3], 0.04, 300, 1600, 74, 0.5, 0.05);
}

afterCut();
beds();
actThree();
actFour();
actFive();
if (IS_REEL) {
  hardCut(reelInverse(FRAG.freeze) ?? 2.55, REEL[3][0]);
  dry.writeRaw(HOOK.line1, impact([D2, A2, D3, F3], 0.55, 2.2, 90), 1, 0);
  wet.writeRaw(HOOK.line1, impact([D2, A2, D3, F3], 0.55, 2.2, 90), 0.4, 0);
  sub.writeRaw(HOOK.line1, kick(1.2, 120, 34, 0.6), 1);
  dry.writeRaw(HOOK.line1, tick(0.9, 6500, 0.004, 91), 1, 0);
  dry.writeRaw(HOOK.line2, relay(1.1, 92, 0.8), 1, 0.1);
  sub.writeRaw(HOOK.line2, kick(0.9, 110, 38, 0.3), 1);
  dry.writeRaw(HOOK.line2, bell(A3, 1.5, 0.12, 1.0, 1.0, 0.8), 1, 0);
} else hardCut(FRAG.freeze, cutAt);

const master = new Bus(LEN);
dry.mixInto(master, 1);
const subLp = [Biquad.make('lp', 160), Biquad.make('lp', 160)];
for (let i = 0; i < sub.L.length; i++) {
  master.L[i] += subLp[0].run(sub.L[i]) * 0.72;
  master.R[i] += subLp[1].run(sub.R[i]) * 0.72;
}
const rvL = new Reverb(1, 0.86, 0.3, 0), rvR = new Reverb(1, 0.86, 0.3, 23);
const hpL = Biquad.make('hp', 180), hpR = Biquad.make('hp', 180);
for (let i = 0; i < wet.L.length; i++) {
  const x = (wet.L[i] + wet.R[i]) * 0.5;
  master.L[i] += hpL.run(rvL.run(x)) * 0.55;
  master.R[i] += hpR.run(rvR.run(x)) * 0.55;
}
const dcL = Biquad.make('hp', 22), dcR = Biquad.make('hp', 22);
let peak = 0;
for (let i = 0; i < master.L.length; i++) {
  master.L[i] = dcL.run(master.L[i]);
  master.R[i] = dcR.run(master.R[i]);
  peak = Math.max(peak, Math.abs(master.L[i]), Math.abs(master.R[i]));
}
const pre = 1.25 / peak;
let peak2 = 0;
for (let i = 0; i < master.L.length; i++) {
  master.L[i] = Math.tanh(master.L[i] * pre);
  master.R[i] = Math.tanh(master.R[i] * pre);
  peak2 = Math.max(peak2, Math.abs(master.L[i]), Math.abs(master.R[i]));
}
const norm = 0.89 / peak2;
const tailStart = Math.round((OUT_DUR - 0.4) * SR);
for (let i = 0; i < master.L.length; i++) {
  const g = i < tailStart ? 1 : Math.max(0, 1 - (i - tailStart) / (0.4 * SR));
  master.L[i] *= norm * g;
  master.R[i] *= norm * g;
}
const out = path.join(import.meta.dir, '..', 'public', 'audio');
mkdirSync(out, { recursive: true });
await writeWav(path.join(out, IS_REEL ? 'vantalogics-reel.wav' : 'vantalogics.wav'), master.L.subarray(0, Math.round(OUT_DUR * SR)), master.R.subarray(0, Math.round(OUT_DUR * SR)));
console.log(`wrote ${IS_REEL ? 'reel' : 'film'} audio  peak ${peak.toFixed(3)} → ${peak2.toFixed(3)}`);
