import { useTranslations } from "@/i18n";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { BrandMark } from "./BrandMark";

/**
 * Brand lockup: the car + graduation-cap brand mark + wordmark + tagline.
 * Wrap in a Link where it should navigate.
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
      <BrandMark className="h-10 w-10 shrink-0 rounded-xl shadow-sm" />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-sm font-extrabold tracking-tight sm:text-base",
            tone === "dark" ? "text-white" : "text-brand-900",
          )}
        >
          {siteConfig.name}
        </span>
        {withTagline && (
          <span
            className={cn(
              "text-[11px] font-medium",
              tone === "dark" ? "text-brand-200" : "text-accent-600",
            )}
          >
            {t("brandTagline")}
          </span>
        )}
      </span>
    </span>
  );
}
