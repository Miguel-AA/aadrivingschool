/**
 * Site-wide configuration. Values sourced from env where set, with safe
 * placeholders otherwise. CONFIRM all contact details and the brand name with
 * the business before launch (see plan: "Placeholders the user must supply").
 */
export const siteConfig = {
  name: "Florida Top 1 Driving School",
  shortName: "Florida Top 1 Driving School",
  // Working tagline — review/translate before launch.
  description:
    "Florida Top 1 Driving School helps Florida drivers and families understand the right next step — TLSAE, permit prep, ticket help, and bilingual (English/Spanish) license support.",
  url: import.meta.env.VITE_SITE_URL ?? "https://floridatop1drivingschool.com",
  // Contact / concierge (placeholders).
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? "15555555555",
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE ?? "+1-555-555-5555",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL ?? "help@example.com",
} as const;

export type SiteConfig = typeof siteConfig;
