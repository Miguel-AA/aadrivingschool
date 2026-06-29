import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation APIs. ALWAYS import `Link`, `redirect`, `usePathname`,
 * `useRouter`, and `getPathname` from here (not from `next/link` / `next/navigation`)
 * so that locale prefixing happens automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
