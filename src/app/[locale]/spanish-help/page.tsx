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
}: PageProps<"/[locale]/spanish-help">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "landing" });
  return buildMetadata({
    title: t("spanish.title"),
    description: t("spanish.subtitle"),
    locale,
    path: "/spanish-help",
  });
}

export default async function SpanishHelpPage({
  params,
}: PageProps<"/[locale]/spanish-help">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "landing" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const courses = [getCourseById("spanish-prep"), getCourseById("permit-prep")].filter(
    (c): c is Course => Boolean(c),
  );
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
            variant="secondary"
            size="lg"
          >
            {tc("cta.findMyCourse")}
          </CTAButton>
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      disclaimerLabels={["educational-guide", "not-official-dmv", "no-guarantee"]}
      leadSourcePage="/spanish-help"
    />
  );
}
