import { ArrowRight, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Package } from "@/lib/schemas/content";
import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";

/** Package (bundle) card. */
export function PackageCard({ pkg }: { pkg: Package }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const price = formatPrice(pkg.priceUsd, locale);

  return (
    <Link
      href={`/courses/${pkg.slug}`}
      className="group flex h-full flex-col rounded-xl border border-brand-200 bg-brand-50/40 p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
        {getLocalized(pkg.targetUser, locale)}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
        {getLocalized(pkg.title, locale)}
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        {getLocalized(pkg.shortDescription, locale)}
      </p>
      <ul className="mt-4 flex-1 space-y-1.5">
        {pkg.benefits.slice(0, 4).map((benefit, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
              aria-hidden="true"
            />
            {getLocalized(benefit, locale)}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">
          {price ?? t("cta.requestInfo")}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-700">
          {t("cta.viewDetails")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
