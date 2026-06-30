import { useTranslations } from "@/i18n";
import { getCourseById, getPackageById, getFaqsByIds } from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export function MatureDriver() {
  const t = useTranslations("landing");
  usePageTitle(t("mature.title"));

  const courses = [
    getCourseById("mature55"),
    getCourseById("defensive-refresher"),
  ].filter((c): c is Course => Boolean(c));
  const packages = [getPackageById("55-plus-discount")].filter(
    (p): p is Package => Boolean(p),
  );
  const faqs = getFaqsByIds(["mature-discount", "mature-who", "global-guarantee"]);

  return (
    <LandingTemplate
      eyebrow={t("mature.eyebrow")}
      title={t("mature.title")}
      subtitle={t("mature.subtitle")}
      actions={
        <>
          <CTAButton
            href="/courses/mature-driver-55-plus"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "55-plus-driver", target: "mature55" }}
            size="lg"
          >
            {t("mature.primaryCta")}
          </CTAButton>
          <WhatsAppCTA
            kind="default"
            variant="secondary"
            size="lg"
            label={t("mature.secondaryCta")}
          />
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      theme="emerald"
      heroImage="/herobg-poster.jpg"
      leadSourcePage="/55-plus-driver"
    />
  );
}
