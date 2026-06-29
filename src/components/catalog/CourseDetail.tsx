import { Check, Clock, Tag } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { Course } from "@/lib/schemas/content";
import {
  getFaqsForCourse,
  packages as allPackages,
} from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";
import { EVENTS } from "@/lib/services/analytics";
import { faqJsonLd, courseJsonLd } from "@/lib/seo/jsonld";
import { Section, SectionHeading } from "@/components/content/Section";
import { Disclaimer } from "@/components/compliance/Disclaimer";
import { ComplianceLabelRow } from "@/components/compliance/ComplianceLabel";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { PackageCard } from "@/components/catalog/PackageCard";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { LeadForm } from "@/components/lead/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";

/** Full course detail template (server component), driven entirely by data. */
export function CourseDetail({ course }: { course: Course }) {
  const locale = useLocale();
  const t = useTranslations("pages.courseDetail");
  const tc = useTranslations("common");

  const title = getLocalized(course.title, locale);
  const price = formatPrice(course.priceUsd, locale);
  const faqs = getFaqsForCourse(course);
  const relatedPackages = allPackages.filter((p) =>
    p.courseIds.includes(course.id),
  );

  return (
    <>
      <JsonLd data={courseJsonLd(course, locale)} />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs, locale)} />}

      {/* Header */}
      <div className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <ComplianceLabelRow labels={course.complianceLabels} className="mb-4" />
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            {getLocalized(course.shortDescription, locale)}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-brand-700" aria-hidden="true" />
              {t("priceLabel")}: {price ?? tc("cta.requestInfo")}
            </span>
            {course.durationLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-700" aria-hidden="true" />
                {t("durationLabel")}: {getLocalized(course.durationLabel, locale)}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAButton
              href={
                price
                  ? `/checkout?item=course:${course.slug}`
                  : `/contact?intent=course:${course.slug}`
              }
              eventName={EVENTS.CHECKOUT_START}
              eventProps={{ kind: "course", id: course.id }}
              size="lg"
            >
              {price ? tc("cta.getStarted") : tc("cta.requestInfo")}
            </CTAButton>
            <WhatsAppCTA kind="course" item={title} size="lg" />
          </div>
        </div>
      </div>

      {/* Body */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed text-slate-700">
              {getLocalized(course.longDescription, locale)}
            </p>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">
              {t("whoHeading")}
            </h2>
            <p className="mt-2 text-slate-700">
              {getLocalized(course.whoIsItFor, locale)}
            </p>

            {course.bullets.length > 0 && (
              <>
                <h2 className="mt-8 text-xl font-semibold text-slate-900">
                  {t("includesHeading")}
                </h2>
                <ul className="mt-3 space-y-2">
                  {course.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      {getLocalized(bullet, locale)}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <Disclaimer
              labels={course.complianceLabels}
              providerId={course.providerId}
            />
          </div>
        </div>
      </Section>

      {faqs.length > 0 && (
        <Section tone="muted">
          <SectionHeading title={t("faqHeading")} />
          <FAQAccordion faqs={faqs} />
        </Section>
      )}

      {relatedPackages.length > 0 && (
        <Section>
          <SectionHeading title={t("relatedHeading")} />
          <CatalogGrid>
            {relatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </CatalogGrid>
        </Section>
      )}

      <Section tone="muted">
        <div className="mx-auto max-w-2xl">
          <SectionHeading title={t("leadHeading")} subtitle={t("leadBody")} />
          <LeadForm
            defaults={{
              recommendation: course.id,
              sourcePage: `/courses/${course.slug}`,
            }}
          />
        </div>
      </Section>
    </>
  );
}
