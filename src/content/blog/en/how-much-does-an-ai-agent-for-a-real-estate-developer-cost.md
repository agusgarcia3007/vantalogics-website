---
title: "What an AI agent for a real estate developer actually costs"
seoTitle: "What an AI agent for a real estate developer costs — Vantalogics"
description: "The four cost lines of an AI agent at a real estate developer: WhatsApp API, model per conversation, CRM and unit-spreadsheet integration, and monthly operation."
answer: "An AI agent for a real estate developer has four costs: the WhatsApp Business API line, the model per conversation, integration with the CRM and the unit spreadsheet, and monthly operation. The variable cost per enquiry handled is cents; what moves the budget is the integration, and that depends almost entirely on where your availability data lives today."
date: 2026-08-08
cluster: costos
industry: real-estate-developers
translationOf: cuanto-cuesta-un-agente-de-ia-para-un-real-estate-developer
tags:
  - real estate developers
  - WhatsApp
  - costs
  - AI agents
faq:
  - question: "Can we start with a small budget?"
    answer: "Yes, if you cut scope rather than quality. An agent that only answers and pre-qualifies incoming enquiries, without writing to the CRM or touching the showroom calendar, is a fraction of the full project and already moves the number that matters most, which is response time. Writing to the CRM gets added later, once the saving is demonstrated."
  - question: "What does it cost to run monthly?"
    answer: "Three lines: the WhatsApp Business API line, model consumption per conversation, and system maintenance. The first two are paid to providers and scale with volume; the third is fixed and covers monitoring, adjustments and the breakage caused by any change in the CRM, the unit spreadsheet or the portals."
  - question: "Is an agent better than hiring someone to reply?"
    answer: "It depends on the hours and on the spike. A person covers forty hours a week and launch enquiries arrive across all one hundred and sixty-eight. If the problem is volume inside business hours, sustained all year, hiring may be cheaper and simpler. If the problem is that the spike lasts two weeks and nobody replies at ten at night, no hire solves that at that cost."
---

The question always arrives the same way: "how much does it cost to put an AI agent on our enquiries?" And the honest answer depends on one thing almost nobody mentions on the first call: where your unit availability lives today, and whether that place can be queried.

What follows are the four cost lines, ordered by how much they move the budget.

## The four lines

| Line | Type | What moves it |
|---|---|---|
| WhatsApp Business API line | Monthly + per conversation | Volume and country |
| Language model | Per conversation | Context and history length |
| CRM, spreadsheet and calendar integration | One-off project | Where the data lives and whether it has an API |
| Operation and maintenance | Monthly | Number of live integrations |

The first two are provider costs: paid to Meta and to whoever provides the model, and predictable. The last two are the project, and that's where the variance lives.

## The variable cost is smaller than people think

An enquiry handled end to end — greeting, pre-qualification, two or three layouts offered, a showroom visit booked — is ten to twenty exchanges. With current models and a context scoped to the relevant units, that costs cents of a dollar per conversation.

That number surprises people because the public debate about AI costs is anchored in intensive use: agents reasoning for minutes, or systems processing long documents. A WhatsApp conversation looks nothing like that.

What does inflate the variable cost is one design decision: stuffing the entire price list and all four towers into the context of every message instead of retrieving only the relevant units. It's the fastest way to build it and it multiplies cost tenfold without improving the answer.

On top sits the WhatsApp Business API line, which Meta charges per conversation initiated and which varies considerably by country. In most Latin American markets it's the same order of magnitude as the model; in some, more expensive.

## The cost that decides the budget: integration

Here's the real variance, and at a developer it comes down to a different question than at an agency: not just "does your CRM have an API?" but "how many separate places have to agree in order to answer one enquiry?"

Answering well requires three facts that almost never live together: which units are left, at what price and on what payment plan, and when a salesperson is free. At most developers that's a spreadsheet, a CRM and a calendar, plus the builder's system for anything touching construction progress.

**If availability lives in a system with a documented API**, integration is known work: read units and statuses, write the pre-qualified prospect, check the calendar. It can be estimated with reasonable precision during the diagnostic.

**If availability lives in a spreadsheet** — the most common case — there are two routes:

- Read the spreadsheet directly, with a purpose-built reader and validation rules. Cheaper than it sounds, and it works well if the sheet has a stable structure.
- Consolidate availability and pricing into a single source first, and only then connect the agent. Costs more up front and is the only thing that scales past one project.

**If availability lives in three spreadsheets that don't agree**, that's a data cleanup project, not an automation one, and it has to be budgeted as what it is. It's the uncomfortable conversation in the diagnostic, and it's worth having before signing anything.

## How to calculate whether it pays

The calculation we run in the diagnostic has three numbers, all yours:

**One.** How many enquiries arrive per month, counting every channel and separating the launch month from the rest. It's almost always more than the team believes, because Instagram messages and missed calls appear in no report.

**Two.** What share currently ends in a booked showroom visit. This is the number the agent moves, and it moves for a mechanical reason: replying in two minutes instead of four hours.

**Three.** What one sold unit is worth, and how many visits it takes on average to place one.

From those, you calculate how many additional units per year the system needs to place to pay for itself. At a developer the number is usually uncomfortably small — one unit, sometimes less — and that's what makes the decision fast.

In twenty-unit projects with one launch every three years the arithmetic doesn't work, and we say so on the same call. There the sales team replies faster and better than any system, and there's no way to make the numbers close.

## What isn't in the budget and shows up anyway

Three real costs that rarely appear in the proposal and are worth anticipating:

**Migrating the WhatsApp number.** Moving your line to the API disconnects it from the app. If three salespeople currently reply from that number on their phones, they have to move to a shared inbox. That isn't a software cost: it's a habit-change cost, and it draws the most resistance.

**Cleaning up availability.** If there are reserved units left unmarked and prices from the previous list, that gets fixed first or the agent will offer them. It's work for someone on the team over a few weeks, and the vendor can't do it for you.

**The time of whoever knows the process.** You need a person on the developer's side to answer questions, validate test conversations and decide the limits: how far the agent goes on the payment plan, what it says about the delivery date. It isn't many hours, but they belong to someone who is already busy.

## The order we recommend

First, answering and pre-qualifying incoming enquiries by reading availability, without writing to any system. It's the cheap part, it's where the immediate effect on booked visits sits, and it doesn't require solving write integration.

Then, visit coordination against the showroom's real calendar, which does need integration but against a calendar, which is simpler than a CRM.

Last, writing to the CRM, routine emails and long-cycle follow-up, which is where the dormant volume is and also the most delicate integration.

That order isn't only technical prudence: it's how the project pays for itself before you spend on the expensive part.
