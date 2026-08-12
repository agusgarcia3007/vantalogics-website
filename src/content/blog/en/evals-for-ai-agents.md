---
title: "Evals for AI agents: knowing it works before a customer tells you"
seoTitle: "Evals for AI agents: a practical guide — Vantalogics"
description: "What an evaluation set for an AI agent is, how to build one from real cases in your operation, and how to use it to catch a quality drop before a customer complains."
answer: "An eval is a set of real cases with the correct answer written beside each, run automatically on every change to the agent. Thirty to a hundred cases is enough to start. It's the only thing that turns \"it seems better\" into a comparable number, and without it every prompt change is a blind bet."
date: 2026-07-22
cluster: confiabilidad
tags:
  - evals
  - agent evaluation
  - quality
  - LLM
translationOf: evals-para-agentes-de-ia
faq:
  - question: "How many cases do I need to start?"
    answer: "Thirty is enough to catch large regressions; a hundred gives a stable signal. Distribution matters more than count: if 40% of your real queries are about order status, that 40% has to be represented. A badly distributed set of two hundred measures worse than a well-built set of forty."
  - question: "Can a model evaluate the agent?"
    answer: "Yes, and it's standard practice for criteria that are hard to encode, like tone or whether the answer addressed the question. But the judge has to be calibrated against human judgement on a sample before you trust it. An uncalibrated judge carries its own biases and hands you a number that moves without the agent changing."
  - question: "How often should the set be updated?"
    answer: "Every time a case fails in production. That's the cycle: the failed case enters the set with its correct answer, the system gets fixed, and the case stays forever as a regression test. On an active deployment that's two to ten new cases a month."
---

There's a predictable moment in every agent project. Somebody changes a line in the prompt, tests three examples by hand, sees better answers, and ships. Two weeks later a complaint arrives about a case that used to work fine.

That happens because there was no way to know the change had broken something else. An eval is exactly that: the way to know.

## What it is, plainly

An evaluation set is a list of cases. Each case has an input — a real customer message, a real document — and a criterion for what counts as having handled it correctly. You run the whole thing against the agent and get a number back: how many passed.

That's it. Sophistication comes later; 80% of the value is in having the number.

Without the number, the quality conversation is "I tried it and it's better." With it: "we went from 71 out of 100 to 84, and the thirteen it gained are all billing queries." You can have the second conversation with a client. Not the first.

## Why normal software doesn't need this

A function that adds two numbers gets a test: 2 and 3 go in, 5 comes out. It's 5 or it isn't, and if it is, it always is.

An agent asked "did my box order ship?" can answer in infinitely many correct ways and infinitely many wrong ways, and given the same question twice can produce two different answers that are both good. There's no equality to compare.

So you change the question. Instead of "is the output exactly this?", you ask:

- Did it call the right tool with the right parameters?
- Does the value it reported match the system of record?
- Did it escalate to a person when it should have?
- Did it decline to make things up when it lacked the information?

The first three are verifiable in code. The fourth needs judgement, and that's where the judge comes in.

## How you actually build one

### Cases come from the operation, not from imagination

This is the mistake we see most. Somebody sits down to write test cases and produces fifty tidy, grammatical questions with all the necessary information in the first message.

Real messages look nothing like that. They have typos, transcribed voice notes, three questions in one message, a lone "hello?" at eleven at night, screenshots instead of order numbers.

Pull cases from real history: export six months of conversations or tickets and sample from there. If the process doesn't exist digitally yet, use the first two weeks of live operation and build the set as you go.

### Distribution matters more than volume

If 40% of real queries are order status, the set needs that 40%. A two-hundred-case set that overrepresents the rare ones measures worse than a well-distributed set of forty, because it shows you improvements on cases that barely occur.

Beyond the natural distribution, reserve a portion for what breaks things:

- **Ambiguous cases.** The customer didn't say which order and has three open.
- **Cases with no possible answer.** The information isn't in any system. The correct response is to say so, not to invent.
- **Cases that must escalate.** An angry complaint, a discount request outside policy.
- **Hostile cases.** Someone trying to get the agent to say something it shouldn't, or asking it to ignore its instructions.

That last category is the one most often missing and the fastest to become a public problem.

## Using it

The set runs on its own, on every change, before deploying. If the score drops, it doesn't deploy.

After that, three numbers matter and they're worth keeping separate:

| Metric | What it measures | Runs against |
|---|---|---|
| Pass rate | Cases handled correctly | The evaluation set |
| Escalation rate | How many go to a person | Real traffic |
| Drift | Week-over-week variation | Real traffic, sampled |

The first tells you whether the system improved. The second is the one the business cares about: an agent with a 95% pass rate that escalates 60% of cases is barely resolving anything. The third catches a shift — a model updated by the provider, a changed catalogue — when nobody touched anything.

## The cycle that makes it worth having

The set isn't a deliverable. It's an organism:

1. A case fails in production.
2. That case enters the set with its correct answer written beside it.
3. The system gets fixed until the case passes.
4. The case stays forever as a regression test.

Six months in, the set holds the hundred and fifty cases that actually broke that agent in that operation. It's the most valuable asset in the project and the one that can't be copied: it exists in no public repository, can't be bought, and only accumulates by operating.

It is also, put another way, why the second version of an agent is so much better than the first, and why swapping vendors midway costs more than it looks.

## The minimum, if you only do one thing

Pull thirty real conversations from last month. Write down what should have happened in each. Run that against your agent and note the number.

That number, compared against itself a month from now, will tell you more about your system than any dashboard a vendor shows you.
