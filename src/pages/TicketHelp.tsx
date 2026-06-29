import { useTranslations } from "@/i18n";
import { getCourseById, getPackageById, getFaqsByIds } from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export function TicketHelp() {
  const t = useTranslations("landing");
  usePageTitle(t("ticket.title"));

  const courses = [getCourseById("bdi"), getCourseById("adi")].filter(
    (c): c is Course => Boolean(c),
  );
  const packages = [
    getPackageById("ticket-solution"),
    getPackageById("license-reinstatement"),
  ].filter((p): p is Package => Boolean(p));
  const faqs = getFaqsByIds(["bdi-eligible", "bdi-points", "global-guarantee"]);

  return (
    <LandingTemplate
      eyebrow={t("ticket.eyebrow")}
      title={t("ticket.title")}
      subtitle={t("ticket.subtitle")}
      actions={
        <>
          <CTAButton
            href="/quiz"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "ticket-help", target: "quiz" }}
            size="lg"
          >
            {t("ticket.primaryCta")}
          </CTAButton>
          <WhatsAppCTA
            kind="default"
            variant="secondary"
            size="lg"
            label={t("ticket.secondaryCta")}
          />
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      disclaimerLabels={["partner-provided", "not-official-dmv", "no-guarantee"]}
      disclaimerProviderId="partner-pending"
      leadSourcePage="/ticket-help"
    />
  );
}
