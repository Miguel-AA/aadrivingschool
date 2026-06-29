"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

/**
 * Switches locale while preserving the current path and query string. Reads
 * `window.location.search` at click time to avoid a useSearchParams Suspense
 * de-opt on otherwise-static pages.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  const select = (next: Locale) => {
    if (next === locale) return;
    const search =
      typeof window !== "undefined" ? window.location.search : "";
    router.replace(`${pathname}${search}`, { locale: next });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 p-0.5 text-sm",
        className,
      )}
      role="group"
      aria-label={t("languageToggle.label")}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => select(l)}
          aria-current={l === locale}
          className={cn(
            "rounded-full px-3 py-1 font-medium transition-colors",
            l === locale
              ? "bg-brand-700 text-white"
              : "text-slate-600 hover:text-brand-700",
          )}
        >
          {t(`languageToggle.${l}`)}
        </button>
      ))}
    </div>
  );
}
