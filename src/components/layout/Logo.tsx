import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * Brand lockup: gradient "A&A" monogram tile + wordmark + tagline.
 * Server component. Wrap in a Link where it should navigate.
 */
export function Logo({
  withTagline = true,
  tone = "light",
  className,
}: {
  withTagline?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = useTranslations("common");
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-ocean-500 text-sm font-extrabold text-white shadow-sm ring-1 ring-white/20"
      >
        A&amp;A
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-base font-extrabold tracking-tight",
            tone === "dark" ? "text-white" : "text-slate-900",
          )}
        >
          {siteConfig.name}
        </span>
        {withTagline && (
          <span
            className={cn(
              "text-[11px] font-medium",
              tone === "dark" ? "text-brand-200" : "text-brand-700",
            )}
          >
            {t("brandTagline")}
          </span>
        )}
      </span>
    </span>
  );
}
