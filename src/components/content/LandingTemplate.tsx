import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Course, Faq, Package } from "@/lib/schemas/content";
import type { ComplianceLabelKey } from "@/lib/schemas/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { Hero } from "@/components/content/Hero";
import { Section, SectionHeading } from "@/components/content/Section";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CourseCard } from "@/components/catalog/CourseCard";
import { PackageCard } from "@/components/catalog/PackageCard";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { Disclaimer } from "@/components/compliance/Disclaimer";
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
  disclaimerLabels?: ComplianceLabelKey[];
  disclaimerProviderId?: string | null;
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
  disclaimerLabels = [],
  disclaimerProviderId = null,
  leadSourcePage,
}: LandingTemplateProps) {
  const t = useTranslations("landing.common");
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

      {disclaimerLabels.length > 0 && (
        <Section>
          <Disclaimer
            labels={disclaimerLabels}
            providerId={disclaimerProviderId}
          />
        </Section>
      )}

      {packages.length > 0 && (
        <Section tone="muted">
          <SectionHeading title={t("relatedPackages")} />
          <CatalogGrid>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </CatalogGrid>
        </Section>
      )}

      {courses.length > 0 && (
        <Section>
          <SectionHeading title={t("relatedCourses")} />
          <CatalogGrid>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </CatalogGrid>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section tone="muted">
          <SectionHeading title={t("faqHeading")} />
          <FAQAccordion faqs={faqs} />
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-2xl">
          <SectionHeading title={t("ctaHeading")} subtitle={t("ctaBody")} />
          <LeadForm defaults={{ sourcePage: leadSourcePage }} />
        </div>
      </Section>
    </>
  );
}
