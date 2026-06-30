# Stack & conventions

This is a **React + Vite** single-page app (TypeScript), deployed as **static
files to Cloudflare Pages**. It was migrated off Next.js — there is **no server,
no SSR, no API routes, no middleware**. Don't reintroduce Next APIs.

- **Vite 7** + **React 19** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` (theme/tokens in `src/index.css`)
- **react-router-dom** for client routing (routes declared in `src/App.tsx`)
- **i18n shim** in `src/i18n/` (EN/ES) that reuses `src/messages/{en,es}/*.json`.
  Import translations from `@/i18n` (`useTranslations`, `useLocale`,
  `useSetLocale`) and internal links/hooks from `@/i18n/navigation` (`Link`,
  `usePathname`, `useRouter`). Locale is React state (not in the URL).
- **Zod** for content/form schemas; **react-hook-form** for the lead form.

Conventions:
- Route components live in `src/pages/`; shared UI in `src/components/`.
- Static content (courses, packages, FAQs, quiz) is in `src/content/*.ts`,
  validated by Zod at import. Bilingual fields use `{ en, es }` + `getLocalized`.
- The lead form posts to a Cloudflare Pages Function at `/api/lead`
  (`functions/api/lead.ts`), which validates server-side and forwards leads to
  the `LEAD_WEBHOOK_URL` env var. Set that var in Cloudflare before launch.
- `npm run build` → `dist/`. SPA deep-link routing relies on `public/_redirects`
  (`/* /index.html 200`). Cloudflare Pages: build `npm run build`, output `dist`.
