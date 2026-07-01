import { ShieldAlert } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { DisclaimerPreset } from "@/lib/schemas/learn";
import { DISCLAIMER_PRESETS } from "@/content/learn/_shared/disclaimers";
import { getLocalized } from "@/lib/utils/locale";
import { cn } from "@/lib/utils/cn";

/**
 * Persistent compliance banner shown on every learn screen. Reads the course's
 * disclaimer preset (data from CE3a) and renders the localized lines. Meaning is
 * conveyed by an icon + a text heading, never by color alone.
 */
export function PlayerDisclaimer({
  preset,
  className,
}: {
  preset: DisclaimerPreset;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("learn");
  const content = DISCLAIMER_PRESETS[preset];

  return (
    <aside
      className={cn(
        "rounded-xl border border-amber-200 bg-amber-50/70 p-4",
        className,
      )}
      aria-label={t("practiceOnly")}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
        <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
        {t("practiceOnly")}
      </p>
      <ul className="mt-2 space-y-1 text-xs leading-relaxed text-amber-800">
        {content.lines.map((line, i) => (
          <li key={i}>{getLocalized(line, locale)}</li>
        ))}
      </ul>
    </aside>
  );
}
