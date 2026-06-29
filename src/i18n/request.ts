import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Message namespaces. Each is a separate JSON file per locale under
 * `src/messages/{locale}/{namespace}.json`. They are merged into a single
 * messages object keyed by namespace, so `useTranslations("home")` resolves to
 * `home.json`. EN values are complete; ES values are `[ES]` placeholders with an
 * identical key structure (so there are never missing-key warnings).
 */
const NAMESPACES = [
  "common",
  "home",
  "compliance",
  "quiz",
  "leadForm",
  "landing",
  "pages",
] as const;

async function loadMessages(locale: string) {
  const entries = await Promise.all(
    NAMESPACES.map(
      async (ns) =>
        [ns, (await import(`../messages/${locale}/${ns}.json`)).default] as const,
    ),
  );
  return Object.fromEntries(entries);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
