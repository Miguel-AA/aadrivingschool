/** Keys under the `common.nav` message namespace. */
export type NavLabelKey =
  | "courses"
  | "permitPrep"
  | "spanishHelp"
  | "ticketHelp"
  | "licenseReinstatement"
  | "maturePlus"
  | "newToFlorida"
  | "contact";

type NavLink = { href: string; labelKey: NavLabelKey };

/** Top navigation (concise — per the brand direction). */
export const navLinks: NavLink[] = [
  { href: "/courses", labelKey: "courses" },
  { href: "/permit-test-prep", labelKey: "permitPrep" },
  { href: "/spanish-help", labelKey: "spanishHelp" },
  { href: "/ticket-help", labelKey: "ticketHelp" },
  { href: "/contact", labelKey: "contact" },
];

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
