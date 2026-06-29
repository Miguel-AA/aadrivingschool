
import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { EVENTS } from "@/lib/services/analytics";
import { CTAButton } from "@/components/cta/CTAButton";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { MobileNav } from "./MobileNav";
import { LanguageToggle } from "./LanguageToggle";

/** Sticky, glassy site header with a scroll-shadow, brand logo, and nav. */
export function Header() {
  const t = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r backdrop-blur-md transition-shadow",
        // Darker, richer navy with a brighter blue band through the middle.
        scrolled
          ? "from-brand-950/95 via-brand-900/90 to-brand-950/95 shadow-lg shadow-brand-950/50"
          : "from-brand-950/85 via-brand-900/80 to-brand-950/85",
      )}
    >
      {/* Vibrant blue glow for "brillo" — a soft spotlight behind the bar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-16 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-ocean-500/30 blur-3xl" />
        <div className="absolute -top-12 right-10 h-24 w-40 rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label={t("brandTagline")}>
          <Logo tone="dark" />
        </Link>

        <Nav />

        <div className="flex items-center gap-3">
          <LanguageToggle tone="dark" className="hidden sm:inline-flex" />
          <CTAButton
            href="/quiz"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "header", target: "quiz" }}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {t("cta.findMyCourse")}
          </CTAButton>
          <MobileNav />
        </div>
      </div>

      {/* Bright accent line along the bottom edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ocean-400 to-transparent"
      />
    </header>
  );
}
