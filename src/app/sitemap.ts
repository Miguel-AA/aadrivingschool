import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { getAllCatalogSlugs } from "@/content";

const STATIC_PATHS = [
  "",
  "/courses",
  "/quiz",
  "/contact",
  "/spanish-help",
  "/permit-test-prep",
  "/ticket-help",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...getAllCatalogSlugs().map((slug) => `/courses/${slug}`),
  ];

  return paths.map((path) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${siteConfig.url}/${locale}${path}`;
    }
    return {
      url: `${siteConfig.url}/${routing.defaultLocale}${path}`,
      alternates: { languages },
    };
  });
}
