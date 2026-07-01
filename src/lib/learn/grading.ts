import type { LocalizedText } from "@/lib/schemas/content";
import type { MockTestConfig, PracticeQuestion } from "@/lib/schemas/learn";

/**
 * Practice grading engine (CE4a).
 *
 * Pure and deterministic — no React, no localStorage, and completely separate
 * from the Course Finder recommendation engine (src/lib/quiz/engine.ts), which
 * matches rules and has no notion of a correct answer. This grades a single
 * PracticeQuestion for *study feedback only* — there is no official pass/fail.
 *
 * Single-choice: the one selected id must be the one correct id.
 * Multi-choice: the selected set must EXACTLY equal the correct set.
 */

export interface GradeResult {
  /** True only on an exact match of selected vs. correct choice ids. */
  correct: boolean;
  /** The question's correct choice ids. */
  correctChoiceIds: string[];
  /** The user's selection, de-duplicated and limited to real choice ids. */
  selectedChoiceIds: string[];
  /** The question explanation (localized by the caller). */
  explanation: LocalizedText;
  /** Optional per-choice feedback, keyed by choice id (when authored). */
  choiceExplanations: Record<string, LocalizedText>;
}

export function gradePracticeQuestion(
  question: PracticeQuestion,
  selectedChoiceIds: string[],
): GradeResult {
  // Normalize: keep only real choice ids, de-duplicated.
  const validIds = new Set(question.choices.map((c) => c.id));
  const selected = Array.from(
    new Set(selectedChoiceIds.filter((id) => validIds.has(id))),
  );

  const correctIds = question.correctChoiceIds;
  const correctSet = new Set(correctIds);

  // Exact-match grading (works for single- and multi-choice). An empty or
  // invalid selection can never match a non-empty correct set → correct=false.
  const correct =
    selected.length === correctSet.size &&
    selected.every((id) => correctSet.has(id));

  const choiceExplanations: Record<string, LocalizedText> = {};
  for (const choice of question.choices) {
    if (choice.choiceExplanation) {
      choiceExplanations[choice.id] = choice.choiceExplanation;
    }
  }

  return {
    correct,
    correctChoiceIds: correctIds,
    selectedChoiceIds: selected,
    explanation: question.explanation,
    choiceExplanations,
  };
}

/**
 * The questions a mock test runs. "all" uses every configured question; "sample"
 * takes the first `questionCount` (deterministic — no shuffling here so runs and
 * tests are reproducible; author-side `shuffle` can be honored by the UI later).
 */
export function selectMockQuestions(config: MockTestConfig): PracticeQuestion[] {
  return config.poolStrategy === "sample"
    ? config.questions.slice(0, config.questionCount)
    : config.questions;
}

export interface MockQuestionResult {
  question: PracticeQuestion;
  selectedChoiceIds: string[];
  result: GradeResult;
}

export interface MockScore {
  score: number;
  total: number;
  percent: number;
  perQuestion: MockQuestionResult[];
}

/**
 * Deferred scoring for a whole mock test: grades every question against the
 * collected answers. Practice feedback only — no pass/fail. Unanswered questions
 * simply grade as incorrect (empty selection).
 */
export function scoreMockTest(
  questions: PracticeQuestion[],
  answers: Record<string, string[]>,
): MockScore {
  const perQuestion: MockQuestionResult[] = questions.map((question) => {
    const result = gradePracticeQuestion(question, answers[question.id] ?? []);
    return { question, selectedChoiceIds: result.selectedChoiceIds, result };
  });
  const total = questions.length;
  const score = perQuestion.filter((pq) => pq.result.correct).length;
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);
  return { score, total, percent, perQuestion };
}
