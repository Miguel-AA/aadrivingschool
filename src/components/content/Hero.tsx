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
  /** Optional visual rendered in a right column on desktop only (hidden on mobile). */
  aside?: ReactNode;
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
  aside,
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-white",
        className,
      )}
    >
      {/* Decorative animated blobs + warm orange glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-300/40 blur-3xl animate-float" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-ocean-300/30 blur-3xl animate-float-slow" />
        <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-accent-200/40 blur-3xl animate-float" />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-accent-100/50 blur-3xl animate-float-slow" />
        <div className="absolute inset-0 bg-dot-grid text-slate-300/30" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 sm:py-20 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        <div className="min-w-0 max-w-2xl text-balance text-center sm:text-left">
          {eyebrow && (
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-brand-700 shadow-sm backdrop-blur sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.05] lg:text-[3.5rem]">
            {renderTitle(title, highlight)}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-600 sm:mx-0 sm:text-lg">
              {subtitle}
            </p>
          )}
          {actions && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {actions}
            </div>
          )}
          {badges && badges.length > 0 && (
            <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2.5 sm:justify-start">
              {badges.map((badge, i) => (
                <li
                  key={badge}
                  className={cn(
                    "items-center gap-1.5 text-sm font-medium text-slate-600",
                    // Keep the mobile hero calm: show at most 3 trust items.
                    i >= 3 ? "hidden sm:flex" : "flex",
                  )}
                >
                  <Check
                    className="h-4 w-4 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  {badge}
                </li>
              ))}
            </ul>
          )}
        </div>

        {aside && (
          <div className="hidden lg:block" aria-hidden="true">
            {aside}
          </div>
        )}
      </div>
    </div>
  );
}
