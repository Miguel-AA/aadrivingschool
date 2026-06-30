import { Check } from "lucide-react";
import { useTranslations } from "@/i18n";

type Row = { label: string; value: string };

/**
 * Decorative hero product card (desktop only). Presents a polished "Student
 * Pathway" dashboard — profile, progress, support language, next DMV step, and
 * completion status — so the hero reads as a platform preview, not a quiz.
 * Purely visual; the parent marks it `aria-hidden`.
 */
export function HeroShowcase() {
  const t = useTranslations("home");
  const rows = t.raw<Row[]>("hero.showcase.rows");
  const pct = 72;

  return (
    <div className="relative">
      {/* soft glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-ocean-200/30 to-accent-200/40 blur-2xl"
      />
      <div className="relative rounded-3xl border border-white/60 bg-white/90 p-6 shadow-xl shadow-brand-900/10 ring-1 ring-slate-200/70 backdrop-blur">
        {/* header: profile */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-sm font-bold text-white shadow-sm">
              FT
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-brand-900">
                {t("hero.showcase.title")}
              </p>
              <p className="text-[11px] text-slate-500">
                {t("hero.showcase.profileLabel")} ·{" "}
                {t("hero.showcase.profileValue")}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-700 ring-1 ring-inset ring-accent-100">
            {t("hero.showcase.badge")}
          </span>
        </div>

        {/* permit-prep progress */}
        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-brand-900">
              {t("hero.showcase.progressLabel")}
            </span>
            <span className="text-sm font-bold text-accent-600">{pct}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-300 to-accent-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* key / value rows */}
        <dl className="mt-4 divide-y divide-slate-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 py-2.5"
            >
              <dt className="text-sm text-slate-500">{row.label}</dt>
              <dd className="text-sm font-semibold text-brand-900">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* completion status */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2.5">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white">
            <Check className="h-3 w-3" />
          </span>
          <span className="text-xs font-medium text-brand-800">
            {t("hero.showcase.completionLabel")}
          </span>
          <span className="ml-auto text-[11px] font-semibold text-brand-600">
            {t("hero.showcase.completionValue")}
          </span>
        </div>
      </div>
    </div>
  );
}
