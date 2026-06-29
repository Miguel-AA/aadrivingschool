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
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {faqs.map((faq) => (
        <details key={faq.id} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-medium text-slate-900 transition-colors marker:content-[''] hover:bg-slate-50 group-open:text-brand-700">
            {getLocalized(faq.question, locale)}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-brand-600"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
            {getLocalized(faq.answer, locale)}
          </p>
        </details>
      ))}
    </div>
  );
}
