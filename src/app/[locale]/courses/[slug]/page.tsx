import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCatalogItemBySlug, getAllCatalogSlugs } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { CourseDetail } from "@/components/catalog/CourseDetail";
import { PackageDetail } from "@/components/catalog/PackageDetail";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCatalogSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/courses/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getCatalogItemBySlug(slug);
  if (!item || !hasLocale(routing.locales, locale)) return {};
  const l = locale as Locale;

  if (item.kind === "course") {
    return buildMetadata({
      title: getLocalized(item.course.seo.metaTitle, l),
      description: getLocalized(item.course.seo.metaDescription, l),
      locale: l,
      path: `/courses/${slug}`,
    });
  }
  return buildMetadata({
    title: getLocalized(item.pkg.title, l),
    description: getLocalized(item.pkg.shortDescription, l),
    locale: l,
    path: `/courses/${slug}`,
  });
}

export default async function CatalogDetailPage({
  params,
}: PageProps<"/[locale]/courses/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const item = getCatalogItemBySlug(slug);
  if (!item) notFound();

  return item.kind === "course" ? (
    <CourseDetail course={item.course} />
  ) : (
    <PackageDetail pkg={item.pkg} />
  );
}
