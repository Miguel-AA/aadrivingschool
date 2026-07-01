import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { trackEvent, EVENTS } from "@/lib/services/analytics";
import { cn } from "@/lib/utils/cn";

type Goal = { chip: string; path: string; next: string; href: string };

/**
 * Interactive hero card (desktop only): a mini plan-builder. The visitor picks
 * a goal and the card updates the plan preview live, then routes them to the
 * matching landing page — turning the hero visual into a real entry point.
 */
export function HeroShowcase() {
  const t = useTranslations("home");
  const goals = t.raw<Goal[]>("hero.showcase.goals");
  const [selected, setSelected] = useState(0);
  const goal = goals[selected] ?? goals[0];

  return (
    <div className="relative">
      {/* soft glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-ocean-200/30 to-accent-200/40 blur-2xl"
      />
      <div className="relative rounded-3xl border border-white/60 bg-white/90 p-6 shadow-xl shadow-brand-900/10 ring-1 ring-slate-200/70 backdrop-blur">
        {/* header */}
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-xs font-bold text-white shadow-sm">
            A&amp;A
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-brand-900">
              {t("hero.showcase.title")}
            </p>
            <p className="text-[11px] text-slate-500">
              {t("hero.showcase.prompt")}
            </p>
          </div>
        </div>

        {/* goal chips */}
        <div
          role="radiogroup"
          aria-label={t("hero.showcase.prompt")}
          className="mt-4 flex flex-wrap gap-2"
        >
          {goals.map((g, i) => {
            const active = i === selected;
            return (
              <button
                key={g.chip}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(i)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                  active
                    ? "bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-sm"
                    : "bg-slate-100 text-brand-800 ring-1 ring-inset ring-slate-200 hover:bg-slate-200",
                )}
              >
                {g.chip}
              </button>
            );
          })}
        </div>

        {/* live plan preview */}
        <dl className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/70 px-4">
          <div className="flex items-center justify-between gap-3 py-2.5">
            <dt className="text-sm text-slate-500">
              {t("hero.showcase.pathLabel")}
            </dt>
            <dd className="text-sm font-semibold text-brand-900">
              {goal.path}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 py-2.5">
            <dt className="text-sm text-slate-500">
              {t("hero.showcase.nextLabel")}
            </dt>
            <dd className="text-sm font-semibold text-brand-900">
              {goal.next}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 py-2.5">
            <dt className="text-sm text-slate-500">
              {t("hero.showcase.supportLabel")}
            </dt>
            <dd className="text-sm font-semibold text-brand-900">
              {t("hero.showcase.supportValue")}
            </dd>
          </div>
        </dl>

        {/* CTA → matching landing page */}
        <Link
          href={goal.href}
          onClick={() =>
            trackEvent(EVENTS.CTA_CLICK, {
              source: "home_hero_plan",
              target: goal.href,
            })
          }
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-300 to-accent-500 px-5 py-3 text-sm font-semibold text-brand-950 shadow-sm shadow-accent-700/25 transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
        >
          {t("hero.showcase.cta")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <p className="mt-3 text-center text-[11px] text-slate-400">
          {t("hero.showcase.footnote")}
        </p>
      </div>
    </div>
  );
}
