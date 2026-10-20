---
title: "How an online academy charges for courses and grants access automatically: Mercado Pago, bank transfers and PayPal"
seoTitle: "Online course payments and automatic access | Vantalogics"
description: "Webhooks, reconciliation, repeated payments and bank transfers that clear on their own. Data from two real academies: 16 of 205 payments never granted access."
answer: "For a student to get the course as soon as they pay, with nobody checking receipts, access is granted when the payment processor reports the payment as approved, never when the student lands back on the thank-you page. Each notification is processed exactly once, a reconciliation job recovers lost notifications every few minutes, and access is stored as a permission with an expiry date, separate from the payment. At a real academy, 16 of 205 approved payments in four days never granted access on their own until we added that reconciliation."
nav: "Payments and access"
order: 3
serviceType: "Payments and automatic access for online academies"
updated: 2026-10-20
translationOf: cobros-y-acceso
cases:
  - apoyo-escolar-rv
  - lu-apuntes
faq:
  - question: "Can a course paid by bank transfer be unlocked automatically?"
    answer: "Yes. In Argentina, a provider like Talo creates a virtual account number (CVU) and an alias for each order and notifies the platform when the money arrives. The platform checks that the amount and currency match the order and unlocks the course without anyone looking at a receipt. Apoyo Escolar RV and Lu Apuntes both collect bank transfers this way."
  - question: "How long does the student wait for the course after paying?"
    answer: "As long as the processor's notification takes to arrive. At Lu Apuntes the order screen refreshes every 3 seconds while the payment is pending, so the student sees the course unlocked without reloading. If the notification gets lost, reconciliation recovers it: at Apoyo Escolar RV it runs every 10 minutes."
  - question: "What happens if a student pays twice for the same course?"
    answer: "If the two payments belong to different orders and the course was already granted in the last 24 hours, the second one is refunded automatically through the processor's API and logged. If both payments belong to the same order, it is one payment split across two methods and both are credited. On top of that, the cart does not allow buying the same course on the same plan again while the access has more than 15 days left."
  - question: "What if the student transfers too little or too much?"
    answer: "If they transfer too little, the order stays pending: the provider adds deposits up on the same virtual account and, once the amount is complete, sends the payment-complete notification. If they transfer too much, the course is unlocked anyway and the difference is refunded from the provider's dashboard. If the amount or the currency does not match the order, access is not granted and the case is logged for review."
  - question: "How are expiring plans and renewals handled?"
    answer: "Access expires on the payment approval date plus the plan's duration. A scheduled task closes each access when it expires and an hourly sweep checks that none was left open. To renew, the student can buy again once 15 days or fewer remain, and moving to a higher plan means paying only the difference while keeping the original expiry date."
  - question: "Can I charge students in other countries?"
    answer: "Yes. Payment methods are chosen based on where the students are. At Apoyo Escolar RV, students outside Argentina pay through PayPal and see the amount in US dollars at the official exchange rate of the moment. To take card payments in other countries we add Stripe or another local processor with the same scheme of notification, reconciliation and permissions."
---

An academy that sells on its own usually starts the same way: the student makes a transfer, sends a photo of the receipt over WhatsApp and someone grants access when they see it. It works with ten sales a month. With a hundred, it is hours every week, fake receipts and students who paid on a Friday night and write "I didn't get the course" on Saturday.

Automating it is not just plugging in Mercado Pago. The hard part comes after the pay button: notifications that never arrive, notifications that arrive twice, transfers for a different amount, plans that expire, students who pay twice. This is what we learned charging at two academies in production, [Apoyo Escolar RV](/en/cases/apoyo-escolar-rv/) and [Lu Apuntes](/en/cases/lu-apuntes/), including the bugs we found and how we fixed them.

## From payment to access: what has to happen

| Moment | What the platform does | What not to do |
| --- | --- | --- |
| The student picks the course | Creates the order with the amount, currency and courses before sending them to pay | Compute the price in the student's browser |
| The student pays | Sends them to the processor with a reference that identifies the order | Grant access because they came back to the thank-you page |
| The processor notifies | Fetches the payment again from the processor's API, compares amount and currency with the order and records the notification | Trust what the notification body says |
| The notification never arrives | Reconciliation queries recent approved payments and credits the missing ones | Wait for the student to write in |
| The notification arrives again | Recognizes it and does nothing | Create a second purchase, another welcome email, another invitation |
| The course is unlocked | Stores a permission with an expiry date, separate from the payment | Compute access by reading payments |
| The plan expires | Closes access and removes the student from the course groups | Leave it open until someone notices |

