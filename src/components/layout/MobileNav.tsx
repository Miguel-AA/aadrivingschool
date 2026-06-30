
import { useState } from "react";
import { useTranslations } from "@/i18n";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { navLinks, isActiveLink } from "./navLinks";
import { LanguageToggle } from "./LanguageToggle";

/** Mobile navigation drawer toggle (client component). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");
  const pathname = usePathname();

  // Shared transition for the three hamburger bars (morph into an X on open).
  const bar = "block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out";

  return (
    // Drawer (with nav links + the language toggle) is available below xl, the
    // same breakpoint where the desktop nav + desktop toggle take over. This
    // keeps the language toggle reachable across the tight 1024–1279px band,
    // where the desktop header has no room for it.
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        className="inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md text-white hover:bg-white/10"
      >
        <span
          className={cn(bar, open && "translate-y-[7px] rotate-45")}
          aria-hidden="true"
        />
        <span className={cn(bar, open && "opacity-0")} aria-hidden="true" />
        <span
          className={cn(bar, open && "-translate-y-[7px] -rotate-45")}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          "absolute inset-x-0 top-full z-40 origin-top border-b border-slate-200 bg-white shadow-lg transition-all duration-300 ease-out",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-3 opacity-0",
        )}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
          aria-label="Mobile"
          aria-hidden={!open}
        >
          {navLinks.map((link) => {
            const active = isActiveLink(link, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-base font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-800 hover:bg-brand-50 hover:text-brand-700",
                )}
              >
                {t(`nav.${link.labelKey}`)}
              </Link>
            );
          })}
          <Link
            href="/quiz"
            onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}
            className="rounded-md px-3 py-2 text-base font-semibold text-brand-700 hover:bg-brand-50"
          >
            {t("nav.quiz")}
          </Link>
          <div className="px-3 pt-3">
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
