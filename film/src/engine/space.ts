import * as THREE from 'three';
import type { Ctx } from './draw';
import { rgba, type Tone } from './palette';
import type { Glyph, Outline } from './type';
import { W as FW, H as FH, LW } from './format';

export type V3 = [number, number, number];

const tmpUp = new THREE.Vector3();

export class Cam3 {
  cam: THREE.PerspectiveCamera;
  e = new Float64Array(16);
  near = 1;
  W = FW;
  H = FH;
  fx = 1;
  fy = 1;
  pos: V3 = [0, 0, 0];

  constructor(fov = 35, near = 1, far = 100000) {
    this.cam = new THREE.PerspectiveCamera(fov, FW / FH, near, far);
    this.near = near;
  }

  set(pos: V3, target: V3, opts: { fov?: number; roll?: number; up?: V3; shift?: [number, number] } = {}) {
    const c = this.cam;
    if (opts.fov !== undefined && opts.fov !== c.fov) {
      c.fov = opts.fov;
    }
    c.setViewOffset(FW, FH, opts.shift?.[0] ?? 0, opts.shift?.[1] ?? 0, FW, FH);
    c.updateProjectionMatrix();
    c.position.set(pos[0], pos[1], pos[2]);
    const up = opts.up ?? [0, 1, 0];
    c.up.copy(tmpUp.set(up[0], up[1], up[2]));
    c.lookAt(target[0], target[1], target[2]);
    if (opts.roll) c.rotateZ(opts.roll);
    c.updateMatrixWorld(true);
    const v = c.matrixWorldInverse.elements;
    for (let i = 0; i < 16; i++) this.e[i] = v[i];
    const p = c.projectionMatrix.elements;
    this.fx = (p[0] * this.W) / 2;
    this.fy = (p[5] * this.H) / 2;
    this.cx = ((1 + p[8]) * this.W) / 2;
    this.cy = ((1 - p[9]) * this.H) / 2;
    this.pos = pos;
    return this;
  }

  cx = 960;
  cy = 540;

  view(x: number, y: number, z: number): V3 {
    const e = this.e;
    return [e[0] * x + e[4] * y + e[8] * z + e[12], e[1] * x + e[5] * y + e[9] * z + e[13], e[2] * x + e[6] * y + e[10] * z + e[14]];
  }

  projView(vx: number, vy: number, vz: number): [number, number] {
    const d = -vz;
    return [this.cx + (vx / d) * this.fx, this.cy - (vy / d) * this.fy];
  }

  project(x: number, y: number, z: number): [number, number, number] | null {
    const [vx, vy, vz] = this.view(x, y, z);
    if (-vz < this.near) return null;
    const [sx, sy] = this.projView(vx, vy, vz);
    return [sx, sy, -vz];
  }

  scaleAt(depth: number) {
    return this.fy / depth;
  }
}

export interface Fog {
  near: number;
  far: number;
  close?: number;
}

export function fogK(d: number, f?: Fog) {
  if (!f) return 1;
  let k = d <= f.near ? 1 : d >= f.far ? 0 : 1 - (d - f.near) / (f.far - f.near);
  if (f.close && d < f.close) k *= Math.max(0, d / f.close);
  return k * k * (3 - 2 * k);
}

const BUCKETS = 16;

export class Lines3 {
  private segs: number[] = [];
  constructor(public cam: Cam3) {}

  clear() {
    this.segs.length = 0;
  }

  seg(ax: number, ay: number, az: number, bx: number, by: number, bz: number, a = 1) {
    if (a <= 0.002) return;
    this.segs.push(ax, ay, az, bx, by, bz, a);
  }

  poly(p: ArrayLike<number>, a = 1, closed = false) {
    const n = p.length / 3;
    for (let i = 1; i < n; i++) this.seg(p[i * 3 - 3], p[i * 3 - 2], p[i * 3 - 1], p[i * 3], p[i * 3 + 1], p[i * 3 + 2], a);
    if (closed && n > 2) this.seg(p[n * 3 - 3], p[n * 3 - 2], p[n * 3 - 1], p[0], p[1], p[2], a);
  }

