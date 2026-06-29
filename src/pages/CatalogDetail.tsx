import { useParams } from "react-router-dom";
import { useLocale } from "@/i18n";
import { getCatalogItemBySlug } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { CourseDetail } from "@/components/catalog/CourseDetail";
import { PackageDetail } from "@/components/catalog/PackageDetail";
import { NotFound } from "./NotFound";

/** Course/package detail (replaces the dynamic [slug] route). */
export function CatalogDetail() {
  const { slug } = useParams();
  const locale = useLocale();
  const item = slug ? getCatalogItemBySlug(slug) : null;

  const title = item
    ? item.kind === "course"
      ? getLocalized(item.course.title, locale)
      : getLocalized(item.pkg.title, locale)
    : undefined;
  usePageTitle(title);

  if (!item) return <NotFound />;
  return item.kind === "course" ? (
    <CourseDetail course={item.course} />
  ) : (
    <PackageDetail pkg={item.pkg} />
  );
}
