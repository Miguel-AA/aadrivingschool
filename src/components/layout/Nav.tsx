import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { navLinks } from "./navLinks";

/** Desktop navigation links (server component). */
export function Nav() {
  const t = useTranslations("common");
  return (
    <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group relative text-sm font-medium text-slate-700 transition-colors hover:text-brand-700"
        >
          {t(`nav.${link.labelKey}`)}
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-brand-600 to-ocean-500 transition-all duration-300 group-hover:w-full"
          />
        </Link>
      ))}
    </nav>
  );
}
