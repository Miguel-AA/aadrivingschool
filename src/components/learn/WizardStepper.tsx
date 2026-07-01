import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import { orderedLessons } from "@/lib/learn/selectors";
import { getLocalized } from "@/lib/utils/locale";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { BlockRenderer } from "./BlockRenderer";
import { useLearnCourse } from "@/pages/learn/useLearnCourse";

/**
 * Lightweight step-by-step guide for "wizard" tracks (e.g. New to Florida). One
 * step at a time with Back/Next, a visible step position, and a persistent
 * "general guidance only" note. Step blocks (text, checklist, official links)
 * render through BlockRenderer; checklist state and position persist in
 * localStorage. This is a guide/checklist — not a graded course.
 */
export function WizardStepper() {
  const { course, courseTitle, progress, actions } = useLearnCourse();
  const t = useTranslations("learn");
  const locale = useLocale();
  const steps = useMemo(() => orderedLessons(course), [course]);

  const resumeIndex = Math.max(
    0,
    steps.findIndex((s) => s.slug === progress.lastLessonSlug),
  );
  const [index, setIndex] = useState(resumeIndex);
  const step = steps[index];
  const stepSlug = step?.slug;

  // Persist the current position (reuses lastLessonSlug for "resume").
  const { visit } = actions;
  useEffect(() => {
    if (stepSlug) visit(stepSlug);
  }, [stepSlug, visit]);

  if (steps.length === 0) return null;

  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const progressPct = Math.round(((index + 1) / steps.length) * 100);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
        {t("newFloridaNextSteps")}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        {courseTitle}
      </h1>
      <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-sm text-amber-800">
        {t("generalGuidanceOnly")}
      </p>

      <p className="mt-6 text-sm font-medium text-slate-600">
        {t("wizardStep", { current: index + 1, total: steps.length })}
      </p>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={courseTitle}
      >
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-slate-900">
        {getLocalized(step.title, locale)}
      </h2>
      <div className="mt-4">
        <BlockRenderer blocks={step.blocks} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className={buttonClasses("ghost", "md")}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("previousStep")}
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          disabled={isLast}
          className={buttonClasses("primary", "md")}
        >
          {t("nextStep")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500">{t("noLegalAdvice")}</p>
    </div>
  );
}
