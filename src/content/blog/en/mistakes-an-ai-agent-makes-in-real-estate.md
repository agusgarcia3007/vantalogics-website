---
title: "The five mistakes an AI agent makes at a real estate agency"
seoTitle: "Mistakes an AI agent makes in real estate, and how to prevent them — Vantalogics"
description: "The five failures that appear once an AI agent handles real property enquiries, why none of them show up in the demo, and which limit fixes each one."
answer: "The five mistakes a real estate agent makes in production are: offering already-sold properties, inventing listing details, negotiating on price, booking impossible viewings and losing the thread across channels. None appear in the demo. All five are fixed with explicit limits and an evaluation set built from real conversations."
date: 2026-08-15
cluster: confiabilidad
industry: inmobiliarias
translationOf: errores-de-un-agente-de-ia-en-una-inmobiliaria
tags:
  - real estate
  - reliability
  - evals
  - AI agents
faq:
  - question: "How do you test a real estate agent before opening it?"
    answer: "With an evaluation set built from real conversations exported from the channel, not from invented cases. It includes the odd cases that have already happened: the person asking about a sold property, the one demanding a discount in the first message, the owner writing about their own property. If the set doesn't have those, it isn't testing anything."
  - question: "What happens if the agent gets something wrong with a lead?"
    answer: "It depends on the error, which is why they're classified before launch. Getting a viewing time wrong is recoverable with one message. Getting a price wrong isn't. The architecture is designed so that expensive errors are impossible by construction, not improbable through prompting."
  - question: "How often should conversations be reviewed?"
    answer: "Weekly at first, and always with a sample read by someone from the sales team, not just aggregate metrics. The problems that matter — a tone that isn't the agency's, a technically correct reply that still loses the lead — appear on no dashboard."
---

In a demo, a real estate agent always works. You ask about a two-bedroom in a given area, it answers with options, it offers you a slot. Flawless.

The problems start in week one with real enquiries, and they're always the same five. Here they are, ordered by what they cost.

## 1. It offers a property that's gone

The most expensive and most frequent error, and it's almost never the agent's fault: it's the data's. If the CRM says the property is available, the agent offers it. If it was reserved on Friday and nobody recorded it, the agent books a viewing for a property that already has a buyer.

The cost isn't the lost enquiry. It's that the lead tells someone the agency wasted their Saturday.

**The limit:** the agent checks status at the moment of offering and again at the moment of confirming the viewing. And if the source of truth is an export that's hours behind, it doesn't offer specific properties: it qualifies and hands over to an agent.

## 2. It invents a listing detail

The lead asks about service charges, year of construction, whether pets are allowed, whether the parking space is covered. If the field isn't in the CRM, an unbounded model fills it in with whatever is plausible for a property like that. It sounds reasonable and it's false.

This is more dangerous than the obvious error, because nobody catches it: the lead finds out at the viewing, and by then the conversation is already poisoned.

**The limit:** the agent answers only from fields that exist on the record. If the field is empty, it says it will check and hands over. This gets tested explicitly with a set of deliberately incomplete records — the case no demo includes.

## 3. It negotiates

Someone writes "would you take ten percent below asking?" and the agent, built to be helpful, responds with something. Anything it responds is a problem: if it says yes, it has committed the agency and the owner; if it says no, it has closed a negotiation the human could have worked.

This is the error where the line is sharpest and where it gets crossed most often, because the question arrives wrapped in an ordinary conversation.

**The limit:** any mention of a price other than the listed one, payment terms or possession dates escalates immediately, with a summary of the conversation. The agent doesn't say it can't: it says an agent will handle that, and passes it on.

## 4. It books impossible viewings

Two viewings in opposite neighbourhoods twenty minutes apart. A viewing at a tenanted property without notifying the tenant. A viewing on a public holiday. All of them are technically free slots in the calendar and none are achievable.

This doesn't get perceived as an AI error; it gets perceived as the system having ruined the agent's day, and it's the fastest way for the team to stop trusting it.

**The limit:** explicit rules for minimum time between viewings, areas that are compatible on the same day, and required notice for the occupant. The agent can fill the calendar; it can't break it.

## 5. It loses the thread across channels

The lead writes through the website form, then on WhatsApp, then replies to an Instagram ad. To the agent those are three different people, so it qualifies them three times and asks the same four questions.

From the lead's side the reading is immediate: they aren't listening to me.

**The limit:** unified identity by phone and email, and memory of the previous conversation. It's architecture work, not model work, and it's one of the most underestimated items when budgeting.

## What they have in common

None of the five is fixed by a better model. All five are limit and data problems, and all five are caught before production if the evaluation set is built from real conversations rather than invented cases.

That means exporting three months of the channel, picking the odd cases that have already happened — the owner writing about their own property, the person asking about one that sold, the one demanding a discount in the first message — and testing against that on every change.

It's the part of the project least visible in a proposal and the one that decides whether the system still works in month six.

## The classification we do before launch

Every possible error goes into one of three categories, and the category defines the architecture:

**Impossible by construction.** Quoting a price that isn't in the CRM, confirming a deal, promising payment terms. These aren't mitigated with instructions: the agent literally lacks the capability.

**Recoverable with one message.** Confusing two similar properties, proposing a slot the agent rejects. These are accepted, logged and measured.

**Immediate escalation.** Complaints, owners, anything that sounds like conflict. No attempt to resolve: handed over with context, with a note that it was handed over.

That table gets written with the sales team before the first line of code. It's a half-hour meeting and it's what separates an agent that sustains the brand from one that spends it.
