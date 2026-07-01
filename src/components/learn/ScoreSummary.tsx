import { CheckCircle2, XCircle } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { LocalizedText } from "@/lib/schemas/content";
import type { MockScore } from "@/lib/learn/grading";
import { getLocalized } from "@/lib/utils/locale";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { cn } from "@/lib/utils/cn";

/**
 * Mock-test results (practice feedback only). Shows the score, an explicit
 * "practice only / not official / no guarantee" note, and a per-question review
 * (your answer, correct answer, explanation). Correctness is icon + text.
 */
export function ScoreSummary({
  score,
  passInfoText,
  onRetake,
}: {
  score: MockScore;
  passInfoText: LocalizedText;
  onRetake: () => void;
}) {
  const t = useTranslations("learn");
  const locale = useLocale();

  const labelsFor = (
    choices: MockScore["perQuestion"][number]["question"]["choices"],
    ids: string[],
  ) =>
    choices.filter((c) => ids.includes(c.id)).map((c) => getLocalized(c.label, locale));

  return (
    <div aria-live="polite">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {t("scoreSummary")}
        </h2>
        <p className="mt-2 text-4xl font-bold text-slate-900">{score.percent}%</p>
        <p className="mt-1 text-sm text-slate-600">
          {score.score} / {score.total}
        </p>
        <p className="mt-3 text-xs text-slate-500">{t("scorePracticeOnly")}</p>
        <p className="mt-1 text-xs text-slate-500">
          {getLocalized(passInfoText, locale)}
        </p>
        <button
          type="button"
          onClick={onRetake}
          className={buttonClasses("secondary", "md", "mt-5")}
        >
          {t("retakeMockTest")}
        </button>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-900">
        {t("reviewAnswers")}
      </h3>
      <ol className="mt-4 space-y-4">
        {score.perQuestion.map((pq, i) => {
          const yourLabels = labelsFor(pq.question.choices, pq.selectedChoiceIds);
          const correctLabels = labelsFor(
            pq.question.choices,
            pq.result.correctChoiceIds,
          );
          return (
            <li
              key={pq.question.id}
              className={cn(
                "rounded-xl border p-4",
                pq.result.correct
                  ? "border-emerald-200 bg-emerald-50/60"
                  : "border-rose-200 bg-rose-50/60",
              )}
            >
              <div className="flex items-start gap-2">
                {pq.result.correct ? (
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                ) : (
                  <XCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-rose-600"
                    aria-hidden="true"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    <span className="text-slate-500">{i + 1}. </span>
                    {getLocalized(pq.question.prompt, locale)}
                    <span className="sr-only">
                      {" "}
                      — {pq.result.correct ? t("correct") : t("notQuite")}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    <span className="font-medium">{t("yourAnswer")}:</span>{" "}
                    {yourLabels.length > 0
                      ? yourLabels.join(", ")
                      : t("noAnswerSelected")}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    <span className="font-medium">{t("correctAnswer")}:</span>{" "}
                    {correctLabels.join(", ")}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    <span className="font-medium">{t("explanation")}:</span>{" "}
                    {getLocalized(pq.question.explanation, locale)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
