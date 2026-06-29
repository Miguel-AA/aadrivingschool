
import { Check } from "lucide-react";
import { useLocale } from "@/i18n";
import type { QuizQuestion } from "@/lib/schemas/content";
import { getLocalized } from "@/lib/utils/locale";
import { cn } from "@/lib/utils/cn";

/** Renders a single quiz question with selectable answers. */
export function QuizQuestionView({
  question,
  selected,
  onSelect,
}: {
  question: QuizQuestion;
  selected: string[];
  onSelect: (answerId: string) => void;
}) {
  const locale = useLocale();

  return (
    <fieldset>
      <legend className="text-xl font-semibold text-slate-900">
        {getLocalized(question.prompt, locale)}
      </legend>
      {question.helpText && (
        <p className="mt-1 text-sm text-slate-500">
          {getLocalized(question.helpText, locale)}
        </p>
      )}
      <div className="mt-4 space-y-2">
        {question.answers.map((answer) => {
          const isSelected = selected.includes(answer.id);
          return (
            <button
              key={answer.id}
              type="button"
              onClick={() => onSelect(answer.id)}
              aria-pressed={isSelected}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-150",
                isSelected
                  ? "border-brand-600 bg-brand-50 font-semibold text-brand-800 shadow-sm"
                  : "border-slate-200 text-slate-700 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-slate-50",
              )}
            >
              <span>{getLocalized(answer.label, locale)}</span>
              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                  isSelected
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-slate-300 text-transparent",
                )}
                aria-hidden="true"
              >
                <Check className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
