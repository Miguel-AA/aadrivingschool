import { Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { siteConfig, contact } from "@/config/site";
import { footerLinks } from "./navLinks";
import { Logo } from "./Logo";

/** Site footer: brand, explore links, support details, and the global disclaimer. */
export function Footer() {
  const t = useTranslations("common");
  const tc = useTranslations("compliance");
  const year = new Date().getFullYear();

  const linkClass =
    "text-sm text-slate-400 transition-colors hover:text-white";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-slate-300">
      {/* Bright accent line along the top edge — mirrors the header. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean-400 to-transparent"
      />
      {/* Ambient brand glow + dotted texture — same language as the menu. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-16 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-ocean-500/25 blur-3xl" />
        <div className="absolute -top-12 right-10 h-24 w-40 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-dot-grid text-white/[0.04]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-14 pb-28 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex justify-center sm:justify-start">
              <Logo tone="dark" size="lg" />
            </div>
            <p className="mx-auto mt-4 max-w-sm text-sm text-slate-400 sm:mx-0">
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
                  <Link href={link.href} className={linkClass}>
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
                <Link href="/contact" className={linkClass}>
                  {t("nav.contact")}
                </Link>
              </li>
              {contact.hasPhone && (
                <li>
                  <a
                    href={contact.telHref}
                    className="flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white sm:justify-start"
                  >
                    <Phone className="h-4 w-4 text-accent-400" aria-hidden="true" />
                    {siteConfig.supportPhone}
                  </a>
                </li>
              )}
              {contact.hasEmail && (
                <li>
                  <a
                    href={contact.mailtoHref}
                    className="flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white sm:justify-start"
                  >
                    <Mail className="h-4 w-4 text-accent-400" aria-hidden="true" />
                    {siteConfig.supportEmail}
                  </a>
                </li>
              )}
              {contact.hasWhatsapp && (
                <li>
                  <a
                    href={contact.whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white sm:justify-start"
                  >
                    <MessageCircle
                      className="h-4 w-4 text-accent-400"
                      aria-hidden="true"
                    />
                    {t("cta.chatWhatsApp")}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              {t("footer.legalHeading")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className={linkClass}>
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/refund" className={linkClass}>
                  {t("footer.refund")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center sm:mt-12 sm:text-left">
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
