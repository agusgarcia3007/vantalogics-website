export const SR = 48000;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Bus {
  L: Float32Array;
  R: Float32Array;
  constructor(public seconds: number) {
    this.L = new Float32Array(Math.ceil(seconds * SR));
    this.R = new Float32Array(Math.ceil(seconds * SR));
  }

  write(t0: number, buf: Float32Array, gain = 1, pan = 0) {
    const i0 = Math.round(t0 * SR);
    const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
    const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
    for (let i = 0; i < buf.length; i++) {
      const j = i0 + i;
      if (j < 0 || j >= this.L.length) continue;
      this.L[j] += buf[i] * gl;
      this.R[j] += buf[i] * gr;
    }
  }

  writeStereo(t0: number, l: Float32Array, r: Float32Array, gain = 1) {
    const i0 = Math.round(t0 * SR);
    for (let i = 0; i < l.length; i++) {
      const j = i0 + i;
      if (j < 0 || j >= this.L.length) continue;
      this.L[j] += l[i] * gain;
      this.R[j] += r[i] * gain;
    }
  }

  mixInto(o: Bus, gain = 1) {
    for (let i = 0; i < this.L.length; i++) {
      o.L[i] += this.L[i] * gain;
      o.R[i] += this.R[i] * gain;
    }
  }
}

export class Biquad {
  b0 = 1; b1 = 0; b2 = 0; a1 = 0; a2 = 0;
  x1 = 0; x2 = 0; y1 = 0; y2 = 0;

  static make(type: 'lp' | 'hp' | 'bp' | 'peak', f: number, q = 0.707, gainDb = 0) {
    const b = new Biquad();
    b.set(type, f, q, gainDb);
    return b;
  }

  set(type: 'lp' | 'hp' | 'bp' | 'peak', f: number, q = 0.707, gainDb = 0) {
    const w = (2 * Math.PI * Math.min(f, SR * 0.45)) / SR;
    const cs = Math.cos(w), sn = Math.sin(w);
    const al = sn / (2 * q);
    let b0 = 0, b1 = 0, b2 = 0, a0 = 1, a1 = 0, a2 = 0;
    if (type === 'lp') {
      b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = (1 - cs) / 2; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al;
    } else if (type === 'hp') {
      b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = (1 + cs) / 2; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al;
    } else if (type === 'bp') {
      b0 = al; b1 = 0; b2 = -al; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al;
    } else {
      const A = Math.pow(10, gainDb / 40);
      b0 = 1 + al * A; b1 = -2 * cs; b2 = 1 - al * A; a0 = 1 + al / A; a1 = -2 * cs; a2 = 1 - al / A;
    }
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = a1 / a0; this.a2 = a2 / a0;
  }

  run(x: number) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y;
    return y;
  }

  process(buf: Float32Array) {
    for (let i = 0; i < buf.length; i++) buf[i] = this.run(buf[i]);
    return buf;
  }
}

export function buf(seconds: number) {
  return new Float32Array(Math.max(1, Math.ceil(seconds * SR)));
}

export function noise(seconds: number, seed: number) {
  const r = mulberry32(seed);
  const b = buf(seconds);
  for (let i = 0; i < b.length; i++) b[i] = r() * 2 - 1;
  return b;
}

export function envExp(b: Float32Array, attack: number, decay: number) {
  const na = Math.max(1, Math.round(attack * SR));
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const a = i < na ? i / na : 1;
    b[i] *= a * Math.exp(-Math.max(0, t - attack) / decay);
  }
  return b;
}

export function envAR(b: Float32Array, attack: number, release: number, curve = 2) {
  const n = b.length;
  const na = Math.max(1, Math.round(attack * SR)), nr = Math.max(1, Math.round(release * SR));
  for (let i = 0; i < n; i++) {
    let g = 1;
    if (i < na) g = Math.pow(i / na, curve);
    if (i > n - nr) g *= Math.pow(Math.max(0, (n - i) / nr), curve);
    b[i] *= g;
  }
  return b;
}

export class Reverb {
  combs: { buf: Float32Array; i: number; fb: number; lp: number; damp: number }[];
  aps: { buf: Float32Array; i: number }[];
  constructor(scale = 1, fb = 0.84, damp = 0.35, seedOffset = 0) {
    const lens = [1557, 1617, 1491, 1422, 1277, 1356, 1188, 1116].map((l) => Math.round((l + seedOffset) * scale));
    this.combs = lens.map((l) => ({ buf: new Float32Array(l), i: 0, fb, lp: 0, damp }));
    this.aps = [556, 441, 341, 225].map((l) => ({ buf: new Float32Array(Math.round((l + seedOffset) * scale)), i: 0 }));
  }

  run(x: number) {
    let out = 0;
    for (const c of this.combs) {
      const y = c.buf[c.i];
      c.lp = y * (1 - c.damp) + c.lp * c.damp;
      c.buf[c.i] = x + c.lp * c.fb;
      c.i = (c.i + 1) % c.buf.length;
      out += y;
    }
    out *= 0.125;
    for (const a of this.aps) {
      const b = a.buf[a.i];
      const y = -out + b;
      a.buf[a.i] = out + b * 0.5;
      a.i = (a.i + 1) % a.buf.length;
      out = y;
    }
    return out;
  }
}

export function writeWav(path: string, L: Float32Array, R: Float32Array) {
  const n = L.length;
  const dataBytes = n * 2 * 2;
  const b = Buffer.alloc(44 + dataBytes);
  b.write('RIFF', 0);
  b.writeUInt32LE(36 + dataBytes, 4);
  b.write('WAVE', 8);
  b.write('fmt ', 12);
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(2, 22);
  b.writeUInt32LE(SR, 24);
  b.writeUInt32LE(SR * 4, 28);
  b.writeUInt16LE(4, 32);
  b.writeUInt16LE(16, 34);
  b.write('data', 36);
  b.writeUInt32LE(dataBytes, 40);
  const r = mulberry32(99);
  for (let i = 0; i < n; i++) {
    const d = (r() - r()) / 32768;
    const l = Math.max(-1, Math.min(1, L[i] + d));
    const rr = Math.max(-1, Math.min(1, R[i] + d));
    b.writeInt16LE(Math.round(l * 32767), 44 + i * 4);
    b.writeInt16LE(Math.round(rr * 32767), 44 + i * 4 + 2);
  }
  return Bun.write(path, b);
}
