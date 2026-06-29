import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background tone. */
  tone?: "white" | "muted" | "brand";
  id?: string;
}

const tones = {
  white: "bg-white",
  muted: "bg-slate-50",
  brand: "bg-brand-900 text-white",
};

/** Full-width section with a centered, padded container. */
export function Section({
  children,
  className,
  tone = "white",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], "py-12 sm:py-16", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

/** Reusable eyebrow + heading + subtitle block. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "mx-auto max-w-2xl text-center", "mb-8", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-slate-600">{subtitle}</p>
      )}
    </div>
  );
}
