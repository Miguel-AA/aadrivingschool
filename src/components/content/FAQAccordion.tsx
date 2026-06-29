import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import type { Faq } from "@/lib/schemas/content";
import { getLocalized } from "@/lib/utils/locale";

/**
 * Accessible FAQ list using native <details>/<summary> (keyboard-operable, no
 * client JS). The matching FAQ JSON-LD is rendered separately by the page from
 * the same data so on-page content and structured data stay in sync.
 */
export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const locale = useLocale();
  if (faqs.length === 0) return null;

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {faqs.map((faq) => (
        <details key={faq.id} className="group p-4">
          <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-slate-900 marker:content-['']">
            {getLocalized(faq.question, locale)}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {getLocalized(faq.answer, locale)}
          </p>
        </details>
      ))}
    </div>
  );
}
