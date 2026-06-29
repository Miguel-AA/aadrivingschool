import type { Locale } from "@/i18n/routing";

/** Format a USD price for display, or return null when there's no fixed price. */
export function formatPrice(
  priceUsd: number | null,
  locale: Locale,
): string | null {
  if (priceUsd === null) return null;
  return new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceUsd);
}