## The processor's notification, not the thank-you page

When the student finishes paying, the processor sends them back to the platform. That return proves nothing: it can be opened by hand, the tab can be closed before it loads and the payment may still be pending. What counts is the notification the processor sends to the platform on its own, the webhook, when the payment changes state.

Even then, the notification is not taken at face value. At Lu Apuntes the notification carries only the payment ID. The platform fetches the payment again from the provider's API, compares the amount and currency with the order in whole cents, and only then marks the order as paid and creates the permission, all in a single transaction. If anything fails in between, it responds with an error and the provider retries.

Meanwhile, the order screen checks its status every 3 seconds. The student sees the course unlocked without reloading, and if the notification is late, the screen itself asks the provider for the payment status, at most once every 15 seconds per order.

## Notifications get lost: reconciliation

A webhook is a request over the internet between two servers, and sometimes it does not arrive: an outage, a delay, a restart at the worst moment. In June 2026 we checked Apoyo Escolar RV's Mercado Pago payments against the processor's API: **16 of 205 payments approved in four days had no purchase**. These were students who had paid and did not have the course, and the team fixed them by hand as they wrote in.

The fix was not repairing the webhook, which worked. It was adding a safety net: every 10 minutes, a job asks Mercado Pago for the approved payments of the last three hours and credits those without a purchase. It uses exactly the same logic as the webhook, so it does not matter which of the two arrives first. It ignores payments that come in through the processor's other channels, such as card terminals or payment links, and it does not touch courses an administrator already granted by hand.

Since then, a lost notification fixes itself within minutes, before the student notices.

## Notifications repeat: process each one exactly once

The opposite problem is just as common. Processors retry when they do not get a response in time, and they notify again every time the payment changes state. One payment can generate several notifications.

At Apoyo Escolar RV we saw it in a case that no documentation mentions. Mercado Pago holds the money for about 35 days and, when it releases it, updates the payment and notifies again. The platform looked for an active purchase with that payment, but on one-month plans the original purchase had already expired, so it did not find it and credited the payment again. Each duplicate set off the whole flow: the "thanks for your purchase" email, the invitation to the WhatsApp group and an emptied cart. **Between May and July 2026 we found 358 duplicate purchases**, and the number was growing.

What fixed it:

- **Any purchase with that payment ID proves the payment was already credited**, whether it is active, expired or revoked. The purchase status does not matter.
- **Removals do not delete.** When an administrator removes access, the purchase is marked expired and keeps the payment ID, so an old notification cannot create it again.
- **A payment approved more than 24 hours ago is not credited automatically.** A late notification for an old payment cannot bring back access that someone changed by hand.
- **Notifications are processed one at a time per student**, so the webhook, reconciliation and a retry cannot credit the same thing at once.

At Lu Apuntes each notification is recorded with the payment ID and its status. If that pair was already processed, it is ignored. If it was recorded but the process died halfway, it runs again. The permission cannot be duplicated, and the purchase email is sent with a key the email service uses to avoid sending it twice.

## When the student pays twice

It happens more than you would think: the payment is slow, the student is not sure it went through and pays again. In October 2026 a student at Apoyo Escolar RV paid twice for the same cart five minutes apart. One of the payments was refunded by hand and, when the duplicate access was removed, the purchases from the good payment expired too.

Now the platform handles it on its own. If every course in a payment was already credited in the last 24 hours by another approved payment from a different order, the new payment is refunded automatically through Mercado Pago's API and recorded in the audit log. If both payments belong to the same order, it is not a duplicate: it is a student who split the payment across two methods, and both are credited.

To keep it from happening at all, the cart does not allow buying the same course on the same plan if the access has more than 15 days left. Renewals inside that window, plan changes and manually granted access still go through.

## Bank transfers that clear on their own

Bank transfer is the method students in Argentina use most, and the one that caused the most work. At Apoyo Escolar RV, before it was automated, each transfer was a receipt someone had to check against the bank, with fake receipts and students waiting for approval. With several courses in the cart, a bug in that manual flow assigned only the first one when the receipt was approved.

Since April 2026, transfers go through Talo. Each order gets a virtual account number (CVU) and an alias; the student transfers from their bank and the provider notifies when the money arrives. Lu Apuntes charges by transfer only, with the same scheme, and these are the states it handles:

