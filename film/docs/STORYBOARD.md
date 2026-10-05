# Storyboard

> **As built.** The tables below are the plan written before production. Revisions made after reviewing the renders:
> - Act I opens at 3× on the first primitive and steps out on each new system (spring settles), so the drawing is discovered, not presented. Primitives appear in spatial order: VIDEO, CURSOS, WHATSAPP, EVALUACIONES, ALUMNOS, DRIVE, PAGOS.
> - Origin + course are one continuous 3D scene (`system`, 8–18 s): the bus diagram lies on the floor plane seen from exactly above (reads flat), and the camera pitches into perspective. The decisive cut snaps from 33× to 1× in log space.
> - The punch into the selected student (17.62–18.0) converges on screen centre before the cut; the question scene starts from that exact pixel.
> - The question launches by zooming around the signal and carrying it to screen centre, where the retrieval flight begins.
> - Retrieval ends with a whip (26.3–26.72) that overlaps the review scene; the review camera pushes in on the open switch while it waits and releases after approval. The loop shrinks in log space into the first cell of the field.
> - The 24.000+ count is the label of a dimension line measuring the field's diameter; the signal is the caliper head.
> - End card: the wordmark's baseline stays as a graphite hairline with ticks (the one line everything reduced to); the signal parks as the final period.
> - Exact cue times live in the scene modules (`FRAG`, `SYS`, `Q`, `R`, `V`, `SC`, `E`), which the soundtrack also imports.

Grid: 120 BPM, beat = 0.5 s, bar = 2.0 s. Times are film seconds. Cue names in `code` are the shared cue ids in `src/timeline/cues.ts` (the picture and the synthesized sound both read them).

Frame language: 1920×1080 logical px, 12-col grid, margins 96 px. HUD (engine): hairline crop marks at the corners, a sheet code top-left (`VL—0n / TITLE`), timecode bottom-right, signal coordinates bottom-left when the signal is on screen.

---

## 1 · fragments — 0.00 → 8.00

**Framing:** flat sheet, camera looking straight down, slow push 1.00 → 1.12 with −0.6° roll drift. Composition deliberately unbalanced: the weight of the drawing is right of centre, lots of black top-left.

