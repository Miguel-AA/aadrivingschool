"use client";

import { useTranslations } from "next-intl";

/** Progress indicator for the quiz (current question of total). */
export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const t = useTranslations("quiz");
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-medium text-slate-600">
        {t("progress", { current, total })}
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-brand-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
