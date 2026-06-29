import { useLocale, useSetLocale, useTranslations } from "@/i18n";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

/**
 * Switches the active locale (tracked in React state / localStorage). The SPA
 * re-renders translated copy in place without changing the URL.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = useTranslations("common");

  const select = (next: Locale) => {
    if (next !== locale) setLocale(next);
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
