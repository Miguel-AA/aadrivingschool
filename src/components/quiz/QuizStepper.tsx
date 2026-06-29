"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuizQuestion, QuizRule } from "@/lib/schemas/content";
import {
  recommend,
  type QuizAnswers,
  type Recommendation,
} from "@/lib/quiz/engine";
import { trackEvent, EVENTS } from "@/lib/services/analytics";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestionView } from "./QuizQuestionView";
import { QuizResult } from "./QuizResult";

type Phase = "intro" | "questions" | "result";

export function QuizStepper({
  questions,
  rules,
}: {
  questions: QuizQuestion[];
  rules: QuizRule[];
}) {
  const t = useTranslations("quiz");
  const sorted = [...questions].sort((a, b) => a.order - b.order);

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<Recommendation | null>(null);

  const current = sorted[index];
  const selected = current ? (answers[current.id] ?? []) : [];
  const isLast = index === sorted.length - 1;

  const start = () => {
    trackEvent(EVENTS.QUIZ_START);
    setPhase("questions");
  };

  const select = (answerId: string) => {
    if (!current) return;
    const next =
      current.type === "multi"
        ? selected.includes(answerId)
          ? selected.filter((a) => a !== answerId)
          : [...selected, answerId]
        : [answerId];
    setAnswers((prev) => ({ ...prev, [current.id]: next }));
    trackEvent(EVENTS.QUIZ_QUESTION_ANSWERED, {
      questionId: current.id,
      answerId,
    });
  };

  const goNext = () => {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    const rec = recommend(answers, rules);
    setResult(rec);
    setPhase("result");
    trackEvent(EVENTS.QUIZ_COMPLETE, {
      ruleId: rec.ruleId,
      kind: rec.kind,
      targetId: rec.targetId,
    });
  };

  const retake = () => {
    setAnswers({});
    setIndex(0);
    setResult(null);
    setPhase("intro");
  };

  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-700">{t("intro")}</p>
        <button
          type="button"
          onClick={start}
          className={buttonClasses("primary", "lg", "mt-6")}
        >
          {t("start")}
        </button>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="animate-fade-up">
        <QuizResult recommendation={result} onRetake={retake} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <QuizProgress current={index + 1} total={sorted.length} />
      {current && (
        <div key={current.id} className="animate-fade-up">
          <QuizQuestionView
            question={current}
            selected={selected}
            onSelect={select}
          />
        </div>
      )}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className={buttonClasses("ghost", "md")}
        >
          {t("back")}
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={selected.length === 0}
          className={buttonClasses("primary", "md")}
        >
          {isLast ? t("seeResult") : t("next")}
        </button>
      </div>
    </div>
  );
}
