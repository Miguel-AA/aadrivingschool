import { useTranslations } from "@/i18n";
import { getCourseById, getPackageById, getFaqsByIds } from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";

export function PermitPrep() {
  const t = useTranslations("landing");
  usePageTitle(t("permit.title"));

  const courses = [
    getCourseById("permit-prep"),
    getCourseById("spanish-prep"),
    getCourseById("road-signs"),
  ].filter((c): c is Course => Boolean(c));
  const packages = [getPackageById("first-time-adult")].filter(
    (p): p is Package => Boolean(p),
  );
  const faqs = getFaqsByIds([
    "permit-official",
    "permit-spanish",
    "global-guarantee",
  ]);

  return (
    <LandingTemplate
      eyebrow={t("permit.eyebrow")}
      title={t("permit.title")}
      subtitle={t("permit.subtitle")}
      actions={
        <>
          <CTAButton
            href="/courses/permit-test-prep"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "permit-test-prep", target: "permit-prep" }}
            size="lg"
          >
            {t("permit.primaryCta")}
          </CTAButton>
          <CTAButton
            href="/courses/spanish-permit-bootcamp"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "permit-test-prep", target: "spanish-prep" }}
            variant="secondary"
            size="lg"
          >
            {t("permit.secondaryCta")}
          </CTAButton>
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      disclaimerLabels={["educational-guide", "not-official-dmv", "no-guarantee"]}
      leadSourcePage="/permit-test-prep"
    />
  );
}
