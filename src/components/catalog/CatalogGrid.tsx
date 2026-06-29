import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Responsive grid wrapper for course/package cards. */
export function CatalogGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}
