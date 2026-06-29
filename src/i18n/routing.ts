import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for supported locales and routing behavior.
 *
 * `localePrefix: "always"` keeps every URL locale-prefixed (`/en/...`, `/es/...`),
 * which gives clean hreflang/SEO and avoids ambiguous root behavior. The bare `/`
 * redirects to the negotiated (or default) locale via the proxy.
 */
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
