import { SR, Biquad, buf, noise, envExp, envAR, mulberry32 } from './dsp';

const TAU = Math.PI * 2;

export function kick(amp = 1, f0 = 110, f1 = 42, decay = 0.32) {
  const b = buf(decay * 4);
  let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const f = f1 + (f0 - f1) * Math.exp(-t / 0.035);
    ph += (TAU * f) / SR;
    b[i] = Math.sin(ph) * Math.exp(-t / decay) * amp;
  }
  const c = noise(0.004, 3);
  const hp = Biquad.make('hp', 2500);
  for (let i = 0; i < c.length; i++) b[i] += hp.run(c[i]) * amp * 0.25 * (1 - i / c.length);
  return b;
}

export function tick(amp = 1, freq = 5200, len = 0.006, seed = 1, q = 1.6) {
  const b = noise(len, seed);
  const bp = Biquad.make('bp', freq, q);
  bp.process(b);
  envExp(b, 0.0003, len / 3);
  for (let i = 0; i < b.length; i++) b[i] *= amp * 3;
  return b;
}

export function relay(amp = 1, seed = 1, pitch = 1) {
  const b = buf(0.12);
  const r = mulberry32(seed);
  const hits = [0, 0.009 + r() * 0.004];
  for (const [k, h] of hits.entries()) {
    const n = noise(0.012, seed * 7 + k);
    const bp = Biquad.make('bp', 2300 * pitch * (k ? 1.18 : 1), 7);
    bp.process(n);
    envExp(n, 0.0002, 0.0025);
    const off = Math.round(h * SR);
    for (let i = 0; i < n.length && off + i < b.length; i++) b[off + i] += n[i] * (k ? 0.6 : 1) * 5;
    for (let i = 0; off + i < b.length && i < 0.04 * SR; i++) {
      const t = i / SR;
      b[off + i] += Math.sin(TAU * 1150 * pitch * t) * Math.exp(-t / 0.012) * 0.25 * (k ? 0.5 : 1);
    }
  }
  for (let i = 0; i < b.length; i++) b[i] *= amp;
  return b;
}

export function sine(freq: number, seconds: number, amp = 1, attack = 0.005, decay = 1, vib = 0) {
  const b = buf(seconds);
  let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const f = freq * (1 + vib * Math.sin(TAU * 5.2 * t));
    ph += (TAU * f) / SR;
    b[i] = Math.sin(ph) * amp;
  }
  return envExp(b, attack, decay);
}

export function bell(freq: number, seconds: number, amp = 1, ratio = 1.41, index = 2.2, decay = 1.2) {
  const b = buf(seconds);
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const idx = index * Math.exp(-t / (decay * 0.35));
    const m = Math.sin(TAU * freq * ratio * t) * idx;
    b[i] = Math.sin(TAU * freq * t + m) * amp * Math.exp(-t / decay) * Math.min(1, t / 0.002);
  }
  return b;
}

export function impact(freqs: number[], amp = 1, seconds = 3.2, seed = 1) {
  const b = buf(seconds);
  const sub = kick(1, 90, 36, 0.6);
  for (let i = 0; i < sub.length && i < b.length; i++) b[i] += sub[i] * 0.9;
  freqs.forEach((f, k) => {
    const s = bell(f, seconds, 0.22 / Math.sqrt(k + 1), 1.0 + 0.5 * ((k + seed) % 3), 0.9, 1.1 + 0.4 * k);
    const p = sine(f, seconds, 0.2, 0.004, 1.6 + 0.3 * k);
    for (let i = 0; i < b.length; i++) b[i] += s[i] + p[i];
  });
  const n = noise(0.06, seed);
  const lp = Biquad.make('lp', 1800);
  lp.process(n);
  envExp(n, 0.0005, 0.018);
  for (let i = 0; i < n.length; i++) b[i] += n[i] * 0.6;
  for (let i = 0; i < b.length; i++) b[i] *= amp;
  return b;
}

