import { z } from "zod";
import { LocalizedTextSchema } from "@/lib/schemas/content";

/**
 * Course-engine (learn) schemas — CE3a foundation.
 *
 * The MARKETING catalog stays in src/content/courses.ts. This file models the
 * separate LEARN content that drives the future course player: a LearnCourse of
 * modules → lessons → content blocks, plus gradable questions, a mock-test
 * config, and the localStorage progress shape (typed now; persistence built
 * later in CE3c). Every localized field reuses LocalizedTextSchema so authors
 * use the same `loc(en, es)` pattern as the rest of the content layer.
 *
 * Objects are `.strict()` to catch authoring typos (unknown keys are rejected,
 * not silently dropped). Cross-field rules (unique ids/slugs, reserved slugs,
 * one-of question source) are enforced by refinements so bad data fails at
 * import — never at render time.
 */

/** Lesson slugs reserved for player sub-routes; a lesson may not use them. */
export const RESERVED_LESSON_SLUGS = ["review", "mock-test", "complete"] as const;

/** kebab-case slug (a-z, 0-9, single hyphens between segments). */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** ISO calendar date, e.g. "2026-07-01". */
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Optional media that MUST carry alt text whenever it is present. */
const MediaSchema = z
  .object({
    src: z.string().min(1),
    alt: LocalizedTextSchema,
  })
  .strict();

// ---------------------------------------------------------------------------
// Disclaimer presets (keys only — copy lives in content/learn/_shared)
// ---------------------------------------------------------------------------

export const DisclaimerPresetSchema = z.enum([
  "standard-practice", // English study/practice products (e.g. Permit Test Prep)
  "spanish-bootcamp", // bilingual product where the official exam is in English
  "info-guide", // guidance/checklist products (e.g. New to Florida)
]);
export type DisclaimerPreset = z.infer<typeof DisclaimerPresetSchema>;

// ---------------------------------------------------------------------------
// Gradable questions (shared by inline practice and the mock test)
// ---------------------------------------------------------------------------

export const AnswerChoiceSchema = z
  .object({
    id: z.string().min(1),
    label: LocalizedTextSchema,
    /** Optional per-choice feedback shown after answering. */
    choiceExplanation: LocalizedTextSchema.optional(),
  })
  .strict();
export type AnswerChoice = z.infer<typeof AnswerChoiceSchema>;

export const PracticeQuestionSchema = z
  .object({
    id: z.string().min(1),
    /** Single-choice today; multi-choice supported for later use. */
    type: z.enum(["single", "multi"]).default("single"),
    prompt: LocalizedTextSchema,
    choices: z.array(AnswerChoiceSchema).min(2),
    /** Required: at least one correct choice id (must exist in `choices`). */
    correctChoiceIds: z.array(z.string().min(1)).min(1),
    /** Required: shown after answering — critical for bilingual explanations. */
    explanation: LocalizedTextSchema,
    media: MediaSchema.optional(),
    topicTag: z.string().optional(),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  })
  .strict()
  .superRefine((q, ctx) => {
    const ids = q.choices.map((c) => c.id);
    const idSet = new Set(ids);
    if (idSet.size !== ids.length) {
      ctx.addIssue({
        code: "custom",
        path: ["choices"],
        message: "Answer choice ids must be unique within a question.",
      });
    }
    for (const cid of q.correctChoiceIds) {
      if (!idSet.has(cid)) {
        ctx.addIssue({
          code: "custom",
          path: ["correctChoiceIds"],
          message: `correctChoiceIds references unknown choice id "${cid}".`,
        });
      }
    }
    if (q.type === "single" && q.correctChoiceIds.length !== 1) {
      ctx.addIssue({
        code: "custom",
        path: ["correctChoiceIds"],
        message: "Single-choice questions must have exactly one correct choice.",
      });
    }
  });
export type PracticeQuestion = z.infer<typeof PracticeQuestionSchema>;

