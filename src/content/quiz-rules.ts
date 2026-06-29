import { QuizRuleSchema, type QuizRule } from "@/lib/schemas/content";
import { loc } from "./_loc";

/**
 * Recommendation rules. The engine AND-matches conditions and picks the highest
 * `priority` match. A Spanish-speaking first-time adult is routed to the Spanish
 * Help package (higher priority than the generic first-time path).
 */
const rules: QuizRule[] = [
  {
    id: "teen",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-teen"] }],
    recommend: { kind: "package", targetId: "teen-permit" },
    explanation: loc(
      "Because you're starting out as a teen (or supporting one), the Teen Permit Package bundles the DETS path, permit prep, and a parent guide.",
    ),
  },
  {
    id: "ticket",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-ticket"] }],
    recommend: { kind: "package", targetId: "ticket-solution" },
    explanation: loc(
      "Since you have a traffic ticket, the Ticket Solution Package explains the BDI path (where eligible) and your next steps. Always follow the instructions from your court or clerk.",
    ),
  },
  {
    id: "suspended",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-suspended"] }],
    recommend: { kind: "package", targetId: "license-reinstatement" },
    explanation: loc(
      "Because your license is suspended, the License Reinstatement Package covers the ADI path (if applicable) and a first-steps guide. Your status is decided by the state and any court orders.",
    ),
  },
  {
    id: "mature",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-mature"] }],
    recommend: { kind: "package", targetId: "55-plus-discount" },
    explanation: loc(
      "As a 55+ driver, the 55+ Insurance Discount Package includes the Mature Driver course and insurer-submission guidance. Any discount is determined by your insurer.",
    ),
  },
  {
    id: "new-fl",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-new-fl"] }],
    recommend: { kind: "package", targetId: "new-to-florida" },
    explanation: loc(
      "Since you're new to Florida, the New to Florida Package gives you a route recommendation, a document checklist, and permit prep.",
    ),
  },
  {
    id: "first-adult-spanish",
    priority: 95,
    conditions: [
      { questionId: "situation", anyOf: ["sit-first-adult"] },
      { questionId: "language", anyOf: ["lang-es"] },
    ],
    recommend: { kind: "package", targetId: "spanish-help" },
    explanation: loc(
      "You're getting started and prefer Spanish, so the Spanish Help Package pairs the right course path with the Spanish Permit Bootcamp and WhatsApp concierge.",
    ),
  },
  {
    id: "first-adult",
    priority: 90,
    conditions: [{ questionId: "situation", anyOf: ["sit-first-adult"] }],
    recommend: { kind: "package", targetId: "first-time-adult" },
    explanation: loc(
      "As an adult first-time driver, the First-Time Adult Package bundles the TLSAE path, permit prep, and a DMV-ready checklist.",
    ),
  },
  {
    id: "permit-goal",
    priority: 40,
    conditions: [{ questionId: "goal", anyOf: ["goal-permit"] }],
    recommend: { kind: "course", targetId: "permit-prep" },
    explanation: loc(
      "Since passing the knowledge exam is your priority, start with Florida Permit Test Prep.",
    ),
  },
];

export default QuizRuleSchema.array().parse(rules);
