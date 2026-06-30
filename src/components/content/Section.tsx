import type { CSSProperties, ReactNode } from "react";
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

// Light tones (`white`/`muted`) are transparent so the single page-level
// animated backdrop (`PageBackground`) shows through continuously — no per-
// section seams. `brand` and `dark` share the same bright blue so every blue
// section is consistent — they're opaque and cover the backdrop, getting a
// glowing "spotlight" treatment like the header/footer.
const BLUE = "bg-gradient-to-br from-brand-700 via-brand-600 to-ocean-600 text-white";
const tones = {
  white: "bg-transparent",
  muted: "bg-transparent",
  brand: BLUE,
  dark: BLUE,
};

// Curved edges are carved out of the blue section with a CSS mask (instead of
// painting a white curve over it). This reveals the page-level animated
// backdrop directly through the curve, so there's no white line at the seam no
// matter what color the backdrop happens to be there.
const enc = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
// Top wave: opaque (keeps blue) below the curve, transparent above.
const TOP_WAVE = enc(
  "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 1440 56'><path d='M0 26 C340 54 1100 54 1440 26 L1440 56 L0 56 Z' fill='#000'/></svg>",
);
// Bottom wave: opaque above the curve, transparent below.
const BOTTOM_WAVE = enc(
  "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 1440 56'><path d='M0 30 C340 2 1100 2 1440 30 L1440 0 L0 0 Z' fill='#000'/></svg>",
);
const MID = "linear-gradient(#000, #000)";
const WAVE_H = "2.25rem"; // 36px band height per curve

function blueMaskStyle(blendBottom: boolean): CSSProperties {
  const image = blendBottom
    ? `${TOP_WAVE}, ${MID}, ${BOTTOM_WAVE}`
    : `${TOP_WAVE}, ${MID}`;
  const position = blendBottom ? "top, center, bottom" : "top, bottom";
  const size = blendBottom
    ? `100% ${WAVE_H}, 100% calc(100% - (${WAVE_H} * 2) + 1px), 100% ${WAVE_H}`
    : `100% ${WAVE_H}, 100% calc(100% - ${WAVE_H} + 1px)`;
  return {
    WebkitMaskImage: image,
    maskImage: image,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: position,
    maskPosition: position,
    WebkitMaskSize: size,
    maskSize: size,
  };
}

/** Full-width section with a centered, padded container. */
export function Section({
  children,
  className,
  tone = "white",
  blendBottom = true,
  id,
}: SectionProps) {
  // Blue (brand/dark) sections get curved edges carved out via a mask so they
  // ease into the surrounding light sections with a clean curve — no hard line
  // and no white seam over the animated backdrop.
  const dark = tone === "brand" || tone === "dark";
  return (
    <section
      id={id}
      style={dark ? blueMaskStyle(blendBottom) : undefined}
      className={cn(tones[tone], "relative overflow-hidden py-12 sm:py-20", className)}
    >
      {dark ? (
        // Brilliant blue glow — same luminous spotlight as the header/footer.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-24 left-1/2 h-80 w-2/3 -translate-x-1/2 rounded-full bg-ocean-400/30 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-72 w-1/2 rounded-full bg-ocean-300/20 blur-3xl" />
          <div className="absolute -left-10 top-1/3 h-56 w-56 rounded-full bg-accent-400/10 blur-3xl" />
        </div>
      ) : null}
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
