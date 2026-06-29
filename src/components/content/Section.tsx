import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background tone. */
  tone?: "white" | "muted" | "brand" | "dark";
  /**
   * Feather the bottom edge into white so a dark section eases into the light
   * section below. Default true; set false when the next block is also dark
   * (e.g. the final CTA sits directly above the navy footer).
   */
  blendBottom?: boolean;
  id?: string;
}

// `muted` is a vertical white→off-white→white gradient so the section melts into
// the white sections around it instead of showing a hard color seam.
const tones = {
  white: "bg-white",
  muted: "bg-gradient-to-b from-white via-slate-50 to-white",
  brand:
    "bg-gradient-to-br from-brand-700 via-brand-600 to-ocean-600 text-white",
  dark: "bg-brand-950 text-white",
};

/** Full-width section with a centered, padded container. */
export function Section({
  children,
  className,
  tone = "white",
  blendBottom = true,
  id,
}: SectionProps) {
  // Dark/brand sections get soft light "feathers" at their edges so they emerge
  // from (and dissolve back into) the light sections around them — no hard line.
  const dark = tone === "brand" || tone === "dark";
  return (
    <section
      id={id}
      className={cn(tones[tone], "py-12 sm:py-20", dark && "relative", className)}
    >
      {dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/90 to-transparent sm:h-16"
        />
      )}
      {dark && blendBottom && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 to-transparent sm:h-16"
        />
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
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
  /** Use light text on dark/brand backgrounds. */
  tone?: "light" | "dark";
}

/** Reusable eyebrow + heading + subtitle block. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  centered = false,
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "mb-10",
        // Centered on mobile/tablet by default; left-aligned from `lg` up
        // (unless explicitly `centered`, which stays centered at all sizes).
        centered
          ? "mx-auto max-w-2xl text-center"
          : "text-center sm:text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
            dark
              ? "bg-white/10 text-brand-100"
              : "bg-brand-50 text-brand-700",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base",
            dark ? "text-brand-100/80" : "text-slate-600",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
