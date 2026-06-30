import { useTranslations } from "@/i18n";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { BrandMark } from "./BrandMark";

/**
 * Brand lockup: the car + graduation-cap brand mark + wordmark + tagline.
 * Wrap in a Link where it should navigate. `size="lg"` gives the footer a
 * more prominent, readable mark.
 */
export function Logo({
  withTagline = true,
  tone = "light",
  size = "md",
  className,
}: {
  withTagline?: boolean;
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const t = useTranslations("common");
  const lg = size === "lg";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandMark
        className={cn(
          "shrink-0 rounded-xl shadow-sm",
          lg ? "h-12 w-12" : "h-11 w-11",
        )}
      />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display font-extrabold tracking-tight",
            lg ? "text-base sm:text-lg" : "whitespace-nowrap text-sm sm:text-base",
            tone === "dark" ? "text-white" : "text-brand-900",
          )}
        >
          {siteConfig.name}
        </span>
        {withTagline && (
          <span
            className={cn(
              "font-medium",
              lg ? "text-xs" : "text-[11px]",
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
