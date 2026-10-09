---
title: "How much does it cost to automate a process with AI"
seoTitle: "How much does it cost to automate a process with AI? What drives it — Vantalogics"
description: "What defines the cost of automating a business process with AI in 2026, the three project sizes that exist, how much keeping it running weighs after month one, and how to calculate payback before asking for a quote."
answer: "The cost of automating a process with AI is defined by integrations, not by the model. Projects fall into three sizes — scoped workflow, integrated agent and multi-process system — and the jump between them isn't gradual. On top of the build comes monthly operation: models, infrastructure and maintenance of 15–25% of the initial investment per year."
date: 2026-06-24
updated: 2026-10-09
cluster: costos
tags:
  - cost
  - process automation
  - AI agents
  - budgeting
translationOf: cuanto-cuesta-automatizar-un-proceso-con-ia
faq:
  - question: "How much does the model itself cost per month?"
    answer: "For most internal processes it's the smallest line of monthly operation: usage-based, and cheaper every year. Infrastructure and, above all, maintenance weigh more. That's why the right question is what it costs to maintain the system, not what the model costs."
  - question: "Hourly or fixed-price?"
    answer: "Fixed price with a closed scope. Open-ended hours push all the estimation risk onto the client in a kind of work where the uncertainty sits in the integrations, not the development. If a vendor can't close a scope after the diagnostic, they haven't understood the process yet."
  - question: "How long until an automation pays for itself?"
    answer: "It takes three numbers: the hours the process consumes today, the loaded hourly cost of whoever does it, and the share that will be automated, which in a good first version is 60–80% of cases. If your math says more than 18 months, you are almost certainly better off automating something else first."
---

Nearly every answer to this question is useless for the same reason: it gives you a range from a few hundred to tens of thousands and says "it depends." It does depend. But it depends on specific, enumerable things, and once you know them you can estimate your own case fairly closely before requesting a single quote.

This is the breakdown we use internally to price work. It isn't a price list — it's a map of what moves the number.

## The three ranges that actually exist

In practice, projects fall into three fairly distinct buckets, and the jump between them is not gradual.

| Type | What it is | What defines the cost | Monthly operation |
|---|---|---|---|
| Scoped workflow | One process, clear rules | Integration with one or two systems | Low: minimal model and infrastructure |
| Integrated agent | Decides, asks approval | Integrations, decision limits and evaluation set | Medium: adds monitoring and maintenance |
| Multi-process system | Coordinated agents | Coordination across agents and systems | High: it's a platform of its own |

The first bucket is an invoice reader that posts to the ERP and flags anything that doesn't reconcile. The second is an agent that takes orders over WhatsApp, checks stock, builds the order and escalates to a rep when a discount falls outside policy. The third is a platform, and it usually shows up after the second one worked.

If a vendor quotes something in the second bucket at the price of the first, they are not quoting what you asked for.

## What moves the price, in order of real weight

### 1. Integrations, always

This is the line item that eats half the budget and the one nobody raises in the first meeting. Connecting to HubSpot is half a day. Connecting to an undocumented on-premise ERP reached through a SQL Server database somebody configured in 2014 is two to three weeks of work before a single line of agent logic gets written.

The question that moves your budget most isn't "which model will you use?" It's: **do your systems have a documented API and a sandbox?** If the answer is yes to both, the project is 30–50% cheaper.

### 2. How many decisions the system has to make

A flow that moves data from A to B without deciding anything is cheap and behaves the same every day. An agent that has to interpret an ambiguous message, choose among five possible actions and know when to do nothing is different work: you have to define the boundaries, build the evaluation set, measure, and correct. See [why AI agents fail in production](/en/blog/why-ai-agents-fail-in-production/) for what breaks when that work is skipped.

### 3. What happens when it gets something wrong

An agent that drafts replies for a person to review has a near-zero cost of error and can ship fast. One that issues credit notes on its own needs guardrails, an audit trail of every action, amount limits, reversibility and alerting. That's 20–40% additional hours on the same project.

It isn't negotiable, but it is a scoping decision: in the first version it is almost always right to leave the irreversible action with a person and automate it later, once you have three months of data showing how often it's wrong.

### 4. Volume, far less than you'd think

Intuition says ten times the volume costs ten times as much. In these systems it rarely does: the difference between processing 500 and 5,000 documents a month is a marginal difference in model spend and, eventually, a job queue. Volume starts to matter seriously only above tens of thousands of operations per month.

## The line item almost nobody budgets

Build cost is what gets discussed. Running cost is what surprises people.

An agent in production needs, month after month:

- **Models.** Usage-based, the smallest line in most cases, and cheaper every year.
- **Infrastructure.** Database, queues, hosting and observability.
- **Actual maintenance.** Here's the big number. Client systems change, providers ship model updates and deprecate versions, cases show up that the evaluation set never covered. Budget 15–25% of the initial investment per year.

That last point separates a project still running two years later from one that quietly went dark in month four. An agent nobody watches doesn't fail with an error — it degrades, answering slightly worse each week, until somebody in support mentions in passing that "the bot has been saying weird things lately."

## Estimating your own case in ten minutes

Do this math before requesting quotes. If it doesn't work out, no vendor is going to fix that.

1. **Count the hours.** How many hours per week the process consumes today, across everyone who touches it.
2. **Convert to money.** Multiply by the loaded hourly cost, not take-home pay.
3. **Subtract what won't be automated.** It is never 100%. A good first version resolves 60–80% of cases without intervention.
4. **Compare against 12 months.** If estimated annual savings don't comfortably exceed the upfront investment, this isn't the process to start with.

A realistic shape: 22 hours a week of order entry, 70% automatable. That's about 15 hours a week, roughly 800 a year, handed back to the team. Multiplied by the loaded hourly cost, that's the saving you compare against the build plus twelve months of operation. When it closes in year one, from year two the process is essentially free.

## Signs a quote is badly built

After reading a fair number of proposals — ours and competitors' — these are the ones that most often predicted a project would go badly:

- **No prior diagnostic.** A quote written without looking at the systems is a guess on letterhead.
- **Build and run aren't separated.** If the monthly number isn't there, it will show up anyway, later, and unagreed.
- **It doesn't say what happens when the agent is wrong.** The proposal has to state which actions are automatic, which need approval, and how they're reversed.
- **No measurable success criterion.** "Improve customer service" is not a metric. "Resolve 70% of order-status queries without human intervention, measured over 200 real cases" is.
- **The code and data stay with the vendor.** If you can't take the system with you, you didn't buy an automation — you rented a dependency.

## What should stick

The cost of a real business process is defined almost entirely by the state of your systems, not by how sophisticated the AI is. Before comparing proposals, go find out whether your ERP has an API and a sandbox: that single answer moves the number more than any technical decision you make afterwards.

And if the ten-minute calculation gives you a payback beyond 18 months, the correct conclusion isn't "AI is expensive." It's that this is the wrong process to start with.
