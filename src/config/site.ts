/**
 * Site-wide configuration — the single source of truth for brand identity and
 * contact details. Real values come from `VITE_*` env vars (injected at build
 * time by Vite; set them in Cloudflare Pages and rebuild). If a contact var is
 * missing the value is an EMPTY STRING — never a fake placeholder — so the
 * `contact` helpers below can hide the CTA instead of rendering a broken link.
 *
 * NOTE: if you change `name`/`url` here, also update the static mirrors that
 * cannot read this file: index.html, public/site.webmanifest, public/robots.txt,
 * and .env.example.
 */
export const siteConfig = {
  name: "A&A Driving School",
  shortName: "A&A",
  description:
    "A&A Driving School helps Florida drivers and families find the right next step — permit prep, ticket help, and bilingual (English/Spanish) license support.",
  url: import.meta.env.VITE_SITE_URL ?? "",
  // Contact channels. Empty string when the env var is not set (no fake values).
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? "",
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE ?? "",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL ?? "",
} as const;

export type SiteConfig = typeof siteConfig;

/** Digits-only WhatsApp number (country code, no `+`/spaces) for wa.me links. */
const whatsappDigits = siteConfig.whatsappNumber.replace(/\D/g, "");

/**
 * Centralized contact helpers + availability flags. Phase 1A safety rule: if a
 * contact value is not configured, the corresponding CTA must NOT render a
 * broken or fake link. Components check the `has*` flag before rendering, and
 * build hrefs only through these helpers (so escaping/sanitizing lives in one
 * place and no user-entered form value is ever injected into a contact link).
 */
export const contact = {
  hasPhone: siteConfig.supportPhone.trim().length > 0,
  hasEmail: siteConfig.supportEmail.trim().length > 0,
  hasWhatsapp: whatsappDigits.length > 0,
  /** `tel:` href limited to dial-safe characters (digits and a leading `+`). */
  telHref: `tel:${siteConfig.supportPhone.replace(/[^\d+]/g, "")}`,
  /** `mailto:` href for the configured support email only. */
  mailtoHref: `mailto:${siteConfig.supportEmail}`,
  /** wa.me link (digits only). Optional prefilled message is URL-encoded. */
  whatsappHref(message?: string): string {
    const base = `https://wa.me/${whatsappDigits}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  },
} as const;
