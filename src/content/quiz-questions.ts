import { QuizQuestionSchema, type QuizQuestion } from "@/lib/schemas/content";
import { loc } from "./_loc";

/**
 * Course Finder questions. Answer ids are referenced by quiz-rules.ts. Keep ids
 * stable — changing one means updating the matching rule conditions.
 */
const questions: QuizQuestion[] = [
  {
    id: "situation",
    order: 1,
    type: "single",
    prompt: loc(
      "Which best describes your situation?",
      "¿Cuál describe mejor tu situación?",
    ),
    helpText: loc(
      "Pick the one that fits you best — we'll point you to the right path.",
      "Elige la que mejor te describa — te indicaremos la ruta correcta.",
    ),
    answers: [
      {
        id: "sit-first-adult",
        label: loc(
          "I'm an adult getting my license for the first time",
          "Soy adulto y voy a sacar mi licencia por primera vez",
        ),
      },
      {
        id: "sit-teen",
        label: loc(
          "I'm a teen (or parent of a teen) starting out",
          "Soy adolescente (o padre de uno) y estoy empezando",
        ),
      },
      {
        id: "sit-ticket",
        label: loc("I got a traffic ticket", "Recibí una multa de tránsito"),
      },
      {
        id: "sit-suspended",
        label: loc("My license is suspended", "Mi licencia está suspendida"),
      },
      {
        id: "sit-mature",
        label: loc(
          "I'm 55+ and interested in a safety course",
          "Tengo 55 años o más y me interesa un curso de seguridad",
        ),
      },
      {
        id: "sit-new-fl",
        label: loc(
          "I'm new to Florida or from another country",
          "Soy nuevo en Florida o vengo de otro país",
        ),
      },
    ],
  },
  {
    id: "language",
    order: 2,
    type: "single",
    prompt: loc(
      "Would you like help in Spanish?",
      "¿Te gustaría recibir ayuda en español?",
    ),
    answers: [
      {
        id: "lang-es",
        label: loc("Yes, please help me in Spanish", "Sí, por favor ayúdame en español"),
      },
      { id: "lang-en", label: loc("No, English is fine", "No, en inglés está bien") },
    ],
  },
  {
    id: "goal",
    order: 3,
    type: "single",
    prompt: loc(
      "What's most important to you right now?",
      "¿Qué es lo más importante para ti ahora mismo?",
    ),
    answers: [
      {
        id: "goal-license",
        label: loc("Getting my license started", "Empezar el proceso de mi licencia"),
      },
      {
        id: "goal-permit",
        label: loc(
          "Passing the permit (knowledge) exam",
          "Aprobar el examen del permiso (teórico)",
        ),
      },
      { id: "goal-ticket", label: loc("Handling my ticket", "Resolver mi multa") },
      {
        id: "goal-reinstate",
        label: loc(
          "Getting back on the road after a suspension",
          "Volver a conducir después de una suspensión",
        ),
      },
      {
        id: "goal-discount",
        label: loc(
          "Asking my insurer about a discount",
          "Preguntar a mi aseguradora por un descuento",
        ),
      },
    ],
  },
];

export default QuizQuestionSchema.array().parse(questions);
