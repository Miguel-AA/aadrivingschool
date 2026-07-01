import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// Curved bottom edge carved out with a CSS mask so the page-level animated
// backdrop shows through the curve — no white line at the seam.
const HERO_BOTTOM_WAVE = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 1440 100'><path d='M0 0 L1440 0 L1440 55 Q720 -5 0 55 Z' fill='#000'/></svg>",
)}")`;
const HERO_WAVE_H = "4rem"; // 64px curved band
/**
 * Concave "smile" mask that carves the curved bottom edge shared by the page
 * heroes and the course/package detail headers. Apply to a full-bleed block
 * whose background fades to white; leave ≥5rem of bottom padding so content
 * clears the ~3rem the curve removes at the horizontal center.
 */
export const heroMaskStyle: CSSProperties = {
  WebkitMaskImage: `linear-gradient(#000, #000), ${HERO_BOTTOM_WAVE}`,
  maskImage: `linear-gradient(#000, #000), ${HERO_BOTTOM_WAVE}`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "top, bottom",
  maskPosition: "top, bottom",
  WebkitMaskSize: `100% calc(100% - ${HERO_WAVE_H} + 1px), 100% ${HERO_WAVE_H}`,
  maskSize: `100% calc(100% - ${HERO_WAVE_H} + 1px), 100% ${HERO_WAVE_H}`,
};

/** Per-page color identity for the hero backdrop. */
export type HeroTheme =
  | "brand"
  | "ocean"
  | "amber"
  | "emerald"
  | "violet"
  | "rose";

// Full literal class strings per theme so Tailwind's scanner keeps them.
// `base` is the top color of the page-fade gradient; `blobs` are the four
// floating glow orbs; `dot` tints the dotted grid.
const HERO_THEMES: Record<
  HeroTheme,
  { base: string; blobs: [string, string, string, string]; dot: string }
