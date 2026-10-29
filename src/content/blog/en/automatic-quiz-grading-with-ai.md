---
title: "Automatic quiz grading with AI: what we measured on 5,563 real answers"
seoTitle: "Automatic quiz grading with AI: a real case — Vantalogics"
description: "5,563 real answers from an academy: 99.4% can be graded against a verified answer key. When the AI gave the grade, 43% of students got an inconsistent verdict."
answer: "At an academy with 5,563 ungraded open answers, 99.4% can be graded without AI at grading time: by comparing against a verified answer key. When the AI ruled answer by answer, 80 of 185 students (43%) got the opposite verdict to another student with the same answer. AI is useful for building the key and for writing the feedback, not for giving the grade."
date: 2026-10-15
cluster: casos
industry: edtech-y-plataformas-educativas
useCases:
  - correccion-asistida
  - generacion-de-evaluaciones
tags:
  - edtech
  - automatic grading
  - assessments
  - quizzes
  - LLM
translationOf: correccion-automatica-de-cuestionarios-con-ia
faq:
  - question: "Can you grade a quiz with ChatGPT or another language model?"
    answer: "You can use the model to solve the exercise, and it does that well: in our measurement it solved the same exercise correctly 24 times out of 25. What you shouldn't do is let it rule answer by answer. On 185 real answers, the verdict changed between calls for identical answers and affected 43% of students. The model is useful for building a key once; grading after that is a deterministic comparison."
  - question: "What happens to answers that need judgement?"
    answer: "They stay pending for the teacher. In a physics and chemistry course they were 0.6% of open answers. For open prose questions, where judgement is most of the work, the approach is different: an explicit rubric, a draft with quoted evidence and a teacher who signs off on the grade."
  - question: "Do the answer keys have to be entered by hand?"
    answer: "Not necessarily. The key is built from independent sources: student consensus, solving the exercise with several different methods, and trying to refute the candidate answer. It is activated only if at least two sources agree. Keys that don't converge stay visible so someone can unblock them, and meanwhile those answers remain pending."
  - question: "Does it work for multiple-choice questions?"
    answer: "Multiple choice is already graded against the option marked as correct. What this approach adds there is catching wrongly entered keys: across 581 questions, the option most students chose matched the key 97.8% of the time, and in at least 4 of the 13 disagreements the stored key was the wrong one."
---

[Apoyo Escolar RV](/en/cases/apoyo-escolar-rv/) prepares students for subjects at five universities and has more than 22,000 students on its platform. Its quizzes mix multiple choice with open questions, and in August 2026 there were 5,563 open answers waiting to be graded: 97.8% of all those submitted. A single teacher cannot keep up, and every day without grading is a student studying without knowing whether they understood.

The request seemed obvious: let AI grade. We measured it before building it, and the conclusion was the opposite of what we expected. AI should not give the grade. It should help build the answer key the grade is given with.

## First: what shape the answers have

Before choosing a technique, look at the corpus. The exercises with the most answers were physics (diffusion, dynamics, hydrostatics, kinematics, gases, osmosis) and chemistry (nomenclature). In a science subject, the "open question" is almost never an essay: it is a number with a unit, a formula, sometimes two results in the same answer.

We classified the pending answers by what it takes to grade them:

| Shape of the answer | % |
|---|---|
| Comparable value (number, formula or symbol, with or without text around it) | 90.8% |
| Multipart, comparable part by part | 4.2% |
| Filler rejected without discussion (".", "dunno", "xxx") | 4.4% |
| **Gradable without human judgement** | **99.4%** |
| Needs judgement (prose, open reasoning) | 0.6% |

The 99.4% does not need anyone to interpret anything. It needs to know the correct answer and compare against it properly.

## What happened when the AI gave the grade

We still tried the path that looks obvious: the model reads each answer and decides whether it is right. We took 185 real pending answers from 12 exercises and gave it the best possible chance, with reasoning before the verdict.

We didn't need to know the correct answer to rule it out. Four students wrote exactly "6,125". The model derived 6.125 kW all four times. It rejected three and told them "the value is correct but you didn't include the unit", and the fourth, who had written exactly the same thing, it approved.

| Measurement on 185 answers | Result |
|---|---|
| Exercises where the model contradicts itself about the answer | 9 of 12 |
| Groups of students with identical answers and opposite verdicts | 8 |
| **Students affected** | **80 of 185 (43%)** |
| Times the model solved the reference exercise correctly | 24 of 25 |

The last row is the important one. The model knows how to solve. What doesn't hold is the verdict: it doesn't follow from its own solution, and the criterion moves from one call to the next. Applied 154 times to the same exercise, each call is an independent roll of the dice that nobody can audit.

## The shift: not 5,563 gradings, but 95 answer keys

If the problem is that the criterion moves, the fix is to set it once. For the exercises with pending answers, 95 keys were enough. With the key written down, grading is a mathematical comparison: deterministic, testable and auditable, with no AI at grading time.

It also changes the shape of the risk. A key error affects about 50 students, but it is detected with a single observation and reverted in bulk. An AI error per answer means thousands of independent errors that only surface when a student complains.

The comparison is not trivial, and that is where almost all the engineering work is:

- **Units with conversion.** `463 cm/s` is the same as `4.63 m/s`, `30 °C` as `303.15 K`, `6.125 kW` as `6125 W`.
- **Number formats.** Fractions (`-1/18` and `-0.0556`), handwritten scientific notation (`2.4x10-3`), decimal comma or point, subscripts and superscripts.
- **Multipart.** "a) 0.4 m/s² b) 6.32 m/s" is split and compared part by part, matched by label: answering "b)" before "a)" is not a mistake.
- **A number inside prose.** From "the mass of each weight is 4158.67 grams" the value is extracted. If there are two different numbers, it abstains, because choosing which one is the result is already interpreting.

