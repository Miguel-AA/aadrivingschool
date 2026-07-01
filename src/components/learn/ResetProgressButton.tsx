import { useTranslations } from "@/i18n";

/**
 * Clears the current course's progress after an explicit confirmation. Progress
 * is device-local, so this is safe and reversible only by re-doing the lessons.
 */
export function ResetProgressButton({ onReset }: { onReset: () => void }) {
  const t = useTranslations("learn");
  const handleClick = () => {
    if (typeof window !== "undefined" && window.confirm(t("resetProgressConfirm"))) {
      onReset();
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700"
    >
      {t("resetProgress")}
    </button>
  );
}
