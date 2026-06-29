import { useTranslations } from "next-intl";
import type { ComplianceLabelKey } from "@/lib/schemas/content";
import { cn } from "@/lib/utils/cn";

const toneByKey: Record<ComplianceLabelKey, string> = {
  "partner-provided": "bg-brand-50 text-brand-800 ring-brand-200",
  "educational-guide": "bg-emerald-50 text-emerald-800 ring-emerald-200",
  "not-official-dmv": "bg-amber-50 text-amber-800 ring-amber-200",
  "no-guarantee": "bg-slate-100 text-slate-700 ring-slate-200",
};

/** Small compliance pill (e.g. "Partner-Provided", "Not Official DMV"). */
export function ComplianceLabel({
  labelKey,
  className,
}: {
  labelKey: ComplianceLabelKey;
  className?: string;
}) {
  const t = useTranslations("compliance");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        toneByKey[labelKey],
        className,
      )}
    >
      {t(`labels.${labelKey}`)}
    </span>
  );
}

/** Row of compliance pills. */
export function ComplianceLabelRow({
  labels,
  className,
}: {
  labels: ComplianceLabelKey[];
  className?: string;
}) {
  if (labels.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {labels.map((key) => (
        <ComplianceLabel key={key} labelKey={key} />
      ))}
    </div>
  );
}
