import { useTranslations } from "@/i18n";
import { quizQuestions, quizRules } from "@/content";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { Section } from "@/components/content/Section";
import { QuizStepper } from "@/components/quiz/QuizStepper";

/** Course Finder — the recommendation quiz (was the /quiz route). */
export function CourseFinder() {
  const t = useTranslations("quiz");
  usePageTitle(t("title"));

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
