import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCourseById, getPackageById, getFaqsByIds } from "@/content";
import type { Course, Package } from "@/lib/schemas/content";
import { EVENTS } from "@/lib/services/analytics";
import { LandingTemplate } from "@/components/content/LandingTemplate";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/license-reinstatement">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "landing" });
  return buildMetadata({
    title: t("reinstatement.title"),
    description: t("reinstatement.subtitle"),
    locale,
    path: "/license-reinstatement",
  });
}

export default async function LicenseReinstatementPage({
  params,
}: PageProps<"/[locale]/license-reinstatement">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "landing" });

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
            variant="secondary"
            size="lg"
            label={t("reinstatement.secondaryCta")}
          />
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      disclaimerLabels={["partner-provided", "not-official-dmv", "no-guarantee"]}
      disclaimerProviderId="partner-pending"
      leadSourcePage="/license-reinstatement"
    />
  );
}
