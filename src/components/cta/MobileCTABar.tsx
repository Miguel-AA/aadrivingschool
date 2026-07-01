
import { MessageCircle } from "lucide-react";
import { useTranslations } from "@/i18n";
import { EVENTS } from "@/lib/services/analytics";
import { CTAButton } from "./CTAButton";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { useChat } from "./chatStore";

/**
 * Sticky bottom CTA bar on mobile (the gameplan's "global sticky CTA").
 * Hidden on large screens, where the floating WhatsApp button is used instead.
 * The footer carries extra bottom padding on mobile so this bar never covers
 * its last line, and it respects the iOS home-indicator safe area.
 */
export function MobileCTABar() {
  const t = useTranslations("common");
  const { open, toggle } = useChat();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 px-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgba(11,19,34,0.4)] lg:hidden">
      {/* Bright blue glow — the same "brillo" the header uses. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -bottom-16 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-ocean-500/25 blur-3xl" />
      </div>
      {/* Bright accent line along the top edge — mirrors the header's bottom line. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean-400 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl items-center gap-2.5">
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
          variant="secondary"
          label="WhatsApp"
          className="flex-1 whitespace-nowrap border-white/30 bg-transparent py-3 text-white shadow-none hover:border-white/50 hover:bg-white/10"
        />
        {/* Leon chat trigger — docked in the bar instead of floating over the
            page, so the bottom of the screen reads as one homogeneous unit. */}
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? t("leon.close") : t("leon.label")}
          aria-expanded={open}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-ocean-500 text-white shadow-sm shadow-brand-950/30 ring-1 ring-white/15 transition-transform active:scale-95"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
