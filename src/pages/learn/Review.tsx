import { ArrowLeft, ArrowRight, ClipboardCheck } from "lucide-react";
import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { useLearnCourse } from "./useLearnCourse";

/** /learn/:courseSlug/review — simple review hub (flashcards land later). */
export function Review() {
  const { course, catalogSlug, courseTitle } = useLearnCourse();
  const t = useTranslations("learn");
  usePageTitle(courseTitle);

  const hasMock = !!(course.mockTest && course.mockTest.questions.length > 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{t("reviewHub")}</h1>

      {hasMock && (
        <Link
          href={`/learn/${catalogSlug}/mock-test`}
          className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50"
        >
          <span className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
            {t("mockTest")}
          </span>
          <ArrowRight className="h-4 w-4 text-brand-700" aria-hidden="true" />
        </Link>
      )}

      <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        {t("reviewMaterialsComingSoon")}
      </p>

      <div className="mt-10 border-t border-slate-200 pt-6">
        <Link
          href={`/learn/${catalogSlug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("backToOverview")}
        </Link>
      </div>
    </div>
  );
}