The engine has three outputs, not two: match, mismatch and **unsupported**. The third is what makes it safe: an answer the engine can't read stays pending for a person. Nothing is approved or rejected blindly.

We validated it against 115 manual gradings that already existed. It decided 110 and abstained on 5. It got all 110 it decided right, and the 4 differences from the manual grading turned out to be errors in the manual grading. The tests also caught two of our own bugs before production: `0,188 m` read as 188 metres and `Rta: -3` losing its sign.

## How the key gets built without anyone entering it

Keys are not written by hand. They are assembled from **independent** sources of evidence, and independence matters more than quantity:

1. **Student consensus**: the most frequent answer, normalised.
2. **Blind solving by the model**, using different methods: from the image of the problem, from its transcription and translated into symbolic computation. Repeating the same method doesn't help: in one test, 8 of 8 samples using the same method agreed on the wrong answer.
3. **Inverse refutation**: given a candidate, the model is asked to refute it (substitute back, check units, sign and order of magnitude). Refuting is easier than solving.
4. **Previous human gradings**, when several of them agree.
5. **Coherence**: the key has to explain the distribution of answers that was observed.

A key is activated only if at least two independent sources agree and no high-weight source contradicts it. Otherwise it stays a candidate and those answers remain pending, just as before. Abstaining is free; errors are not.

Student consensus alone is not enough, and we measured it with a natural experiment: 581 multiple-choice questions that already had the correct answer stored. The most-chosen option matched the key 97.8% of the time (568 of 581). Requiring the majority to exceed 80% raises accuracy to 99.1%, but leaves out a third of the questions. And the failures are not borderline: on one question 92% of students chose one option and the one marked correct got 2%.

Reviewing those 13 disagreements turned up something else: **in at least 4 of them the students were right and the stored key was wrong**. The cyanide ion marked incorrect when the answer was CN⁻, the oxidation number of sulphur in Na₂SO₄ marked wrong, two questions with duplicated options. A question bank with per-item statistics finds its own broken keys, which is one of the reasons [assessment generation](/en/solutions/edtech-and-learning-platforms/assessment-generation/) has to include calibration through use.

## A detail that changes the answer: field order

A model generates its output one fragment at a time. If the answer field comes before the reasoning in the output structure, the model is guessing, and what it reasons afterwards does not correct what it has already written.

We saw it in this corpus. The model correctly derived that the vertical asymptote was `x=2`, wrote in its reasoning "option 2 matches our finding" and put `3` in the answer field, because that field had been emitted first. Reasoning goes first and the answer last, always. An earlier test that concluded "AI can't solve these exercises" may well have been measuring this artefact rather than the model's ability.

## Units: the fact is learned once, not interpreted while grading

Every course writes units its own way (`kwatt`, `dinas/cm2`, `mmH₂O`), and every form the engine doesn't know makes it abstain over spelling, not judgement. Keeping the list by hand doesn't scale.

The fix is not to have the model interpret the unit while grading, which is exactly what fails. It is to ask it a verifiable fact once ("how many watts are in a kilowatt?"), require two independent samples to agree on the quantity and the factor, and check that the fact doesn't contradict any unit already known. Out of 8 new units it learned 7 with the correct factor. The eighth, specific energy in kJ/kg, didn't converge and the engine abstained: it didn't invent a factor.

There is also a course rule the system respects: the unit is required, except when the problem statement already prints it (`Answer: ____ km/s`). If the reading of the statement says "require" but fewer than 25% of students wrote the unit, it is not required. Failing an entire class over a misreading is the worst error available, and it is silent.

## Where AI does come in

AI didn't disappear from the system; it moved:

| Task | Who does it |
|---|---|
| Solve the exercise to build the key | The model, with several methods, once per question |
| Activate the key | A rule: at least two independent sources in agreement |
| Give the grade | The comparison against the key, without AI |
| Reject filler ("dunno", "asdasd") | Rules, plus the model for what isn't an attempt at an answer |
| Write the feedback to the student | The model, after the verdict, unable to change it |
| Answers that need judgement | The teacher |

Pedagogical feedback is the model's natural place: it receives the already-fixed verdict, the key and the student's answer, and explains. The verdict is not part of what it can return.

The safety net is what makes all of the above defensible. Every automatic grade records which key and which version produced it. If the teacher contradicts a key, the key is rejected and every grade made with it is reverted in bulk. Before grading anything, the system ran in shadow mode against the existing manual gradings. The previous grader, which let the AI write the final verdict whenever a rubric had been approved, was removed entirely.

Since August 2026 grading runs at submission time. Anything without a key triggers a job that tries to build one and grade, and the administration only gets an alert if something is left at the end that needs a person. Since September, open questions also have an "I don't know" button, because students who couldn't solve an exercise were typing random letters just to be able to submit.

## What another platform can take from this

- **Look at the shape of the answers before choosing the technique.** If most of them are comparable, the problem is keys, not judgement.
- **Don't let the model rule answer by answer.** Have it solve once, with independent evidence, and make grading deterministic.
- **Design for abstention.** A system that can say "I don't know" is the only one you can delegate grading to.
- **Record what each answer was graded with.** Without it there is no bulk reversal, and without reversal every key error becomes one complaint per student.
- **Measure before building.** Measuring 185 answers kept a grader that contradicted itself for 43% of students out of production.

For open prose questions, where judgement is nearly all the work, the approach is [assisted grading](/en/solutions/edtech-and-learning-platforms/assisted-grading/): an explicit rubric, a draft with evidence and a teacher who signs off. And if at any point a model acts as a judge, it has to be [calibrated against human judgement](/en/blog/evals-for-ai-agents/) before you trust the number it returns.
