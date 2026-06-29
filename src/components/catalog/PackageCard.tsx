import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Package } from "@/lib/schemas/content";
import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";

/** Package (bundle) card with an optional "featured" ribbon. */
export function PackageCard({ pkg }: { pkg: Package }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const price = formatPrice(pkg.priceUsd, locale);

  return (
    <Link
      href={`/courses/${pkg.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10"
    >
      {/* gradient top accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-ocean-500 to-accent-500"
      />
      {pkg.featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-700">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          {t("badges.popular")}
        </span>
      )}

      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
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
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">
          {price ?? t("cta.requestInfo")}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          {t("cta.viewDetails")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
