import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { EVENTS } from "@/lib/services/analytics";
import { CTAButton } from "@/components/cta/CTAButton";
import { Nav } from "./Nav";
import { MobileNav } from "./MobileNav";
import { LanguageToggle } from "./LanguageToggle";

/** Site header: brand, primary nav, language toggle, and a Find My Course CTA. */
export function Header() {
  const t = useTranslations("common");

  return (
    <header className="relative border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-brand-800">
            {siteConfig.shortName}
          </span>
          <span className="text-xs text-slate-500">{t("brandTagline")}</span>
        </Link>

        <Nav />

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
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
