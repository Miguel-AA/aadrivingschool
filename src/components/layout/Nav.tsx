import { useTranslations } from "next-intl";
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
          className="text-sm font-medium text-slate-700 hover:text-brand-700"
        >
          {t(`nav.${link.labelKey}`)}
        </Link>
      ))}
    </nav>
  );
}
