import type { LocalizedText } from "@/lib/schemas/content";

/**
 * Authoring helper for bilingual content. English is provided now; Spanish
 * defaults to an empty string, which `getLocalized` resolves by falling back to
 * English until a human translation is supplied. Pass a second argument to add
 * Spanish copy as it becomes available.
 *
 * NOTE: All `es: ""` values below are intentional placeholders awaiting human
 * translation/review before launch.
 */
export const loc = (en: string, es = ""): LocalizedText => ({ en, es });