// ---------------------------------------------------------------------------
// Content blocks (discriminated on `type`)
// ---------------------------------------------------------------------------

export const TextBlockSchema = z
  .object({
    type: z.literal("text"),
    id: z.string().optional(),
    heading: LocalizedTextSchema.optional(),
    body: LocalizedTextSchema,
  })
  .strict();
export type TextBlock = z.infer<typeof TextBlockSchema>;

export const CalloutBlockSchema = z
  .object({
    type: z.literal("callout"),
    id: z.string().optional(),
    /** Variant is conveyed by icon + label text at render time (not color-only). */
    variant: z.enum(["tip", "warning", "note"]),
    title: LocalizedTextSchema.optional(),
    body: LocalizedTextSchema,
  })
  .strict();
export type CalloutBlock = z.infer<typeof CalloutBlockSchema>;

export const ImageBlockSchema = z
  .object({
    type: z.literal("image"),
    id: z.string().optional(),
    src: z.string().min(1),
    /** Required alt text (localized) — accessibility. */
    alt: LocalizedTextSchema,
    caption: LocalizedTextSchema.optional(),
  })
  .strict();
export type ImageBlock = z.infer<typeof ImageBlockSchema>;

export const RoadSignBlockSchema = z
  .object({
    type: z.literal("road-sign"),
    id: z.string().optional(),
    src: z.string().min(1),
    /** Required alt text (localized) — accessibility. */
    alt: LocalizedTextSchema,
    meaning: LocalizedTextSchema,
    signCategory: z.enum(["regulatory", "warning", "guide"]).optional(),
  })
  .strict();
export type RoadSignBlock = z.infer<typeof RoadSignBlockSchema>;

export const VocabularyPairBlockSchema = z
  .object({
    type: z.literal("vocabulary-pair"),
    id: z.string().optional(),
    /** English term is preserved verbatim (the official exam is in English). */
    termEn: z.string().min(1),
    explanation: LocalizedTextSchema,
    termEsHint: z.string().optional(),
    example: LocalizedTextSchema.optional(),
  })
  .strict();
export type VocabularyPairBlock = z.infer<typeof VocabularyPairBlockSchema>;

export const FlashcardBlockSchema = z
  .object({
    type: z.literal("flashcard"),
    id: z.string().optional(),
    front: LocalizedTextSchema,
    back: LocalizedTextSchema,
    media: MediaSchema.optional(),
    tags: z.array(z.string()).optional(),
  })
  .strict();
export type FlashcardBlock = z.infer<typeof FlashcardBlockSchema>;

export const PracticeQuestionBlockSchema = z
  .object({
    type: z.literal("practice-question"),
    id: z.string().optional(),
    /** Provide EXACTLY ONE of `question` (inline) or `questionRef` (bank id). */
    question: PracticeQuestionSchema.optional(),
    questionRef: z.string().optional(),
  })
  .strict();
export type PracticeQuestionBlock = z.infer<typeof PracticeQuestionBlockSchema>;

export const ChecklistItemSchema = z
  .object({
    id: z.string().min(1),
    label: LocalizedTextSchema,
  })
  .strict();
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;

export const ChecklistBlockSchema = z
  .object({
    type: z.literal("checklist"),
    id: z.string().optional(),
    title: LocalizedTextSchema.optional(),
    items: z.array(ChecklistItemSchema).min(1),
  })
  .strict();
export type ChecklistBlock = z.infer<typeof ChecklistBlockSchema>;

export const DownloadBlockSchema = z
  .object({
    type: z.literal("download"),
    id: z.string().optional(),
    label: LocalizedTextSchema,
    /** May be a placeholder in MVP (e.g. "#"); real asset path added later. */
    href: z.string().min(1),
    /** Reserved for the optional soft-gate (lead capture) in a later phase. */
    requiresLead: z.boolean().default(false),
    fileKind: z.enum(["pdf", "checklist", "other"]).optional(),
  })
  .strict();
