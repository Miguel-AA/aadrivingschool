import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import type { LearnCourse, LearnProgress } from "@/lib/schemas/learn";
import { getLocalized } from "@/lib/utils/locale";
import { isLessonComplete } from "@/lib/learn/selectors";
import { cn } from "@/lib/utils/cn";

/**
 * Module → lesson navigation with per-lesson completion state. Completion is
 * shown with a distinct icon AND a text label (never color alone).
 */
export function ModuleList({
  course,
  catalogSlug,
  progress,
}: {
  course: LearnCourse;
  catalogSlug: string;
  progress: LearnProgress;
}) {
  const t = useTranslations("learn");
  const locale = useLocale();
  const modules = [...course.modules].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {modules.map((mod) => (
        <div key={mod.id}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {getLocalized(mod.title, locale)}
          </h3>
          <ul className="mt-2 space-y-2">
            {[...mod.lessons]
              .sort((a, b) => a.order - b.order)
              .map((lesson) => {
                const done = isLessonComplete(progress, lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/learn/${catalogSlug}/${lesson.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50"
                    >
                      <span className="flex items-center gap-2">
                        {done ? (
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 text-emerald-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <Circle
                            className="h-4 w-4 shrink-0 text-slate-300"
                            aria-hidden="true"
                          />
                        )}
                        <span>{getLocalized(lesson.title, locale)}</span>
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 text-xs font-semibold",
                          done ? "text-emerald-700" : "text-brand-700",
                        )}
                      >
                        {done ? t("completed") : t("openLesson")}
                        {!done && (
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
