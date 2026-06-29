import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getRegulatedCourses,
  getProprietaryCourses,
  packages,
} from "@/content";
import { Hero } from "@/components/content/Hero";
import { Section, SectionHeading } from "@/components/content/Section";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CourseCard } from "@/components/catalog/CourseCard";
import { PackageCard } from "@/components/catalog/PackageCard";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/courses">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "pages" });
  return buildMetadata({
    title: t("courses.metaTitle"),
    description: t("courses.metaDescription"),
    locale,
    path: "/courses",
  });
}

export default async function CoursesPage({
  params,
}: PageProps<"/[locale]/courses">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const regulated = getRegulatedCourses();
  const proprietary = getProprietaryCourses();

  return (
    <>
      <Hero
        eyebrow={t("courses.title")}
        title={t("courses.title")}
        subtitle={t("courses.subtitle")}
      />

      <Section>
        <SectionHeading
          title={t("courses.regulatedHeading")}
          subtitle={t("courses.regulatedSubheading")}
        />
        <CatalogGrid>
          {regulated.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </CatalogGrid>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title={t("courses.proprietaryHeading")}
          subtitle={t("courses.proprietarySubheading")}
        />
        <CatalogGrid>
          {proprietary.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </CatalogGrid>
      </Section>

      <Section>
        <SectionHeading
          title={t("courses.packagesHeading")}
          subtitle={t("courses.packagesSubheading")}
        />
        <CatalogGrid>
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </CatalogGrid>
      </Section>
    </>
  );
}
