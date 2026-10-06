---
title: "How to protect an online academy's videos and PDFs from downloading and resale"
seoTitle: "Protect your online course videos and PDFs | Vantalogics"
description: "What you can stop and what you can't: expiring links, one session per account and PDFs stamped with the buyer's email. With data from a real academy."
answer: "No platform can prevent a screen recording, so protecting a course is not about blocking: it is making sure nobody without a purchase gets a link to the material, serving video by streaming with links that expire in minutes, keeping an account from being used in two places at once and stamping every PDF with the buyer's email. Casual copying disappears and whatever circulates points back to its source."
nav: "Content protection"
order: 2
serviceType: "Content protection for online academies"
updated: 2026-10-06
translationOf: proteccion-de-contenido
cases:
  - apoyo-escolar-rv
  - lu-apuntes
faq:
  - question: "Can screen recording be prevented?"
    answer: "On a computer, no. The browser cannot detect an external recorder or a phone filming the monitor. Only hardware DRM turns the capture black, and only on Safari, iOS and Android with Widevine L1; on desktop Chrome it does not block it. That is why the defense against recording is traceability, not blocking."
  - question: "Does disabling right-click or developer tools help?"
    answer: "No. It is bypassed in seconds and it bothers the student who paid. Detecting capture from the browser does not work either, because it only sees the browser's own capture, not OBS or any external recorder. It gives a false sense of security."
  - question: "Should I put a watermark over the video?"
    answer: "At Apoyo Escolar RV we tried it in August 2026 and removed it. A stamp over the player is easy to crop and covers the lesson. The personal watermark stayed on the PDFs, where it does work: it is stamped into the file and survives any copy."
  - question: "What about a student who studies on a computer and a phone?"
    answer: "It depends on what is limited. With a single session per account, as at Lu Apuntes, signing in from another device sends the previous one back to the login screen. If what is limited is simultaneous playback, as at Apoyo Escolar RV, the student can keep both sessions open and is only stopped when playing video on both at the same time."
  - question: "Do I need DRM?"
    answer: "Almost never at first. It costs money every month, complicates the player and tends to fail on TVs and older browsers. Links only for buyers, streaming with expiring links, session control and personally watermarked PDFs solve most of the problem. DRM makes sense if, with all of that in place, content keeps leaking through downloads of the stream."
  - question: "What do I do when I find my course being resold?"
    answer: "If the PDFs carry the personal watermark, the copy tells you which account it came from. That account is suspended, and since every link goes through the platform, the cut is immediate. Then you request the takedown on the site or group where it is being resold. Your terms of use should state that the license is personal and that the material carries the buyer's details."
---

An academy that finds its course being resold usually thinks the same thing: someone recorded the screen. It is rarely the case. Recording exists and cannot be prevented, but it takes hours per course. Resale at scale comes from cheaper places: a link that never expires, a file that downloads without signing in, an account used by ten people.

## What you can stop and what you can't

| Measure | What it stops | What it doesn't stop | Cost for the student who paid |
| --- | --- | --- | --- |
| Links to the material only for buyers | Downloads without paying, links shared in groups | What a buyer does with their own access | None |
| Video by streaming with expiring links | Downloading the video in one click, passing the URL around | A technical buyer with a streaming downloader | None |
| Session or simultaneous playback control | Shared accounts | The account owner downloading or recording | Annoys whoever uses two devices at once |
| Buyer's email stamped on every PDF | Anonymous resale of the PDF | Copying, but the copy identifies the buyer | None |
| Hardware DRM | Capture on Safari, iOS and Android with Widevine L1 | Capture on desktop Chrome | Monthly cost and failures on older devices |
| Disabling right-click or detecting developer tools | Nothing | Everything | Annoying |

The first four add up and change nothing for the legitimate student. That is the baseline. DRM is evaluated afterwards, if needed.

## First, find where the content is leaking

In August 2026 Apoyo Escolar RV found PDFs and videos from its courses circulating. The audit found that the leak did not come from recordings. A public API route returned, to anyone who queried it without signing in, the playback links for every lesson and the permanent links to every piece of material. Nobody had to buy or record anything.

Before spending on any protection technology, run three tests from an incognito window:

