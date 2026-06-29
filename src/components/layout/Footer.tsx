import { Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { footerLinks } from "./navLinks";
import { Logo } from "./Logo";

/** Site footer: brand, explore links, support details, and the global disclaimer. */
export function Footer() {
  const t = useTranslations("common");
  const tc = useTranslations("compliance");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-slate-300">
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-brand-500 via-ocean-500 to-accent-500"
      />
      <div className="mx-auto w-full max-w-6xl px-4 pt-14 pb-28 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              {t("footer.exploreHeading")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-brand-200"
                  >
                    {t(`nav.${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              {t("footer.supportHeading")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition-colors hover:text-brand-200"
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.supportPhone}`}
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-brand-200"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.supportPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-brand-200"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.supportEmail}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 transition-colors hover:text-brand-200"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t("cta.chatWhatsApp")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
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
