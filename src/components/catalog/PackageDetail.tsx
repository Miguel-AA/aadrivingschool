import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ComplianceLabelKey, Package } from "@/lib/schemas/content";
import { getCoursesForPackage } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";
import { EVENTS } from "@/lib/services/analytics";
import { Section, SectionHeading } from "@/components/content/Section";
import { Disclaimer } from "@/components/compliance/Disclaimer";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CourseCard } from "@/components/catalog/CourseCard";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { LeadForm } from "@/components/lead/LeadForm";

/** Package detail template. Aggregates compliance labels from included courses. */
export function PackageDetail({ pkg }: { pkg: Package }) {
  const locale = useLocale();
  const t = useTranslations("pages.courseDetail");
  const tc = useTranslations("common");

  const title = getLocalized(pkg.title, locale);
  const price = formatPrice(pkg.priceUsd, locale);
  const includedCourses = getCoursesForPackage(pkg);

  // Union of compliance labels across included courses, so the bundle carries
  // every required statement. Provider id taken from any regulated course.
  const labels = Array.from(
    new Set(includedCourses.flatMap((c) => c.complianceLabels)),
  ) as ComplianceLabelKey[];
  const providerId =
    includedCourses.find((c) => c.regulatoryStatus === "regulated-partner")
      ?.providerId ?? null;

  return (
    <>
      <div className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            {getLocalized(pkg.targetUser, locale)}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            {getLocalized(pkg.shortDescription, locale)}
          </p>
          <div className="mt-6 text-sm font-semibold text-slate-900">
            {price ?? tc("cta.requestInfo")}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAButton
              href={`/contact?intent=package:${pkg.slug}`}
              eventName={EVENTS.CHECKOUT_START}
              eventProps={{ kind: "package", id: pkg.id }}
              size="lg"
            >
              {price ? tc("cta.getStarted") : tc("cta.requestInfo")}
            </CTAButton>
            <WhatsAppCTA kind="recommendation" item={title} size="lg" />
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {pkg.benefits.length > 0 && (
              <ul className="space-y-2">
                {pkg.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    {getLocalized(benefit, locale)}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:col-span-1">
            <Disclaimer labels={labels} providerId={providerId} />
          </div>
        </div>
      </Section>

      {includedCourses.length > 0 && (
        <Section tone="muted">
          <SectionHeading title={t("packageIncludesHeading")} />
          <CatalogGrid>
            {includedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </CatalogGrid>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-2xl">
          <SectionHeading title={t("leadHeading")} subtitle={t("leadBody")} />
          <LeadForm
            defaults={{
              recommendation: pkg.id,
              sourcePage: `/courses/${pkg.slug}`,
            }}
          />
        </div>
      </Section>
    </>
  );
}
