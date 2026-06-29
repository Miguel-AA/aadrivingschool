import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Next.js 16 renamed Middleware to "Proxy" (same functionality, new filename).
 * next-intl's `createMiddleware` produces a handler with the standard
 * (NextRequest) -> NextResponse signature, so it works unchanged as the proxy.
 *
 * This negotiates the locale, redirects `/` to a locale-prefixed path, and
 * rewrites locale-prefixed requests to the `[locale]` segment.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next internals, and files with an
  // extension (static assets). Locale routing only applies to pages.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
