const SIMPLEX = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

export const moonVertex = `
varying vec3 vObject;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  vObject = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vView = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

export const moonFragment = `
uniform float uTime;
uniform float uReveal;
uniform vec3 uLight;
uniform vec3 uAccent;

varying vec3 vObject;
varying vec3 vNormal;
varying vec3 vView;

${SIMPLEX}

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    sum += amp * snoise(p);
    p *= 2.07;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  vec3 p = normalize(vObject);

  float broad = fbm(p * 1.8);
  float fine = snoise(p * 9.0);
  float albedo = 0.060 + 0.050 * broad + 0.012 * fine;

  float ndl = dot(N, uLight);
  float lit = smoothstep(-0.08, 0.95, ndl);
  vec3 color = vec3(albedo) * (0.22 + 2.1 * lit);
  color *= vec3(0.93, 0.96, 1.06);

  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);
  vec2 g = vec2(lon / 6.28318 * 36.0, lat / 3.14159 * 18.0);
  vec2 gw = max(fwidth(g), vec2(1e-4));
  vec2 gl = abs(fract(g - 0.5) - 0.5) / gw;
  float grid = 1.0 - min(min(gl.x, gl.y), 1.0);

  float facing = max(dot(N, V), 0.0);
  float fresnel = pow(1.0 - facing, 2.2);
  color += vec3(0.62, 0.70, 0.95) * grid * (0.03 + 0.11 * fresnel) * uReveal;

  float sweepY = sin(uTime * 0.23) * 0.92;
  float sweep = exp(-pow((p.y - sweepY) * 16.0, 2.0));
  color += uAccent * sweep * grid * 0.55 * uReveal;
  color += uAccent * sweep * 0.018 * uReveal;

  float rim = pow(1.0 - facing, 4.5);
  float side = smoothstep(-0.55, 0.85, dot(N, uLight));
  color += uAccent * rim * (0.18 + 1.25 * side);
  color += vec3(1.0) * pow(1.0 - facing, 7.0) * side * 0.55;

  gl_FragColor = vec4(color, 1.0);
}
`

export const nodesVertex = `
attribute float aSeed;
attribute float aHub;

uniform float uTime;
uniform float uReveal;
uniform float uSize;
uniform float uPixelRatio;

varying float vAlpha;
varying float vHub;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec3 n = normalize(mat3(modelMatrix) * position);
  vec3 v = normalize(cameraPosition - world.xyz);
  float facing = dot(n, v);
  float limb = smoothstep(0.02, 0.4, facing);

  float twinkle = 0.55 + 0.45 * sin(uTime * (0.5 + aSeed * 1.6) + aSeed * 43.0);
  float start = aSeed * 0.55;
  float reveal = smoothstep(start, start + 0.45, uReveal);

  vAlpha = limb * twinkle * reveal * mix(0.32, 1.0, aHub);
  vHub = aHub;

  vec4 view = viewMatrix * world;
  gl_PointSize = uSize * mix(1.0, 2.4, aHub) * uPixelRatio / -view.z;
  gl_Position = projectionMatrix * view;
}
`

export const nodesFragment = `
uniform vec3 uAccent;

varying float vAlpha;
varying float vHub;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d) * vAlpha;
  vec3 color = mix(vec3(0.78, 0.82, 0.95), uAccent * 1.15, vHub);
  gl_FragColor = vec4(color * a, a);
}
`

export const arcsVertex = `
attribute float aT;
attribute float aSeed;

uniform float uTime;
uniform float uReveal;

varying float vAlpha;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec3 n = normalize(mat3(modelMatrix) * position);
  vec3 v = normalize(cameraPosition - world.xyz);
  float limb = smoothstep(0.0, 0.35, dot(n, v));

  float head = fract(uTime * (0.08 + aSeed * 0.1) + aSeed * 7.0) * 1.6 - 0.3;
  float pulse = exp(-pow((aT - head) * 9.0, 2.0));
  float reveal = smoothstep(0.35 + aSeed * 0.4, 0.75 + aSeed * 0.25, uReveal);

  vAlpha = (0.07 + 0.85 * pulse) * limb * reveal;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

export const arcsFragment = `
uniform vec3 uAccent;
varying float vAlpha;

void main() {
  gl_FragColor = vec4(uAccent * vAlpha, vAlpha);
}
`

export const orbitVertex = `
attribute float aAngle;
varying float vAngle;

void main() {
  vAngle = aAngle;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const orbitFragment = `
uniform float uSpark;
uniform float uReveal;
uniform vec3 uAccent;
varying float vAngle;

void main() {
  float behind = mod(uSpark - vAngle, 6.28318);
  float trail = exp(-behind * 1.35);
  float a = (0.07 + 0.9 * trail) * uReveal;
  vec3 color = mix(vec3(0.7, 0.76, 0.92), uAccent, trail);
  gl_FragColor = vec4(color * a, a);
}
`

export const sparkVertex = `
uniform float uSize;
uniform float uPixelRatio;

void main() {
  vec4 view = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * uPixelRatio / -view.z;
  gl_Position = projectionMatrix * view;
}
`

export const sparkFragment = `
uniform vec3 uAccent;
uniform float uReveal;
uniform float uTime;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d2 = dot(c, c);
  float core = exp(-d2 * 900.0);
  float halo = exp(-d2 * 60.0) * (0.75 + 0.25 * sin(uTime * 3.1));
  float cross = exp(-abs(c.x) * 180.0) * exp(-abs(c.y) * 9.0)
              + exp(-abs(c.y) * 180.0) * exp(-abs(c.x) * 9.0);
  vec3 color = vec3(1.0) * core + uAccent * (halo * 0.9 + cross * 0.45);
  float a = clamp(core + halo * 0.6 + cross * 0.3, 0.0, 1.0) * uReveal;
  gl_FragColor = vec4(color * uReveal, a);
}
`

export const haloVertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const haloFragment = `
uniform vec3 uAccent;
uniform vec2 uLight2D;
uniform float uReveal;
uniform float uScale;

varying vec2 vUv;

void main() {
  vec2 q = (vUv - 0.5) * uScale;
  float r = length(q);
  float outside = step(1.0, r);
  float ring = exp(-pow((r - 1.0) / 0.035, 2.0));
  float falloff = exp(-(r - 1.0) * 4.2) * outside;
  float toward = smoothstep(-0.35, 1.0, dot(normalize(q + 1e-5), uLight2D));
  float a = (ring * 0.55 + falloff * 0.22) * (0.12 + 0.88 * toward) * uReveal;
  gl_FragColor = vec4(uAccent * a, a);
}
`

export const dustVertex = `
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform float uReveal;
varying float vAlpha;

void main() {
  vec3 p = position;
  p.y += sin(uTime * 0.12 + aSeed * 30.0) * 0.08;
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  vAlpha = (0.12 + 0.3 * aSeed) * uReveal;
  gl_PointSize = (1.0 + aSeed * 1.8) * uPixelRatio;
  gl_Position = projectionMatrix * view;
}
`

export const dustFragment = `
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vAlpha;
  gl_FragColor = vec4(vec3(0.8, 0.85, 1.0) * a, a);
}
`
