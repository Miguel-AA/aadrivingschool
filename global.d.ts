import type { routing } from "@/i18n/routing";

// Typed message keys + locales for next-intl. `Messages` mirrors the merged
// namespace structure produced in `src/i18n/request.ts`, using the English
// files as the canonical key source (ES files share the same shape).
type Messages = {
  common: typeof import("@/messages/en/common.json");
  home: typeof import("@/messages/en/home.json");
  compliance: typeof import("@/messages/en/compliance.json");
  quiz: typeof import("@/messages/en/quiz.json");
  leadForm: typeof import("@/messages/en/leadForm.json");
  landing: typeof import("@/messages/en/landing.json");
  pages: typeof import("@/messages/en/pages.json");
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
