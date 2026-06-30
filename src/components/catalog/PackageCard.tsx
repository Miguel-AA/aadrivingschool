import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { Package, PackageBadge } from "@/lib/schemas/content";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";

// Badge key -> message key + pill styling. Only "most-popular" also gives the
// card a highlighted (featured) border.
type BadgeMessageKey =
  | "badges.mostPopular"
  | "badges.bestSpanish"
  | "badges.parentFavorite";

const BADGES: Record<
  PackageBadge,
  { messageKey: BadgeMessageKey; pill: string; featured: boolean }
> = {
  "most-popular": {
    messageKey: "badges.mostPopular",
    pill: "bg-gradient-to-r from-accent-300 to-accent-500 text-brand-950 shadow-sm",
    featured: true,
  },
  "best-spanish": {
    messageKey: "badges.bestSpanish",
    pill: "bg-ocean-500/10 text-ocean-600 ring-1 ring-inset ring-ocean-500/20",
    featured: false,
  },
  "parent-favorite": {
    messageKey: "badges.parentFavorite",
    pill: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100",
    featured: false,
  },
};

/** Situation-based package card. One package per page should be "most-popular". */
export function PackageCard({
  pkg,
  hidePrice = false,
  ctaLabel,
}: {
  pkg: Package;
  /** Hide the price (used by the investor-demo "pathways" grid). */
  hidePrice?: boolean;
  /** Override the CTA label (e.g. "Explore pathway"). */
  ctaLabel?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("common");
  const price = formatPrice(pkg.priceUsd, locale);
  const badge = pkg.badge ? BADGES[pkg.badge] : null;
  const featured = badge?.featured ?? false;

  return (
    <Link
      href={`/courses/${pkg.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10",
        featured
          ? "border-2 border-accent-300 ring-1 ring-accent-200/60"
          : "border border-slate-200 hover:border-brand-200",
      )}
    >
      {/* gradient top accent */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-1.5",
          featured
            ? "bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600"
            : "bg-gradient-to-r from-brand-500 via-ocean-500 to-accent-500",
        )}
      />

      {badge && (
        <span
          className={cn(
            "mb-3 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
            badge.pill,
          )}
        >
          {featured && <Sparkles className="h-3 w-3" aria-hidden="true" />}
          {t(badge.messageKey)}
        </span>
      )}

      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
        {getLocalized(pkg.targetUser, locale)}
      </p>
      <h3 className="mt-1.5 text-xl font-bold text-slate-900 group-hover:text-brand-700">
        {getLocalized(pkg.title, locale)}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {getLocalized(pkg.shortDescription, locale)}
      </p>

      <ul className="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5">
        {pkg.benefits.slice(0, 4).map((benefit, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
            <span
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600 ring-1 ring-inset ring-accent-100"
              aria-hidden="true"
            >
              <Check className="h-3 w-3" />
            </span>
            {getLocalized(benefit, locale)}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
            featured
              ? "bg-gradient-to-r from-accent-300 to-accent-500 text-brand-950 shadow-sm group-hover:brightness-105"
              : "bg-brand-50 text-brand-700 group-hover:bg-brand-100",
          )}
        >
          {ctaLabel ?? (price ? t("cta.viewDetails") : t("cta.requestInfo"))}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        {!hidePrice && price && (
          <span className="shrink-0 text-base font-semibold text-slate-900">
            {price}
          </span>
        )}
      </div>
    </Link>
  );
}
