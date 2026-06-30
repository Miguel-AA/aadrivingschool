
import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import { contact } from "@/config/site";
import { trackEvent, EVENTS } from "@/lib/services/analytics";

/** Floating WhatsApp button (desktop). Mobile uses the sticky CTA bar instead. */
export function FloatingWhatsApp() {
  const locale = useLocale();
  const t = useTranslations("common");

  // No WhatsApp number configured → don't render a broken link.
  if (!contact.hasWhatsapp) return null;

  const href = contact.whatsappHref(t("whatsapp.defaultMessage"));

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
