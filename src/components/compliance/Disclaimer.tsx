import { Info } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ComplianceLabelKey } from "@/lib/schemas/content";
import { getProviderById } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { cn } from "@/lib/utils/cn";

interface DisclaimerProps {
  labels: ComplianceLabelKey[];
  providerId?: string | null;
  className?: string;
}

/**
 * Full compliance disclaimer block. Renders the approved statement for each
 * label plus partner attribution when a provider is set. Driven entirely by the
 * data on a course/page, so regulated pages can't ship without it.
 */
export function Disclaimer({ labels, providerId, className }: DisclaimerProps) {
  const t = useTranslations("compliance");
  const locale = useLocale();
  const provider = getProviderById(providerId ?? null);

  if (labels.length === 0 && !provider) return null;

  return (
    <aside
      className={cn(
        "rounded-lg border border-amber-200 bg-amber-50/60 p-4 text-sm text-slate-700",
        className,
      )}
      aria-label={t("heading")}
    >
      <div className="mb-2 flex items-center gap-2 font-semibold text-amber-900">
        <Info className="h-4 w-4" aria-hidden="true" />
        {t("heading")}
      </div>
      <ul className="space-y-1.5">
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
