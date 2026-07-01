import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { ComplianceLabelKey } from "@/lib/schemas/content";
import { getProviderById } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { cn } from "@/lib/utils/cn";

interface DisclaimerProps {
  labels: ComplianceLabelKey[];
  providerId?: string | null;
  className?: string;
  /**
   * Statement layout. `1` (default) is the narrow sidebar list; `2` flows the
   * statements into two columns on wider screens for a compact full-width panel
   * (avoids a tall, skinny card with dead space next to it).
   */
  columns?: 1 | 2;
}

/**
 * Full compliance disclaimer block. Renders the approved statement for each
 * label plus partner attribution when a provider is set. Driven entirely by the
 * data on a course/page, so regulated pages can't ship without it.
 */
export function Disclaimer({
  labels,
  providerId,
  className,
  columns = 1,
}: DisclaimerProps) {
  const t = useTranslations("compliance");
  const locale = useLocale();
  const provider = getProviderById(providerId ?? null);

  if (labels.length === 0 && !provider) return null;

  return (
    <aside
      className={cn(
        "rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600",
        className,
      )}
      aria-label={t("heading")}
    >
      <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
        <ShieldCheck className="h-4 w-4 text-slate-400" aria-hidden="true" />
        {t("heading")}
      </div>
      <ul
        className={cn(
          "text-xs leading-relaxed text-slate-500",
          columns === 2
            ? "grid gap-x-8 gap-y-1.5 sm:grid-cols-2"
            : "space-y-1.5",
        )}
      >
        {labels.map((key) => (
          <li key={key}>{t(`statements.${key}`)}</li>
        ))}
        {provider && (
          <li>
            {t("providerAttribution", { provider: provider.name })}{" "}
            {getLocalized(provider.attributionText, locale)}
          </li>
        )}
      </ul>
    </aside>
  );
}
