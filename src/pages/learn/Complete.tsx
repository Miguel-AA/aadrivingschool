import { ArrowLeft } from "lucide-react";
import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { useLearnCourse } from "./useLearnCourse";

/** /learn/:courseSlug/complete — practice-complete summary (no certificate). */
export function Complete() {
  const { catalogSlug, courseTitle } = useLearnCourse();
  const t = useTranslations("learn");
  usePageTitle(courseTitle);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">
        {t("practiceComplete")}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-slate-600">
        {t("practiceCompleteBody")}
      </p>
      <div className="mt-6">
        <Link
          href={`/learn/${catalogSlug}`}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("backToOverview")}
        </Link>
      </div>
    </div>
  );
}
