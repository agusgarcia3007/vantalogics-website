# VANTALOGICS — "La señal" · treatment

45 s · 1920×1080 · 60 fps · code-rendered · original sound

## Thesis

An educational company does not run on one system. It runs on a drive folder, a WhatsApp group, a video host, a payment processor, a spreadsheet of students and a form for exams. Every one of them works. Together they are wrong.

Vantalogics is not another box in that drawing. It is the thing that goes *through* the drawing: the intelligence that connects content, identity, payments, progress and assessment into one system, and then puts reasoning on top of that system without taking authority away from teachers.

The film shows that sentence being drawn, not said.

## Visual concept

**One drawing set, traversed by one signal.**

The whole film is a single technical drawing that the camera travels through. It starts as a flat engineering sheet whose architecture is wrong, is redrawn by the signal into a topology, folds up into dimensional space, becomes a library of course material, a circuit, a field of 24,000 points, and finally reduces back to the one line that drew it.

Nothing in the film is decoration. Every element is a real primitive of an educational product: a ledger row, a video timeline, a module tree, an identity record, a rubric, a timestamp. The drawings are legible if you pause.

References of *register*, not of form: Swiss poster grids, architectural drawing sets (title blocks, sheet numbers, dimension lines), oscilloscope traces, schematic symbols, title sequences that move between flat type and camera space.

## Palette

| token | hex | role |
|---|---|---|
| VANTA | `#050505` | the field; most of every frame |
| PANEL | `#101010` | occluding faces, record backgrounds |
| GRAPHITE | `#2B2A27` | construction lines, passive geometry |
| MUTED | `#7C7A74` | secondary labels, inactive state |
| BONE | `#EEECE5` | type, active geometry |
| SIGNAL | `#F28A2E` | the signal and nothing else (plus 2–3 states it touches) |
| SIGNAL CORE | `#FFF0DA` | the hot centre of the signal point |
| EMBER | `#B8481A` | halation falloff of the signal |

Rules: amber appears only where the signal is or has been. If a frame has amber in two unrelated places, one of them is wrong. Bone never glows. Halation is generated from a separate emissive layer that only the signal writes to.

## Typography

- **Inter Display** (Light → Black): the voice of the system. Large, tight (−3 % to −5 % tracking at display sizes), set on the grid, asymmetric, often cropped by the frame.
- **JetBrains Mono** (Regular/Medium): the machine. Labels, coordinates, indices, timestamps, record fields. 10–14 px, tracked +6 %, uppercase for labels.
- **Instrument Serif Italic**: exactly one voice — the student. The question in Act III is the only serif in the film, because it is the only thing a human types.

These are the three families of the Vantalogics website, so the film belongs to the brand without showing a logo until the last seconds.

## The recurring object: the signal

A small warm point (core + tight halation) moving along an extremely thin line. It never teleports: when the film cuts, the signal is where the eye already is.

It becomes, in order:

1. an intruder line crossing a wrong diagram (Act I)
2. the origin of a new coordinate system (cut)
3. the spine of a bus architecture
4. a student's position along a course path (progress = arc length)
5. the cursor of a typed question
6. a query vector travelling through course material
7. a video scrubber at 11:42
8. a citation leader line
9. current through a circuit, stopped by an open switch
10. a dimension line measuring scale
11. an oscilloscope trace that draws the VA mark
12. the period at the end of the final sentence

## Shot philosophy

- Every shot has an **action**, not an entrance. Something is decided in each shot: a line re-routes, a switch closes, a passage is chosen.
- **Hold → anticipation → snap → settle.** Default eases: `outExpo` for arrivals, `inOutCubic` for camera, critically-damped springs for physical settles. No linear floats, no default ease-in-out.
- A composition never sits unchanged for more than ~2 s unless stillness is the point (the open switch).
- Scale contrast inside frames: one element enormous, the meaningful information 11 px.
- Asymmetric compositions on a 12-column grid (margins 96 px, gutter 24 px). Centre is used twice in the film, on purpose: the origin and the collapse.
- Dimensionality is a narrative device: fragmentation is flat, the system becomes spatial, intelligence is deep (a flight through material), scale is a field, the brand is flat again.

## Transition philosophy

The camera traverses one machine. Transitions are transformations:

