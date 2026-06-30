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
      "Como estás empezando siendo adolescente (o apoyando a uno), la Ruta del permiso para adolescentes reúne la ruta DETS, la preparación del permiso y una guía para padres.",
    ),
  },
  {
    id: "ticket",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-ticket"] }],
    recommend: { kind: "package", targetId: "ticket-solution" },
    explanation: loc(
      "Since you have a traffic ticket, the Ticket Solution Package explains the BDI path (where eligible) and your next steps. Always follow the instructions from your court or clerk.",
      "Como tienes una multa de tránsito, la Ruta de educación sobre multas explica la ruta BDI (cuando eres elegible) y tus próximos pasos. Sigue siempre las instrucciones de tu tribunal o secretario.",
    ),
  },
  {
    id: "suspended",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-suspended"] }],
    recommend: { kind: "package", targetId: "license-reinstatement" },
    explanation: loc(
      "Because your license is suspended, the License Reinstatement Package covers the ADI path (if applicable) and a first-steps guide. Your status is decided by the state and any court orders.",
      "Como tu licencia está suspendida, la Ruta de reinstalación de licencia cubre la ruta ADI (si corresponde) y una guía de primeros pasos. Tu estado lo deciden el estado y cualquier orden judicial.",
    ),
  },
  {
    id: "mature",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-mature"] }],
    recommend: { kind: "package", targetId: "55-plus-discount" },
    explanation: loc(
      "As a 55+ driver, the 55+ Insurance Discount Package includes the Mature Driver course and insurer-submission guidance. Any discount is determined by your insurer.",
      "Como conductor de 55 años o más, la Ruta del conductor maduro 55+ incluye el curso para conductores maduros y orientación para el envío a la aseguradora. Cualquier descuento lo determina tu aseguradora.",
    ),
  },
  {
    id: "new-fl",
    priority: 100,
    conditions: [{ questionId: "situation", anyOf: ["sit-new-fl"] }],
    recommend: { kind: "package", targetId: "new-to-florida" },
    explanation: loc(
      "Since you're new to Florida, the New to Florida Package gives you a route recommendation, a document checklist, and permit prep.",
      "Como eres nuevo en Florida, la Ruta para quienes son nuevos en Florida te da una recomendación de ruta, una lista de documentos y preparación del permiso.",
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
      "Estás empezando y prefieres el español, así que la Ruta del conductor hispanohablante combina la ruta de curso adecuada con el Bootcamp del permiso en español y el soporte personalizado por WhatsApp.",
    ),
  },
  {
    id: "first-adult",
    priority: 90,
    conditions: [{ questionId: "situation", anyOf: ["sit-first-adult"] }],
    recommend: { kind: "package", targetId: "first-time-adult" },
    explanation: loc(
      "As an adult first-time driver, the First-Time Adult Package bundles the TLSAE path, permit prep, and a DMV-ready checklist.",
      "Como conductor adulto primerizo, la Ruta del conductor primerizo reúne la ruta TLSAE, la preparación del permiso y una lista de verificación para el DMV.",
    ),
  },
  {
    id: "permit-goal",
    priority: 40,
    conditions: [{ questionId: "goal", anyOf: ["goal-permit"] }],
    recommend: { kind: "course", targetId: "permit-prep" },
    explanation: loc(
      "Since passing the knowledge exam is your priority, start with Florida Permit Test Prep.",
      "Como tu prioridad es aprobar el examen teórico, empieza con la Preparación del examen del permiso de Florida.",
    ),
  },
];

export default QuizRuleSchema.array().parse(rules);
