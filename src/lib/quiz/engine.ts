import type { LocalizedText, QuizRule } from "@/lib/schemas/content";

/** Map of questionId -> selected answer id(s). */
export type QuizAnswers = Record<string, string[]>;

export type Recommendation = {
  kind: "course" | "package";
  targetId: string;
  /** Id of the matched rule, or null when the fallback was used. */
  ruleId: string | null;
  /** Rule explanation; null for the fallback (callers show generic copy). */
  explanation: LocalizedText | null;
};

/** Safe default when no rule matches. */
export const FALLBACK_TARGET = {
  kind: "package" as const,
  targetId: "first-time-adult",
};

function ruleMatches(rule: QuizRule, answers: QuizAnswers): boolean {
  return rule.conditions.every((condition) => {
    const selected = answers[condition.questionId] ?? [];
    return selected.some((answerId) => condition.anyOf.includes(answerId));
  });
}

/**
 * Pure recommendation engine. AND-matches each rule's conditions, then returns
 * the highest-priority match (deterministic: ties broken by original order via
 * a stable sort). Always returns a recommendation, falling back when nothing
 * matches so every quiz path yields a result.
 */
export function recommend(
  answers: QuizAnswers,
  rules: QuizRule[],
): Recommendation {
  const matched = rules
    .filter((rule) => ruleMatches(rule, answers))
    .sort((a, b) => b.priority - a.priority);

  const top = matched[0];
  if (top) {
    return {
      kind: top.recommend.kind,
      targetId: top.recommend.targetId,
      ruleId: top.id,
      explanation: top.explanation,
    };
  }

  return {
    kind: FALLBACK_TARGET.kind,
    targetId: FALLBACK_TARGET.targetId,
    ruleId: null,
    explanation: null,
  };
}
