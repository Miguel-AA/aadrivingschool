import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Course } from "@/lib/schemas/content";
import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";
import { ComplianceLabelRow } from "@/components/compliance/ComplianceLabel";

/** Course/prep card used in catalog grids and on landing pages. */
export function CourseCard({ course }: { course: Course }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const price = formatPrice(course.priceUsd, locale);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <ComplianceLabelRow labels={course.complianceLabels} className="mb-3" />
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
        {getLocalized(course.title, locale)}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">
        {getLocalized(course.shortDescription, locale)}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">
          {price ?? t("cta.requestInfo")}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-700">
          {t("cta.learnMore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
