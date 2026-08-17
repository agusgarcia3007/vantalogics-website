---
title: "AI tutor or semantic search: where to start in EdTech"
seoTitle: "AI tutor or semantic search: what to build first — Vantalogics"
description: "Criteria for choosing a learning platform's first AI feature: what each one solves, what they cost, what risk they carry, and why the order is almost always the same."
answer: "In a learning platform it's better to build semantic search first and the tutor second. They share the same content work, but search costs an order of magnitude less, cannot assert anything incorrect, and produces the missing data for sizing the tutor: what students ask and how often."
date: 2026-08-14
cluster: decision
industry: edtech-y-plataformas-educativas
translationOf: tutor-de-ia-o-busqueda-semantica
tags:
  - edtech
  - AI tutor
  - semantic search
  - decision
faq:
  - question: "Isn't that an intermediate step that delays the product?"
    answer: "No, because the work isn't thrown away: transcribing, chunking and indexing the content is the first half of the tutor. What search adds is that this work gets validated and measured before layering on the part that can be wrong. If search can't find the right passage, neither will the tutor."
  - question: "Do users perceive semantic search as AI?"
    answer: "Less than a chat, and that's part of the point. The expectation an improved search box creates is easier to meet than the one a conversational tutor creates, and the team gets time to calibrate the system without the pressure of a promise it can't yet keep."
  - question: "What if a competitor already launched a tutor?"
    answer: "It's worth checking whether the competitor's tutor answers from the course material or from the model's general knowledge. The second is built in a week and shows within a month, when students start asking about the instructor's specific notation. The durable advantage is in prepared content, not in arriving first."
---

When a learning platform decides to invest in AI, the conversation almost always starts in the same place: a conversational tutor. It's what people see, it's what competitors announce, and it's what the commercial team can sell.

We almost always recommend starting elsewhere, and not out of generic caution. It's because the two features share eighty percent of the work and differ in risk.

## What each one solves

**Semantic search.** The student types their doubt in their own words and receives the passage of material that answers it, with a link to the video timestamp or the page. It doesn't generate text: it retrieves and displays.

**Conversational tutor.** The student types their doubt and receives a written explanation, which can be rephrased, given a different example, or walked through step by step. It retrieves and also generates.

The difference reads better as a table.

| | Semantic search | Conversational tutor |
|---|---|---|
| Content work | Transcribe, chunk, index | The same |
| Additional layer | None | Generation, limits, memory |
| Cost per student | Low | An order of magnitude higher |
| Can assert something false | No | Yes, if not properly scoped |
| Academic integrity risk | None | Requires an explicit boundary |
| What it measures | What students search for | What they ask and how |

## The three arguments for the order

**One: the work is the same and gets validated earlier.** Transcribe the video, split the material by conceptual unit, index it with course and unit metadata. That's the first half of the tutor and the entirety of search. Building search first adds no work: it brings forward the verification that the work was done right.

And the verification is concrete. If search doesn't return the correct passage for a real student question, the tutor won't either. The difference is that search shows it — bad results, visible — while the tutor conceals it by generating a plausible answer from the wrong material.

**Two: search can't lie.** It returns passages from the material or it returns nothing. In an educational product, where the user is precisely the person unable to detect a content error, that property is worth a great deal during the first months.

**Three: it produces the missing data.** The question nobody can answer before launching a tutor is how many messages per student per month there will be, and the entire cost calculation depends on it. Search answers it: what gets asked, in what words, at what point in the course, how often. That's the difference between estimating and measuring.

## When to skip search

There are two cases where the order flips, and they're worth recognizing.

**When the value is in the dialogue, not in finding.** A language course where the student needs conversation practice, or a skills course that needs an interlocutor who asks follow-up questions. There, search doesn't solve the user's problem, because the problem isn't locating information.

**When the content is short and well known.** A catalogue of twenty brief courses where every student sees everything. Search has little to search, and the indexing work doesn't justify itself on its own.

Outside those two cases, the order holds.

## The version that usually fails

Worth naming because it's the one most often built: a general model with an instruction saying "you are the tutor for this course", with no retrieval.

It works in the demo and in first contact with students, because it answers general conceptual questions well. It fails in month two, when the course-dependent questions arrive: the notation this instructor uses, the example in unit three, the rubric criterion, the library version used in this term.

The student doesn't conclude that the system lacks access to the material. They conclude the platform doesn't know its own course, which is a more expensive kind of damage to repair than the time it saved.

## What we recommend for a first quarter

One course, not the catalogue. The one with the most active students, transcribed and indexed in full.

Search visible in the interface, not hidden in a menu, with measurement of searches that return nothing useful.

And at the end of the quarter, three numbers on the table: how much of the catalogue needs transcribing to cover real usage, how many queries per student per month there are, and what share of those queries needs an explanation rather than a passage.

With those three numbers, the decision about the tutor stops being a bet.