export type DownloadBlock = z.infer<typeof DownloadBlockSchema>;

export const LeadCtaBlockSchema = z
  .object({
    type: z.literal("lead-cta"),
    id: z.string().optional(),
    headline: LocalizedTextSchema,
    /** Passthrough defaults for the existing LeadForm. */
    sourcePage: z.string().optional(),
    recommendation: z.string().optional(),
  })
  .strict();
export type LeadCtaBlock = z.infer<typeof LeadCtaBlockSchema>;

export const OfficialSourceLinkBlockSchema = z
  .object({
    type: z.literal("official-source-link"),
    id: z.string().optional(),
    label: LocalizedTextSchema,
    /** Must be a real URL (e.g. an flhsmv.gov page). */
    href: z.string().url(),
    note: LocalizedTextSchema.optional(),
  })
  .strict();
export type OfficialSourceLinkBlock = z.infer<typeof OfficialSourceLinkBlockSchema>;

export const ContentBlockSchema = z.discriminatedUnion("type", [
  TextBlockSchema,
  CalloutBlockSchema,
  ImageBlockSchema,
  RoadSignBlockSchema,
  VocabularyPairBlockSchema,
  FlashcardBlockSchema,
  PracticeQuestionBlockSchema,
  ChecklistBlockSchema,
  DownloadBlockSchema,
  LeadCtaBlockSchema,
  OfficialSourceLinkBlockSchema,
]);
export type ContentBlock = z.infer<typeof ContentBlockSchema>;

// ---------------------------------------------------------------------------
// Structure: lesson → module → course
// ---------------------------------------------------------------------------

const LessonSlugSchema = z
  .string()
  .regex(SLUG_RE, "Lesson slug must be kebab-case (a-z, 0-9, hyphens).")
  .refine((s) => !(RESERVED_LESSON_SLUGS as readonly string[]).includes(s), {
    message: `Lesson slug is reserved (${RESERVED_LESSON_SLUGS.join(", ")}).`,
  });

export const LearnLessonSchema = z
  .object({
    id: z.string().min(1),
    slug: LessonSlugSchema,
    order: z.number().int(),
    title: LocalizedTextSchema,
    objective: LocalizedTextSchema.optional(),
    estimatedMinutes: z.number().int().positive().optional(),
    blocks: z.array(ContentBlockSchema).min(1),
  })
  .strict();
export type LearnLesson = z.infer<typeof LearnLessonSchema>;

export const LearnModuleSchema = z
  .object({
    id: z.string().min(1),
    order: z.number().int(),
    title: LocalizedTextSchema,
    summary: LocalizedTextSchema.optional(),
    lessons: z.array(LearnLessonSchema).min(1),
  })
  .strict();
export type LearnModule = z.infer<typeof LearnModuleSchema>;

export const MockTestConfigSchema = z
  .object({
    questionCount: z.number().int().positive(),
    poolStrategy: z.enum(["all", "sample"]),
    /** Framing copy — never a pass/fail guarantee. */
    passInfoText: LocalizedTextSchema,
    timeLimitMinutes: z.number().int().positive().nullable().default(null),
    sampleFromTags: z.array(z.string()).optional(),
    shuffle: z.boolean().default(false),
    /**
     * The mock test's own small question set (kept here, not a large bank). With
     * poolStrategy "all" every question is used; "sample" takes `questionCount`.
     */
    questions: z.array(PracticeQuestionSchema).default([]),
  })
  .strict();
export type MockTestConfig = z.infer<typeof MockTestConfigSchema>;

export const LearnFormatSchema = z.enum(["course", "wizard"]);
export type LearnFormat = z.infer<typeof LearnFormatSchema>;

export const LocaleModeSchema = z.enum(["bilingual", "en-first"]);
export type LocaleMode = z.infer<typeof LocaleModeSchema>;

