import type { CSSProperties } from "react";

/**
 * Page-level animated backdrop. A single fixed layer that lives behind all
 * content so the decorative colored blobs drift continuously across the whole
 * page — there are no per-section seams. White/transparent sections reveal it;
 * the opaque blue sections sit on top and cover it. This replaces the old
 * per-section glow blobs in `Section`.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white"
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.color} ${b.anim}`}
          style={b.style}
        />
      ))}
    </div>
  );
}

type Blob = {
  color: string;
  anim: string;
  style: CSSProperties;
};

const BLOBS: Blob[] = [
  {
    color: "bg-ocean-400/20",
    anim: "animate-blob",
    style: { left: "-8%", top: "4%", height: "26rem", width: "26rem" },
  },
  {
    color: "bg-accent-300/20",
    anim: "animate-blob-slow",
    style: {
      right: "-10%",
      top: "22%",
      height: "30rem",
      width: "30rem",
      animationDelay: "-6s",
    },
  },
  {
    color: "bg-brand-300/15",
    anim: "animate-blob",
    style: {
      left: "18%",
      top: "46%",
      height: "24rem",
      width: "24rem",
      animationDelay: "-12s",
    },
  },
  {
    color: "bg-ocean-300/20",
    anim: "animate-blob-slow",
    style: {
      right: "12%",
      top: "64%",
      height: "28rem",
      width: "28rem",
      animationDelay: "-3s",
    },
  },
  {
    color: "bg-accent-200/20",
    anim: "animate-blob",
    style: {
      left: "-6%",
      top: "82%",
      height: "26rem",
      width: "26rem",
      animationDelay: "-9s",
    },
  },
];
