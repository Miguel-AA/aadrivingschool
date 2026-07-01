import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { LearnProgressBar } from "@/components/learn/LearnProgressBar";
import { ModuleList } from "@/components/learn/ModuleList";
import { ResetProgressButton } from "@/components/learn/ResetProgressButton";
import { WizardStepper } from "@/components/learn/WizardStepper";
import {
  totalLessons,
  completedCount,
  percentComplete,
  firstLesson,
  resumeLesson,
  allLessonsComplete,
} from "@/lib/learn/selectors";
import { useLearnCourse } from "./useLearnCourse";

/** /learn/:courseSlug — overview with progress summary + module/lesson list. */
export function LearnHome() {
  const { course, catalogSlug, courseTitle, progress, actions } =
    useLearnCourse();
  const t = useTranslations("learn");
  usePageTitle(courseTitle);

  // Wizard tracks (e.g. New to Florida) get a stepped guide instead of the
  // normal module/lesson list + progress. Normal courses are unaffected.
  if (course.format === "wizard") {
    return <WizardStepper />;
  }

  const total = totalLessons(course);
  const completed = completedCount(course, progress);
  const percent = percentComplete(course, progress);
  const resume = resumeLesson(course, progress);
  const primary = resume ?? firstLesson(course);
  const primaryLabel = resume ? t("resumeLesson") : t("startLearning");
  const allDone = allLessonsComplete(course, progress);
  const status =
    percent === 0 ? t("notStarted") : allDone ? t("completed") : t("inProgress");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {courseTitle}
      </h1>
      {course.estimatedMinutes && (
        <p className="mt-2 text-sm text-slate-500">
          {t("estimatedTime")}: {course.estimatedMinutes} min
        </p>
      )}

      {total > 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {status}
          </span>
          <LearnProgressBar
            completed={completed}
            total={total}
            percent={percent}
            className="mt-3"
          />
          {allDone && (
            <p className="mt-3 text-sm font-medium text-emerald-700">
              {t("allLessonsComplete")}
            </p>
          )}
          {primary && (
            <Link
              href={`/learn/${catalogSlug}/${primary.slug}`}
              className={buttonClasses("primary", "lg", "mt-4")}
            >
              {primaryLabel}
            </Link>
          )}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          {t("noLessons")}
        </p>
      )}

      {total > 0 && (
        <section className="mt-10" aria-labelledby="learn-modules-heading">
          <h2
            id="learn-modules-heading"
            className="text-xl font-semibold text-slate-900"
          >
            {t("modules")}
          </h2>
          <div className="mt-4">
            <ModuleList
              course={course}
              catalogSlug={catalogSlug}
              progress={progress}
            />
          </div>
        </section>
      )}

      <div className="mt-10 border-t border-slate-200 pt-6">
        <p className="text-xs text-slate-500">{t("progressLocalOnly")}</p>
        <div className="mt-2">
          <ResetProgressButton onReset={actions.reset} />
        </div>
      </div>
    </div>
  );
}