| Payment state | What the platform does |
| --- | --- |
| Pending | The order waits. The screen keeps checking. |
| Underpaid | The order stays pending: deposits add up on the same virtual account and, once the amount is complete, the payment-complete notification arrives |
| Complete | Checks amount and currency against the order and unlocks the course |
| Overpaid | Unlocks the course and records the difference to refund from the provider's dashboard |
| Expired | The order is marked as failed |
| Amount or currency different from the order | Unlocks nothing and logs it for review |

A payment that can go through "underpaid" and then "complete" is the reason to record each notification together with its state. If the second notification were dropped as a repeat, the student who completed the transfer would be left without the course.

One data point on how much the manual path gets used when the automatic one works. In August 2026 Lu Apuntes added a form for students to send the receipt for purchases made outside the platform. We removed it the next day: not a single request had come in.

## Mercado Pago, bank transfers and PayPal

| Method | How it is confirmed | Where it runs in production |
| --- | --- | --- |
| Mercado Pago (card, account balance) | Processor notification, a fresh query to its API and reconciliation every 10 minutes | Apoyo Escolar RV |
| Bank transfer with a virtual account per order | Provider notification with the payment state; amount and currency check | Apoyo Escolar RV and Lu Apuntes |
| PayPal for students outside Argentina | Amount in US dollars at the official exchange rate of the moment, receipt and administrator approval | Apoyo Escolar RV |

PayPal is the only method that goes through a person today at Apoyo Escolar RV. It is not a technical limit: the platform charged through PayPal automatically for a year, and today the academy handles it with a receipt. To take card payments in other countries we add Stripe or another local processor, with the same scheme of notification, reconciliation and permissions.

## Access is a permission, not a payment

A student can have a course because they bought it, because they came from the previous platform, because an administrator granted it or because they moved to a higher plan. If access is computed by reading payments, each of those cases ends in a made-up order. That is why on both platforms access is resolved in one place:

- **Lu Apuntes** stores access in a permissions table: one student, one study guide, and optionally the order that created it. A payment is one of the ways to create a permission; the administrator can also grant or revoke it, and when it is revoked the student loses it in the session they have open. Blocking an account deletes all of its permissions in the same operation.
- **Apoyo Escolar RV** stores each purchase with a snapshot of the plan (name and duration) and an expiry date, and a single service decides what each student has unlocked. If several active purchases exist for the same course, the one that includes consultations with the teacher wins and, on a tie, the one that expires last.

With access separate from payment, every situation has its place:

- **Migrated students**: each purchase from the previous platform comes in with 12 months of access from the original enrollment date. The details are in [how to migrate an academy](/en/education-platforms/migration/).
- **Manually granted access**: the administrator picks the expiry date and the record shows it did not come from a payment.
- **Moving to a higher plan**: the student pays only the difference and the new purchase inherits the expiry date of the original.
- **Content with a retirement date**: at Lu Apuntes, when a study guide stops being sold, it also stops being shown to those who had it.

## Expiry and renewals

At Apoyo Escolar RV each plan lasts a number of months, and access expires on the payment approval date plus that duration. Each expiry is scheduled as a task at purchase time, with three retries if it fails. On top of that, an hourly sweep looks for expired purchases left open. On expiry, the student loses the course and leaves the course's WhatsApp group.

Renewal opens when the access has 15 days or fewer left. Before that, the cart does not allow buying the same plan again, which is the most common way of paying twice by accident.

## Before opening sales: six tests

These tests run in the processor's sandbox, which simulates payments and transfers without real money:

1. **Pay and close the tab before returning to the platform.** The course has to show up anyway.
2. **Send the same notification twice.** There has to be one purchase, one email and one invitation.
3. **Turn off the webhook, pay and wait for reconciliation.** The course has to show up on its own, with nobody stepping in.
4. **Transfer less than the price and then complete it.** The order has to stay pending and unlock only with the second deposit.
5. **Pay twice for the same cart.** There has to be one access, and the second payment has to be refunded or flagged for refund.
6. **Remove access by hand and resend an old notification for that payment.** Access has to stay removed.

If any of them fails, that is the "I didn't get the course" message you will get on your first weekend of sales.

## How we approach it

On a custom platform, payments and access are the first thing we build, because a platform that cannot charge yet cannot replace the previous one. We choose payment methods based on where the students are, and each method ships with notification, reconciliation and permissions from day one. The tests above run before sales open. What a full platform does, from the catalog to AI on top of the material, is in [custom education platform development](/en/education-platforms/). And if you already sell on another platform, moving students and purchases is covered in [how to migrate an academy](/en/education-platforms/migration/).
