import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

interface BuildMetadataArgs {
  title: string;
  description: string;
  /** Active locale (the [locale] route param). */
  locale: string;
  /** Path WITHOUT the locale prefix, e.g. "/courses/tlsae" or "" for home. */
  path?: string;
}

/**
 * Build per-page metadata with canonical + hreflang alternates for both locales
 * and Open Graph defaults. Keeps SEO consistent across pages.
 */
export function buildMetadata({
  title,
  description,
  locale,
  path = "",
}: BuildMetadataArgs): Metadata {
  const normalized = path && !path.startsWith("/") ? `/${path}` : path;
  const canonical = `${siteConfig.url}/${locale}${normalized}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${siteConfig.url}/${l}${normalized}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
  };
}
