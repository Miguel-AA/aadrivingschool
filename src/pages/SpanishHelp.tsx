import { useTranslations } from "@/i18n";
import { getCourseById, getPackageById, getFaqsByIds } from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export function SpanishHelp() {
  const t = useTranslations("landing");
  const tc = useTranslations("common");
  usePageTitle(t("spanish.title"));

  const courses = [
    getCourseById("spanish-prep"),
    getCourseById("permit-prep"),
  ].filter((c): c is Course => Boolean(c));
  const packages = [getPackageById("spanish-help")].filter(
    (p): p is Package => Boolean(p),
  );
  const faqs = getFaqsByIds(["global-spanish", "spanish-what", "permit-spanish"]);

  return (
    <LandingTemplate
      eyebrow={t("spanish.eyebrow")}
      title={t("spanish.title")}
      subtitle={t("spanish.subtitle")}
      actions={
        <>
          <WhatsAppCTA
            kind="default"
            variant="primary"
            size="lg"
            label={t("spanish.whatsappCta")}
          />
          <CTAButton
            href="/quiz"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "spanish-help", target: "quiz" }}
            variant="accent"
            size="lg"
          >
            {tc("cta.findMyCourse")}
          </CTAButton>
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      packagesHeading={t("spanish.relatedPackages")}
      coursesHeading={t("spanish.relatedCourses")}
      faqHeading={t("spanish.faqHeading")}
      ctaHeading={t("spanish.ctaHeading")}
      ctaBody={t("spanish.ctaBody")}
      theme="violet"
      heroImage="/spanishhelp.jpg"
      leadSourcePage="/spanish-help"
    />
  );
}