export const LearnCourseSchema = z
  .object({
    id: z.string().min(1),
    /** FK → an existing marketing course slug in courses.ts. */
    catalogSlug: z.string().min(1),
    format: LearnFormatSchema,
    localeMode: LocaleModeSchema,
    disclaimerPreset: DisclaimerPresetSchema,
    /** ISO date (YYYY-MM-DD) the content was last reviewed for accuracy. */
    lastReviewed: z
      .string()
      .regex(ISO_DATE_RE, "lastReviewed must be an ISO date (YYYY-MM-DD)."),
    estimatedMinutes: z.number().int().positive().optional(),
    mockTest: MockTestConfigSchema.nullable().default(null),
    downloads: z.array(DownloadBlockSchema).optional(),
    modules: z.array(LearnModuleSchema).min(1),
  })
  .strict()
  .superRefine((course, ctx) => {
    const moduleIds = new Set<string>();
    const lessonIds = new Set<string>();
    const lessonSlugs = new Set<string>();

    course.modules.forEach((mod, mi) => {
      if (moduleIds.has(mod.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["modules", mi, "id"],
          message: `Duplicate module id "${mod.id}" within the course.`,
        });
      }
      moduleIds.add(mod.id);

      mod.lessons.forEach((lesson, li) => {
        if (lessonIds.has(lesson.id)) {
          ctx.addIssue({
            code: "custom",
            path: ["modules", mi, "lessons", li, "id"],
            message: `Duplicate lesson id "${lesson.id}" within the course.`,
          });
        }
        lessonIds.add(lesson.id);

        if (lessonSlugs.has(lesson.slug)) {
          ctx.addIssue({
            code: "custom",
            path: ["modules", mi, "lessons", li, "slug"],
            message: `Duplicate lesson slug "${lesson.slug}" within the course.`,
          });
        }
        lessonSlugs.add(lesson.slug);

        lesson.blocks.forEach((block, bi) => {
          if (block.type === "practice-question") {
            const hasInline = block.question !== undefined;
            const hasRef = block.questionRef !== undefined;
            if (hasInline === hasRef) {
              ctx.addIssue({
                code: "custom",
                path: ["modules", mi, "lessons", li, "blocks", bi],
                message:
                  "A practice-question block must set exactly one of `question` or `questionRef`.",
              });
            }
          }
        });
      });
    });
  });
export type LearnCourse = z.infer<typeof LearnCourseSchema>;
/** Authoring type — defaulted fields (mockTest, requiresLead, etc.) optional. */
export type LearnCourseInput = z.input<typeof LearnCourseSchema>;

// ---------------------------------------------------------------------------
// Progress (typed now; localStorage persistence built later in CE3c)
// ---------------------------------------------------------------------------

export const MockAttemptSchema = z
  .object({
    score: z.number().int().nonnegative(),
    total: z.number().int().positive(),
    takenClientSide: z.boolean().default(true),
  })
  .strict();
export type MockAttempt = z.infer<typeof MockAttemptSchema>;

/**
 * Per-course progress persisted under `aa-learn:v1:<courseSlug>` (CE3c). No PII
 * — device-local only. Not implemented here; typed so future code shares it.
 */
export const LearnProgressSchema = z
  .object({
    version: z.literal("v1"),
    courseSlug: z.string().min(1),
    completedLessonIds: z.array(z.string()).default([]),
    lastLessonSlug: z.string().nullable().default(null),
    checklistState: z.record(z.string(), z.boolean()).default({}),
    flashcardState: z
      .record(z.string(), z.enum(["known", "unknown"]))
      .default({}),
    mockAttempts: z.array(MockAttemptSchema).default([]),
    /** Client-set, non-authoritative. */
    lastVisitedAt: z.string().optional(),
  })
  .strict();
export type LearnProgress = z.infer<typeof LearnProgressSchema>;
