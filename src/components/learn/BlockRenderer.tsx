import { Info, Lightbulb, AlertTriangle, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import type { ContentBlock } from "@/lib/schemas/learn";
import { getLocalized } from "@/lib/utils/locale";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { PracticeQuestion } from "@/components/learn/PracticeQuestion";
import { ChecklistView } from "@/components/learn/ChecklistView";
import { OfficialSourceLink } from "@/components/learn/OfficialSourceLink";

/**
 * Minimal content-block renderer (CE3b).
 *
 * Supports TextBlock, CalloutBlock, inline PracticeQuestionBlock, ChecklistBlock,
 * OfficialSourceLinkBlock, and LeadCtaBlock. The remaining block types (image,
 * road-sign, vocabulary, flashcard, download) render nothing yet — no crash —
 * and are implemented in later CE phases. A practice-question referencing a bank
 * (questionRef) shows a safe "unavailable" note until the bank loader exists.
 */

type CalloutVariant = "tip" | "note" | "warning";

const CALLOUT: Record<
  CalloutVariant,
  { box: string; text: string; Icon: LucideIcon; labelKey: string }
> = {
  tip: {
    box: "border-emerald-200 bg-emerald-50/70",
    text: "text-emerald-900",
    Icon: Lightbulb,
    labelKey: "callout.tip",
  },
  note: {
    box: "border-sky-200 bg-sky-50/70",
    text: "text-sky-900",
    Icon: Info,
    labelKey: "callout.note",
  },
  warning: {
    box: "border-amber-200 bg-amber-50/70",
    text: "text-amber-900",
    Icon: AlertTriangle,
    labelKey: "callout.warning",
  },
};

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockView key={block.id ?? i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: ContentBlock }) {
  const locale = useLocale();
  const t = useTranslations("learn");

  switch (block.type) {
    case "text":
      return (
        <div>
          {block.heading && (
            <h2 className="text-xl font-semibold text-slate-900">
              {getLocalized(block.heading, locale)}
            </h2>
          )}
          <p
            className={cn(
              "leading-relaxed text-slate-700",
              block.heading && "mt-2",
            )}
          >
            {getLocalized(block.body, locale)}
          </p>
        </div>
      );

    case "callout": {
      const style = CALLOUT[block.variant];
      const Icon = style.Icon;
      // Text label conveys meaning (never color alone); author title wins if set.
      const label = block.title
        ? getLocalized(block.title, locale)
        : t(style.labelKey);
      return (
        <aside className={cn("rounded-xl border p-4", style.box)}>
          <p
            className={cn(
              "flex items-center gap-2 text-sm font-semibold",
              style.text,
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </p>
          <p className={cn("mt-1 text-sm leading-relaxed", style.text)}>
            {getLocalized(block.body, locale)}
          </p>
        </aside>
      );
    }

    case "practice-question":
      if (block.question) {
        return <PracticeQuestion question={block.question} />;
      }
      // questionRef requires the bank loader (a later phase) — safe fallback.
      return (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          {t("questionUnavailable")}
        </p>
      );

    case "checklist":
      return <ChecklistView block={block} />;

    case "official-source-link":
      return <OfficialSourceLink block={block} />;

    case "lead-cta":
      return (
        <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-5">
          <p className="font-medium text-slate-900">
            {getLocalized(block.headline, locale)}
          </p>
          <Link
            href="/contact"
            className={buttonClasses("primary", "md", "mt-3")}
          >
            {t("requestHelp")}
          </Link>
        </div>
      );

    default:
      // Block types not yet supported — render nothing (no crash).
      return null;
  }
}
