---
title: "What has to be centralized before you automate"
seoTitle: "Real estate developers: what to centralize before adding an AI agent — Vantalogics"
description: "The four conditions a real estate developer's data has to meet before connecting an AI agent, and why automating on three spreadsheets that disagree burns enquiries."
answer: "An AI agent on scattered data amplifies the disorder: it offers reserved units, quotes prices from the previous list and burns enquiries faster than it recovers them. The four prerequisites are real unit status, a single current price list, one place for contacts, and reliable read access. The agent solves none of them."
date: 2026-08-13
cluster: decision
industry: real-estate-developers
translationOf: centralizar-los-datos-antes-de-automatizar
tags:
  - real estate developers
  - centralization
  - data
  - automation
faq:
  - question: "Do we have to change CRM to add an agent?"
    answer: "Almost never, and it's better not to do it at the same time. Changing CRM is its own project with its own migration and its own team resistance. Mixing it with the automation project means that when something breaks, nobody knows which of the two changes broke it."
  - question: "How long does cleaning up availability take?"
    answer: "It depends on how many active projects there are and how long it's been since the spreadsheets were reconciled, but it's work for someone on the team over a few weeks, not a project. The uncomfortable part isn't the time: it's that it usually reveals how many units show as available and are already reserved, which is a commercial problem that predates the AI."
  - question: "What if availability lives in a spreadsheet?"
    answer: "That's the most common case and it isn't disqualifying. The spreadsheet can be read directly with a purpose-built reader and validation rules, as long as it has a stable structure and a single owner. What doesn't work is reading three spreadsheets that disagree: there you have to decide which one is authoritative first."
---

Before talking about which model, which channel or what it costs, there's one conversation that decides whether the project will work. It's about where your data lives, and it's the least interesting of them all.

The reason is simple: an AI agent doesn't fix bad data. It uses it with exactly the confidence it would use good data, at much higher speed and in front of many more people.

## The rule

An automated system turns a data error into a customer-facing error, multiplied by volume.

A salesperson who opens the spreadsheet and sees a unit they reserved yesterday notices and doesn't offer it. The AI agent doesn't: it offers it, books the visit, and the developer finds out when the lead arrives at the showroom. That error doesn't cost one enquiry, it costs the reputation of the whole channel — and during a launch it travels faster than it can be corrected.

That's why the four conditions below aren't best practices. They're requirements.

## Condition 1: unit status is real

Every unit has a status — available, blocked, reserved, sold — and that status is updated the day it changes, not the day somebody reconciles the spreadsheet.

The symptom when this fails is familiar: two salespeople offering the same unit in the same week, or a portal ad for something that's gone. If that happens today with a human team, with an agent it happens the same way but twenty times a day.

Before automating, the question we ask is: if a unit is reserved on Friday afternoon in the showroom, when is that reflected in the system? If the answer is "Monday", that's the first job.

## Condition 2: there is one current price list

It sounds obvious and it fails often, especially with price steps, index-linked adjustments and prices in two currencies. The price lives in the admin spreadsheet, in the PDF sent to the broker, on the portal and in the head of the salesperson who closed the last unit, and all four versions differ.

An agent quoting a price from the previous list or improvising an instalment creates a legal and commercial problem that no efficiency gain offsets. The rule we apply is that the agent quotes the current list price or quotes no price: there is no third option where it estimates.

## Condition 3: contacts live in one place

This is the one that draws the most resistance, because it touches the relationship between the developer, its sales team and its broker network.

If each salesperson keeps their leads on their own phone and each broker sends theirs by email, there's no basis for pre-qualification, no way to detect that the same lead enquired about three projects, and nothing to reactivate when the next launch arrives. It also means that when a salesperson leaves, they take the database with them.

It doesn't have to be perfect. There has to be one place where a contact is recorded, and the team has to use it. If that discussion hasn't been had, the automation project will force it at the worst moment, which is launch month.

## Condition 4: it can be read reliably

This is the condition that moves the budget most and gets discovered latest.

| Situation | What can be automated | Integration cost |
|---|---|---|
| Documented API, read and write | Everything | Predictable |
| One spreadsheet with a stable structure | Answer, pre-qualify and offer units | Low |
| Read-only API | Answer and pre-qualify, not record | Medium |
| Three spreadsheets that disagree | Nothing, until one is made authoritative | Data cleanup first |

The concrete questions are three: where the authoritative data lives, who updates it and how often, and whether it can be read without human intervention. Those answers change the project more than any technical decision we make.

## What the agent can do for your data

There's an important twist: once connected, the agent improves the data that didn't exist before.

Every incoming enquiry leaves the four fields salespeople don't always fill — payment capacity, down payment, timeline, end user or investor — with the lead's own words backing each one. After a few months, the database has a quality it didn't have, and that database is what shapes the unit mix of the next project.

But that's new information, generated by the system. It doesn't fix what was already wrong, which is why the order matters: centralize what's there first, connect after.

## The honest diagnostic

When one of the four conditions isn't met, the recommendation isn't to wait until everything is perfect. It's to cut scope.

With messy availability but centralized contacts, you can start with an agent that answers and pre-qualifies without offering specific units, and add the catalogue once it's clean. With scattered contacts, you can start with a single channel that has a single owner.

What you can't do is promise the system will compensate for the data. When a proposal says that, it isn't describing how it works: it's avoiding the uncomfortable conversation in order to close the sale.
