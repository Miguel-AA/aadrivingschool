import { useTranslations } from "@/i18n";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { navLinks, isActiveLink } from "./navLinks";

/** Desktop navigation links with active-page highlighting. */
export function Nav() {
  const t = useTranslations("common");
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
      {navLinks.map((link) => {
        const active = isActiveLink(link, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative text-sm font-medium transition-colors",
              active ? "text-white" : "text-brand-100 hover:text-white",
            )}
          >
            {t(`nav.${link.labelKey}`)}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 transition-all duration-300",
                active ? "w-full" : "w-0 group-hover:w-full",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
