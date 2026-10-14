---
title: "Evals for AI agents in education: knowing it works before a student tells you"
seoTitle: "Evals for AI agents in education: a practical guide — Vantalogics"
description: "What an evaluation set for an AI tutor, assistant or grader is, how to build one from real student questions, and how to use it to catch a quality drop before a cohort complains."
answer: "An eval is a set of real cases — student questions, submissions, requests — with the correct answer written beside each, run automatically on every change to the agent. Thirty to a hundred cases is enough to start. It's the only thing that turns \"it seems better\" into a comparable number, and without it every prompt change is a blind bet."
date: 2026-07-22
updated: 2026-10-14
cluster: confiabilidad
industry: edtech-y-plataformas-educativas
useCases:
  - correccion-asistida
  - tutor-de-ia
tags:
  - edtech
  - evals
  - agent evaluation
  - quality
  - LLM
translationOf: evals-para-agentes-de-ia
faq:
  - question: "How many cases do I need to start?"
    answer: "Thirty is enough to catch large regressions; a hundred gives a stable signal. Distribution matters more than count: if 40% of real student questions are about due dates and access to classes, that 40% has to be represented. A badly distributed set of two hundred measures worse than a well-built set of forty."
  - question: "Can a model evaluate the agent?"
    answer: "Yes, and it's standard practice for criteria that are hard to encode, like tone or whether the answer addressed the question. But the judge has to be calibrated against human judgement on a sample before you trust it. An uncalibrated judge carries its own biases and hands you a number that moves without the agent changing."
  - question: "How often should the set be updated?"
    answer: "Every time a case fails in production. That's the cycle: the failed case enters the set with its correct answer, the system gets fixed, and the case stays forever as a regression test. On an active deployment that's two to ten new cases a month."
---

There's a predictable moment in every agent project. Somebody changes a line in the tutor's prompt, tests three questions by hand, sees better answers, and ships. Two weeks later a student complains about a question that used to be answered well.

That happens because there was no way to know the change had broken something else. An eval is exactly that: the way to know.

## What it is, plainly

An evaluation set is a list of cases. Each case has an input — a real student question, a real submission — and a criterion for what counts as having handled it correctly. You run the whole thing against the agent and get a number back: how many passed.

That's it. Sophistication comes later; 80% of the value is in having the number.

Without the number, the quality conversation is "I tried it and it's better." With it: "we went from 71 out of 100 to 84, and the thirteen it gained are all questions about unit 3." You can have the second conversation with the institution or the teaching team. Not the first.

## Why normal software doesn't need this

A function that adds two numbers gets a test: 2 and 3 go in, 5 comes out. It's 5 or it isn't, and if it is, it always is.

A tutor asked by a student "why do you solve for x before y in this exercise?" can answer in infinitely many correct ways and infinitely many wrong ways, and given the same question twice can produce two different answers that are both good. There's no equality to compare.

So you change the question. Instead of "is the output exactly this?", you ask:

- Did it call the right tool with the right parameters?
- Does the date or grade it reported match the platform's?
- Did it hand off to the teacher when it should have?
- Did it decline to make things up when the answer wasn't in the course material?

The first three are verifiable in code. The fourth needs judgement, and that's where the judge comes in.

## How you actually build one

### Cases come from the operation, not from imagination

This is the mistake we see most. Somebody sits down to write test cases and produces fifty tidy, grammatical questions with all the necessary information in the first message.

Real student questions look nothing like that. They have typos, transcribed voice notes, three questions in one message, a lone "hello?" at eleven at night before an exam, a photo of the exercise instead of its statement.

Pull cases from real history: export six months of questions to teachers, course forum threads or support tickets and sample from there. If there's no digital history yet, use the first two weeks of real use and build the set as you go.

### Distribution matters more than volume

If 40% of real questions are about due dates and access, the set needs that 40%. A two-hundred-case set that overrepresents the rare ones measures worse than a well-distributed set of forty, because it shows you improvements on cases that barely occur.

Beyond the natural distribution, reserve a portion for what breaks things:

- **Ambiguous cases.** The student didn't say which course and is enrolled in three.
- **Cases with no possible answer.** The answer isn't in the material or the platform. The correct response is to say so, not to invent.
- **Cases that must be handed off.** A grade appeal, an extension request outside the rules.
- **Hostile cases.** A student asking the tutor for the answer to the graded assignment, or telling it to ignore its instructions.

That last category is the one most often missing and the fastest to become a public problem.

For a tutor, that list turns into five case types, with correct abstention as the one that decides whether it can open: they're detailed in [how to evaluate an AI tutor before opening it to students](/en/blog/evaluating-an-ai-tutor-before-launch/).

### The judge, when you need one

For criteria that can't be checked in code — is the tone right? did it answer what was asked? — a model is used as the evaluator.

It works, with one condition: it has to be calibrated. Take twenty cases, have a person grade them, have the judge grade them, and compare. If they agree on eighteen, the judge is usable. If they agree on thirteen, the number it gives you doesn't measure the agent's quality, it measures the judge's mood.

An uncalibrated judge is worse than no judge, because it produces a figure that looks objective.

[AI-assisted grading](/en/solutions/edtech-and-learning-platforms/assisted-grading/) is the same problem seen from the other side: there the model is the judge and what's being evaluated is the student's submission. It's calibrated the same way, against the teacher's grade, criterion by criterion of the rubric, and the distance between the draft and the final grade is the metric that says whether it can be extended to another subject.

## Using it

The set runs on its own, on every change, before deploying. If the score drops, it doesn't deploy.

After that, three numbers matter and they're worth keeping separate:

| Metric | What it measures | Runs against |
|---|---|---|
| Pass rate | Cases handled correctly | The evaluation set |
| Hand-off rate | How many go to the teacher | Real traffic |
| Drift | Week-over-week variation | Real traffic, sampled |

The first tells you whether the system improved. The second is the one the institution cares about: a tutor with a 95% pass rate that hands 60% of questions to the teacher is barely saving anyone anything. The third catches a shift — a model updated by the provider, a course that changed version — when nobody touched anything.

## The cycle that makes it worth having

The set isn't a deliverable. It's an organism:

1. A case fails in production.
2. That case enters the set with its correct answer written beside it.
3. The system gets fixed until the case passes.
4. The case stays forever as a regression test.

Six months in, the set holds the hundred and fifty cases that actually broke that agent on that platform. It's the most valuable asset in the project and the one that can't be copied: it exists in no public repository, can't be bought, and only accumulates by operating.

It is also, put another way, why the second version of an agent is so much better than the first, and why swapping vendors midway costs more than it looks.

## The minimum, if you only do one thing

Pull thirty real student questions from last month. Write down what should have happened in each. Run that against your agent and note the number.

That number, compared against itself a month from now, will tell you more about your system than any dashboard a vendor shows you.
