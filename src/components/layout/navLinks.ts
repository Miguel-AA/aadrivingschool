/** Keys under the `common.nav` message namespace. */
export type NavLabelKey =
  | "home"
  | "courses"
  | "permitPrep"
  | "spanishHelp"
  | "ticketHelp"
  | "licenseReinstatement"
  | "maturePlus"
  | "newToFlorida"
  | "contact";

type NavLink = { href: string; labelKey: NavLabelKey; exact?: boolean };

/** Top navigation (concise — per the brand direction). */
export const navLinks: NavLink[] = [
  { href: "/", labelKey: "home", exact: true },
  { href: "/courses", labelKey: "courses" },
  { href: "/permit-test-prep", labelKey: "permitPrep" },
  { href: "/spanish-help", labelKey: "spanishHelp" },
  { href: "/ticket-help", labelKey: "ticketHelp" },
  { href: "/contact", labelKey: "contact" },
];

/** Whether `pathname` should mark `link` as the active nav item. */
export function isActiveLink(
  link: { href: string; exact?: boolean },
  pathname: string,
): boolean {
  if (link.exact || link.href === "/") return pathname === link.href;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

/** Footer "Explore" list — full set of landing/pathway pages. */
export const footerLinks: NavLink[] = [
  { href: "/courses", labelKey: "courses" },
  { href: "/permit-test-prep", labelKey: "permitPrep" },
  { href: "/spanish-help", labelKey: "spanishHelp" },
  { href: "/ticket-help", labelKey: "ticketHelp" },
  { href: "/license-reinstatement", labelKey: "licenseReinstatement" },
  { href: "/55-plus-driver", labelKey: "maturePlus" },
  { href: "/new-to-florida", labelKey: "newToFlorida" },
  { href: "/contact", labelKey: "contact" },
];
