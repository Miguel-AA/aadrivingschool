
import { useState } from "react";
import { useTranslations } from "@/i18n";
import type { Course, Package } from "@/lib/schemas/content";
import {
  NEED_KEYS,
  getCourseNeeds,
  getPackageNeeds,
  type NeedKey,
} from "@/lib/utils/courseNeeds";
import { cn } from "@/lib/utils/cn";
import { CatalogGrid } from "./CatalogGrid";
import { CourseCard } from "./CourseCard";
import { PackageCard } from "./PackageCard";

/**
 * Filterable catalog: chips filter courses + packages by situation-based "need".
 * Client component so filtering is instant; cards have no server-only deps.
 */
export function CoursesExplorer({
  courses,
  packages,
}: {
  courses: Course[];
  packages: Package[];
}) {
  const t = useTranslations("pages");
  const tc = useTranslations("common");
  const [need, setNeed] = useState<NeedKey | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const visibleCourses =
    need === "all"
      ? courses
      : courses.filter((c) => getCourseNeeds(c.category).includes(need));
  const visiblePackages =
    need === "all"
      ? packages
      : packages.filter((p) => getPackageNeeds(p.id).includes(need));

  const chips: (NeedKey | "all")[] = ["all", ...NEED_KEYS];

  // Keep the mobile catalog calm: show the first 6 items, with a "View all"
  // toggle. All items always render on `sm`+ and stay in the DOM.
  const MOBILE_CAP = 6;
  const items = [
    ...visiblePackages.map((pkg) => ({
      key: `p-${pkg.id}`,
      node: <PackageCard pkg={pkg} />,
    })),
    ...visibleCourses.map((course) => ({
      key: `c-${course.id}`,
      node: <CourseCard course={course} />,
    })),
  ];

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t("courses.filtersLabel")}
      >
        {chips.map((key) => {
          const active = key === need;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setNeed(key)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50",
              )}
            >
              {t(`courses.filters.${key}`)}
            </button>
          );
        })}
      </div>

      <CatalogGrid className="mt-8">
        {items.map((item, i) => (
          <div
            key={item.key}
            className={cn(
              "h-full",
              !showAll && i >= MOBILE_CAP && "hidden sm:block",
            )}
          >
            {item.node}
          </div>
        ))}
      </CatalogGrid>

      {!showAll && items.length > MOBILE_CAP && (
        <div className="mt-6 sm:hidden">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-brand-700 shadow-sm"
          >
            {tc("cta.viewAllCourses")}
          </button>
        </div>
      )}
    </div>
  );
}
