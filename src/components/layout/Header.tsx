
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
        "sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 transition-shadow",
        // Solid navy so no page-white shows through behind the bar.
        scrolled && "shadow-lg shadow-brand-950/50",
      )}
    >
      {/* Vibrant blue glow for "brillo" — a soft spotlight behind the bar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-16 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-ocean-500/25 blur-3xl" />
        <div className="absolute -top-12 right-10 h-24 w-40 rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" aria-label={t("brandTagline")} className="shrink-0">
          <Logo tone="dark" />
        </Link>

        <Nav />

        <div className="flex shrink-0 items-center gap-3">
          <LanguageToggle tone="dark" className="hidden xl:inline-flex" />
          <CTAButton
            href="/quiz"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "header", target: "quiz" }}
            size="sm"
            className="hidden whitespace-nowrap sm:inline-flex"
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
