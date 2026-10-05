# Engine

The film is a deterministic function of time. `render(t)` for any `t` in `[0, 45)` always produces the same frame; preview, stills, contact sheets and the final export all call the same scene code.

## Why Canvas2D (and where Three.js fits)

The machine this was built on has no GPU. Headless Chromium falls back to SwiftShader for WebGL, where a single 9-tap full-screen pass at 1080p costs ~100 ms. Chrome's Canvas2D (Skia raster) draws thousands of anti-aliased hairlines and glyphs in a few milliseconds on the CPU, and hairlines are the film's primary material. So:

- **Canvas2D** draws everything: lines, type, points, fills.
- **Three.js** provides the dimensional layer: `PerspectiveCamera`, `lookAt`, view/projection matrices and view offsets (`src/engine/space.ts`). 3D geometry is projected in TypeScript, near-plane clipped, depth-fogged, alpha-bucketed and stroked as crisp 1 px hairlines.
- **opentype.js** turns the fonts into outlines, so type can live on planes in 3D (floor lettering, extruded architecture, labels on signs) with true perspective.

## Layout

```
src/
  engine/
    engine.ts   frame pipeline: sub-frame accumulation, halation, HUD, grain/vignette
    scene.ts    Scene / Frame / Entry types
    space.ts    Cam3 (Three.js camera), Lines3 (clipped, fogged 3D hairlines), text on planes
    draw.ts     Pen: 2D drawing helpers in screen or world units (hairlines stay 1 px under zoom)
    signal.ts   the signal: head, stroke, emissive layer
    type.ts     font loading (FontFace + opentype outlines), outlines, measuring
    hud.ts      crop marks, sheet code, timecode, signal coordinates
    math.ts     eases, analytic springs, keys, seeded RNG, hash, noise
    palette.ts  the six tones
  scenes/       one module per sequence (+ shared world data)
  timeline/     cues.ts (act windows, shared cue times), timeline.ts (entries)
  main.ts       preview UI + window.__film export API
render/render.ts  headless Chrome → raw RGBA over WebSocket → ffmpeg
audio/            dsp.ts, instruments.ts, synth.ts (the soundtrack, from the same cues)
public/fonts      Inter Display, Inter, JetBrains Mono, Instrument Serif (OFL)
public/audio      vantalogics.wav (generated)
docs/             TREATMENT, STORYBOARD, ENGINE
out/              renders, sheets (not versioned)
```

## Frame pipeline

1. **Sub-frames.** For motion blur the engine renders `N` sub-frames spread over a 180° shutter (`t + u·0.5/60`, `u ∈ (−½, ½)`). Each scene can request its own `N` per time (`Scene.samples(t)`): 6–10 for normal motion, 16–28 for whips, punch-ins and fast scale changes.
2. **Two layers per sub-frame.** `S` (1920×1080) is the picture. `G` (960×540) is the emissive layer: only the signal writes to it (`signalHead`, `signalStroke`, `emit`). Bone type never enters `G`, so it can never bloom.
3. **Exact accumulation.** Sub-frames are summed with integer arithmetic in 16-bit lanes (`R|B` and `G|A` packed per `Uint32`) and resolved with fixed-point division: an exact average, no 8-bit drift.
4. **Halation.** `G` is blurred at three octaves (½, ¼, ⅛ resolution), summed at half resolution and added once to the full frame. It gives the signal a warm, wide, soft falloff.
5. **HUD.** Crop marks, sheet code (`VL—0n / TITLE`), timecode and the signal's coordinates, drawn once per frame from the info reported by the central sub-frame.
6. **Finish.** Vignette and luminance-dependent monochrome grain (a seeded Gaussian tile, offset per frame index), in one integer pass over the pixels.

## Scene contract

```ts
export default class MyScene extends Scene {
  samples(t: number) { return 8; }
  render(f: Frame) {
    // f.t (film time), f.lt (local), f.g (Canvas2D), f.glow (emissive, logical px), f.pen, f.info
  }
}
```

- Pure function of `f.t`. Randomness is seeded (`mulberry32`, `hash`), never `Math.random()`; no wall clock.
- Entries may overlap: the engine renders active entries in timeline order onto the same canvas (used for the whip between retrieval and review).
- Cross-scene continuity is designed, not blended: the decisive cut keeps the signal on the same pixel; question starts where the punch-in ended; scale starts with the shrinking loop; resolve starts from the scale camera.

## Tooling

```sh
cd film
bun install
bun run dev                                   # preview at http://localhost:5173 (?t=12.5)
bun audio/synth.ts                            # regenerate public/audio/vantalogics.wav
bun render/render.ts stills --t 7.99,8.0 --samples 8 --out out/stills
bun render/render.ts sheet --from 0 --to 45 --n 48 --cols 6 --out out/sheets/full.png
bun render/render.ts sheet --cuts --out out/sheets/cuts.png
bun render/render.ts perf --from 20 --to 21
bun render/render.ts video --from 18 --to 21 --samples 6 --preset veryfast --out out/clips/q.mp4
bun render/render.ts video --workers 3 --out out/vantalogics.mp4    # final: adaptive samples, x264 CRF 16, AAC 320k
```

Preview keys: space play/pause (audio-synced), ←/→ ±1 s (shift ±5 s), `,`/`.` one frame, `[`/`]` previous/next scene, `l` loop scene, `g` grain, `m` motion blur, `h` hide bar.

`--only a,b` renders only those scenes. `--workers N` splits the range into N segments rendered by N headless browsers in parallel, then concatenates losslessly and muxes the audio. Env `CHROME` and `FFMPEG` override the binaries.

## Sound

`audio/synth.ts` imports the same cue constants the scenes use (`FRAG`, `SYS`, `Q`, `R`, `V`, `SC`, `E`, gate and wire timings) and synthesizes every event: relay clicks, dry ticks, sub kicks, FM bells, tonal impacts, band-passed plotter noise whose level follows the signal's speed, a pitched trace that follows the VA mark's geometry, and a Schroeder reverb send. Output: 48 kHz stereo, peak-normalised with a soft tanh limiter (≈ −16.5 LUFS, −1 dBTP).
