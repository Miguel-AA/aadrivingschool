import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "@/i18n";
import type { Course, Faq, Package } from "@/lib/schemas/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { Hero } from "@/components/content/Hero";
import { Section, SectionHeading } from "@/components/content/Section";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CourseCard } from "@/components/catalog/CourseCard";
import { PackageCard } from "@/components/catalog/PackageCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Reveal } from "@/components/content/Reveal";
import { LeadForm } from "@/components/lead/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";

interface LandingTemplateProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions: ReactNode;
  courses?: Course[];
  packages?: Package[];
  faqs?: Faq[];
  /** Optional per-page section headings (fall back to shared landing copy). */
  packagesHeading?: string;
  coursesHeading?: string;
  faqHeading?: string;
  ctaHeading?: string;
  ctaBody?: string;
  leadSourcePage: string;
}

/** Shared structure for situation-based landing pages. */
export function LandingTemplate({
  eyebrow,
  title,
  subtitle,
  actions,
  courses = [],
  packages = [],
  faqs = [],
  packagesHeading,
  coursesHeading,
  faqHeading,
  ctaHeading,
  ctaBody,
  leadSourcePage,
}: LandingTemplateProps) {
  const t = useTranslations("landing.common");
  const tc = useTranslations("compliance");
  const locale = useLocale();

  return (
    <>
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs, locale)} />}

      <Hero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        actions={actions}
      />

      {packages.length > 0 && (
        <Section tone="muted">
          <SectionHeading title={packagesHeading ?? t("relatedPackages")} />
          <CatalogGrid>
            {packages.map((pkg, i) => (
              <Reveal
                key={pkg.id}
                delay={i * 80}
                className={cn(i >= 2 && "hidden sm:block")}
              >
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </CatalogGrid>
        </Section>
      )}

      {courses.length > 0 && (
        <Section>
          <SectionHeading title={coursesHeading ?? t("relatedCourses")} />
          <CatalogGrid>
            {courses.map((course, i) => (
              <Reveal
                key={course.id}
                delay={i * 80}
                className={cn(i >= 2 && "hidden sm:block")}
              >
                <CourseCard course={course} />
              </Reveal>
            ))}
          </CatalogGrid>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section tone="muted">
          <SectionHeading title={faqHeading ?? t("faqHeading")} />
          <FAQAccordion faqs={faqs} mobileLimit={3} />
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            title={ctaHeading ?? t("ctaHeading")}
            subtitle={ctaBody ?? t("ctaBody")}
          />
          <LeadForm defaults={{ sourcePage: leadSourcePage }} />

          {/* Subtle compliance roadmap note — professional, not a warning box. */}
          <p className="mt-8 flex items-start gap-2 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-500">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
              aria-hidden="true"
            />
            <span>
              <span className="font-semibold text-slate-600">
                {tc("roadmapLabel")}:
              </span>{" "}
              {tc("roadmapNote")}
            </span>
          </p>
        </div>
      </Section>
    </>
  );
}
