"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks } from "./navLinks";
import { LanguageToggle } from "./LanguageToggle";

/** Mobile navigation drawer toggle (client component). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-slate-200 bg-white shadow-lg">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-slate-800 hover:bg-brand-50 hover:text-brand-700"
              >
                {t(`nav.${link.labelKey}`)}
              </Link>
            ))}
            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-base font-semibold text-brand-700 hover:bg-brand-50"
            >
              {t("nav.quiz")}
            </Link>
            <div className="px-3 pt-3">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
