import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getCourseById,
  getPackageById,
  getFaqsByIds,
} from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/ticket-help">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "landing" });
  return buildMetadata({
    title: t("ticket.title"),
    description: t("ticket.subtitle"),
    locale,
    path: "/ticket-help",
  });
}

export default async function TicketHelpPage({
  params,
}: PageProps<"/[locale]/ticket-help">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "landing" });

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
