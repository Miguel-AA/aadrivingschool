import { useTranslations } from "@/i18n";
import { getCourseById, getPackageById, getFaqsByIds } from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export function LicenseReinstatement() {
  const t = useTranslations("landing");
  usePageTitle(t("reinstatement.title"));

  const courses = [
    getCourseById("adi"),
    getCourseById("suspension-guide"),
  ].filter((c): c is Course => Boolean(c));
  const packages = [getPackageById("license-reinstatement")].filter(
    (p): p is Package => Boolean(p),
  );
  const faqs = getFaqsByIds([
    "adi-when",
    "adi-reinstate",
    "suspension-legal",
    "global-guarantee",
  ]);

  return (
    <LandingTemplate
      eyebrow={t("reinstatement.eyebrow")}
      title={t("reinstatement.title")}
      subtitle={t("reinstatement.subtitle")}
      actions={
        <>
          <CTAButton
            href="/contact?intent=package:license-reinstatement"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "license-reinstatement", target: "contact" }}
            size="lg"
          >
            {t("reinstatement.primaryCta")}
          </CTAButton>
          <WhatsAppCTA
            kind="default"
            variant="accent"
            size="lg"
            label={t("reinstatement.secondaryCta")}
          />
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      theme="rose"
      heroImage="/herobg-poster.jpg"
      leadSourcePage="/license-reinstatement"
    />
  );
}
