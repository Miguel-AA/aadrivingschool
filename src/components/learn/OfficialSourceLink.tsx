import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { OfficialSourceLinkBlock } from "@/lib/schemas/learn";
import { getLocalized } from "@/lib/utils/locale";

/**
 * Accessible link to an external official source (e.g. flhsmv.gov) for the user
 * to confirm current requirements. Opens in a new tab with rel="noopener".
 */
export function OfficialSourceLink({
  block,
}: {
  block: OfficialSourceLinkBlock;
}) {
  const t = useTranslations("learn");
  const locale = useLocale();
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t("officialSource")}
      </p>
      <a
        href={block.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
      >
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{getLocalized(block.label, locale)}</span>
        <span className="sr-only"> ({t("openOfficialSource")})</span>
      </a>
      {block.note && (
        <p className="mt-1 text-xs text-slate-500">
          {getLocalized(block.note, locale)}
        </p>
      )}
    </div>
  );
}
