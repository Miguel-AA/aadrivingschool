# A&A Driving School

A remote-only Florida driving education & license-support platform (*Florida
Remote Driving School*) — a bilingual (English/Spanish) site that packages
official/partner courses with proprietary prep and guidance, a Course Finder
quiz, and lead capture.

> **Compliance:** This site is an independent, remote-only service. It does **not** claim
> to be a Florida DMV/FLHSMV, court, or state-approved provider, and it makes
> **no guarantees** about exam results, ticket dismissal, point removal,
> reinstatement, or insurance discounts. Regulated courses are presented as
> delivered through approved providers. These rules are enforced in code (see
> "Compliance" below) — keep them intact.

This is the **foundation + core pages** build. External integrations (payments,
CRM, email, analytics) are stubbed behind clean interfaces and ready to wire up.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **next-intl** for EN/ES routing (`/en`, `/es`) — `src/i18n/*`, `src/proxy.ts`
- **Zod** for content + form validation
- **react-hook-form** for the lead form

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; safe defaults exist
npm run dev                  # http://localhost:3000 -> redirects to /en
```

Scripts: `npm run dev | build | start | lint | typecheck | format`.

## Project structure

```
src/
  app/[locale]/        # pages: home, courses, courses/[slug], quiz, contact,
                       #        spanish-help, permit-test-prep, ticket-help
  app/api/leads/       # lead capture endpoint (Zod + honeypot -> lead service)
  app/sitemap.ts, robots.ts
  components/          # layout, catalog, compliance, quiz, lead, cta, content, seo
  content/            # STRUCTURED DATA: courses, packages, providers, faqs,
                      #   quiz-questions, quiz-rules (+ typed lookups in index.ts)
  lib/schemas/        # Zod schemas (content, lead) — single source of truth
  lib/services/       # stubbed: lead-service, analytics, checkout-service
  lib/quiz/engine.ts  # pure recommendation engine
  lib/seo/            # metadata + JSON-LD helpers
  i18n/               # next-intl routing/navigation/request
  messages/{en,es}/   # message dictionaries (EN complete; ES = [ES] placeholders)
```

## Content model

All courses, packages, FAQs, and quiz logic are **structured data** in
`src/content/*.ts`, validated by Zod at import time (`Schema.array().parse(...)`),
so bad content fails the build. Bilingual fields use `{ en, es }`; `getLocalized`
falls back to English when a Spanish value is empty. To add/edit a course, edit
`src/content/courses.ts` — no new page files needed.

## Compliance (enforced in code)

- `CourseSchema` has a `.refine` that makes any `regulated-partner` course
  **fail the build** unless it has a `providerId` and the `partner-provided`,
  `not-official-dmv`, and `no-guarantee` labels.
- `CourseDetail`/`PackageDetail` always render `<Disclaimer>`; `CourseCard`
  shows compliance pills. Approved wording lives in `messages/*/compliance.json`.

## Internationalization

EN copy is complete; ES files mirror the key structure with visible `[ES]`
placeholders for human translation. Catalog content Spanish fields are empty
(fall back to EN) until translated. The header language toggle preserves the
current path + query.

## Integrations (stubbed)

`leadService.submitLead` (console + in-memory), `analytics.trackEvent` (console),
and `checkoutService.createCheckout` (routes to `/contact`) are interfaces with
stub implementations — swap them for Stripe/CRM/email/GA without changing call
sites.

## What's intentionally out of scope (later phases)

Real payments, partner enrollment routing, admin/CRM dashboard, email/SMS,
the remaining landing pages (`/license-reinstatement`, `/55-plus-driver`,
`/new-to-florida`), full Spanish copy, a live analytics provider, and
reCAPTCHA/Turnstile.
