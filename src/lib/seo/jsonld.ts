import type { Locale } from "@/i18n/routing";
import type { Course, Faq } from "@/lib/schemas/content";
import { siteConfig } from "@/config/site";
import { getLocalized } from "@/lib/utils/locale";

/** Organization schema for the site (rendered once in the layout). */
export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

/** FAQPage schema built from the same FAQ data rendered on the page. */
export function faqJsonLd(faqs: Faq[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: getLocalized(faq.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: getLocalized(faq.answer, locale),
      },
    })),
  };
}

/**
 * Course schema. Intentionally omits any "approved by"/accreditation claim — we
 * do not assert state approval. Uses a generic provider name only.
 */
export function courseJsonLd(course: Course, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: getLocalized(course.title, locale),
    description: getLocalized(course.shortDescription, locale),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}
