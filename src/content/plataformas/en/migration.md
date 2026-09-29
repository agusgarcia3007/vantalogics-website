---
title: "How to migrate an online academy from Hotmart, Tiendup or WordPress to a platform of your own"
seoTitle: "Migrate your academy from Hotmart, Tiendup or WordPress | Vantalogics"
description: "What you can export from Hotmart, Tiendup and WooCommerce, how students and purchases move without losing access, and the process we used with a real academy."
answer: "Migrating an academy is not copying videos: it is moving students, purchases and access without anyone losing a course. No platform does it automatically. Sales and enrollees are exported, normalized, each old product is mapped to a new course, the whole run is rehearsed without touching anything, and then it is imported in a single operation, notifying every student."
nav: "Migration"
order: 1
serviceType: "Online academy migration to a platform of your own"
updated: 2026-09-23
translationOf: migracion
cases:
  - apoyo-escolar-rv
faq:
  - question: "Do students have to pay again?"
    answer: "No. Every purchase from the previous platform is imported as access to the equivalent course on the new one, with its original date. The student signs in with their email and finds the same courses they had."
  - question: "Is student progress lost?"
    answer: "It depends on what the source platform exports. Lesson-by-lesson progress almost never comes out in the exports. Tiendup does include the percentage completed per course, which is useful to show students where they were. It is best to decide before the migration what gets kept and tell students, rather than letting them find out."
  - question: "What happens to active subscriptions?"
    answer: "They do not move on their own. The subscriber's card stays stored with the previous platform's processor and cannot be transferred. There are two paths: let current subscriptions run out there and charge new ones on your own platform, or ask each subscriber to subscribe again, ideally with an incentive."
  - question: "Can you migrate from Moodle?"
    answer: "Yes. Moodle exports users as CSV and courses as backups, and with database access you can also extract enrollments and grades. It is the migration with the most data available; the work lies in adapting Moodle's structure to the new platform's learning path."
  - question: "What happens to the links and search rankings of the previous platform?"
    answer: "If the courses were on your domain (WordPress), every old URL is redirected with a 301 to its new course and almost everything earned in search engines is kept. If they were on a Hotmart or Tiendup subdomain, there is no way to redirect: links on social media, ads, emails and your bio have to be updated before the cutover date."
---

An academy that moves does not lose its content, which usually lives in the teacher's original files. What is at risk is the people: students who bought a course and cannot find it on Monday, duplicate purchases, orphaned accounts because someone signed up with a different email. A migration is done right when no student notices it happened, except for the email telling them their courses are now on the new platform.

## What you can get out of each platform

No course platform offers an automatic move out. Each one exports something different, with its own format and its own errors:

| Platform | What can be exported | What does not come out | Watch out for |
| --- | --- | --- | --- |
| Hotmart | Sales reports as CSV or XLS and the members area user list | Passwords, subscriber cards, lesson-by-lesson progress | Active subscriptions keep being charged on Hotmart until they are cancelled |
| Tiendup | Orders as CSV and enrollees per course with their completion percentage | Passwords and lesson-by-lesson progress | Orders and enrollees come in separate files, and enrollees come in one file per course |
| WordPress with WooCommerce | Orders as CSV, filterable by status | Passwords | Filter out pending and cancelled orders; if the LMS is a plugin (LearnDash, Tutor LMS), progress lives in the WordPress database |
| Moodle | Users as CSV, courses as backups, enrollments and grades from the database | Nothing critical, given database access | Adapting Moodle's structure to the new learning path takes more work than exporting |

None of them export passwords, and that is how it should be. Each student gets new access by email, so communication is part of the migration, not a detail at the end.

## The case: Apoyo Escolar RV, from Tiendup and WooCommerce to a platform of its own

[Apoyo Escolar RV](/en/cases/apoyo-escolar-rv/) prepares students for subjects at five universities and today has more than 22,000 students on its platform. Its historical sales were split across two places, a Tiendup store and another on WordPress with WooCommerce, and every student who had bought from either one had to find their courses on the new platform. Each store had its own export, its own date format, its own way of writing phone numbers and its own product names. These were the steps.

### 1. A single master file with a common format

Both sources were brought to the same columns: order number, date, first name, last name, email, phone, product and which platform it came from. Keeping the source of each row looks like a detail, but it is what later lets you trace any complaint back to the original order.

### 2. Normalize before importing

- **Dates.** One source wrote them as `11/11/2025 00:49:17` and the other as `2025-11-21 00:00`. All of them were converted to the same format.
- **Emails.** Lowercase and without spaces. It is the key that identifies each student, and `Maria@` and `maria@` cannot be two people.
- **Phone numbers.** Without spaces or dashes, and with the country code.
- **Accents.** One of the exports arrived with broken characters because of an encoding problem: "QuÃ­mica" instead of "Química". If it is not fixed, the product name does not match any course.
- **Statuses.** Only completed orders go in. An imported pending order is free access handed out.

### 3. A table that maps each old product to a new course

It is the step that requires the most decisions, and the academy makes them, not the technical team. Each product from the previous platform was listed with its identifier, how many orders and how many unique students it had, and which new course it corresponds to. Some old products were merged into a single new course, so the table allows several of them to point to the same destination. Any product without a match shows up in a report before importing, not after.

### 4. One person, one account

A student is looked up first by email, ignoring case and accents. If they do not show up, they are looked up by phone, because the same person may have bought with two different emails in two stores. Only if they do not show up either way is a new account created.

### 5. Dry run

The full migration runs first in test mode, without writing anything. It reports how many accounts would be created, how many already existed, how many purchases would be added and which products were left without a course. You run it, fix the table and run it again, until the report has no surprises.

### 6. Import in batches and notify without flooding

The real import processes orders 100 at a time. Emails go out in batches of 10 every 600 milliseconds, below the email provider's requests-per-second limit: firing thousands of emails at once makes the provider reject them, and a student who never got the notice writes to support. There are two different messages: students without an account get their access, and students who already had one get notice that their courses from the previous platform are now available. Every email that fails is logged so it can be resent.

### 7. A second pass for whatever came in during the transition

While the migration was being prepared, the previous stores kept selling. Those sales were exported afterwards and added with the same process. Since the script recognizes purchases that already exist, running it twice duplicates nothing.

## Video: two formats side by side for a while

Content is the easy part if you have the originals, and the only part that cannot be rebuilt if you do not. Get the original files before closing any account.

Moving video between providers is also a migration. At Apoyo Escolar RV, video went through more than one streaming service, and during those changes already-converted lessons coexisted with MP4 files from the previous system. The player has to support both formats, with expiring links in both cases, until the conversion is finished.

## Checklist before the cutover date

1. Originals of every video and material downloaded and verified.
2. Sales and enrollee exports from each platform, with the cutover date and time noted.
3. Old product → new course table reviewed and approved by the academy.
4. Dry run with no orphaned products or unexplained errors.
5. Access emails written, tested and sent from an authenticated sender so they do not land in spam.
6. Purchase links on social media, ads, emails and your bio ready to change.
7. 301 redirects for the old URLs, if they were on your domain.
8. A plan for active subscriptions: let them expire or ask subscribers to sign up again.
9. Extra support the first week: questions will come in even if everything goes well.
10. The previous platform kept active for a few more weeks, read-only, in case some data needs to be recovered.

## After migrating

Moving is the excuse to solve what the previous platform would not allow: local payment methods, learning paths by institution and subject, assignments graded by teachers, an AI assistant over the material. What can be built and when it makes sense is in [custom education platform development](/en/education-platforms/).