- line → origin (the decisive cut keeps the signal on the same screen point)
- flat bus diagram → perspective floor plan (camera pitch)
- floor plan → course path (the spine becomes the road)
- path lettering → architecture (TU MARCA extrudes)
- student point → question (punch-in on one point until it opens into text)
- phrase → vector (words collapse onto their baseline into a ray)
- vector → flight through material
- passage → video timeline → scrubber → leader line
- leader line → circuit (whip following the wire)
- closed loop → one cell of a field of 24,000 (rapid scale change)
- field → five spokes → one line → the point → the mark

Hard cuts are used twice: the decisive cut at 8.0 s and the punch into the question. Fades to black are not used.

## Narrative arc

| act | time | state of the drawing | dimensionality | sound |
|---|---|---|---|---|
| I · Fragmentación | 0–8 s | wrong architecture, getting denser | flat | irregular clicks, detuned drone, cut to silence |
| II · Sistema | 8–18 s | re-drawn topology, then built | flat → 3D | pulse begins, relay clicks, three tonal hits |
| III · Inteligencia | 18–30 s | question → retrieval → review | deep 3D, then schematic | pulse thins, keys, glassy retrieval tone, relay |
| IV · Escala | 30–36 s | one loop becomes 24,000 | field | full pulse, counting ticks |
| V · Vantalogics | 36–45 s | everything reduces to one line | flat | reverse swell, a traced tone, one clean end |

## Scene list

1. **fragments** — Seven primitives (DRIVE, WHATSAPP, VIDEO, PAGOS, CURSOS, EVALUACIONES, ALUMNOS) drawn as small technical diagrams on an irregular rhythm. Connections are attempted and fail: ACCESO MANUAL, DATO DUPLICADO, SIN CONTEXTO, FUERA DEL FLUJO. Versions multiply (`clase_03_final_v2.mp4`, `alumnos_2024 (1).xlsx`). The signal enters on one straight line; the drawing freezes; silence.
2. **origin** — Decisive cut. The signal is the origin of a new coordinate system. The fragments return as nodes and are pulled, one per beat, onto one spine: seven become five (CONTENIDO, IDENTIDAD, PAGOS, PROGRESO, EVALUACIÓN). The duplicated identity merges (≠ becomes =).
3. **course** — The camera pitches from plan view into perspective: the bus diagram is the floor plan of a course. Module gates rise; the signal travels the path; PROGRESO is its arc length. TU MARCA extrudes as architecture; TUS ALUMNOS floods the path with points (one identity each); TUS DATOS drops every point onto one data plane.
4. **question** — Punch into one student point. The question is typed in serif italic, then parsed: intent, reference, concept. The concept collapses into a vector.
5. **retrieval** — Flight through stacked units of course material; candidate passages score in graphite; UNIDAD 04 · VIDEO 03 · 11:42 turns amber. The passage flattens into a video timeline; the signal is the scrubber; the answer is composed with its citation physically wired to the source.
6. **review** — The wire leads to an evaluation circuit. AI analysis runs up to an open switch: REVISIÓN DOCENTE. Hold. The teacher closes the switch; current reaches the record; the loop closes.
7. **scale** — The closed loop is one cell. Pull out into a field of 24,000 points. A dimension line measures the field; its label is the number: 24.000+. ESTUDIANTES · EN PRODUCTOS EN PRODUCCIÓN.
8. **resolve** — The field collapses into five spokes, one line, the point. The point traces the VA mark as a waveform, reveals VANTALOGICS along a baseline, then the descriptor, then the sentence; it parks as the sentence's final period. vantalogics.com.

## Sound direction

Original, synthesized from the same cue list that drives the picture (deterministic, sample-accurate). No music library, no risers every bar.

- **Tempo:** 120 BPM grid (bar = 2.0 s). Act I avoids the grid on purpose; Act II locks to it.
- **Palette:** sub-bass sine kicks with a short pitch drop; dry closed ticks (filtered noise, 2–6 ms); relay clicks (two-transient metallic clack with a short resonant body); plotter movement (band-passed noise whose level follows the signal's speed); tonal impacts (low sine + soft FM partial, a minor-ninth-free modal chord on D); a thin sine “trace” tone that follows the signal in the last act; granular glitter (very short high blips) for tokens and counters.
- **Sync:** every node that appears clicks; every line that snaps ticks; every gate passed pulses; the three statements of Act II are three tonal hits; the retrieval is a single glassy tone; the switch is a relay; the count is a rising grain; the logo trace is a pitched sweep following the zigzag.
- **Dynamics:** silence is a tool — a hard cut to silence 0.5 s before the decisive cut, near silence under the open switch, and a clean decay at the end.
- **Mix:** mono-compatible, sub under −12 dBFS peaks, limiter only as protection, −14 LUFS-ish integrated.
