import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface HeroProps {
  eyebrow?: string;
  title: string;
  /** Optional substring of `title` rendered with a gradient highlight. */
  highlight?: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Trust badges rendered as pills under the CTAs. */
  badges?: string[];
  className?: string;
}

function renderTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className="text-gradient">{highlight}</span>
      {after}
    </>
  );
}

/** Page hero with an animated gradient-mesh background and CTA + badges slots. */
export function Hero({
  eyebrow,
  title,
  highlight,
  subtitle,
  actions,
  badges,
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-white",
        className,
      )}
    >
      {/* Decorative animated blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-300/40 blur-3xl animate-float" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-ocean-300/30 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-accent-200/40 blur-3xl animate-float" />
        <div className="absolute inset-0 bg-dot-grid text-slate-300/30" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {renderTitle(title, highlight)}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-slate-600">{subtitle}</p>
          )}
          {actions && (
            <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
          )}
          {badges && badges.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-600"
                >
                  <Check className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {badge}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
