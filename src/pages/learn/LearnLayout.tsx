import { useCallback, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { getLearnCourseLoader } from "@/content/learn";
import { getCourseBySlug } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import type { LearnCourse, LearnProgress } from "@/lib/schemas/learn";
import {
  readProgress,
  markLessonComplete,
  setLessonComplete,
  setLastLesson,
  addMockAttempt,
  setChecklistItem,
  resetCourseProgress,
} from "@/lib/learn/progress";
import { PlayerDisclaimer } from "@/components/learn/PlayerDisclaimer";
import { LearnNotFound } from "@/components/learn/LearnNotFound";
import type {
  LearnOutletContext,
  LearnProgressActions,
} from "./useLearnCourse";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; course: LearnCourse }
  | { status: "error" };

/**
 * Layout route for /learn/:courseSlug. Owns lazy course loading, the shared
 * player shell, and the localStorage-backed progress state, exposing both the
 * course and progress actions to child screens via <Outlet> context.
 */
export function LearnLayout() {
  const { courseSlug } = useParams();
  const t = useTranslations("learn");
  const locale = useLocale();
  const loader = courseSlug ? getLearnCourseLoader(courseSlug) : undefined;
  const slug = courseSlug ?? "";

  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [progress, setProgress] = useState<LearnProgress>(() =>
    readProgress(slug),
  );

  // Re-read persisted progress whenever the course changes.
  useEffect(() => {
    setProgress(readProgress(slug));
  }, [slug]);

  // Lazy-load the track's validated content.
  useEffect(() => {
    if (!loader) return;
    let active = true;
    setState({ status: "loading" });
    loader()
      .then((mod) => {
        if (active) setState({ status: "ready", course: mod.default });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });
    return () => {
      active = false;
    };
  }, [loader]);

  const setComplete = useCallback(
    (lessonId: string, complete: boolean) =>
      setProgress(setLessonComplete(slug, lessonId, complete)),
    [slug],
  );
  const markComplete = useCallback(
    (lessonId: string) => setProgress(markLessonComplete(slug, lessonId)),
    [slug],
  );
  const visit = useCallback(
    (lessonSlug: string) => setProgress(setLastLesson(slug, lessonSlug)),
    [slug],
  );
  const recordMockAttempt = useCallback(
    (score: number, total: number) =>
      setProgress(addMockAttempt(slug, score, total)),
    [slug],
  );
  const setChecklist = useCallback(
    (itemId: string, checked: boolean) =>
      setProgress(setChecklistItem(slug, itemId, checked)),
    [slug],
  );
  const reset = useCallback(() => {
    resetCourseProgress(slug);
    setProgress(readProgress(slug));
  }, [slug]);

  // Unknown slug or failed load → safe standalone not-found (no crash).
  if (!loader || state.status === "error") return <LearnNotFound />;

  if (state.status === "loading") {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-6">
        <p className="text-slate-600">{t("loading")}</p>
      </div>
    );
  }

  const { course } = state;
  const catalogCourse = getCourseBySlug(course.catalogSlug);
  const courseTitle = catalogCourse
    ? getLocalized(catalogCourse.title, locale)
    : course.catalogSlug;

  const actions: LearnProgressActions = {
    setComplete,
    markComplete,
    visit,
    recordMockAttempt,
    setChecklist,
    reset,
  };
  const ctx: LearnOutletContext = {
    course,
    catalogSlug: course.catalogSlug,
    courseTitle,
    progress,
    actions,
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/courses/${course.catalogSlug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("exitToCourse")}
        </Link>
        <span className="text-xs text-slate-500">
          {t("lastReviewed")}:{" "}
          <time dateTime={course.lastReviewed}>{course.lastReviewed}</time>
        </span>
      </div>

      <PlayerDisclaimer preset={course.disclaimerPreset} className="mt-4" />

      <div className="mt-8">
        <Outlet context={ctx} />
      </div>
    </div>
  );
}
