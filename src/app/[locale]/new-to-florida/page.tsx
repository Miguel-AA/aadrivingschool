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

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/new-to-florida">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "landing" });
  return buildMetadata({
    title: t("newfl.title"),
    description: t("newfl.subtitle"),
    locale,
    path: "/new-to-florida",
  });
}

export default async function NewToFloridaPage({
  params,
}: PageProps<"/[locale]/new-to-florida">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "landing" });

  const courses = [
    getCourseById("new-to-fl"),
    getCourseById("dmv-checklist"),
    getCourseById("permit-prep"),
  ].filter((c): c is Course => Boolean(c));
  const packages = [getPackageById("new-to-florida")].filter(
    (p): p is Package => Boolean(p),
  );
  const faqs = getFaqsByIds(["newfl-legal", "newfl-docs", "global-official"]);

  return (
    <LandingTemplate
      eyebrow={t("newfl.eyebrow")}
      title={t("newfl.title")}
      subtitle={t("newfl.subtitle")}
      actions={
        <>
          <CTAButton
            href="/contact?intent=package:new-to-florida"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "new-to-florida", target: "contact" }}
            size="lg"
          >
            {t("newfl.primaryCta")}
          </CTAButton>
          <CTAButton
            href="/spanish-help"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "new-to-florida", target: "spanish-help" }}
            variant="secondary"
            size="lg"
          >
            {t("newfl.secondaryCta")}
          </CTAButton>
        </>
      }
      courses={courses}
      packages={packages}
      faqs={faqs}
      disclaimerLabels={["educational-guide", "not-official-dmv", "no-guarantee"]}
      leadSourcePage="/new-to-florida"
    />
  );
}
