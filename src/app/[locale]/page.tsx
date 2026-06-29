import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Car,
  Check,
  Compass,
  Languages,
  Layers,
  ListChecks,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { getFeaturedPackages, getGlobalFaqs } from "@/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { EVENTS } from "@/lib/services/analytics";
import { Hero } from "@/components/content/Hero";
import { HeroShowcase } from "@/components/content/HeroShowcase";
import { Section, SectionHeading } from "@/components/content/Section";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { PackageCard } from "@/components/catalog/PackageCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Reveal } from "@/components/content/Reveal";
import { Icon } from "@/components/content/Icon";
import { Services } from "@/components/content/Services";
import { Testimonials } from "@/components/content/Testimonials";
import { CTAButton } from "@/components/cta/CTAButton";
import { JsonLd } from "@/components/seo/JsonLd";

type ProblemCard = { title: string; body: string };

const PROBLEM_ICONS = [Car, Users, Languages, ShieldAlert];
const WHY_ICONS = [MapPin, Languages, Layers, ListChecks];

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

  const packages = getFeaturedPackages();
  const faqs = getGlobalFaqs();

  const trust = t.raw("hero.trust") as string[];
  const problemCards = t.raw("problem.cards") as ProblemCard[];
  const finderPills = t.raw("finder.pills") as string[];
  const localPoints = t.raw("local.points") as string[];
  const whyCards = t.raw("whyUs.cards") as ProblemCard[];
  const steps = [
    { title: t("howItWorks.step1Title"), body: t("howItWorks.step1Body") },
    { title: t("howItWorks.step2Title"), body: t("howItWorks.step2Body") },
    { title: t("howItWorks.step3Title"), body: t("howItWorks.step3Body") },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(faqs, locale)} />

      {/* 1. Hero + trust row */}
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        highlight="Permit Prep"
        subtitle={t("hero.subtitle")}
        badges={trust}
        aside={<HeroShowcase />}
        actions={
          <>
            <CTAButton
              href="/quiz"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_hero", target: "quiz" }}
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("hero.primaryCta")}
            </CTAButton>
            <CTAButton
              href="/spanish-help"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_hero", target: "spanish-help" }}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("hero.secondaryCta")}
            </CTAButton>
          </>
        }
      />

      {/* 2. Problem — connect before selling */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={t("problem.eyebrow")}
            title={t("problem.title")}
            subtitle={t("problem.body")}
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problemCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg hover:shadow-brand-900/5 hover:ring-accent-100">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-50 text-accent-600 ring-1 ring-inset ring-accent-100 transition-transform duration-200 group-hover:scale-105">
                  <Icon icon={PROBLEM_ICONS[i] ?? Car} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-brand-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. Course Finder CTA */}
      <Section tone="brand">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-100 ring-1 ring-inset ring-white/15">
              <Compass className="h-3.5 w-3.5 text-accent-300" aria-hidden="true" />
              {t("finder.eyebrow")}
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t("finder.heading")}
            </h2>
            <p className="mt-3 text-brand-100">{t("finder.body")}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {finderPills.map((pill) => (
                <li
                  key={pill}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/15 backdrop-blur"
                >
                  {pill}
                </li>
              ))}
            </ul>
          </div>
          <CTAButton
            href="/quiz"
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "home_finder", target: "quiz" }}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto"
          >
            {t("finder.cta")}
          </CTAButton>
        </Reveal>
      </Section>

      {/* 4. Services */}
      <Services />

      {/* 5. Recommended Starting Packages */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow={t("packages.eyebrow")}
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

      {/* 6. How We Help */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={t("howItWorks.eyebrow")}
            title={t("howItWorks.heading")}
            centered
          />
        </Reveal>
        <div className="relative grid gap-6 sm:grid-cols-3">
          {/* desktop connector line behind the numbered badges */}
          <span
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-[3.4rem] hidden h-0.5 bg-gradient-to-r from-transparent via-brand-200 to-transparent sm:block"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-lg font-bold text-white shadow-sm ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. Why drivers choose us — authority */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow={t("whyUs.eyebrow")}
            title={t("whyUs.heading")}
            subtitle={t("whyUs.subheading")}
            centered
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 transition-colors group-hover:bg-brand-100">
                  <Icon icon={WHY_ICONS[i] ?? ShieldCheck} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-brand-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8. Local / Trust */}
      <Section>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-accent-50/50 p-7 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <SectionHeading
                eyebrow={t("local.eyebrow")}
                title={t("local.heading")}
                subtitle={t("local.body")}
                className="mb-0"
              />
              <ul className="grid gap-3 sm:grid-cols-2">
                {localPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 rounded-xl bg-white p-3.5 text-sm font-medium text-brand-900 shadow-sm ring-1 ring-slate-200"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          {t("local.disclaimer")}
        </p>
      </Section>

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. FAQ */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={t("faq.eyebrow")}
            title={t("faq.heading")}
            centered
          />
        </Reveal>
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* 11. Final CTA */}
      <Section tone="brand">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            {t("finalCta.heading")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">
            {t("finalCta.body")}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton
              href="/quiz"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_final", target: "quiz" }}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("finalCta.primaryCta")}
            </CTAButton>
            <CTAButton
              href="/contact"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_final", target: "contact" }}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("finalCta.secondaryCta")}
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
