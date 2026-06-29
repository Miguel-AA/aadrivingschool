
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  durationMs?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Count-up number that animates once when scrolled into view. Falls back to the
 * final value immediately for users who prefer reduced motion.
 */
export function Counter({
  to,
  durationMs = 1400,
  suffix = "",
  prefix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let start = 0;
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // All setState happens inside the observer/rAF callbacks (never synchronously
    // in the effect body), so it stays a true external-system subscription.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        if (prefersReduced) {
          setValue(to);
          return;
        }
        const step = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / durationMs, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