| t | action | text | sound |
|---|---|---|---|
| 0.00 | black | — | room tone |
| 0.25 | crop marks draw in | `VL—01 / ESTADO ACTUAL` | faint tick |
| 0.50–2.70 | seven primitives appear off-grid (`frag.node.*` at 0.50, 0.88, 1.19, 1.56, 1.94, 2.31, 2.63): each draws its frame, then its inner diagram in 0.3 s | VIDEO (timeline with frame ticks), PAGOS (ledger rows), ALUMNOS (identity record), DRIVE (file tree), CURSOS (module tree), WHATSAPP (message queue), EVALUACIONES (answer grid) | one relay click each, slightly detuned against each other |
| 2.80–4.90 | connection attempts: orthogonal wires route between nodes, some end in ×; annotations land (`frag.note.*`) | ACCESO MANUAL (3.25) · DATO DUPLICADO (3.75, the identity record splits into two with ≠) · SIN CONTEXTO (4.25, the message drifts off its queue) · FUERA DEL FLUJO (4.75, the video timeline's progress port has nothing attached) | clicks accumulate, drone enters detuned |
| 4.90–6.20 | density: file versions multiply (`_v2`, `_v3_ok`, `(1)`), wires multiply and cross; the drawing becomes beautiful and wrong | tiny filenames | irregular click texture thickens |
| 6.25 | `frag.signal.in` — the signal enters from the left edge on one perfectly straight hairline | — | plotter whirr |
| 6.25–7.25 | it crosses the chaos; everything it passes drops to graphite; it decelerates (outExpo) and stops at the golden point of the frame | coordinates track it | whirr decelerates |
| 7.50 | `frag.silence` — everything freezes | — | hard cut to silence |
| 8.00 | `cut.origin` — **the decisive cut** | — | sub impact |

Transition out: hard cut; the signal keeps its exact screen position.

## 2 · origin — 8.00 → 11.00

**Framing:** black, a single full-frame crosshair through the signal at (720, 560). At 8.00 the crosshair ticks are huge (camera very close) and snap out (outExpo, 0.6 s) to a precise scale.

| t | action | text | sound |
|---|---|---|---|
| 8.00 | crosshair + scale snap | `ORIGEN` · `x 0.000  y 0.000` | impact |
| 8.50 | the seven fragments return as simple labelled nodes, scattered, skewed, each tied to the origin by a bent wire | node labels | ticks on 16ths |
| 9.00–11.00 | `sys.snap.1..5` one per beat: the signal extends one spine to the right; a node's wire rotates to 90°, the node slides onto the spine (spring settle); pairs merge (DRIVE+VIDEO+CURSOS → CONTENIDO, ALUMNOS+ALUMNOS → IDENTIDAD with ≠ → =, WHATSAPP folds into IDENTIDAD as a channel) | CONTENIDO · IDENTIDAD · PAGOS · PROGRESO · EVALUACIÓN, coordinate labels re-count | relay click + kick on each beat |

Result: a clean bus diagram — one spine, five taps alternating above/below.

## 3 · course — 11.00 → 18.00

**Framing:** the bus diagram is the floor plane seen from above. The camera pitches from 90° to ~24° and yaws while dollying along the spine (inOutCubic, 11.0 → 12.4).

| t | action | text | sound |
|---|---|---|---|
| 11.00–12.40 | plan → perspective; the spine bends into a winding course path; taps become vertical structures along it | — | low swell locked to the move |
| 12.00–13.50 | module gates M01–M08 rise from the floor on 8ths; the signal travels the path; the path behind it becomes amber; each gate flips to bone as it's passed | `M01 … M08` · `PROGRESO 0.00 → 0.62` (value = arc length / total) | gate ticks, kick on beats |
| 13.50 | `sys.marca` — the camera arcs; TU MARCA. extrudes from the floor as wireframe architecture beside the path; lands readable in 3/4 view | **TU MARCA.** | tonal hit 1 |
| 15.00 | `sys.alumnos` — camera tilts down to the floor; the path floods with thousands of points streaming through the IDENTIDAD gate, lettering on the floor | **TUS ALUMNOS.** | tonal hit 2, grain of ticks |
| 16.50 | `sys.datos` — crane down through the floor: every point drops a hairline onto one data plane below and lands in a row | **TUS DATOS.** | tonal hit 3 |
| 17.50–18.00 | one row/point is selected (bone → amber) | `A-18204` | tick |

Transition out: punch-in on the selected point (scale 1 → 40, 0.35 s), cut inside it.

## 4 · question — 18.00 → 21.00

**Framing:** black. Question at left third, baseline at y ≈ 520, Instrument Serif Italic 76 px. Tiny mono meta above.

| t | action | text | sound |
|---|---|---|---|
| 18.00 | the point opens into a text cursor (the signal, vertical) | `CONSULTA · ALUMNO A-18204 · UNIDAD 05` | — |
| 18.20–19.30 | the question is typed | *¿Dónde explicaba integración por partes?* | soft key clicks |
| 19.50 | parse: words separate; function words drop to graphite; brackets under three spans with labels | `INTENCIÓN: UBICAR` · `REFERENCIA: CLASE` · `CONCEPTO: INTEGRACIÓN POR PARTES` | three ticks |
| 20.25 | `q.vector` — the concept collapses along its baseline into the signal; a vector arrow with its first components | `q = [ 0.12  −0.48  0.91 … ]` · `1536 D` | pitched blip up |
| 20.75 | the vector launches into depth | — | whoosh (filtered noise) |

## 5 · retrieval — 21.00 → 26.50

**Framing:** 3D. Eight unit planes stacked in depth, each carrying passages: video strips (timelines with timestamps) and page blocks with transcript lines. The query ray runs along the flight axis.

| t | action | text | sound |
|---|---|---|---|
| 21.00–23.25 | the camera flies through the units, one per beat; candidates light as the ray passes, with scores | `UNIDAD 01…08` · `0.38 0.57 0.61 0.44…` | tick per unit, rising noise |
| 23.25 | `r.hit` — decelerate at UNIDAD 04; one passage turns amber | `UNIDAD 04 · VIDEO 03 · 11:42 · 0.91` | glassy tone |
| 23.75–24.75 | the passage turns to face camera and flattens into the video timeline; the signal becomes the scrubber, travels to 11:42 | `00:00 … 18:30` · transcript line · `∫ u dv = uv − ∫ v du` | scrub whirr |
| 24.75–26.50 | the answer composes at left; a leader line runs from its citation to the scrubber | “Se explica en la Unidad 04, video 03, a partir de 11:42.” · `[U04 · V03 · 11:42]` · `FUENTE: MATERIAL DEL CURSO` · `ACCESO: VERIFICADO` · `SIN FUENTE → NO RESPONDE` | leader-line tick |

Transition out: the camera whips right following the leader wire.

## 6 · review — 26.50 → 30.00

**Framing:** schematic, flat, bone on vanta. Left: `ENTREGA · TP 03`. Centre: `ANÁLISIS` block with four rubric rows. Right: an open switch labelled `REVISIÓN DOCENTE`, then `REGISTRO`.

| t | action | text | sound |
|---|---|---|---|
| 26.50–27.50 | the signal runs through the analysis; rubric bars fill in graphite with notes | `CRITERIO 1–4` · `SUGERENCIA` | ticks |
| 27.75 | the signal stops at the open switch; the lever is up; a pending label pulses | `REVISIÓN DOCENTE` · `PENDIENTE` | near silence, held tone |
| 28.50 | `rev.close` — the lever rotates down (spring), contact; the label changes | `APROBADO · DOCENTE` | relay clack + resolve |
| 28.50–29.60 | current reaches REGISTRO; the loop returns to the student and closes | — | kick returns |

Transition out: the closed loop shrinks (scale 1 → 0.02, 0.6 s) into one cell.

## 7 · scale — 30.00 → 36.00

**Framing:** 3D field seen at ~35° from above, 24,000 points in a phyllotaxis disc, filling from the centre outward. An architectural dimension line spans the disc.

| t | action | text | sound |
|---|---|---|---|
| 30.00–33.00 | points fill outward; the dimension line's label counts the rendered points | `n = 1 … 24.000` | rising grain of ticks |
| 33.00 | `scale.land` — the label resolves and detaches as the display number | **24.000+** | dry impact |
| 33.50–36.00 | slow orbit; a few points connected by live hairlines | ESTUDIANTES · EN PRODUCTOS EN PRODUCCIÓN | pulse |

## 8 · resolve — 36.00 → 45.00

| t | action | text | sound |
|---|---|---|---|
| 36.00–37.00 | the field collapses along its spirals into five spokes | faint pillar labels | reverse swell |
| 37.00–37.50 | five spokes rotate into one line, the line contracts into the point | — | suck-in, silence |
| 37.50–38.90 | `end.mark` — the point traces the VA mark as a waveform; strokes widen from hairline to the mark's weight | — | traced tone following the zigzag |
| 39.00–39.80 | the point runs along a baseline, revealing VANTALOGICS letter by letter | **VANTALOGICS** | clicks per letter |
| 40.20 | descriptor | PRODUCTO · IA APLICADA · INGENIERÍA | tick |
| 41.00 | the sentence types in; the point parks as its final period | Construimos la inteligencia detrás de los productos educativos. | low resolving tone |
| 42.50 | url | vantalogics.com | — |
| 45.00 | end | — | clean decay |
