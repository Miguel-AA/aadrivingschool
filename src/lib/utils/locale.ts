import type { Locale } from "@/i18n/routing";
import type { LocalizedText } from "@/lib/schemas/content";

/**
 * Resolve a bilingual content field for the active locale, falling back to
 * English when the localized value is empty (e.g. an ES placeholder not yet
 * translated). This keeps the site coherent while Spanish copy is in progress.
 */
export function getLocalized(field: LocalizedText, locale: Locale): string {
  const value = field[locale];
  return value && value.trim().length > 0 ? value : field.en;
}
