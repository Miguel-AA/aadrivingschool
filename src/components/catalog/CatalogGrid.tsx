import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// When only 1–2 cards are present, a fixed 3-column grid leaves them stranded
// on the left with dead space on the right (desktop only). Passing `count` lets
// the grid widen the cards to fill the row: 1 card → centered & wide, 2 → halves.
function columnsFor(count: number): string {
  if (count <= 1) return "mx-auto max-w-2xl lg:grid-cols-1";
  if (count === 2) return "sm:grid-cols-2 lg:grid-cols-2";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

/** Responsive grid wrapper for course/package cards. */
export function CatalogGrid({
  children,
  className,
  count,
}: {
  children: ReactNode;
  className?: string;
  /** Number of cards. When given, the grid adapts its columns so few cards
   *  fill the row instead of clustering on the left. Defaults to a 3-col grid. */
  count?: number;
}) {
  const columns =
    count === undefined ? "sm:grid-cols-2 lg:grid-cols-3" : columnsFor(count);
  return (
    <div className={cn("grid gap-5", columns, className)}>{children}</div>
  );
}
