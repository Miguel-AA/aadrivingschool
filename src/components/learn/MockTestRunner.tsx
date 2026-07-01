import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { MockTestConfig } from "@/lib/schemas/learn";
import {
  selectMockQuestions,
  scoreMockTest,
  type MockScore,
} from "@/lib/learn/grading";
import { getLocalized } from "@/lib/utils/locale";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { cn } from "@/lib/utils/cn";
import { ScoreSummary } from "./ScoreSummary";

/**
 * Mock-test runner (CE4b): one question at a time, next/back navigation, and NO
 * correctness feedback until submit (deferred scoring). On submit it grades all
 * answers and shows ScoreSummary. Retake resets the local session. Practice
 * feedback only — never the official exam; no auto lesson/course completion.
 */
export function MockTestRunner({
  config,
  onScored,
}: {
  config: MockTestConfig;
  /** Optional callback with the final score (used to store an attempt summary). */
  onScored?: (score: number, total: number) => void;
}) {
  const t = useTranslations("learn");
  const locale = useLocale();
  const questions = useMemo(() => selectMockQuestions(config), [config]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [score, setScore] = useState<MockScore | null>(null);

  const retake = () => {
    setIndex(0);
    setAnswers({});
    setScore(null);
  };

  if (questions.length === 0) return null;

  if (score) {
    return (
      <ScoreSummary
        score={score}
        passInfoText={config.passInfoText}
        onRetake={retake}
      />
    );
  }

  const q = questions[index];
  const isMulti = q.type === "multi";
  const selected = answers[q.id] ?? [];
  const isFirst = index === 0;
  const isLast = index === questions.length - 1;
  const progressPct = Math.round(((index + 1) / questions.length) * 100);

  const select = (id: string) => {
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      const next = isMulti
        ? current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id]
        : [id];
      return { ...prev, [q.id]: next };
    });
  };

  const submit = () => {
    const result = scoreMockTest(questions, answers);
    setScore(result);
    onScored?.(result.score, result.total);
  };

  return (
    <div>
      <p className="text-sm font-medium text-slate-600">
        {t("questionNumber", { current: index + 1, total: questions.length })}
      </p>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-label={t("mockTest")}
      >
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-lg font-semibold text-slate-900">
          {getLocalized(q.prompt, locale)}
        </legend>

        {q.media && (
          <img
            src={q.media.src}
            alt={getLocalized(q.media.alt, locale)}
            className="mt-3 max-h-56 rounded-lg border border-slate-200"
          />
        )}

        <div className="mt-4 space-y-2">
          {q.choices.map((choice) => {
            const isSelected = selected.includes(choice.id);
            return (
              <label
                key={choice.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-slate-50",
                  // Selection highlight only — never correctness (deferred).
                  isSelected
                    ? "border-brand-400 bg-brand-50/60"
                    : "border-slate-200",
                )}
              >
                <input
                  type={isMulti ? "checkbox" : "radio"}
                  name={`mock-${q.id}`}
                  value={choice.id}
                  checked={isSelected}
                  onChange={() => select(choice.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                />
                <span className="flex-1 text-slate-800">
                  {getLocalized(choice.label, locale)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className={buttonClasses("ghost", "md")}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("previousQuestion")}
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={submit}
            className={buttonClasses("primary", "md")}
          >
            {t("submitMockTest")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setIndex((i) => Math.min(questions.length - 1, i + 1))
            }
            className={buttonClasses("primary", "md")}
          >
            {t("nextQuestion")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
