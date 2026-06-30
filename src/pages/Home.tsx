import {
  Car,
  Compass,
  Languages,
  Layers,
  ListChecks,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import { getFeaturedPackages, getGlobalFaqs } from "@/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { EVENTS } from "@/lib/services/analytics";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { Hero } from "@/components/content/Hero";
import { HeroShowcase } from "@/components/content/HeroShowcase";
import { Section, SectionHeading } from "@/components/content/Section";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { PackageCard } from "@/components/catalog/PackageCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Reveal } from "@/components/content/Reveal";
import { Icon } from "@/components/content/Icon";
import { Services } from "@/components/content/Services";
import { CTAButton } from "@/components/cta/CTAButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils/cn";

type ProblemCard = { title: string; body: string };

const PROBLEM_ICONS = [Car, Users, Languages, ShieldAlert];
const WHY_ICONS = [MapPin, Languages, Layers, ListChecks];

export function Home() {
  const t = useTranslations("home");
  const locale = useLocale();
  usePageTitle();

  const packages = getFeaturedPackages();
  const faqs = getGlobalFaqs();

  const trust = t.raw<string[]>("hero.trust");
  const problemCards = t.raw<ProblemCard[]>("problem.cards");
  const finderPills = t.raw<string[]>("finder.pills");
  const whyCards = t.raw<ProblemCard[]>("whyUs.cards");

  return (
    <>
      <JsonLd data={faqJsonLd(faqs, locale)} />

      {/* 1. Hero + trust row */}
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        badges={trust}
        videoSrc="/testhero-loop.mp4"
        videoPoster="/herobg-poster.jpg"
        aside={<HeroShowcase />}
        actions={
          <>
            <CTAButton
              href="/quiz"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_hero", target: "demo" }}
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("hero.primaryCta")}
            </CTAButton>
            <CTAButton
              href="/courses"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_hero", target: "pathways" }}
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
            <Reveal
              key={card.title}
              delay={i * 80}
              className={cn(i >= 3 && "hidden sm:block")}
            >
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg hover:shadow-brand-900/5 hover:ring-accent-100 sm:text-left">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent-50 text-accent-600 ring-1 ring-inset ring-accent-100 transition-transform duration-200 group-hover:scale-105 sm:mx-0">
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

      {/* 3. Platform capabilities */}
      <Services tone="muted" />

      {/* 4. Driver pathways */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={t("packages.eyebrow")}
            title={t("packages.heading")}
            subtitle={t("packages.subheading")}
          />
        </Reveal>
        <CatalogGrid>
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.id}
              delay={i * 80}
              className={cn(i >= 3 && "hidden sm:block")}
            >
              <PackageCard pkg={pkg} hidePrice ctaLabel={t("packages.cta")} />
            </Reveal>
          ))}
        </CatalogGrid>
      </Section>

      {/* 5. Product demo / course finder preview — the strong navy band */}
      <Section tone="brand">
        <Reveal className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:items-center lg:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-100 ring-1 ring-inset ring-white/15">
              <Compass className="h-3.5 w-3.5 text-accent-300" aria-hidden="true" />
              {t("finder.eyebrow")}
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {t("finder.heading")}
            </h2>
            <p className="mt-3 text-brand-100">{t("finder.body")}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {finderPills.map((pill, i) => (
                <li
                  key={pill}
                  className={cn(
                    "rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/15 backdrop-blur",
                    i >= 3 && "hidden sm:block",
                  )}
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

      {/* 6. Why this can scale — authority */}
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
            <Reveal
              key={card.title}
              delay={i * 80}
              className={cn(i >= 3 && "hidden sm:block")}
            >
              <div className="group flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5 sm:items-start sm:text-left">
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

      {/* 7. FAQ / compliance */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={t("faq.eyebrow")}
            title={t("faq.heading")}
            centered
          />
        </Reveal>
        <FAQAccordion faqs={faqs} mobileLimit={3} />
      </Section>

      {/* 8. Final CTA */}
      <Section tone="brand" blendBottom={false}>
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
              eventProps={{ source: "home_final", target: "demo" }}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("finalCta.primaryCta")}
            </CTAButton>
            <CTAButton
              href="/contact?intent=investor"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_final", target: "investor" }}
              variant="secondary"
              size="lg"
              className="hidden w-full sm:inline-flex sm:w-auto"
            >
              {t("finalCta.secondaryCta")}
            </CTAButton>
            <CTAButton
              href="/contact"
              eventName={EVENTS.CTA_CLICK}
              eventProps={{ source: "home_final", target: "contact" }}
              variant="secondary"
              size="lg"
              className="w-full border-white/30 bg-transparent text-white hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              {t("finalCta.tertiaryCta")}
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
