import { createElement } from "react";
import type { LucideIcon } from "lucide-react";

/** Renders a Lucide icon passed as data (via createElement) so callers don't
 *  alias a component during render (satisfies react-hooks/static-components). */
export function Icon({
  icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return createElement(icon, { className, "aria-hidden": true });
}
