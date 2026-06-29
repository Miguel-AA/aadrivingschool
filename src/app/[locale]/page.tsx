import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Car, Check, Languages, ShieldAlert, Users } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { getFeaturedPackages, getGlobalFaqs } from "@/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { EVENTS } from "@/lib/services/analytics";
import { Hero } from "@/components/content/Hero";
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
  const localPoints = t.raw("local.points") as string[];
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

      {/* 2. Problem — connect before selling */}
      <Section>
        <Reveal>
          <SectionHeading title={t("problem.title")} subtitle={t("problem.body")} />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problemCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-accent-600 ring-1 ring-inset ring-accent-100">
                  <Icon
                    icon={PROBLEM_ICONS[i] ?? Car}
                    className="h-5 w-5"
                  />
                </span>
                <h3 className="mt-4 text-base font-semibold text-brand-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. Course Finder CTA */}
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
            variant="primary"
            size="lg"
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
          <SectionHeading title={t("howItWorks.heading")} centered />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. Local / Trust */}
      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              title={t("local.heading")}
              subtitle={t("local.body")}
              className="mb-0"
            />
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {localPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 rounded-lg bg-white p-3 text-sm font-medium text-brand-900 shadow-sm ring-1 ring-slate-200"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          {t("local.disclaimer")}
        </p>
      </Section>

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. FAQ */}
      <Section>
        <Reveal>
          <SectionHeading title={t("faq.heading")} centered />
        </Reveal>
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* 10. Final CTA */}
      <Section tone="brand">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("finalCta.heading")}
          </h2>
          <p className="mt-3 text-brand-100">{t("finalCta.body")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CTAButton
              href="/quiz"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_final", target: "quiz" }}
              variant="primary"
              size="lg"
            >
              {t("finalCta.primaryCta")}
            </CTAButton>
            <CTAButton
              href="/contact"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_final", target: "contact" }}
              variant="secondary"
              size="lg"
            >
              {t("finalCta.secondaryCta")}
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
