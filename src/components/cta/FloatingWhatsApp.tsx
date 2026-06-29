"use client";

import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { trackEvent, EVENTS } from "@/lib/services/analytics";

/** Floating WhatsApp button (desktop). Mobile uses the sticky CTA bar instead. */
export function FloatingWhatsApp() {
  const locale = useLocale();
  const t = useTranslations("common");
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    t("whatsapp.defaultMessage"),
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta.chatWhatsApp")}
      onClick={() =>
        trackEvent(EVENTS.WHATSAPP_CLICK, { locale, source: "floating" })
      }
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-ocean-500 text-white shadow-lg shadow-brand-900/20 transition-transform hover:scale-105 lg:grid"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
