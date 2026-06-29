import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { courses, packages } from "@/content";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/content/Section";
import { CoursesExplorer } from "@/components/catalog/CoursesExplorer";

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

  return (
    <>
      <Hero
        eyebrow={t("courses.title")}
        title={t("courses.title")}
        subtitle={t("courses.subtitle")}
      />

      <Section>
        <CoursesExplorer courses={courses} packages={packages} />
      </Section>
    </>
  );
}
