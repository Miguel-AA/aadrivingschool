import { useLocale, useTranslations } from "@/i18n";
import type { ChecklistBlock } from "@/lib/schemas/learn";
import { getLocalized } from "@/lib/utils/locale";
import { cn } from "@/lib/utils/cn";
import { useLearnCourse } from "@/pages/learn/useLearnCourse";

/**
 * Interactive checklist. Each item's checked state persists in
 * LearnProgress.checklistState (localStorage, no PII). State is conveyed by the
 * native checkbox AND a strike-through + sr-only label — never color alone.
 */
export function ChecklistView({ block }: { block: ChecklistBlock }) {
  const t = useTranslations("learn");
  const locale = useLocale();
  const { progress, actions } = useLearnCourse();

  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <legend className="px-1 text-sm font-semibold text-slate-900">
        {block.title ? getLocalized(block.title, locale) : t("checklist")}
      </legend>
      <ul className="mt-2 space-y-2">
        {block.items.map((item) => {
          const checked = progress.checklistState[item.id] ?? false;
          return (
            <li key={item.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg px-1 py-1.5 text-sm hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => actions.setChecklist(item.id, e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                />
                <span
                  className={cn(
                    "flex-1 text-slate-800",
                    checked && "text-slate-400 line-through",
                  )}
                >
                  {getLocalized(item.label, locale)}
                </span>
                <span className="sr-only">
                  {checked ? t("checked") : t("unchecked")}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
