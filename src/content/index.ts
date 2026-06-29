import type { Course, Faq, Package, Provider } from "@/lib/schemas/content";
import coursesData from "./courses";
import packagesData from "./packages";
import providersData from "./providers";
import faqsData from "./faqs";
import quizQuestionsData from "./quiz-questions";
import quizRulesData from "./quiz-rules";

export const courses: Course[] = coursesData;
export const packages: Package[] = packagesData;
export const providers: Provider[] = providersData;
export const faqs: Faq[] = faqsData;
export const quizQuestions = quizQuestionsData;
export const quizRules = quizRulesData;

// --- Courses ---------------------------------------------------------------
export const getCourseBySlug = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);

export const getCourseById = (id: string): Course | undefined =>
  courses.find((c) => c.id === id);

export const getRegulatedCourses = (): Course[] =>
  courses.filter((c) => c.regulatoryStatus === "regulated-partner");

export const getProprietaryCourses = (): Course[] =>
  courses.filter((c) => c.regulatoryStatus === "educational-guide");

export const getFeaturedCourses = (): Course[] =>
  courses.filter((c) => c.featured);

// --- Packages --------------------------------------------------------------
export const getPackageBySlug = (slug: string): Package | undefined =>
  packages.find((p) => p.slug === slug);

export const getPackageById = (id: string): Package | undefined =>
  packages.find((p) => p.id === id);

export const getFeaturedPackages = (): Package[] =>
  packages.filter((p) => p.featured);

export const getCoursesForPackage = (pkg: Package): Course[] =>
  pkg.courseIds
    .map((id) => getCourseById(id))
    .filter((c): c is Course => Boolean(c));

// --- Catalog detail (courses + packages share /courses/[slug]) -------------
export type CatalogItem =
  | { kind: "course"; course: Course }
  | { kind: "package"; pkg: Package };

export const getCatalogItemBySlug = (slug: string): CatalogItem | null => {
  const course = getCourseBySlug(slug);
  if (course) return { kind: "course", course };
  const pkg = getPackageBySlug(slug);
  if (pkg) return { kind: "package", pkg };
  return null;
};

export const getAllCatalogSlugs = (): string[] => [
  ...courses.map((c) => c.slug),
  ...packages.map((p) => p.slug),
];

// --- Providers -------------------------------------------------------------
export const getProviderById = (id: string | null): Provider | undefined =>
  id ? providers.find((p) => p.id === id) : undefined;

// --- FAQs ------------------------------------------------------------------
export const getFaqsByIds = (ids: string[]): Faq[] =>
  ids
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is Faq => Boolean(f));

export const getGlobalFaqs = (): Faq[] =>
  faqs
    .filter((f) => f.scope === "global")
    .sort((a, b) => a.sortOrder - b.sortOrder);

export const getFaqsForCourse = (course: Course): Faq[] =>
  getFaqsByIds(course.faqIds);
