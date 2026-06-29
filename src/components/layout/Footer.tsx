import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { navLinks } from "./navLinks";

/** Site footer: explore links, support details, and the global compliance note. */
export function Footer() {
  const t = useTranslations("common");
  const tc = useTranslations("compliance");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-base font-bold text-brand-800">
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              {t("footer.exploreHeading")}
            </h2>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-700"
                  >
                    {t(`nav.${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              {t("footer.supportHeading")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/contact" className="hover:text-brand-700">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.supportPhone}`}
                  className="hover:text-brand-700"
                >
                  {siteConfig.supportPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="hover:text-brand-700"
                >
                  {siteConfig.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            {tc("globalFooter")}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            {t("footer.rights", { year, name: siteConfig.name })}
          </p>
        </div>
      </div>
    </footer>
  );
}
