import { Star } from "lucide-react";
import { useTranslations } from "@/i18n";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * Brand lockup: navy gradient tile with a star mark ("Top 1") + wordmark +
 * tagline. Server component. Wrap in a Link where it should navigate.
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
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-sm ring-1 ring-white/10"
      >
        <Star className="h-5 w-5 fill-accent-400 text-accent-400" />
      </span>
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
