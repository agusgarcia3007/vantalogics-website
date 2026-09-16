---
title: "The five mistakes an AI agent makes at a real estate developer"
seoTitle: "Mistakes an AI agent makes at a real estate developer, and how to prevent them — Vantalogics"
description: "The five failures that appear once an AI agent handles a real estate developer's actual enquiries, why none show up in the demo, and which limit fixes each one."
answer: "The five mistakes a real estate developer's agent makes in production are: offering already-reserved units, inventing project details, negotiating price or payment plan, booking impossible visits and losing the thread across channels. None appear in the demo. All five are fixed with explicit limits and an evaluation set built from real conversations."
date: 2026-08-15
cluster: confiabilidad
industry: real-estate-developers
translationOf: errores-de-un-agente-de-ia-en-un-real-estate-developer
tags:
  - real estate developers
  - reliability
  - evals
  - AI agents
faq:
  - question: "How do you test the agent before opening it?"
    answer: "With an evaluation set built from real conversations exported from the channel, not from invented cases. It includes the odd cases that have already happened: the person asking about a reserved unit, the one demanding a discount in the first message, the external broker who wants the full price list, the buyer asking whether construction is behind schedule. If the set doesn't have those, it isn't testing anything."
  - question: "What happens if the agent gets something wrong with a lead?"
    answer: "It depends on the error, which is why they're classified before launch. Getting a visit time wrong is recoverable with one message. Getting a price, an instalment or a delivery date wrong isn't. The architecture is designed so that expensive errors are impossible by construction, not improbable through prompting."
  - question: "How often should conversations be reviewed?"
    answer: "Weekly at first, and always with a sample read by someone from the sales team, not just aggregate metrics. The problems that matter — a tone that isn't the project's, a technically correct reply that still loses the lead — appear on no dashboard."
---

In a demo, a developer's agent always works. You ask about a two-bedroom in the north tower, it answers with options, it offers you a showroom slot. Flawless.

The problems start in week one with real enquiries, and they're always the same five. Here they are, ordered by what they cost.

## 1. It offers a unit that's already reserved

The most expensive and most frequent error, and it's almost never the agent's fault: it's the data's. If the spreadsheet says the unit is available, the agent offers it. If it was reserved in the showroom on Friday and nobody updated the sheet until Monday, the agent books a visit to show something that already has a buyer.

The cost isn't the lost enquiry. It's that the lead tells someone their Saturday got wasted, and during a launch that travels fast.

**The limit:** the agent checks status at the moment of offering and again at the moment of confirming the visit. And if the source of truth is a spreadsheet updated by hand once a day, it doesn't offer specific units: it pre-qualifies and hands over to a salesperson.

## 2. It invents a project detail

The lead asks about the estimated service charge, the balcony's square footage, whether parking is included, whether the building allows pets, which month it hands over. If the field isn't loaded, an unbounded model fills it in with whatever is plausible for a project like that. It sounds reasonable and it's false.

This is more dangerous than the obvious error, because nobody catches it: the buyer finds out at reservation, and by then the conversation is already poisoned. In pre-construction it's worse, because the buyer is purchasing something they can't yet see: all they have is what they were told.

**The limit:** the agent answers only from fields that exist on the official project record. If the field is empty, it says it will check and hands over. This gets tested explicitly with a set of deliberately incomplete records — the case no demo includes.

## 3. It negotiates price or payment plan

Someone writes "would you take ten percent off if I pay cash?" and the agent, built to be helpful, responds with something. Anything it responds is a problem: if it says yes, it has committed the developer; if it says no, it has closed a negotiation a human could have worked; and if it improvises an instalment figure, it has created an expectation someone has to dismantle at reservation.

This is the error where the line is sharpest and where it gets crossed most often, because the question arrives wrapped in an ordinary conversation. And at a developer it comes up more than in any other sector, because the payment plan is half the product.

**The limit:** any mention of a price other than the current list, a discount, a financing term or a down payment escalates immediately, with a summary of the conversation. The agent doesn't say it can't: it says a salesperson will handle that, and passes it on.

## 4. It books impossible visits

Two visits to projects at opposite ends of the city twenty minutes apart. A site visit on a day with no access permit. Four groups in the showroom in the same half-hour slot. All of them are technically free slots in the calendar and none are achievable.

This doesn't get perceived as an AI error; it gets perceived as the system having ruined the salesperson's day, and it's the fastest way for the team to stop trusting it.

**The limit:** explicit rules for minimum time between visits, showroom capacity per slot, projects that are compatible on the same day, and required notice for site access. The agent can fill the calendar; it can't break it.

## 5. It loses the thread across channels

The lead writes through the website form, then on WhatsApp, then replies to an Instagram ad for the same project. To the agent those are three different people, so it pre-qualifies them three times and asks the same four questions.

From the lead's side the reading is immediate: they aren't listening to me.

**The limit:** unified identity by phone and email, and memory of the previous conversation. It's architecture work, not model work, and it's one of the most underestimated items when budgeting. At a developer it weighs double, because launch campaigns bring the same person in through three channels in the same week.

## What they have in common

None of the five is fixed by a better model. All five are limit and data problems, and all five are caught before production if the evaluation set is built from real conversations rather than invented cases.

That means exporting three months of the channel, picking the odd cases that have already happened — the broker asking for the full list, the person asking about a unit that sold, the one demanding a discount in the first message, the buyer asking whether construction is behind — and testing against that on every change.

It's the part of the project least visible in a proposal and the one that decides whether the system still works in month six.

## The classification we do before launch

Every possible error goes into one of three categories, and the category defines the architecture:

**Impossible by construction.** Quoting a price that isn't on the current list, committing to an instalment, confirming a reservation, stating a delivery date other than the published one. These aren't mitigated with instructions: the agent literally lacks the capability.

**Recoverable with one message.** Confusing two similar layouts, proposing a slot the salesperson rejects. These are accepted, logged and measured.

**Immediate escalation.** Complaints, questions about construction delays, anything that sounds like conflict. No attempt to resolve: handed over with context, with a note that it was handed over.

That table gets written with the sales team before the first line of code. It's a half-hour meeting and it's what separates an agent that sustains the project's brand from one that spends it.
