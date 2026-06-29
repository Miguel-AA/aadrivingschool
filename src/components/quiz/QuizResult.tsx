
import { ArrowRight, RotateCcw } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { Recommendation } from "@/lib/quiz/engine";
import { getCourseById, getPackageById } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { LeadForm } from "@/components/lead/LeadForm";
import { EVENTS } from "@/lib/services/analytics";

/** Shows the quiz recommendation and hands off into a prefilled lead form. */
export function QuizResult({
  recommendation,
  onRetake,
}: {
  recommendation: Recommendation;
  onRetake: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("quiz");

  const target =
    recommendation.kind === "course"
      ? getCourseById(recommendation.targetId)
      : getPackageById(recommendation.targetId);

  if (!target) return null;

  const title = getLocalized(target.title, locale);
  const reason = recommendation.explanation
    ? getLocalized(recommendation.explanation, locale)
    : t("result.fallbackReason");
  const kindLabel =
    recommendation.kind === "course"
      ? t("result.recommendedCourse")
      : t("result.recommendedPackage");

  return (
    <div>
      <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          {kindLabel}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          {t("result.heading")}
        </h2>
        <p className="mt-4 text-lg font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {t("result.reasonHeading")}
        </p>
        <p className="mt-1 text-slate-700">{reason}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/courses/${target.slug}`}
            className={buttonClasses("secondary", "md")}
          >
            {t("result.viewDetails")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <WhatsAppCTA
            kind="recommendation"
            item={title}
            label={t("result.askWhatsApp")}
          />
          <CTAButton
            eventName={EVENTS.CTA_CLICK}
            eventProps={{ source: "quiz_result", action: "retake" }}
            onClick={onRetake}
            variant="ghost"
            size="md"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("result.retake")}
          </CTAButton>
        </div>
      </div>

      <div className="mt-8">
        <LeadForm
          defaults={{
            recommendation: recommendation.targetId,
            sourcePage: "/quiz",
          }}
          recommendationLabel={`${kindLabel}: ${title}`}
        />
      </div>
    </div>
  );
}
