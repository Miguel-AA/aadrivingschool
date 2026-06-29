/** Keys under the `common.nav` message namespace. */
export type NavLabelKey =
  | "courses"
  | "permitPrep"
  | "spanishHelp"
  | "ticketHelp"
  | "contact";

/**
 * Primary navigation links. Only routes that exist in this build are listed
 * (no dead links). `labelKey` resolves under the `common.nav` namespace.
 */
export const navLinks: { href: string; labelKey: NavLabelKey }[] = [
  { href: "/courses", labelKey: "courses" },
  { href: "/permit-test-prep", labelKey: "permitPrep" },
  { href: "/spanish-help", labelKey: "spanishHelp" },
  { href: "/ticket-help", labelKey: "ticketHelp" },
  { href: "/contact", labelKey: "contact" },
];