  box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, a = 1) {
    const c = [
      [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1],
      [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1],
    ];
    const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    for (const [i, j] of E) this.seg(c[i][0], c[i][1], c[i][2], c[j][0], c[j][1], c[j][2], a);
  }

  flush(g: Ctx, color: Tone, width = 1, fog?: Fog, alpha = 1) {
    const cam = this.cam;
    const S = this.segs;
    const paths: number[][] = Array.from({ length: BUCKETS }, () => []);
    const near = cam.near + 0.01;
    for (let i = 0; i < S.length; i += 7) {
      let a = cam.view(S[i], S[i + 1], S[i + 2]);
      let b = cam.view(S[i + 3], S[i + 4], S[i + 5]);
      const da = -a[2], db = -b[2];
      if (da < near && db < near) continue;
      if (da < near) {
        const k = (near - da) / (db - da);
        a = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, -near];
      } else if (db < near) {
        const k = (near - db) / (da - db);
        b = [b[0] + (a[0] - b[0]) * k, b[1] + (a[1] - b[1]) * k, -near];
      }
      const fa = fogK(-a[2], fog), fb = fogK(-b[2], fog);
      const al = S[i + 6] * alpha * (fa + fb) * 0.5;
      if (al <= 0.004) continue;
      const pa = cam.projView(a[0], a[1], a[2]);
      const pb = cam.projView(b[0], b[1], b[2]);
      if ((pa[0] < -200 && pb[0] < -200) || (pa[0] > FW + 200 && pb[0] > FW + 200) || (pa[1] < -200 && pb[1] < -200) || (pa[1] > FH + 200 && pb[1] > FH + 200)) continue;
      const bi = Math.min(BUCKETS - 1, Math.floor(Math.min(1, al) * BUCKETS));
      paths[bi].push(pa[0], pa[1], pb[0], pb[1]);
    }
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.lineWidth = width * LW;
    g.lineCap = 'butt';
    for (let b = 0; b < BUCKETS; b++) {
      const p = paths[b];
      if (!p.length) continue;
      const a = (b + 0.5) / BUCKETS;
      g.strokeStyle = rgba(color, a);
      g.beginPath();
      for (let i = 0; i < p.length; i += 4) {
        g.moveTo(p[i], p[i + 1]);
        g.lineTo(p[i + 2], p[i + 3]);
      }
      g.stroke();
    }
    g.restore();
    this.clear();
  }
}

export interface Plane {
  o: V3;
  u: V3;
  v: V3;
}

export function planePoint(p: Plane, x: number, y: number): V3 {
  return [p.o[0] + p.u[0] * x + p.v[0] * y, p.o[1] + p.u[1] * x + p.v[1] * y, p.o[2] + p.u[2] * x + p.v[2] * y];
}

export function glyphPath3(g: Ctx, cam: Cam3, pl: Plane, gl: Glyph, dx = 0, dy = 0, s = 1) {
  let any = false;
  for (const c of gl.contours) {
    let started = false;
    for (let j = 0; j < c.length; j += 2) {
      const w = planePoint(pl, dx + c[j] * s, dy + c[j + 1] * s);
      const pr = cam.project(w[0], w[1], w[2]);
      if (!pr) {
        started = false;
        continue;
      }
      if (!started) {
        g.moveTo(pr[0], pr[1]);
        started = true;
      } else g.lineTo(pr[0], pr[1]);
      any = true;
    }
    g.closePath();
  }
  return any;
}

export function fillText3(g: Ctx, cam: Cam3, pl: Plane, o: Outline, color: string, dx = 0, dy = 0, s = 1, filter?: (i: number) => boolean) {
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.fillStyle = color;
  g.beginPath();
  o.glyphs.forEach((gl, i) => {
    if (filter && !filter(i)) return;
    glyphPath3(g, cam, pl, gl, dx, dy, s);
  });
  g.fill('nonzero');
  g.restore();
}

export function label3(g: Ctx, cam: Cam3, p: V3, text: string, fontCss: string, color: string, dx = 0, dy = 0, align: CanvasTextAlign = 'left') {
  const pr = cam.project(p[0], p[1], p[2]);
  if (!pr) return null;
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.font = fontCss;
  g.fillStyle = color;
  g.textAlign = align;
  g.fillText(text, pr[0] + dx, pr[1] + dy);
  g.restore();
  return pr;
}
