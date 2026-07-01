import { ArrowLeft } from "lucide-react";
import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { ComingSoon } from "@/components/learn/ComingSoon";
import { MockTestRunner } from "@/components/learn/MockTestRunner";
import { useLearnCourse } from "./useLearnCourse";

/** /learn/:courseSlug/mock-test — runs the practice mock test when configured. */
export function MockTest() {
  const { course, catalogSlug, courseTitle, actions } = useLearnCourse();
  const t = useTranslations("learn");
  usePageTitle(courseTitle);

  const mock = course.mockTest;

  if (!mock || mock.questions.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t("mockTest")}</h1>
        <div className="mt-4">
          <ComingSoon
            message={t("mockTestComingSoon")}
            overviewHref={`/learn/${catalogSlug}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{t("mockTest")}</h1>
      <p className="mt-2 text-slate-600">{t("mockTestIntro")}</p>
      <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-sm text-amber-800">
        {t("practiceMockOnly")}
      </p>

      <div className="mt-6">
        <MockTestRunner
          config={mock}
          onScored={(score, total) => actions.recordMockAttempt(score, total)}
        />
      </div>

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
