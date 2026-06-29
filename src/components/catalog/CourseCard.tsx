import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Course } from "@/lib/schemas/content";
import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";
import { CategoryIcon } from "@/lib/utils/courseIcons";
import { ComplianceLabelRow } from "@/components/compliance/ComplianceLabel";

/** Course/prep card used in catalog grids and on landing pages. */
export function CourseCard({ course }: { course: Course }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const price = formatPrice(course.priceUsd, locale);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 transition-colors group-hover:bg-brand-100">
          <CategoryIcon category={course.category} className="h-5 w-5" />
        </span>
        {price && (
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-200">
            {price}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
        {getLocalized(course.title, locale)}
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">
        {getLocalized(course.shortDescription, locale)}
      </p>
      <ComplianceLabelRow labels={course.complianceLabels} className="mt-4" />
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        {price ? t("cta.learnMore") : t("cta.requestInfo")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
