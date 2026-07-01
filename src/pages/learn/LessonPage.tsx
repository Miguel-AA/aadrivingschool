import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, LayoutList } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { getLocalized } from "@/lib/utils/locale";
import {
  findLessonBySlug,
  getAdjacentLessons,
  isLessonComplete,
} from "@/lib/learn/selectors";
import { BlockRenderer } from "@/components/learn/BlockRenderer";
import { LessonCompletionButton } from "@/components/learn/LessonCompletionButton";
import { useLearnCourse } from "./useLearnCourse";

/** /learn/:courseSlug/:lessonSlug — renders one lesson + completion control. */
export function LessonPage() {
  const { course, catalogSlug, progress, actions } = useLearnCourse();
  const { lessonSlug } = useParams();
  const t = useTranslations("learn");
  const locale = useLocale();

  const lesson = lessonSlug ? findLessonBySlug(course, lessonSlug) : undefined;
  const hasLesson = !!lesson;

  usePageTitle(lesson ? getLocalized(lesson.title, locale) : t("notFound.title"));

  // Record the last-visited lesson (drives the resume CTA). Not auto-complete.
  const { visit } = actions;
  useEffect(() => {
    if (hasLesson && lessonSlug) visit(lessonSlug);
  }, [hasLesson, lessonSlug, visit]);

  if (!lesson) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">{t("notFound.title")}</h1>
        <p className="mt-2 text-slate-600">{t("notFound.body")}</p>
        <Link
          href={`/learn/${catalogSlug}`}
          className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("backToOverview")}
        </Link>
      </div>
    );
  }

  const { prev, next } = getAdjacentLessons(course, lesson.slug);
  const complete = isLessonComplete(progress, lesson.id);

  return (
    <article>
      <Link
        href={`/learn/${catalogSlug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900"
      >
        <LayoutList className="h-4 w-4" aria-hidden="true" />
        {t("backToOverview")}
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        {getLocalized(lesson.title, locale)}
      </h1>
      {lesson.objective && (
        <p className="mt-2 text-lg text-slate-600">
          {getLocalized(lesson.objective, locale)}
        </p>
      )}
      {lesson.estimatedMinutes && (
        <p className="mt-1 text-sm text-slate-500">
          {t("estimatedTime")}: {lesson.estimatedMinutes} min
        </p>
      )}

      <div className="mt-8">
        <BlockRenderer blocks={lesson.blocks} />
      </div>

      <div className="mt-8">
        <LessonCompletionButton
          complete={complete}
          onToggle={() => actions.setComplete(lesson.id, !complete)}
        />
      </div>

      <nav
        className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-6"
        aria-label={t("lesson")}
      >
        {prev ? (
          <Link
            href={`/learn/${catalogSlug}/${prev.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("previousLesson")}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${catalogSlug}/${next.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            {t("nextLesson")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
