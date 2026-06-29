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
import { Reveal } from "@/components/content/Reveal";
import { Counter } from "@/components/content/Counter";
import { Testimonials } from "@/components/content/Testimonials";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { JsonLd } from "@/components/seo/JsonLd";

type StatItem = { value: number; suffix: string; label: string };

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

  const badges = t.raw("hero.badges") as string[];
  const stats = t.raw("stats.items") as StatItem[];
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
        highlight="Florida driving courses"
        subtitle={t("hero.subtitle")}
        badges={badges}
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

      {/* Stats band */}
      <Section tone="dark" className="py-10 sm:py-12">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-extrabold text-white sm:text-4xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 block text-sm text-brand-100/80">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Course finder banner */}
      <Section tone="brand">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t("finder.heading")}</h2>
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
        </Reveal>
      </Section>

      {/* Popular courses */}
      <Section>
        <Reveal>
          <SectionHeading
            title={t("popularCourses.heading")}
            subtitle={t("popularCourses.subheading")}
          />
        </Reveal>
        <CatalogGrid>
          {courses.map((course, i) => (
            <Reveal key={course.id} delay={i * 80}>
              <CourseCard course={course} />
            </Reveal>
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
        <Reveal>
          <SectionHeading
            title={t("packages.heading")}
            subtitle={t("packages.subheading")}
          />
        </Reveal>
        <CatalogGrid>
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 80}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </CatalogGrid>
      </Section>

      {/* How it works */}
      <Section>
        <Reveal>
          <SectionHeading title={t("howItWorks.heading")} centered />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-ocean-500 text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials (sample) */}
      <Testimonials />

      {/* Trust */}
      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("trust.heading")}
          </h2>
          <p className="mt-3 text-slate-600">{t("trust.body")}</p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading title={t("faq.heading")} centered />
        </Reveal>
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* Lead CTA */}
      <Section tone="brand">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("leadCta.heading")}
            </h2>
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
        </Reveal>
      </Section>
    </>
  );
}
