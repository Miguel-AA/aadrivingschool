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
// `brand` and `dark` share the same bright blue so every blue section is
// consistent — they get a glowing "spotlight" treatment like the header/footer.
const BLUE = "bg-gradient-to-br from-brand-700 via-brand-600 to-ocean-600 text-white";
const tones = {
  white: "bg-white",
  muted: "bg-gradient-to-b from-white via-slate-50 to-white",
  brand: BLUE,
  dark: BLUE,
};

/** Full-width section with a centered, padded container. */
export function Section({
  children,
  className,
  tone = "white",
  blendBottom = true,
  id,
}: SectionProps) {
  // Dark/brand sections get a soft white curved divider at their edges so they
  // ease in/out of the light sections around them with a clean curve — no hard
  // line and no muddy white haze over the blue.
  const dark = tone === "brand" || tone === "dark";
  return (
    <section
      id={id}
      className={cn(tones[tone], "relative overflow-hidden py-12 sm:py-20", className)}
    >
      {dark ? (
        <>
          {/* Brilliant blue glow — same luminous spotlight as the header/footer. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -top-24 left-1/2 h-80 w-2/3 -translate-x-1/2 rounded-full bg-ocean-400/30 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-72 w-1/2 rounded-full bg-ocean-300/20 blur-3xl" />
            <div className="absolute -left-10 top-1/3 h-56 w-56 rounded-full bg-accent-400/10 blur-3xl" />
          </div>
          <SectionCurve edge="top" />
          {blendBottom && <SectionCurve edge="bottom" />}
        </>
      ) : (
        // Light sections get a soft color glow in the background for "brillo" —
        // subtle enough to keep cards and text fully readable.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-ocean-400/15 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-300/15 blur-3xl" />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

/** White curved divider that blends a dark section into the light one beside it. */
function SectionCurve({ edge }: { edge: "top" | "bottom" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-0 h-6 w-full sm:h-9",
        edge === "top" ? "top-0" : "bottom-0 rotate-180",
      )}
    >
      <path d="M0,0 H1440 V26 C1100,54 340,54 0,26 Z" fill="#ffffff" />
    </svg>
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
