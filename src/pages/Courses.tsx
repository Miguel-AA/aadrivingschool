import { useTranslations } from "@/i18n";
import { courses, packages } from "@/content";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/content/Section";
import { CoursesExplorer } from "@/components/catalog/CoursesExplorer";

export function Courses() {
  const t = useTranslations("pages");
  usePageTitle(t("courses.title"));

  return (
    <>
      <Hero
        title={t("courses.title")}
        subtitle={t("courses.subtitle")}
        imageSrc="/courseshero.jpg"
      />
      <Section>
        <CoursesExplorer courses={courses} packages={packages} />
      </Section>
    </>
  );
}