1. Open a course page without signing in and look at what the server returns. If you see addresses of videos or PDFs from lessons that are not previews, the content is already being given away.
2. Copy a PDF link from an account that bought the course and open it days later in another browser. If it opens, that link circulates forever.
3. Request a download without a session. If the file arrives, any visitor can download the course.

Closing that off changes nothing for the student who paid, and it is usually most of the problem.

## Video: streaming with expiring links

The original video file should not be reachable from outside. It is served by streaming and every playback starts with a signed link that expires. At Apoyo Escolar RV that link lasted six hours and we cut it to 30 minutes: it only has to work to start playback, and from there playback sustains itself. Six hours were six hours to pass the URL around a group.

A short link requires the app to renew it in time. When the platform reused links with no renewal date, 6 out of 10 video load errors in production were links that had already expired: the student saw a black screen. Shortening the link and renewing it are the same change.

What you should not do is tie the link to the student's IP. Mobile networks change IP in the middle of a lesson and the one who ends up blocked is the student, not the reseller.

## Shared accounts: single session or simultaneous playback

Account sharing is the most common source of loss for an academy. There are two ways to stop it and we run both in production:

- **Single session per account.** At Lu Apuntes each user has one active session. If they sign in from another device, the previous one finds out within about 30 seconds and goes back to the login screen. It is the strictest option and it bothers whoever studies on a computer and a phone at the same time.
- **Simultaneous playback.** At Apoyo Escolar RV what is not allowed is playing video in two places at the same time. The player reports every 15 seconds that it is still active, and if another connection plays within that window, the session is closed.

The second one needs tuning with real data. Out of 1,248 alerts in 60 days, 7 were the same browser with two sign-ins and 21 were a device that had already stopped playing when the other one started. Both situations belong to a legitimate student and stopped counting as conflicts. Without that review, protection ends up kicking out the people who paid.

## PDFs: the buyer's email on every page

The PDF is the easiest thing to resell because it is a complete file. There the defense is traceability: at Apoyo Escolar RV every PDF is stamped on the server at the moment the student opens or downloads it, with their email diagonally across every page and a footer line saying it is for personal use and may not be distributed. The mark stays in the viewer and in the downloaded copy, so any PDF that shows up for sale says which account it came from.

A detail that only shows up in production: out of 2,239 course PDFs, 23 came encrypted with an owner password. They opened without asking for anything, but stamping them without decrypting produced a file that asked for a password that did not exist. Now they are decrypted before stamping, and all 23 were checked to keep their pages and their text.

Each piece of material also has its own download setting. Whatever is marked as not downloadable is viewed inside the platform and the server rejects the download request.

## Why we don't put a watermark over the video

We tried it. At Apoyo Escolar RV the player showed the student's email over the video and we removed it the next day. A stamp over the player can be cropped in any editor, and to keep it from being cropped it has to sit in the middle of the image, covering the lesson. The student who paid suffers it every day and the reseller removes it once.

## DRM: when it makes sense

Hardware DRM (FairPlay on Apple, Widevine L1 on Android) makes downloading the video much harder and turns screen recording black on those devices. On desktop Chrome it does not block capture. In exchange it costs money every month, adds complexity to the player and tends to break cases like TVs or older browsers.

That is why at Apoyo Escolar RV it was deliberately deferred. It makes sense when, with everything above working, content keeps leaking through downloads of the stream. If that is your case, we implement it on the same platform.

## What not to do

- **Disable right-click, the screenshot key or developer tools.** It is bypassed in seconds and annoys everyone.
- **Detect capture from the browser.** It only sees the browser's own capture, not an external program.
- **Tie access to the IP.** It punishes the student who studies from a phone.
- **Rely on a "secret" link.** A link with no expiry is public as soon as someone shares it.

## How we approach it

1. **Audit.** What the platform returns to a visitor without a purchase, which links are permanent and where downloads happen. It comes first because it is usually where most is lost.
2. **Close off the easy paths.** Links only for buyers, streaming with expiring links and original files out of public reach.
3. **Sessions.** Single session or simultaneous playback control, depending on how your students study, with a review of the real alerts.
4. **Traceability.** The buyer's email on every PDF and a record of who requested each link.
5. **Response.** Immediate suspension of the identified account and terms of use that back the claim.

All of this is built on a [platform of your own](/en/education-platforms/), where every link goes through your server. If your academy lives on another platform today, the first step is to [migrate it without any student losing access](/en/education-platforms/migration/).
