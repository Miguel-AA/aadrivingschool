"use client";

import { useTranslations } from "next-intl";
import { EVENTS } from "@/lib/services/analytics";
import { CTAButton } from "./CTAButton";
import { WhatsAppCTA } from "./WhatsAppCTA";

/**
 * Sticky bottom CTA bar on mobile (the gameplan's "global sticky CTA").
 * Hidden on large screens, where the floating WhatsApp button is used instead.
 * The locale layout adds bottom padding to <main> so content isn't covered.
 */
export function MobileCTABar() {
  const t = useTranslations("common");
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2.5 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-2xl items-center gap-2">
        <CTAButton
          href="/quiz"
          eventName={EVENTS.CTA_CLICK}
          eventProps={{ source: "mobile_bar", target: "quiz" }}
          className="flex-1"
        >
          {t("cta.findMyCourse")}
        </CTAButton>
        <WhatsAppCTA kind="default" variant="secondary" className="flex-1" />
      </div>
    </div>
  );
}
