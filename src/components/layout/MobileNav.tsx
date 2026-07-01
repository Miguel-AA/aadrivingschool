
import { useEffect, useState } from "react";
import { ChevronRight, Compass } from "lucide-react";
import { useTranslations } from "@/i18n";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { navLinks, isActiveLink } from "./navLinks";
import { LanguageToggle } from "./LanguageToggle";

/** Mobile navigation drawer toggle (client component). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");
  const pathname = usePathname();

  // Lock background scroll and close on Escape while the full-screen drawer is up.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Shared transition for the three hamburger bars (morph into an X on open).
  const bar =
    "block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out";

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
        className="relative z-50 inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md text-white hover:bg-white/10"
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

      {/* Full-height drawer that continues the navy header surface. Anchored just
          below the sticky bar so the logo + close button stay visible. */}
      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full z-40 h-[calc(100dvh-100%)] overflow-y-auto",
          "bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950",
          "transition-all duration-300 ease-out",
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        )}
      >
        {/* Ambient brand glow + dotted texture, matching the header. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-10 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-ocean-500/25 blur-3xl animate-float" />
          <div className="absolute bottom-10 -right-16 h-72 w-72 rounded-full bg-accent-500/12 blur-3xl animate-float-slow" />
          <div className="absolute inset-0 bg-dot-grid text-white/[0.05]" />
        </div>

        <nav
          className="relative mx-auto flex min-h-full max-w-md flex-col px-6 pt-6 pb-10"
          aria-label="Mobile"
          aria-hidden={!open}
        >
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const active = isActiveLink(link, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? undefined : -1}
                    aria-current={active ? "page" : undefined}
                    style={{ transitionDelay: open ? `${70 + i * 45}ms` : "0ms" }}
                    className={cn(
                      "group flex items-center justify-between gap-4 border-b border-white/10 py-4",
                      "transition-all duration-300 ease-out",
                      open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-6 w-1 rounded-full bg-gradient-to-b from-accent-300 to-accent-500 transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "text-2xl font-semibold tracking-tight transition-colors",
                          active
                            ? "text-white"
                            : "text-brand-100 group-hover:text-white",
                        )}
                      >
                        {t(`nav.${link.labelKey}`)}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 shrink-0 transition-all group-hover:translate-x-1",
                        active
                          ? "text-accent-400"
                          : "text-white/25 group-hover:text-accent-300",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Primary action + language switch anchored to the bottom. */}
          <div className="mt-auto space-y-6 pt-10">
            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className={buttonClasses("primary", "lg", "w-full")}
            >
              <Compass className="h-5 w-5" aria-hidden="true" />
              {t("nav.quiz")}
            </Link>
            <div className="flex justify-center">
              <LanguageToggle tone="dark" />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
