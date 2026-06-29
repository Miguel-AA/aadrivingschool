import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { quizQuestions, quizRules } from "@/content";
import { Section } from "@/components/content/Section";
import { QuizStepper } from "@/components/quiz/QuizStepper";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/quiz">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "pages" });
  return buildMetadata({
    title: t("quiz.metaTitle"),
    description: t("quiz.metaDescription"),
    locale,
    path: "/quiz",
  });
}

export default async function QuizPage({
  params,
}: PageProps<"/[locale]/quiz">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "quiz" });

  return (
    <Section tone="muted">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("title")}
        </h1>
        <div className="mt-8">
          <QuizStepper questions={quizQuestions} rules={quizRules} />
        </div>
      </div>
    </Section>
  );
}
