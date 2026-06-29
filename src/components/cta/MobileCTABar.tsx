
import { useTranslations } from "@/i18n";
import { EVENTS } from "@/lib/services/analytics";
import { CTAButton } from "./CTAButton";
import { WhatsAppCTA } from "./WhatsAppCTA";

/**
 * Sticky bottom CTA bar on mobile (the gameplan's "global sticky CTA").
 * Hidden on large screens, where the floating WhatsApp button is used instead.
 * The footer carries extra bottom padding on mobile so this bar never covers
 * its last line, and it respects the iOS home-indicator safe area.
 */
export function MobileCTABar() {
  const t = useTranslations("common");
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_16px_rgba(11,19,34,0.06)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-2xl items-center gap-2.5">
        <CTAButton
          href="/quiz"
          eventName={EVENTS.CTA_CLICK}
          eventProps={{ source: "mobile_bar", target: "quiz" }}
          className="flex-[1.6] whitespace-nowrap py-3"
        >
          {t("cta.findMyCourse")}
        </CTAButton>
        <WhatsAppCTA
          kind="default"
          variant="accent"
          label="WhatsApp"
          className="flex-1 whitespace-nowrap py-3"
        />
      </div>
    </div>
  );
}
