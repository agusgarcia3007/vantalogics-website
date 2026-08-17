---
title: "How to evaluate an AI tutor before opening it to students"
seoTitle: "How to evaluate an AI tutor before launch — Vantalogics"
description: "The evaluation set for an educational tutor: the five case types it has to include, how correct abstention is measured, and what threshold gets agreed before the feature opens."
answer: "An AI tutor is evaluated with five case types: questions answered in the material, questions whose correct answer is \"that isn't in the course\", the graded assignment prompt verbatim, questions from an unlocked-later unit, and questions in student vocabulary. The case almost nobody tests — correct abstention — is the one that decides whether the tutor is trustworthy."
date: 2026-08-16
cluster: confiabilidad
industry: edtech-y-plataformas-educativas
translationOf: evaluar-un-tutor-de-ia-antes-de-abrirlo
tags:
  - edtech
  - evals
  - AI tutor
  - reliability
faq:
  - question: "How many cases does the set need to be useful?"
    answer: "Fewer than people assume, if they're well chosen. A set of around a hundred real cases well distributed across the five types catches nearly every problem that would show up in production. A thousand cases auto-generated from the material catch considerably less, because they share the assumptions of the system they're testing."
  - question: "Who builds the evaluation set?"
    answer: "A teacher from the course, not the engineering team. The question that decides each case — is this answer correct for a student in this unit? — is pedagogical. The engineering team builds the infrastructure to run it on every change, which is the other half of the work."
  - question: "How often does it get re-run?"
    answer: "On every system change, and additionally every time new course content is published. The second is often forgotten: a rewritten unit can break answers that were previously correct, and without running the set that gets discovered through a student complaint."
---

An AI tutor over course content works well in the tests the team that built it runs, because the team tests what it expects to happen. The problems are in what isn't expected, and in education those cases are fairly specific.

What follows are the five case types we include in the evaluation set, and why the second one matters most.

## Type 1: the answer is in the material

The obvious case. Questions about course content, with the correct passage annotated by hand.

It's measured at two levels, and separating them matters: first, whether the correct passage appeared among those retrieved; second, whether the generated answer is correct given that passage. Without that separation a failure is unreadable — you don't know whether the system failed to find the material or found it and answered badly, and those are two different fixes.

## Type 2: the correct answer is "that isn't in the course"

This is the case almost no team tests and the one that decides whether the tutor is trustworthy.

Reasonable questions, on the same topic, that the material simply doesn't cover. The correct answer isn't an explanation: it's saying that this isn't in the unit, and offering what is.

A tutor that answers type 1 well and fails type 2 is worse than no tutor, because it produces plausible answers about content the course never taught, aimed at someone who by definition can't detect it. And since the rest of the answers were good, the student has every reason to believe it.

The metric is the correct-abstention rate, and a threshold gets agreed before the feature opens. It's the number that generates the most discussion with the product team, because abstaining feels like a worse answer.

## Type 3: the graded prompt, verbatim

Copy and paste the text of every assignment in the course and see what the tutor does.

The correct response is a mode switch: explain the concept the assignment assesses, offer an analogous exercise, and withhold the solution. And it has to work with the paraphrased prompt too, which is how it actually arrives: students rarely paste the exact text.

This case can't be usefully auto-generated. You take the course's real assignments, one by one.

## Type 4: content from an unlocked-later unit

Questions whose answer is in the material, but in a unit that student hasn't opened yet, or in a course belonging to a plan they didn't buy.

The correct answer is again a refusal, for two different reasons: a pedagogical one — the course is deliberately sequenced — and a product one — search can't leak paid content. The second reason makes this case a security test as well.

## Type 5: student vocabulary

The same questions as type 1, but written the way someone who hasn't learned the topic writes them. With the imprecise word, with a description of the graph instead of the name of the concept, with the typo.

This is the domain's asymmetry: the person asking is precisely the one who hasn't mastered the material's vocabulary. A set written by the teacher in the teacher's language measures a different system from the one students will use.

You don't have to invent these cases: they're in the course forum and in the support tickets from previous cohorts.

## What gets agreed before opening

Three things, in writing, with product and with the teacher:

**The correct-abstention threshold.** Below that number the feature doesn't open, even if everything else looks good.

**What counts as a serious error.** Our definition for tutors: asserting as the course's something the course doesn't say, and solving a graded assignment. Either one is treated as blocking, not as a metric to improve.

**The degradation plan.** What the system does when retrieval finds nothing good. The correct answer is to say so and offer to contact the teacher, not to attempt it anyway.

## The most uncomfortable case

Worth naming because it always appears and has no technical fix: the course material is outdated or contains an error.

The tutor repeats it, because it answers from the source. That sounds like a defect and is a feature: the citation makes the error visible and therefore fixable. A tutor answering from memory would paper over it with a correct answer that contradicts the material, and nobody would learn that unit three has been wrong for two years.

In practice, the first run of a course's evaluation set finds errors in the course. It's uncomfortable, and it's one of the most useful things the project produces.
