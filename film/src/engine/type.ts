import opentype from 'opentype.js';

type FaceSpec = { family: string; file: string; weight: number; style?: 'normal' | 'italic' };

const FACES: FaceSpec[] = [
  { family: 'Inter Display', file: 'InterDisplay-Light.ttf', weight: 300 },
  { family: 'Inter Display', file: 'InterDisplay-Regular.ttf', weight: 400 },
  { family: 'Inter Display', file: 'InterDisplay-Medium.ttf', weight: 500 },
  { family: 'Inter Display', file: 'InterDisplay-SemiBold.ttf', weight: 600 },
  { family: 'Inter Display', file: 'InterDisplay-Bold.ttf', weight: 700 },
  { family: 'Inter Display', file: 'InterDisplay-Black.ttf', weight: 900 },
  { family: 'Inter', file: 'Inter-Regular.ttf', weight: 400 },
  { family: 'Inter', file: 'Inter-Medium.ttf', weight: 500 },
  { family: 'JetBrains Mono', file: 'JetBrainsMono-Regular.ttf', weight: 400 },
  { family: 'JetBrains Mono', file: 'JetBrainsMono-Medium.ttf', weight: 500 },
  { family: 'JetBrains Mono', file: 'JetBrainsMono-Bold.ttf', weight: 700 },
  { family: 'Instrument Serif', file: 'InstrumentSerif-Regular.ttf', weight: 400 },
  { family: 'Instrument Serif', file: 'InstrumentSerif-Italic.ttf', weight: 400, style: 'italic' },
];

export const FAM = {
  display: '"Inter Display"',
  text: '"Inter"',
  mono: '"JetBrains Mono"',
  serif: '"Instrument Serif"',
} as const;

export type Family = keyof typeof FAM;

export function font(fam: Family, px: number, weight = 400, italic = false) {
  return `${italic ? 'italic ' : ''}${weight} ${px.toFixed(2)}px ${FAM[fam]}`;
}

const outlines = new Map<string, opentype.Font>();

function faceKey(fam: string, weight: number, italic: boolean) {
  return `${fam}|${weight}|${italic ? 'i' : 'n'}`;
}

export async function loadFonts(base = '/fonts/') {
  await Promise.all(
    FACES.map(async (f) => {
      const buf = await (await fetch(base + f.file)).arrayBuffer();
      const face = new FontFace(f.family, buf.slice(0), { weight: String(f.weight), style: f.style ?? 'normal' });
      await face.load();
      (document.fonts as unknown as { add(f: FontFace): void }).add(face);
      outlines.set(faceKey(f.family, f.weight, f.style === 'italic'), opentype.parse(buf));
    }),
  );
}

