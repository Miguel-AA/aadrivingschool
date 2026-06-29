
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
        "sticky top-0 z-50 border-b backdrop-blur transition-shadow",
        scrolled
          ? "border-white/10 bg-brand-900/95 shadow-md shadow-brand-950/30"
          : "border-white/10 bg-brand-900/80",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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
    </header>
  );
}
