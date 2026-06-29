import { z } from "zod";

/**
 * Bilingual text. English is required and complete; Spanish may be an empty
 * string or an `[ES]` placeholder until human translation is done. The
 * `getLocalized` helper falls back to English when `es` is empty.
 */
export const LocalizedTextSchema = z.object({
  en: z.string().min(1),
  es: z.string().default(""),
});
export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

/** "partner" = regulated course delivered by an approved partner provider.
 *  "proprietary" = our own educational prep/guide (NOT a regulated course). */
export const ProviderTypeSchema = z.enum(["partner", "proprietary"]);
export type ProviderType = z.infer<typeof ProviderTypeSchema>;

export const RegulatoryStatusSchema = z.enum([
  "regulated-partner", // TLSAE, DETS, BDI, ADI, Mature55, WCD
  "educational-guide", // proprietary prep/guides
]);
export type RegulatoryStatus = z.infer<typeof RegulatoryStatusSchema>;

export const CourseCategorySchema = z.enum([
  // regulated / partner
  "tlsae",
  "dets",
  "bdi",
  "adi",
  "mature55",
  "wcd",
  // proprietary
  "permit-prep",
  "spanish-prep",
  "road-signs",
  "new-to-fl",
  "parent-teen",
  "dmv-checklist",
  "defensive-refresher",
  "suspension-guide",
]);
export type CourseCategory = z.infer<typeof CourseCategorySchema>;

// Compliance label keys map to approved phrasing in the compliance messages.
export const ComplianceLabelKeySchema = z.enum([
  "partner-provided",
  "educational-guide",
  "not-official-dmv",
  "no-guarantee",
]);
export type ComplianceLabelKey = z.infer<typeof ComplianceLabelKeySchema>;

/** Labels that EVERY regulated-partner course must display. */
export const REQUIRED_PARTNER_LABELS: ComplianceLabelKey[] = [
  "partner-provided",
  "not-official-dmv",
  "no-guarantee",
];

export const SeoSchema = z.object({
  metaTitle: LocalizedTextSchema,
  metaDescription: LocalizedTextSchema,
});

export const CourseSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    category: CourseCategorySchema,
    providerType: ProviderTypeSchema,
    regulatoryStatus: RegulatoryStatusSchema,
    providerId: z.string().nullable(), // FK -> providers; null for proprietary
    title: LocalizedTextSchema,
    shortDescription: LocalizedTextSchema, // used by CourseCard
    longDescription: LocalizedTextSchema, // used by detail page
    whoIsItFor: LocalizedTextSchema,
    bullets: z.array(LocalizedTextSchema).default([]),
    priceUsd: z.number().nullable(), // null => "request info" / contact
    durationLabel: LocalizedTextSchema.nullable().default(null),
    complianceLabels: z.array(ComplianceLabelKeySchema).default([]),
    faqIds: z.array(z.string()).default([]),
    seo: SeoSchema,
    featured: z.boolean().default(false),
  })
  .refine(
    (c) =>
      c.regulatoryStatus !== "regulated-partner" ||
      (c.providerId !== null &&
        REQUIRED_PARTNER_LABELS.every((l) => c.complianceLabels.includes(l))),
    {
      message:
        "Regulated-partner courses must have a providerId and include the partner-provided, not-official-dmv, and no-guarantee compliance labels.",
    },
  );
export type Course = z.infer<typeof CourseSchema>;

export const PackageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: LocalizedTextSchema,
  targetUser: LocalizedTextSchema,
  shortDescription: LocalizedTextSchema,
  benefits: z.array(LocalizedTextSchema).default([]),
  courseIds: z.array(z.string()).default([]), // FK -> courses
  priceUsd: z.number().nullable(),
  featured: z.boolean().default(false),
});
export type Package = z.infer<typeof PackageSchema>;

export const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  // High-level approval description shown as attribution. Keep factual; do not
  // assert state approval unless confirmed in writing.
  attributionText: LocalizedTextSchema,
  enrollmentUrl: z.string().nullable().default(null),
});
export type Provider = z.infer<typeof ProviderSchema>;

export const FaqScopeSchema = z.enum(["global", "course", "package", "page"]);
export const FaqSchema = z.object({
  id: z.string(),
  question: LocalizedTextSchema,
  answer: LocalizedTextSchema,
  scope: FaqScopeSchema.default("global"),
  scopeRef: z.string().optional(), // course/package id or page slug
  sortOrder: z.number().default(0),
});
export type Faq = z.infer<typeof FaqSchema>;

export const QuizAnswerSchema = z.object({
  id: z.string(),
  label: LocalizedTextSchema,
});
export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;

export const QuizQuestionSchema = z.object({
  id: z.string(),
  order: z.number(),
  prompt: LocalizedTextSchema,
  helpText: LocalizedTextSchema.optional(),
  type: z.enum(["single", "multi"]),
  answers: z.array(QuizAnswerSchema).min(2),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const QuizRuleSchema = z.object({
  id: z.string(),
  priority: z.number(), // higher wins
  // All conditions must match (AND). A condition matches when the selected
  // answer(s) for `questionId` intersect `anyOf`.
  conditions: z
    .array(
      z.object({
        questionId: z.string(),
        anyOf: z.array(z.string()).min(1),
      }),
    )
    .min(1),
  recommend: z.object({
    kind: z.enum(["course", "package"]),
    targetId: z.string(),
  }),
  explanation: LocalizedTextSchema,
});
export type QuizRule = z.infer<typeof QuizRuleSchema>;
