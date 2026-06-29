/**
 * Single source of truth for supported locales. Plain constants (previously a
 * next-intl `defineRouting`). The SPA tracks the active locale in React state
 * (see `@/i18n`), not in the URL.
 */
export const routing = {
  locales: ["en", "es"] as const,
  defaultLocale: "en" as const,
};

export type Locale = (typeof routing.locales)[number];

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
