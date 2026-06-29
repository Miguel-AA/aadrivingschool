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
    prompt: loc("Which best describes your situation?"),
    helpText: loc("Pick the one that fits you best — we'll point you to the right path."),
    answers: [
      { id: "sit-first-adult", label: loc("I'm an adult getting my license for the first time") },
      { id: "sit-teen", label: loc("I'm a teen (or parent of a teen) starting out") },
      { id: "sit-ticket", label: loc("I got a traffic ticket") },
      { id: "sit-suspended", label: loc("My license is suspended") },
      { id: "sit-mature", label: loc("I'm 55+ and interested in a safety course") },
      { id: "sit-new-fl", label: loc("I'm new to Florida or from another country") },
    ],
  },
  {
    id: "language",
    order: 2,
    type: "single",
    prompt: loc("Would you like help in Spanish?"),
    answers: [
      { id: "lang-es", label: loc("Yes, please help me in Spanish") },
      { id: "lang-en", label: loc("No, English is fine") },
    ],
  },
  {
    id: "goal",
    order: 3,
    type: "single",
    prompt: loc("What's most important to you right now?"),
    answers: [
      { id: "goal-license", label: loc("Getting my license started") },
      { id: "goal-permit", label: loc("Passing the permit (knowledge) exam") },
      { id: "goal-ticket", label: loc("Handling my ticket") },
      { id: "goal-reinstate", label: loc("Getting back on the road after a suspension") },
      { id: "goal-discount", label: loc("Asking my insurer about a discount") },
    ],
  },
];

export default QuizQuestionSchema.array().parse(questions);
