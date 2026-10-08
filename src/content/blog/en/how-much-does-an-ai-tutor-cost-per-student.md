---
title: "What an AI tutor costs per student, and why the math comes before the prototype"
seoTitle: "How much does an AI tutor cost per student? A worked example — Vantalogics"
description: "At public October 2026 prices, 40 messages per student per month cost between $0.03 and $3.33 in model fees. What explains that 126x gap and how to close it."
answer: "An AI tutor's cost is measured per active student per month, not per query. It depends on three variables: messages per student, context retrieved per message, and the model chosen. In EdTech the unit economics are tight, so the math comes before the prototype: if it exceeds the margin of the plan selling the feature, there's no product. As a reference, at public October 2026 prices, 40 messages per student per month cost $0.03 with tight retrieval and a small model, and $3.33 with a large model fed the whole unit."
date: 2026-08-09
updated: 2026-10-08
cluster: costos
industry: edtech-y-plataformas-educativas
translationOf: cuanto-cuesta-un-tutor-de-ia-por-alumno
tags:
  - edtech
  - costs
  - AI tutor
  - RAG
faq:
  - question: "How much does it cost to add AI tutoring to a university?"
    answer: "Model cost depends on active students, not enrolled ones. Using the example in this note, 3,000 active students sending 40 messages a month cost between $79 and $9,984 per month depending on the architecture, at public October 2026 prices. Development, content preparation and operations come on top, and they don't scale per student."
  - question: "Can the cost be estimated before building anything?"
    answer: "To a precision sufficient for deciding, yes. You need three numbers the platform already has: monthly active students, an estimate of messages per student taken from forum or support usage, and the typical length of the material that would be retrieved. That bounds the range, and the range is enough to know whether the project closes."
  - question: "Big model or small model?"
    answer: "Both, routed. Most course queries are comprehension questions over already-retrieved material, and a small model handles them just as well at a fraction of the cost. The large model is reserved for what needs it: reasoning across several passages, multi-step exercises, code."
  - question: "How do you stop one student from blowing up the cost?"
    answer: "With a per-student, per-period ceiling, surfaced in the interface before it's reached. That's a product decision, not a technical one: without a ceiling, a handful of intensive users define the cost of the entire base, and that cost only appears on next month's invoice."
---

In almost every sector we work in, the cost question arrives last: decide what to build, then find out what it costs. In EdTech that order doesn't work, and it's the mistake that sinks the most projects.

The reason is unit economics. A student plan costs what it costs, usage is high and sustained through the academic term, and an AI feature with a variable per-student cost comes straight out of a margin that was already finite.

## The right unit is the active student per month

Not the token, not the query, not the course. Cost is measured per active student per month, because that's the unit revenue is expressed in.

The calculation has three variables:

**Messages per active student per month.** The hardest number to estimate before launch and the one that varies most. A reasonable proxy is current forum and support volume multiplied by a factor: an always-available tutor receives considerably more questions than a forum where you have to wait for an answer.

**Context retrieved per message.** How many passages of material go into each answer, and how long they are. This is the variable the team controls and the one most underestimated.

**The model chosen.** With an order-of-magnitude difference between the small and large models of the same family.

Multiplied out, they give the number you compare against the plan's margin.

## A worked example

To make the difference visible, the same usage under two architectures. The assumptions are illustrative and should be replaced with each platform's own:

- 40 messages per active student per month.
- 1,500 tokens of fixed instructions, 100 of question and 400 of answer per message.
- Fast architecture: the whole unit as context (30,000 tokens) and the full history (8,000 tokens on average).
- Careful architecture: 4 retrieved passages of 500 tokens and the history summarized into 1,000 tokens.

Public Anthropic API prices as of October 8, 2026, per million tokens: Claude Haiku 5.5, $0.10 input and $0.50 output; Claude Sonnet 5.5, $2 and $10. No caching or batch discounts.

| Architecture | Input tokens per message | Model | Cost per message | Per active student per month | 3,000 active students per month |
|---|---|---|---|---|---|
| Whole unit + full history | 39,600 | Large | $0.083 | $3.33 | $9,984 |
| Tight retrieval + summarized history | 4,600 | Large | $0.013 | $0.53 | $1,584 |
| Same, with 80% of questions on the small model | 4,600 | Routed | $0.003 | $0.13 | $380 |
| Same, all on the small model | 4,600 | Small | $0.0007 | $0.03 | $79 |

Between the first row and the last there's a 126x difference for the same student and the same number of messages. The model explains part of it, but changing only the context, without touching the model, already cuts cost by six.

Two caveats. This is model cost, not project cost: development, content preparation, evaluation and operations are paid separately and don't grow with each student. And per-token prices drop often, so the calculation is worth more for the ratio between architectures than for the exact number.

## What drives the cost up

Almost always the second variable, and almost always through the same architectural decision.

The fastest way to build a tutor is to include a lot of context: the whole unit, the full conversation history, related material just in case. It works well, it ships in days, and it multiplies cost several times over without improving the answer proportionally.

The second cause is history. A long tutoring conversation drags every prior message into each turn, so the twentieth message costs several times what the first did. Without a summarization strategy, long conversations are the expensive ones — and they belong precisely to the most engaged students.

## The four levers that bring cost down

Ordered by return per unit of effort.

**Tight retrieval.** Bring the passages that answer the question, not the whole unit. It requires material split by conceptual unit and properly indexed, which is upfront work and the same work that makes the answer good. It's the only lever that lowers cost and improves quality at the same time.

**Model routing.** Most course questions are comprehension over already-retrieved material and don't need the most expensive model. A cheap classifier up front decides, and the difference on the invoice is large.

**Caching the repeated.** In a course, questions cluster heavily: the same twenty doubts cover a high share of volume, especially around assignment deadlines. Recognizing that and answering from cache is straightforward and very profitable.

**History summarization.** Compressing old turns instead of carrying them whole. This is the lever that stops long conversations from dominating the bill.

## The calculation that decides whether there's a product

It's arithmetic, which is why it's better done before rather than after.

On the revenue side: what the plan leaves per student per month, after everything else. On the cost side: the number from above.

If the estimated tutor cost is a small fraction of the margin, there's a product and the conversation becomes about quality. If it's a large fraction, the feature has to go in a higher tier, carry a usage ceiling, or not ship.

And if the estimated cost exceeds the plan price, what you have isn't a product but a loss-making promotion dressed as innovation. It happens more often than it seems, because the prototype is built with twenty internal users and nobody multiplies by the whole base.

## What we recommend doing first

Before the tutor prototype, semantic search over the same content. It costs an order of magnitude less, it's measurable without touching assessment, and it produces exactly the missing data: what students ask, in what words, and how often.

With that data, the estimate of messages per student stops being a guess. And since search needs the same transcribed, chunked and indexed content the tutor does, none of the work is wasted: it's the first half of the same project.
