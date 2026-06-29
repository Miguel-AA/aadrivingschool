import { Check } from "lucide-react";
import { useTranslations } from "@/i18n";

/**
 * Decorative hero "Student Pathway" mini-dashboard (desktop only). Communicates
 * a product/platform — a guided, trackable student journey — rather than a
 * marketing quiz. Purely visual; the real CTAs sit beside it, so the parent
 * marks this `aria-hidden`.
 */
export function HeroShowcase() {
  const t = useTranslations("home");
  const steps = t.raw<string[]>("hero.showcase.steps");

  // Illustrative progress: first two complete, third in progress, rest upcoming.
  const DONE = 2;
  const ACTIVE = 2;
  const pct = Math.round(((DONE + 0.5) / steps.length) * 100);

  return (
    <div className="relative">
      {/* soft glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-ocean-200/30 to-accent-200/40 blur-2xl"
      />
      <div className="relative rounded-3xl border border-white/60 bg-white/85 p-6 shadow-xl shadow-brand-900/10 ring-1 ring-slate-200/70 backdrop-blur">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-sm font-bold text-white shadow-sm">
              FT
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-brand-900">
                {t("hero.showcase.title")}
              </p>
              <p className="text-[11px] text-slate-500">
                {`${ACTIVE + 1} / ${steps.length}`} · {pct}%
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-700 ring-1 ring-inset ring-accent-100">
            {t("hero.showcase.badge")}
          </span>
        </div>

        {/* progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-600"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* step rows */}
        <ul className="mt-4 space-y-2">
          {steps.map((label, i) => {
            const done = i < DONE;
            const active = i === ACTIVE;
            return (
              <li
                key={label}
                className={
                  active
                    ? "flex items-center gap-3 rounded-xl border border-accent-200 bg-accent-50/70 px-3 py-2.5"
                    : "flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5"
                }
              >
                <span
                  className={
                    done
                      ? "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white"
                      : active
                        ? "relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500 text-white"
                        : "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-400 ring-1 ring-inset ring-slate-200"
                  }
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : active ? (
                    <>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                      <span className="relative h-2 w-2 rounded-full bg-white" />
                    </>
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={
                    active
                      ? "text-sm font-semibold text-brand-900"
                      : done
                        ? "text-sm font-medium text-slate-700"
                        : "text-sm text-slate-500"
                  }
                >
                  {label}
                </span>
                {done && (
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                    Done
                  </span>
                )}
                {active && (
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-accent-600">
                    Now
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-brand-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
          </span>
          {t("hero.showcase.footnote")}
        </div>
      </div>
    </div>
  );
}
