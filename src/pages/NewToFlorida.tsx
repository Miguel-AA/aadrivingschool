import { useTranslations } from "@/i18n";
import { getCourseById, getPackageById, getFaqsByIds } from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";

export function NewToFlorida() {
  const t = useTranslations("landing");
  usePageTitle(t("newfl.title"));

  const courses = [
    getCourseById("new-to-fl"),
    getCourseById("dmv-checklist"),
    getCourseById("permit-prep"),
  ].filter((c): c is Course => Boolean(c));
  const packages = [getPackageById("new-to-florida")].filter(
    (p): p is Package => Boolean(p),
  );
  const faqs = getFaqsByIds(["newfl-legal", "newfl-docs", "global-official"]);

  return (
    <LandingTemplate
      eyebrow={t("newfl.eyebrow")}
      title={t("newfl.title")}
      subtitle={t("newfl.subtitle")}
      actions={
        <>
          <CTAButton
            href="/contact?intent=package:new-to-florida"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "new-to-florida", target: "contact" }}
            size="lg"
          >
            {t("newfl.primaryCta")}
          </CTAButton>
          <CTAButton
            href="/spanish-help"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "new-to-florida", target: "spanish-help" }}
            variant="accent"
            size="lg"
          >
            {t("newfl.secondaryCta")}
          </CTAButton>
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      theme="ocean"
      heroImage="/herobg-poster.jpg"
      leadSourcePage="/new-to-florida"
    />
  );
}
