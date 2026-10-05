# Vertical (9:16) and the Reel cut

Two vertical deliverables are rendered from the same scene code as the 16:9 master.

| file | format | length | fps | purpose |
|---|---|---|---|---|
| `out/vantalogics-9x16.mp4` | 1080×1920 | 45 s | 60 | the full film, recomposed for vertical |
| `out/vantalogics-reel-9x16.mp4` | 1080×1920 | 29.4 s | 30 | Reels / TikTok / Shorts cut, built from the research below |

## How it works

- `?fmt=v` switches the engine to 1080×1920 (`src/engine/format.ts`). Every scene reads `VERTICAL`, `W`, `H`, `CX`, `CY` and has its own vertical composition, not a crop of the horizontal one: Act I pans a portrait window across the wide drawing, the bus diagram runs top-to-bottom, TU MARCA / TUS ALUMNOS / TUS DATOS are stacked on two lines, the question sets on three lines, the answer stacks above the source frame and timeline, the review circuit becomes a column, the lockup stacks the VA mark over the wordmark.
- Phone legibility: hairlines ×1.6, signal ×√1.6, labels and micro-type ×1.4–1.6, grain ×0.62 (fine grain is the first thing Instagram's re-encode turns into blocks).
- `?cut=reel` plays the film through a time map (`src/timeline/reel.ts`): 13 segments, each pointing at a span of film time at its own speed (1.0–1.45×; one 3× orbit). Choreography, cues and cuts stay intact. `src/scenes/hook.ts` is an overlay that lives in reel time only.
- The soundtrack for the reel is re-synthesised, not time-stretched: every event is placed at its mapped reel time (`FILM_QUERY='cut=reel' bun audio/synth.ts` → `public/audio/vantalogics-reel.wav`), plus two hook hits.

## Research → decisions (the Reel)

- **Hook in the first frame.** Instagram weighs the first ~3 s heavily; up to half of viewers leave before second 4. The Reel opens mid-chaos (film t = 5.4 s) with *7 herramientas.* on frame 0 and *Ningún sistema.* at 0.45 s, both inside the safe area, over a dark panel so they read on any phone. The decisive cut lands at 2.9 s.
- **Length ~29 s.** 15–30 s is the discovery sweet spot; the whole argument (fragmentation → system → cited answer → teacher approval → 24.000+ → brand) survives at 1.2–1.45×.
- **Safe zones.** Key content stays within x 72–1008, y 260–1500 (top UI ~250 px, bottom caption/audio ~420+ px, right action rail). The end card, the hook and the 24.000+ number sit inside the central 4:5.
- **30 fps, H.264, AAC 48 kHz, ≤ 20 Mbps.** Instagram accepts 60 fps but compresses it harder; above ~15 Mbps it re-encodes without visible gain.
- **No voice, so the story reads in text.** Captions/on-screen text matter because the feed often plays muted; the Reels tab often plays with sound, where the synthesised design carries it.
- **Shareability.** The most "sendable" idea for education founders is the cited answer + teacher approval; those two beats keep their full hold time.
- **Cover.** The profile grid crops Reels to 3:4 (1080×1440, centred). `out/reel-cover.png` is the hook frame, whose text sits inside that crop.

## Commands

```sh
bun render/render.ts sheet --fmt v --cut reel --from 0 --to 29.4 --n 30 --cols 10 --cw 200 --out out/sheets/reel.png
FILM_QUERY='cut=reel' bun audio/synth.ts
bun render/render.ts video --fmt v --cut reel --workers 3 --crf 18 --maxrate 20M --out out/vantalogics-reel-9x16.mp4
bun render/render.ts video --fmt v --workers 3 --out out/vantalogics-9x16.mp4
```

Preview: `http://localhost:5173/?fmt=v` and `http://localhost:5173/?fmt=v&cut=reel`.
