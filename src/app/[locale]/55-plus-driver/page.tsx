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
}: PageProps<"/[locale]/55-plus-driver">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "landing" });
  return buildMetadata({
    title: t("mature.title"),
    description: t("mature.subtitle"),
    locale,
    path: "/55-plus-driver",
  });
}

export default async function MatureDriverPage({
  params,
}: PageProps<"/[locale]/55-plus-driver">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "landing" });

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
      disclaimerLabels={["partner-provided", "not-official-dmv", "no-guarantee"]}
      disclaimerProviderId="partner-pending"
      leadSourcePage="/55-plus-driver"
    />
  );
}
