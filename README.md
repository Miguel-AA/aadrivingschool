# Florida Top 1 Driving School

A Florida driving education & license-support platform
(`floridatop1drivingschool.com`) — a bilingual (English/Spanish) site that helps
drivers and families understand the right next step (TLSAE, permit prep, ticket
help, license support), packages official/partner courses with proprietary prep
and guidance, and includes a Course Finder quiz and lead capture.

> **Compliance:** This site is an independent service. It does **not** claim
> to be a Florida DMV/FLHSMV, court, or state-approved provider, and it makes
> **no guarantees** about exam results, ticket dismissal, point removal,
> reinstatement, or insurance discounts. Regulated courses are presented as
> delivered through approved providers. These rules are enforced in code (see
> "Compliance" below) — keep them intact.

This is a **frontend-only React + Vite SPA** (investor demo). It deploys as
static files to Cloudflare Pages — no server, SSR, or API routes. External
integrations (payments, CRM, email, analytics) are stubbed/mocked behind clean
interfaces and ready to wire up.

## Stack

- **Vite 7** + **React 19** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` (theme/tokens in `src/index.css`)
- **react-router-dom** for client routing (routes in `src/App.tsx`)
- **i18n shim** (`src/i18n/`) for EN/ES — reuses `src/messages/{en,es}/*.json`;
  locale is React state (toggle re-renders in place, URLs stay clean)
- **Zod** for content + form validation; **react-hook-form** for the lead form
- Self-hosted fonts via **@fontsource** (Inter + Plus Jakarta Sans)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Scripts: `npm run dev | build | preview | lint | typecheck | format`.

## Project structure

```
index.html            # Vite entry (static <head> meta)
public/               # favicon, robots.txt, _redirects (SPA fallback)
src/
  main.tsx            # bootstraps React + BrowserRouter + LocaleProvider
  App.tsx             # layout shell + all routes
  pages/              # route components: Home, Courses, CatalogDetail, Contact,
                      #   CourseFinder, Checkout, the landing pages, NotFound
  components/         # layout, catalog, compliance, quiz, lead, cta, content, seo
  content/            # STRUCTURED DATA: courses, packages, providers, faqs,
                      #   quiz-questions, quiz-rules (+ typed lookups in index.ts)
  lib/schemas/        # Zod schemas (content, lead) — single source of truth
  lib/services/       # analytics stub (console)
  lib/quiz/engine.ts  # pure recommendation engine
  lib/seo/            # JSON-LD helpers
  lib/hooks/          # usePageTitle
  i18n/               # locale provider + translations/navigation shims (no Next)
  messages/{en,es}/   # message dictionaries (EN complete; ES = [ES] placeholders)
```

## Deployment (Cloudflare Pages)

- **Build command:** `npm run build` · **Output directory:** `dist`
- `public/_redirects` (`/* /index.html 200`) makes client-side deep links work.
- No adapter, Workers, or `wrangler` config needed — it's pure static assets.

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
placeholders. The i18n shim **strips the `[ES]` marker** at runtime, so the
Spanish toggle shows clean English text where a real translation isn't in yet
(and genuine Spanish strings render as-is). The header language toggle switches
locale in React state — no reload, URLs stay clean.

## Integrations (stubbed/mocked)

`analytics.trackEvent` is a console stub. The **lead form is mocked** for the
demo: it validates with Zod and resolves to a success state client-side (no
backend). Wire `LeadForm`'s `onSubmit` to a real CRM/API endpoint before launch.

## What's intentionally out of scope (later phases)

Real payments, partner enrollment routing, admin/CRM dashboard, email/SMS, a
real lead backend, full Spanish copy, a live analytics provider, and
reCAPTCHA/Turnstile.
