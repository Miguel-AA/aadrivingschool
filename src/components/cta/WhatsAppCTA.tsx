"use client";

import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { trackEvent, EVENTS } from "@/lib/services/analytics";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

type MessageKind = "default" | "course" | "recommendation";

interface WhatsAppCTAProps {
  /** Which prefilled message to use. */
  kind?: MessageKind;
  /** Value injected into "course"/"recommendation" messages (e.g. course title). */
  item?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * WhatsApp concierge CTA. Builds a wa.me link with a prefilled, localized
 * message and fires the WHATSAPP_CLICK analytics event.
 */
export function WhatsAppCTA({
  kind = "default",
  item,
  label,
  variant = "secondary",
  size = "md",
  className,
}: WhatsAppCTAProps) {
  const locale = useLocale();
  const t = useTranslations("common");

  const message =
    kind === "default"
      ? t("whatsapp.defaultMessage")
      : t(`whatsapp.${kind}Message`, { item: item ?? "" });

  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { locale, kind, item })}
      className={buttonClasses(variant, size, className)}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label ?? t("cta.chatWhatsApp")}
    </a>
  );
}
