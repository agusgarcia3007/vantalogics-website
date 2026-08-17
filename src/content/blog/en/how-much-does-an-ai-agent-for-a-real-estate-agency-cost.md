---
title: "What an AI agent for a real estate agency actually costs"
seoTitle: "What an AI agent for a real estate agency costs — Vantalogics"
description: "The four cost lines of an AI agent at a real estate agency: WhatsApp API, model per conversation, CRM integration and monthly operation. With the break-even calculation."
answer: "An AI agent for a real estate agency has four costs: the WhatsApp Business API line, the model per conversation, the CRM integration and monthly operation. The variable cost per enquiry handled is cents; what moves the budget is the integration, and that depends almost entirely on whether your CRM has an API."
date: 2026-08-08
cluster: costos
industry: inmobiliarias
translationOf: cuanto-cuesta-un-agente-de-ia-para-una-inmobiliaria
tags:
  - real estate
  - WhatsApp
  - costs
  - AI agents
faq:
  - question: "Can we start with a small budget?"
    answer: "Yes, if you cut scope rather than quality. An agent that only answers and qualifies incoming enquiries, without writing to the CRM or touching the calendar, is a fraction of the full project and already moves the number that matters most, which is response time. Writing to the CRM gets added later, once the saving is demonstrated."
  - question: "What does it cost to run monthly?"
    answer: "Three lines: the WhatsApp Business API line, model consumption per conversation, and system maintenance. The first two are paid to providers and scale with volume; the third is fixed and covers monitoring, adjustments and the breakage caused by any change in the CRM or the portals."
  - question: "Is an agent better than hiring someone to reply?"
    answer: "It depends on the hours. A person covers forty hours a week and property enquiries arrive across all one hundred and sixty-eight. If the problem is volume inside business hours, hiring may be cheaper and simpler. If the problem is that nobody replies at ten at night or on Sunday, no hire solves that at that cost."
---

The question always arrives the same way: "how much does it cost to put an AI agent on our enquiries?" And the honest answer depends on one thing almost nobody mentions on the first call: whether your CRM has an API.

What follows are the four cost lines, ordered by how much they move the budget.

## The four lines

| Line | Type | What moves it |
|---|---|---|
| WhatsApp Business API line | Monthly + per conversation | Volume and country |
| Language model | Per conversation | Context and history length |
| CRM and calendar integration | One-off project | Whether there's an API |
| Operation and maintenance | Monthly | Number of live integrations |

The first two are provider costs: paid to Meta and to whoever provides the model, and predictable. The last two are the project, and that's where the variance lives.

## The variable cost is smaller than people think

A property enquiry handled end to end — greeting, qualification, two or three properties offered, a viewing booked — is ten to twenty exchanges. With current models and a context scoped to the relevant listings, that costs cents of a dollar per conversation.

That number surprises people because the public debate about AI costs is anchored in intensive use: agents reasoning for minutes, or systems processing long documents. A WhatsApp conversation looks nothing like that.

What does inflate the variable cost is one design decision: stuffing the whole catalogue into the context of every message instead of retrieving only the relevant listings. It's the fastest way to build it and it multiplies cost tenfold without improving the answer.

On top sits the WhatsApp Business API line, which Meta charges per conversation initiated and which varies considerably by country. In most Latin American markets it's the same order of magnitude as the model; in some, more expensive.

## The cost that decides the budget: integration

Here's the real variance, and it comes down to a single question.

**If your CRM has a documented API** — modern real estate CRMs, or a general CRM like HubSpot or Pipedrive adapted to the sector — integration is known work: read inventory, write the qualified contact, check availability. It can be estimated with reasonable precision during the diagnostic.

**If your CRM has no API** there are three routes, all worse:

- Periodic export to a spreadsheet, which leaves the agent working with hours-old data. Cheap, with the risk of offering sold properties.
- Interface automation, which breaks every time the vendor moves a button. Fragile and expensive to maintain.
- Changing CRM, which is a project of its own and shouldn't be mixed with this one.

It's the uncomfortable conversation in the diagnostic, and it's worth having before signing anything. A fixed budget written without knowing the answer to that question is a budget that will be revised.

## How to calculate whether it pays

The calculation we run in the diagnostic has three numbers, all yours:

**One.** How many enquiries arrive per month, counting every channel. It's almost always more than the team believes, because Instagram messages and missed calls appear in no report.

**Two.** What share currently ends in a booked viewing. This is the number the agent moves, and it moves for a mechanical reason: replying in two minutes instead of four hours.

**Three.** What a closed deal is worth to the agency, and how many viewings it takes on average to close one.

From those, you calculate how many additional deals per year the system needs to generate to pay for itself. In high-volume portfolios the number is usually uncomfortably small — one or two deals — and that's what makes the decision fast.

In small portfolios the arithmetic doesn't work, and we say so on the same call. Under thirty enquiries a month a human replies faster and better than any system, and there's no way to make the numbers close.

## What isn't in the budget and shows up anyway

Three real costs that rarely appear in the proposal and are worth anticipating:

**Migrating the WhatsApp number.** Moving your line to the API disconnects it from the app. If three agents currently reply from that number on their phones, they have to move to a shared inbox. That isn't a software cost: it's a habit-change cost, and it draws the most resistance.

**Cleaning up CRM inventory.** If there are sold properties left unmarked and stale prices, that gets fixed first or the agent will offer them. It's work for someone on the team over a few weeks.

**The time of whoever knows the process.** You need a person on the agency's side to answer questions, validate test conversations and decide the limits. It isn't many hours, but they belong to someone who is already busy.

## The order we recommend

First, answering and qualifying incoming enquiries without writing to any system. It's the cheap part, it's where the immediate effect on booked viewings sits, and it doesn't require solving CRM integration.

Then, viewing coordination against the real calendar, which does need integration but against a calendar, which is simpler than a CRM.

Last, writing to the CRM and reactivating the historical database, which is where the dormant volume is and also the most delicate integration.

That order isn't only technical prudence: it's how the project pays for itself before you spend on the expensive part.