export function otFont(fam: Family, weight = 400, italic = false): opentype.Font {
  const name = FAM[fam].replace(/"/g, '');
  const f = outlines.get(faceKey(name, weight, italic));
  if (!f) throw new Error(`font not loaded: ${name} ${weight} ${italic}`);
  return f;
}

export interface Glyph {
  ch: string;
  x: number;
  adv: number;
  contours: Float32Array[];
  box: [number, number, number, number];
}

export interface Outline {
  glyphs: Glyph[];
  width: number;
  size: number;
  ascent: number;
  descent: number;
  capHeight: number;
}

const outlineCache = new Map<string, Outline>();

function flatten(cmds: opentype.PathCommand[], tol: number): Float32Array[] {
  const out: Float32Array[] = [];
  let cur: number[] = [];
  let x = 0, y = 0, sx = 0, sy = 0;
  const push = () => {
    if (cur.length >= 6) out.push(new Float32Array(cur));
    cur = [];
  };
  for (const c of cmds) {
    if (c.type === 'M') {
      push();
      x = sx = c.x; y = sy = c.y;
      cur.push(x, y);
    } else if (c.type === 'L') {
      x = c.x; y = c.y;
      cur.push(x, y);
    } else if (c.type === 'Q') {
      const n = Math.max(2, Math.min(16, Math.ceil(Math.hypot(c.x - x, c.y - y) / tol)));
      for (let i = 1; i <= n; i++) {
        const k = i / n, u = 1 - k;
        cur.push(u * u * x + 2 * u * k * c.x1 + k * k * c.x, u * u * y + 2 * u * k * c.y1 + k * k * c.y);
      }
      x = c.x; y = c.y;
    } else if (c.type === 'C') {
      const n = Math.max(3, Math.min(24, Math.ceil(Math.hypot(c.x - x, c.y - y) / tol)));
      for (let i = 1; i <= n; i++) {
        const k = i / n, u = 1 - k;
        cur.push(
          u * u * u * x + 3 * u * u * k * c.x1 + 3 * u * k * k * c.x2 + k * k * k * c.x,
          u * u * u * y + 3 * u * u * k * c.y1 + 3 * u * k * k * c.y2 + k * k * k * c.y,
        );
      }
      x = c.x; y = c.y;
    } else if (c.type === 'Z') {
      if (cur.length >= 2 && (cur[cur.length - 2] !== sx || cur[cur.length - 1] !== sy)) cur.push(sx, sy);
      push();
      x = sx; y = sy;
    }
  }
  push();
  return out;
}

export function outline(text: string, fam: Family, size: number, weight = 400, opts: { italic?: boolean; tracking?: number } = {}): Outline {
  const key = `${text}|${fam}|${size}|${weight}|${opts.italic ? 1 : 0}|${opts.tracking ?? 0}`;
  const hit = outlineCache.get(key);
  if (hit) return hit;
  const f = otFont(fam, weight, !!opts.italic);
  const scale = size / f.unitsPerEm;
  const track = (opts.tracking ?? 0) * size;
  const glyphs: Glyph[] = [];
  const gs = Array.from(text).map((ch) => f.charToGlyph(ch));
  let x = 0;
  const tol = Math.max(1.5, size / 40);
  for (let i = 0; i < gs.length; i++) {
    const g = gs[i];
    const p = g.getPath(x, 0, size);
    const contours = flatten(p.commands, tol);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const c of contours)
      for (let j = 0; j < c.length; j += 2) {
        if (c[j] < x0) x0 = c[j];
        if (c[j] > x1) x1 = c[j];
        if (c[j + 1] < y0) y0 = c[j + 1];
        if (c[j + 1] > y1) y1 = c[j + 1];
      }
    const adv = (g.advanceWidth ?? 0) * scale;
    glyphs.push({ ch: text[i] ?? '', x, adv, contours, box: contours.length ? [x0, y0, x1, y1] : [x, 0, x + adv, 0] });
    x += adv + track;
    if (i < gs.length - 1) x += f.getKerningValue(g, gs[i + 1]) * scale;
  }
  const os2 = (f.tables as { os2?: { sCapHeight?: number } }).os2;
  const o: Outline = {
    glyphs,
    width: x - track,
    size,
    ascent: f.ascender * scale,
    descent: -f.descender * scale,
    capHeight: (os2?.sCapHeight ?? f.ascender * 0.7) * scale,
  };
  outlineCache.set(key, o);
  return o;
}

export function glyphPath(g: CanvasRenderingContext2D, gl: Glyph, dx = 0, dy = 0, s = 1) {
  for (const c of gl.contours) {
    g.moveTo(dx + c[0] * s, dy + c[1] * s);
    for (let j = 2; j < c.length; j += 2) g.lineTo(dx + c[j] * s, dy + c[j + 1] * s);
    g.closePath();
  }
}

export function contourLength(c: Float32Array) {
  let L = 0;
  for (let j = 2; j < c.length; j += 2) L += Math.hypot(c[j] - c[j - 2], c[j + 1] - c[j - 1]);
  return L;
}

const measureCv = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d')! : null;

export function measure(text: string, fam: Family, px: number, weight = 400, tracking = 0, italic = false) {
  const m = measureCv!;
  m.font = font(fam, px, weight, italic);
  m.letterSpacing = `${tracking * px}px`;
  const w = m.measureText(text).width - (text.length ? tracking * px : 0);
  m.letterSpacing = '0px';
  return w;
}
