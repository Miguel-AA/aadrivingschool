import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getFeaturedCourses,
  getFeaturedPackages,
  getGlobalFaqs,
} from "@/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { EVENTS } from "@/lib/services/analytics";
import { Hero } from "@/components/content/Hero";
import { Section, SectionHeading } from "@/components/content/Section";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CourseCard } from "@/components/catalog/CourseCard";
import { PackageCard } from "@/components/catalog/PackageCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "home" });
  return buildMetadata({
    title: t("hero.title"),
    description: t("hero.subtitle"),
    locale,
    path: "",
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const courses = getFeaturedCourses();
  const packages = getFeaturedPackages();
  const faqs = getGlobalFaqs();

  const steps = [
    { title: t("howItWorks.step1Title"), body: t("howItWorks.step1Body") },
    { title: t("howItWorks.step2Title"), body: t("howItWorks.step2Body") },
    { title: t("howItWorks.step3Title"), body: t("howItWorks.step3Body") },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(faqs, locale)} />

      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        actions={
          <>
            <CTAButton
              href="/quiz"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_hero", target: "quiz" }}
              size="lg"
            >
              {t("hero.primaryCta")}
            </CTAButton>
            <CTAButton
              href="/spanish-help"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_hero", target: "spanish-help" }}
              variant="secondary"
              size="lg"
            >
              {t("hero.secondaryCta")}
            </CTAButton>
          </>
        }
      />

      {/* Course finder banner */}
      <Section tone="brand">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">{t("finder.heading")}</h2>
            <p className="mt-2 max-w-2xl text-brand-100">{t("finder.body")}</p>
          </div>
          <CTAButton
            href="/quiz"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "home_finder", target: "quiz" }}
            variant="accent"
            size="lg"
          >
            {t("finder.cta")}
          </CTAButton>
        </div>
      </Section>

      {/* Popular courses */}
      <Section>
        <SectionHeading
          title={t("popularCourses.heading")}
          subtitle={t("popularCourses.subheading")}
        />
        <CatalogGrid>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </CatalogGrid>
        <div className="mt-8">
          <CTAButton
            href="/courses"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "home_courses", target: "courses" }}
            variant="secondary"
          >
            {tc("cta.viewAllCourses")}
          </CTAButton>
        </div>
      </Section>

      {/* Packages */}
      <Section tone="muted">
        <SectionHeading
          title={t("packages.heading")}
          subtitle={t("packages.subheading")}
        />
        <CatalogGrid>
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </CatalogGrid>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeading title={t("howItWorks.heading")} centered />
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust */}
      <Section tone="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {t("trust.heading")}
          </h2>
          <p className="mt-3 text-slate-600">{t("trust.body")}</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading title={t("faq.heading")} />
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* Lead CTA */}
      <Section tone="brand">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">{t("leadCta.heading")}</h2>
            <p className="mt-2 max-w-2xl text-brand-100">{t("leadCta.body")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTAButton
              href="/contact"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_lead", target: "contact" }}
              variant="accent"
              size="lg"
            >
              {t("leadCta.cta")}
            </CTAButton>
            <WhatsAppCTA kind="default" variant="secondary" size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}
