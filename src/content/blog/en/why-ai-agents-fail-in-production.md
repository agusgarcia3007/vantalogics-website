---
title: "Why AI agents fail in production"
seoTitle: "Why AI agents fail in production — Vantalogics"
description: "The six failures that show up once an AI agent leaves the demo and starts handling real customers, why none of them are visible in testing, and how each one is prevented."
answer: "AI agents rarely fail because of the model. They fail for six reasons: degrading context, tools returning errors the agent can't read, no action limits, no evaluation set, silent quality drift, and shared state between steps. All six appear in production and none of them appear in the demo."
date: 2026-07-08
cluster: confiabilidad
tags:
  - AI agents
  - production
  - reliability
  - observability
translationOf: por-que-fallan-los-agentes-de-ia-en-produccion
faq:
  - question: "Does switching to a better model fix this?"
    answer: "Almost never. A stronger model improves the margin, but the six failures here are architectural: context, tools, limits, evaluation, monitoring and state. A better model on a badly built system fails less often and in ways that are harder to detect, which is worse."
  - question: "How long before quality drift shows up?"
    answer: "Six to twelve weeks in most deployments. It doesn't arrive as an error but as a shift: the agent resolves a smaller share of cases without anything breaking. Without a metric running against real cases, you find out when somebody in support mentions it."
  - question: "What should you instrument first?"
    answer: "The full trace of every run: input, every tool call with its response, and the output. Without it, a case that went wrong is unreproducible and fixing it becomes guesswork. It's the first thing we install, before the agent makes a single decision on its own."
---

An agent that works in the demo and fails in production isn't bad luck or an inadequate model. It's a pattern, and it's repeatable enough to enumerate.

This is the list of what we see break when an agent moves from the meeting room to real people. None of the six is a model problem. All of them are preventable, but you have to decide to prevent them up front, because once you're live each one costs five times as much to fix.

## 1. Context degrades

In the demo the agent answers three messages. In production, a support conversation reaches forty, with attachments, with the customer changing topic and coming back, with a handoff to a human and back again.

What happens after message fifteen is that the important detail — the order number the customer gave at the start — gets buried under twenty logistics exchanges, and the model starts reasoning over the most recent thing it read rather than the relevant thing. It isn't hallucinating; it's prioritizing badly.

**How to prevent it:** don't send the whole conversation. The agent should work over explicit state — order, customer, stage, decisions already made — updated every turn, plus a short window of recent messages. The full history is kept for audit, not for reasoning.

## 2. Tools fail and the agent can't read it

All the design effort goes into the happy path. Then, in production, the ERP API returns a 500 at three in the morning during the nightly batch, or answers `200 OK` with an empty body, or takes forty seconds.

An agent that was never taught what those cases mean does the worst possible thing: it treats the error as data. "I couldn't find the order" becomes "your order doesn't exist," said to a customer whose order does exist.

**How to prevent it:** every tool returns typed, distinguishable states — found, not found, transient error, unauthorized. The agent has explicit instructions for each, and the right response to a transient error is almost always retry once then escalate to a person, never improvise.

## 3. There are no action limits

This is the one that worries clients, and rightly. An agent with unrestricted write access to the CRM can, on one misread instruction, update four hundred records.

The discussion usually gets framed as "how much autonomy do we give it," which is the wrong question. The right one is: **which actions are reversible and which aren't?** Sending a WhatsApp message can't be undone. Creating a draft order can.

**How to prevent it:** scope permissions to the minimum needed, put irreversible actions behind human approval from day one, and enforce hard limits — amount, records per run, frequency — in code rather than in the prompt. A limit written in a prompt is a suggestion. A limit written in code is a limit.

## 4. There is no evaluation set

This is the most common failure and the most expensive, because it makes all the others invisible.

Without a set of real cases to measure against, there's no way to know whether Tuesday's prompt change improved or degraded the system. Somebody tests four examples by hand, it seems better, it ships, and two weeks later a complaint arrives about a case that used to work.

**How to prevent it:** thirty to a hundred real cases drawn from the client's operation, with the correct answer written beside each, running automatically on every change. That's enough to start. Covered in detail in [evals for AI agents](/en/blog/evals-for-ai-agents/).

## 5. Quality drifts without anything breaking

Traditional systems fail loudly: an exception is thrown, somebody sees the alert. An agent fails quietly. It keeps answering, keeps sounding reasonable, and the share of cases it gets right slides from 82% to 71% over two months.

The causes are several and all mundane: the provider updates the model underneath you, the client's catalogue changes, a new kind of query starts arriving that didn't exist when the system was built.

**How to prevent it:** a quality metric running against real traffic — not against the evaluation set — and an alert when it falls below the agreed threshold. Without that, the first person to notice the agent got worse is a customer.

## 6. Shared state between steps

This one only appears once more than one agent or more than one step writes to the same thing. One step updates order status; another read the previous value and acts on stale information. In a deterministic system you catch this in the first load test. Here, because every run takes a different path, the race condition surfaces once in three hundred executions.

**How to prevent it:** a single writer per entity, idempotent operations — safe to repeat without duplicating the effect — and an idempotency key per run. It's boring, and it's what stops the order being entered twice.

## The pattern behind all six

None of these failures is about artificial intelligence. They are the failures of any distributed system working against third-party APIs, aggravated by two properties agents add: the output isn't deterministic, and the system fails plausibly rather than loudly.

That changes exactly one thing about building software, but it changes it completely: **you cannot treat the absence of errors as evidence that things are working.** You have to measure quality actively, continuously, against cases that matter. An agent without measurement isn't a working agent — it's an agent whose failures you haven't found yet.

It is also, put bluntly, the difference between a demo that impresses a room and a system still running in month eighteen.