export function drone(freqs: number[], seconds: number, amp: number, cutoff: (t: number) => number, level: (t: number) => number, seed = 1) {
  const b = buf(seconds);
  const r = mulberry32(seed);
  const phs = freqs.map(() => r());
  const lp = new Biquad();
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    if (i % 64 === 0) lp.set('lp', cutoff(t), 0.9);
    let s = 0;
    freqs.forEach((f, k) => {
      phs[k] += f / SR;
      phs[k] -= Math.floor(phs[k]);
      s += (phs[k] * 2 - 1) * 0.5;
    });
    b[i] = lp.run(s) * amp * level(t);
  }
  return b;
}

export function whoosh(seconds: number, f0: number, f1: number, amp = 1, seed = 1, shape: (k: number) => number = (k) => Math.sin(Math.PI * k)) {
  const b = noise(seconds, seed);
  const bp = new Biquad();
  for (let i = 0; i < b.length; i++) {
    const k = i / b.length;
    if (i % 32 === 0) bp.set('bp', f0 * Math.pow(f1 / f0, k), 1.2);
    b[i] = bp.run(b[i]) * amp * shape(k) * 1.6;
  }
  return b;
}

export function plotter(seconds: number, speed: (t: number) => number, amp = 1, seed = 1, center = 1400) {
  const b = noise(seconds, seed);
  const bp = new Biquad();
  let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const s = Math.max(0, Math.min(1.5, speed(t)));
    if (i % 32 === 0) bp.set('bp', center * (0.7 + 0.6 * s), 3);
    ph += (TAU * (70 + 90 * s)) / SR;
    const buzz = Math.sign(Math.sin(ph)) * 0.08;
    b[i] = (bp.run(b[i]) * 1.2 + buzz * 0.3) * amp * s;
  }
  return envAR(b, 0.01, 0.03, 1);
}

export function key(amp = 1, seed = 1) {
  const r = mulberry32(seed);
  const b = buf(0.05);
  const n = noise(0.004, seed);
  const hp = Biquad.make('bp', 3200 + r() * 1400, 2);
  hp.process(n);
  for (let i = 0; i < n.length; i++) b[i] += n[i] * 2 * (1 - i / n.length);
  const f = 380 + r() * 80;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    b[i] += Math.sin(TAU * f * t) * Math.exp(-t / 0.008) * 0.3;
  }
  for (let i = 0; i < b.length; i++) b[i] *= amp;
  return b;
}

export function blip(freq: number, amp = 1, len = 0.03, glide = 1) {
  const b = buf(len);
  let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const k = i / b.length;
    ph += (TAU * freq * Math.pow(glide, k)) / SR;
    b[i] = Math.sin(ph) * amp * Math.sin(Math.PI * k) ** 2;
  }
  return b;
}

export function reverseSwell(freqs: number[], seconds: number, amp = 1, seed = 1) {
  const b = buf(seconds);
  const n = noise(seconds, seed);
  const lp = new Biquad();
  for (let i = 0; i < b.length; i++) {
    const k = i / b.length;
    if (i % 64 === 0) lp.set('lp', 300 + 7000 * k * k, 0.8);
    const e = Math.pow(k, 3);
    let s = lp.run(n[i]) * 0.5;
    const t = i / SR;
    for (const f of freqs) s += Math.sin(TAU * f * t) * 0.25;
    b[i] = s * e * amp;
  }
  return b;
}

export function glide(points: [number, number][], seconds: number, amp = 1) {
  const b = buf(seconds);
  let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    let f = points[points.length - 1][1];
    for (let k = 1; k < points.length; k++) {
      if (t <= points[k][0]) {
        const [t0, f0] = points[k - 1];
        const [t1, f1] = points[k];
        const q = (t - t0) / Math.max(1e-6, t1 - t0);
        const s = q * q * (3 - 2 * q);
        f = f0 * Math.pow(f1 / f0, s);
        break;
      }
    }
    ph += (TAU * f) / SR;
    b[i] = (Math.sin(ph) + 0.18 * Math.sin(2 * ph) + 0.06 * Math.sin(3 * ph)) * amp;
  }
  return envAR(b, 0.02, 0.08, 1);
}
