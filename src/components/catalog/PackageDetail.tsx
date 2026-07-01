import { Check } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { ComplianceLabelKey, Package } from "@/lib/schemas/content";
import { getCoursesForPackage } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";
import { cn } from "@/lib/utils/cn";
import { packageAvailability } from "@/lib/catalog/availability";
import { EVENTS } from "@/lib/services/analytics";
import { Section, SectionHeading } from "@/components/content/Section";
import { heroMaskStyle } from "@/components/content/Hero";
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
  const includedCourses = getCoursesForPackage(pkg);
  const { showPrice, canCheckout, gated } = packageAvailability(
    pkg,
    includedCourses,
  );
  const price = showPrice ? formatPrice(pkg.priceUsd, locale) : null;

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
      {/* Header — curved bottom edge (shared hero wave), centered on mobile. */}
      <div style={heroMaskStyle} className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 pb-20 text-center sm:px-6 sm:pb-20 sm:text-left lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            {getLocalized(pkg.targetUser, locale)}
          </p>
          <h1 className="mx-auto mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:mx-0 sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 sm:mx-0">
            {getLocalized(pkg.shortDescription, locale)}
          </p>
          <div className="mt-6 text-sm font-semibold text-slate-900">
            {price ?? tc(gated ? "catalog.consultationNote" : "cta.requestInfo")}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <CTAButton
              href={
                canCheckout
                  ? `/checkout?item=package:${pkg.slug}`
                  : `/contact?intent=package:${pkg.slug}`
              }
              eventName={EVENTS.CHECKOUT_START}
              eventProps={{ kind: "package", id: pkg.id }}
              size="lg"
            >
              {canCheckout ? tc("cta.getStarted") : tc("cta.requestInfo")}
            </CTAButton>
            <WhatsAppCTA kind="recommendation" item={title} size="lg" />
          </div>
        </div>
      </div>

      <Section>
        <div className="mx-auto max-w-4xl text-center sm:text-left">
          {pkg.benefits.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-slate-900">
                {t("includesHeading")}
              </h2>
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {pkg.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-center gap-2 text-left text-slate-700 sm:justify-start"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    {getLocalized(benefit, locale)}
                  </li>
                ))}
              </ul>
            </>
          )}
          <Disclaimer
            labels={labels}
            providerId={providerId}
            columns={2}
            className={cn("text-left", pkg.benefits.length > 0 && "mt-10")}
          />
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
