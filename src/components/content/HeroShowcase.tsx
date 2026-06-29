import {
  Compass,
  ClipboardCheck,
  Languages,
  ShieldAlert,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/i18n";

type ShowcaseItem = { label: string; desc: string };

const ICONS: LucideIcon[] = [Compass, ClipboardCheck, Languages, ShieldAlert];

/**
 * Decorative hero card stack (desktop only). Mirrors the core support paths so
 * the hero doesn't feel left-heavy. Purely visual — the real CTAs live beside it,
 * so the parent marks this `aria-hidden`.
 */
export function HeroShowcase() {
  const t = useTranslations("home");
  const items = t.raw("hero.showcase.items") as ShowcaseItem[];

  return (
    <div className="relative">
      {/* soft glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-ocean-200/30 to-accent-200/40 blur-2xl"
      />
      <div className="relative rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-brand-900/10 ring-1 ring-slate-200/70 backdrop-blur">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-brand-900">
            {t("hero.showcase.title")}
          </p>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-50 text-accent-600 ring-1 ring-inset ring-accent-100">
            <Sparkles className="h-4 w-4" />
          </span>
        </div>

        <ul className="mt-4 space-y-2.5">
          {items.map((item, i) => {
            const Ic = ICONS[i] ?? Compass;
            const primary = i === 0;
            return (
              <li
                key={item.label}
                className={
                  primary
                    ? "flex items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50/70 p-3.5 shadow-sm"
                    : "flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-brand-200"
                }
              >
                <span
                  className={
                    primary
                      ? "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-sm"
                      : "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100"
                  }
                >
                  <Ic className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-brand-900">
                    {item.label}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {item.desc}
                  </span>
                </span>
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
