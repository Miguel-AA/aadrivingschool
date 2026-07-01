import { useState } from "react";
import { CheckCircle2, XCircle, Check, X } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { PracticeQuestion as PracticeQuestionType } from "@/lib/schemas/learn";
import { gradePracticeQuestion, type GradeResult } from "@/lib/learn/grading";
import { getLocalized } from "@/lib/utils/locale";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { cn } from "@/lib/utils/cn";

/**
 * Inline practice question (CE4a). Study feedback only — never an official exam.
 *
 * Flow: choose an answer → "Check answer" → feedback (Correct / Not quite) with
 * the explanation, and the correct answer revealed when wrong. "Try again" re-
 * enables the choices. No score is stored and no lesson auto-completes here.
 */
export function PracticeQuestion({
  question,
}: {
  question: PracticeQuestionType;
}) {
  const t = useTranslations("learn");
  const locale = useLocale();
  const isMulti = question.type === "multi";

  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [needsSelection, setNeedsSelection] = useState(false);
  const checked = result !== null;

  const toggle = (id: string) => {
    if (checked) return;
    setNeedsSelection(false);
    setSelected((prev) =>
      isMulti
        ? prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
        : [id],
    );
  };

  const check = () => {
    if (selected.length === 0) {
      setNeedsSelection(true);
      return;
    }
    setResult(gradePracticeQuestion(question, selected));
  };

  const tryAgain = () => {
    setResult(null);
    setNeedsSelection(false);
  };

  const labelsFor = (ids: string[]) =>
    question.choices
      .filter((c) => ids.includes(c.id))
      .map((c) => getLocalized(c.label, locale));

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-label={t("practiceQuestion")}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
        {t("practiceQuestion")}
      </p>

      <fieldset className="mt-2" disabled={checked}>
        <legend className="text-base font-semibold text-slate-900">
          {getLocalized(question.prompt, locale)}
        </legend>

        {question.media && (
          <img
            src={question.media.src}
            alt={getLocalized(question.media.alt, locale)}
            className="mt-3 max-h-56 rounded-lg border border-slate-200"
          />
        )}

        <div className="mt-4 space-y-2">
          {question.choices.map((choice) => {
            const isSelected = selected.includes(choice.id);
            const isCorrect = question.correctChoiceIds.includes(choice.id);
            const showCorrect = checked && isCorrect;
            const showWrong = checked && isSelected && !isCorrect;
            return (
              <label
                key={choice.id}
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                  checked ? "cursor-default" : "cursor-pointer hover:bg-slate-50",
                  showCorrect
                    ? "border-emerald-300 bg-emerald-50/70"
                    : showWrong
                      ? "border-rose-300 bg-rose-50/70"
                      : isSelected
                        ? "border-brand-400 bg-brand-50/60"
                        : "border-slate-200",
                )}
              >
                <input
                  type={isMulti ? "checkbox" : "radio"}
                  name={`pq-${question.id}`}
                  value={choice.id}
                  checked={isSelected}
                  onChange={() => toggle(choice.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                />
                <span className="flex-1 text-slate-800">
                  {getLocalized(choice.label, locale)}
                </span>
                {showCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{t("correctAnswer")}</span>
                  </span>
                )}
                {showWrong && (
                  <X
                    className="h-4 w-4 shrink-0 text-rose-600"
                    aria-hidden="true"
                  />
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {needsSelection && (
        <p className="mt-3 text-sm text-amber-700" role="alert">
          {t("chooseAnAnswer")}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {!checked ? (
          <button
            type="button"
            onClick={check}
            className={buttonClasses("primary", "md")}
          >
            {t("checkAnswer")}
          </button>
        ) : (
          <button
            type="button"
            onClick={tryAgain}
            className={buttonClasses("secondary", "md")}
          >
            {t("tryAgain")}
          </button>
        )}
      </div>

      {/* Feedback is announced politely; meaning is icon + text, not color only. */}
      <div aria-live="polite" className="mt-4 empty:mt-0">
        {result && (
          <div
            className={cn(
              "rounded-xl border p-4",
              result.correct
                ? "border-emerald-200 bg-emerald-50/70"
                : "border-rose-200 bg-rose-50/70",
            )}
          >
            <p
              className={cn(
                "flex items-center gap-2 text-sm font-semibold",
                result.correct ? "text-emerald-800" : "text-rose-800",
              )}
            >
              {result.correct ? (
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              ) : (
                <XCircle className="h-5 w-5" aria-hidden="true" />
              )}
              {result.correct ? t("correct") : t("notQuite")}
            </p>

            {!result.correct && (
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <p>
                  <span className="font-medium">{t("selectedAnswer")}:</span>{" "}
                  {labelsFor(result.selectedChoiceIds).join(", ") || "—"}
                </p>
                <p>
                  <span className="font-medium">{t("correctAnswer")}:</span>{" "}
                  {labelsFor(result.correctChoiceIds).join(", ")}
                </p>
              </div>
            )}

            <p className="mt-2 text-sm text-slate-700">
              <span className="font-medium">{t("explanation")}:</span>{" "}
              {getLocalized(result.explanation, locale)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
