import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** CTA elements (buttons/links). */
  actions?: ReactNode;
  className?: string;
}

/** Page hero with eyebrow, headline, subtitle, and CTA slot. */
export function Hero({ eyebrow, title, subtitle, actions, className }: HeroProps) {
  return (
    <div className={cn("bg-gradient-to-b from-brand-50 to-white", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg text-slate-600">{subtitle}</p>
          )}
          {actions && (
            <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
