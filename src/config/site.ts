/**
 * Site-wide configuration. Values sourced from env where set, with safe
 * placeholders otherwise. CONFIRM all contact details and the brand name with
 * the business before launch (see plan: "Placeholders the user must supply").
 */
export const siteConfig = {
  name: "Florida Driver Help Center",
  shortName: "FL Driver Help",
  // Working tagline — review/translate before launch.
  description:
    "Online Florida driving courses, permit test preparation, and license support in English and Spanish.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Contact / concierge (placeholders).
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15555555555",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "+1-555-555-5555",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "help@example.com",
} as const;

export type SiteConfig = typeof siteConfig;
