import { useId } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A&A Driving School brand mark — a code-drawn SVG of a car wearing a
 * graduation cap, set in a rounded navy badge. Scales sharply from favicon size
 * up to hero size and reads on both light and dark backgrounds (it carries its
 * own navy badge). Decorative by default; pass `title` to expose an a11y label.
 *
 * Brand palette: navy badge/base, warm-orange car + accents, white cap/details.
 * The matching favicon lives at `public/favicon.svg` (keep the two in sync).
 */
export function BrandMark({
  className,
  title,
}: {
  className?: string;
  /** When set, the mark is announced to assistive tech with this label. */
  title?: string;
}) {
  const id = useId();
  const badge = `${id}-badge`;
  const body = `${id}-body`;

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-10 w-10", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={badge} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#283d6b" />
          <stop offset="1" stopColor="#0b1322" />
        </linearGradient>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7cf4d" />
          <stop offset="1" stopColor="#b9870f" />
        </linearGradient>
      </defs>

      {/* rounded navy badge */}
      <rect x="0" y="0" width="48" height="48" rx="12" fill={`url(#${badge})`} />
      <rect
        x="0.6"
        y="0.6"
        width="46.8"
        height="46.8"
        rx="11.4"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.08"
        strokeWidth="1.2"
      />

      {/* graduation cap — mortarboard + button + tassel */}
      <polygon
        points="24,9 38.5,15 24,21 9.5,15"
        fill="#ffffff"
      />
      <polygon points="24,21 38.5,15 38.5,15.6 24,21.6" fill="#cbd5e1" />
      {/* tassel: string off the board, orange bead */}
      <path
        d="M24 15.2 L34 16.6 L34 21.5"
        fill="none"
        stroke="#f7cf4d"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="22.4" r="1.7" fill="#dba514" />
      <circle cx="24" cy="15.2" r="1.9" fill="#dba514" />

      {/* car — side silhouette */}
      {/* cabin / roof + windshield */}
      <path
        d="M16.4 30 L18.8 24.6 Q19.1 24 19.8 24 L28.4 24 Q29.1 24 29.4 24.6 L31.8 30 Z"
        fill="#ffffff"
      />
      <rect x="23.2" y="24.4" width="1.2" height="5.6" fill="#16223d" />
      {/* body hull */}
      <rect x="11" y="29.4" width="26" height="6.2" rx="3.1" fill={`url(#${body})`} />
      {/* headlight + sill accent */}
      <rect x="33.4" y="31.2" width="2.6" height="1.8" rx="0.9" fill="#fbf6e6" />
      <rect x="13" y="34.4" width="22" height="1.2" rx="0.6" fill="#5c4a0a" opacity="0.5" />

      {/* wheels */}
      <circle cx="17.6" cy="35.6" r="3.4" fill="#16223d" />
      <circle cx="17.6" cy="35.6" r="1.4" fill="#ffffff" />
      <circle cx="30.4" cy="35.6" r="3.4" fill="#16223d" />
      <circle cx="30.4" cy="35.6" r="1.4" fill="#ffffff" />
    </svg>
  );
}
