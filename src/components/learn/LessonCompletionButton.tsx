import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "@/i18n";
import { buttonClasses } from "@/components/cta/buttonStyles";

/**
 * Toggle a lesson's completion. `aria-pressed` communicates the on/off state to
 * assistive tech; the label + icon change with state (not color alone).
 */
export function LessonCompletionButton({
  complete,
  onToggle,
}: {
  complete: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("learn");
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={complete}
      className={buttonClasses(complete ? "secondary" : "primary", "md")}
    >
      {complete && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
      {complete ? t("completedLesson") : t("markComplete")}
    </button>
  );
}