> = {
  brand: {
    base: "from-brand-50/80",
    blobs: ["bg-brand-300/40", "bg-ocean-300/30", "bg-accent-200/40", "bg-accent-100/50"],
    dot: "text-slate-300/30",
  },
  ocean: {
    base: "from-sky-50",
    blobs: ["bg-ocean-300/40", "bg-sky-300/30", "bg-brand-200/40", "bg-sky-200/50"],
    dot: "text-sky-300/30",
  },
  amber: {
    base: "from-accent-50",
    blobs: ["bg-accent-300/45", "bg-amber-300/30", "bg-accent-200/45", "bg-accent-100/50"],
    dot: "text-amber-300/30",
  },
  emerald: {
    base: "from-emerald-50",
    blobs: ["bg-emerald-300/40", "bg-teal-300/30", "bg-emerald-200/45", "bg-emerald-100/50"],
    dot: "text-emerald-300/30",
  },
  violet: {
    base: "from-violet-50",
    blobs: ["bg-violet-300/40", "bg-fuchsia-300/25", "bg-brand-200/35", "bg-violet-200/45"],
    dot: "text-violet-300/30",
  },
  rose: {
    base: "from-rose-50",
    blobs: ["bg-rose-300/40", "bg-orange-300/25", "bg-accent-200/40", "bg-rose-200/45"],
    dot: "text-rose-300/30",
  },
};

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
  /** Optional looping background video (home hero). Softened behind frosted glass. */
  videoSrc?: string;
  /** Optional lighter portrait video used on phones (< sm). Falls back to `videoSrc`. */
  videoSrcMobile?: string;
  /** Poster shown before the video loads. */
  videoPoster?: string;
  /** Optional still background image (lighter than video). Ignored if `videoSrc` is set. */
  imageSrc?: string;
  /** Per-page color identity for the backdrop. Defaults to `brand`. */
  theme?: HeroTheme;
  /** Extra classes for the `<h1>` title (e.g. `text-metallic` on the home hero). */
  titleClassName?: string;
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
  videoSrc,
  videoSrcMobile,
  videoPoster,
  imageSrc,
  theme = "brand",
  titleClassName,
  className,
}: HeroProps) {
  const palette = HERO_THEMES[theme];

  // Serve the lighter portrait video on phones. Initialized from matchMedia so
  // phones never download the heavier desktop clip first.
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 639px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const effectiveVideo =
    videoSrcMobile && isMobile ? videoSrcMobile : videoSrc;
  return (
    <div className="relative">
    <div
      style={heroMaskStyle}
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-b via-white to-white",
        palette.base,
        // Mobile only: stretch the hero (and its inset-0 background video) to
        // fill the screen. Content stays top-anchored by its padding, so the
        // text/CTAs don't move — only the video grows. Reset from `sm` up.
        videoSrc && "min-h-[100dvh] sm:min-h-0",
        className,
      )}
    >
      {(videoSrc || imageSrc) && (
        <>
          {effectiveVideo ? (
            /* Looping background video (portrait clip on phones) */
            <video
              key={effectiveVideo}
              className="absolute inset-0 -z-30 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={videoPoster}
              aria-hidden="true"
            >
              <source src={effectiveVideo} type="video/mp4" />
            </video>
          ) : (
            /* Still background image */
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-30 h-full w-full object-cover"
            />
          )}
          {/* Soft frosted glass: blurs the media (hides low resolution) and keeps
              text readable — heavier white on the text side, lighter on the right.
              The video hero (home) gets a lighter veil so the footage shows
              through more; image heroes (interior pages) keep the stronger wash. */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -z-20 backdrop-blur-sm backdrop-saturate-150",
              // Mobile shows ~30% less white over the media so the photo/video
              // reads through more; desktop (sm+) keeps the stronger wash.
              videoSrc
                ? "bg-gradient-to-r from-white/36 via-white/24 to-white/11 sm:from-white/52 sm:via-white/34 sm:to-white/16"
                : "bg-gradient-to-r from-white/50 via-white/38 to-white/24 sm:from-white/72 sm:via-white/54 sm:to-white/34",
            )}
          />
        </>
      )}

      {/* Decorative animated blobs + themed glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className={cn("absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl animate-float", palette.blobs[0])} />
        <div className={cn("absolute right-0 top-10 h-80 w-80 rounded-full blur-3xl animate-float-slow", palette.blobs[1])} />
        <div className={cn("absolute -right-20 top-1/3 h-72 w-72 rounded-full blur-3xl animate-float", palette.blobs[2])} />
        <div className={cn("absolute -bottom-24 left-1/4 h-72 w-72 rounded-full blur-3xl animate-float-slow", palette.blobs[3])} />
        <div className={cn("absolute inset-0 bg-dot-grid", palette.dot)} />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-32 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:py-44">
        <div className="min-w-0 max-w-2xl text-balance text-center sm:text-left">
          {eyebrow && (
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-brand-700 shadow-sm backdrop-blur sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              {eyebrow}
            </span>
          )}
          <h1
            className={cn(
              "mt-5 hyphens-none text-[2.4rem] font-extrabold leading-[1.07] tracking-tight text-brand-900 sm:text-5xl sm:leading-[1.05] lg:text-[3.5rem]",
              titleClassName,
            )}
          >
            {renderTitle(title, highlight)}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-900 sm:mx-0 sm:text-lg">
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
                    "items-center gap-1.5 text-sm font-semibold text-slate-900",
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

        {aside && <div className="hidden lg:block">{aside}</div>}
      </div>
    </div>

      {/* Animated gold "loading line" tracing the hero's bottom wave curve.
          Rendered outside the masked layer so it isn't clipped; the path uses
          the same curve as `heroMaskStyle`, so it sits exactly on the edge. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 w-full"
      >
        {/* faint static track */}
        <path
          d="M0 55 Q720 -5 1440 55"
          fill="none"
          stroke="var(--color-accent-400)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          className="opacity-20"
        />
        {/* bright gold dash sweeping along the curve */}
        <path
          d="M0 55 Q720 -5 1440 55"
          fill="none"
          stroke="var(--color-accent-400)"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={100}
          vectorEffect="non-scaling-stroke"
          className="hero-loading-line"
          style={{ filter: "drop-shadow(0 0 5px var(--color-accent-400))" }}
        />
      </svg>
    </div>
  );
}
