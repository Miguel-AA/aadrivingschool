import { useTranslations } from "@/i18n";

/**
 * Accessible progress indicator. The percentage is exposed as text (not just the
 * bar width) and via a native progressbar role for screen readers.
 */
export function LearnProgressBar({
  completed,
  total,
  percent,
  className,
}: {
  completed: number;
  total: number;
  percent: number;
  className?: string;
}) {
  const t = useTranslations("learn");
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-700">{t("progress")}</span>
        <span className="text-slate-500">
          {t("progressSummary", { completed, total, percent })}
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t("progress")}
      >
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
