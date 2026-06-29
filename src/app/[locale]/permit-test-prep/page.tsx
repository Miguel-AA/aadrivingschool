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

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/permit-test-prep">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "landing" });
  return buildMetadata({
    title: t("permit.title"),
    description: t("permit.subtitle"),
    locale,
    path: "/permit-test-prep",
  });
}

export default async function PermitTestPrepPage({
  params,
}: PageProps<"/[locale]/permit-test-prep">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "landing" });

  const courses = [
    getCourseById("permit-prep"),
    getCourseById("spanish-prep"),
    getCourseById("road-signs"),
  ].filter((c): c is Course => Boolean(c));
  const packages = [getPackageById("first-time-adult")].filter(
    (p): p is Package => Boolean(p),
  );
  const faqs = getFaqsByIds(["permit-official", "permit-spanish", "global-guarantee"]);

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
