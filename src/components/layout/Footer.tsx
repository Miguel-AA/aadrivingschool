import { Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "@/i18n";
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-slate-300">
      {/* Bright accent line along the top edge — mirrors the header. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean-400 to-transparent"
      />
      {/* Vibrant blue glow for "brillo" — same spotlight as the header. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-16 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-ocean-500/25 blur-3xl" />
        <div className="absolute -top-12 right-10 h-24 w-40 rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-14 pb-28 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo tone="dark" size="lg" />
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="hidden sm:block">
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

        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12">
          {/* Shorter compliance note on mobile; full statement from sm up. */}
          <p className="text-xs leading-relaxed text-slate-500 sm:hidden">
            {tc("globalFooterShort")}
          </p>
          <p className="hidden text-xs leading-relaxed text-slate-500 sm:block">
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
