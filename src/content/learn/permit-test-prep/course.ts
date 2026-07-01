import {
  LearnCourseSchema,
  type LearnCourseInput,
} from "@/lib/schemas/learn";
import { loc } from "@/content/_loc";

/**
 * Seed learn track for Permit Test Prep (CE3a skeleton).
 *
 * Minimal, safe placeholder content only — one module, one lesson. Full lessons,
 * the question bank, and the mock test come in later CE phases. `catalogSlug`
 * matches the existing marketing course slug ("permit-test-prep") in courses.ts.
 */
const course: LearnCourseInput = {
  id: "permit-test-prep",
  catalogSlug: "permit-test-prep",
  format: "course",
  localeMode: "en-first",
  disclaimerPreset: "standard-practice",
  lastReviewed: "2026-07-01",
  estimatedMinutes: 5,
  mockTest: {
    poolStrategy: "all",
    questionCount: 3,
    passInfoText: loc(
      "This score is practice feedback only. It is not the official Florida exam and does not guarantee passing.",
      "Este puntaje es solo una guía de estudio. No es el examen oficial de Florida y no garantiza aprobar.",
    ),
    questions: [
      {
        id: "mock-yellow-light",
        prompt: loc(
          "As you approach an intersection and the traffic light turns yellow, what is the safest thing to do?",
          "Al acercarte a una intersección y el semáforo cambia a amarillo, ¿qué es lo más seguro que puedes hacer?",
        ),
        choices: [
          {
            id: "a",
            label: loc(
              "Slow down and prepare to stop if you can do so safely",
              "Reducir la velocidad y prepararte para detenerte si puedes hacerlo con seguridad",
            ),
          },
          {
            id: "b",
            label: loc(
              "Speed up to get through before it turns red",
              "Acelerar para pasar antes de que cambie a rojo",
            ),
          },
          {
            id: "c",
            label: loc(
              "Stop immediately, even in the middle of the intersection",
              "Detenerte de inmediato, incluso en medio de la intersección",
            ),
          },
        ],
        correctChoiceIds: ["a"],
        explanation: loc(
          "A yellow light means the signal is about to turn red — slow down and stop when you can do it safely.",
          "Una luz amarilla significa que el semáforo está por cambiar a rojo: reduce la velocidad y detente cuando puedas hacerlo con seguridad.",
        ),
      },
      {
        id: "mock-following-distance",
        prompt: loc(
          "Why is it important to keep space between your car and the vehicle ahead?",
          "¿Por qué es importante mantener espacio entre tu auto y el vehículo de adelante?",
        ),
        choices: [
          {
            id: "a",
            label: loc(
              "It gives you time to see and react so you can stop safely",
              "Te da tiempo para ver y reaccionar para poder detenerte con seguridad",
            ),
          },
          {
            id: "b",
            label: loc(
              "It lets you drive faster than the traffic around you",
              "Te permite conducir más rápido que el tránsito a tu alrededor",
            ),
          },
          {
            id: "c",
            label: loc(
              "Space between cars does not affect safety",
              "El espacio entre autos no afecta la seguridad",
            ),
          },
        ],
        correctChoiceIds: ["a"],
        explanation: loc(
          "Keeping a safe following distance gives you time to react to what happens ahead and stop without a collision.",
          "Mantener una distancia de seguimiento segura te da tiempo para reaccionar ante lo que ocurre adelante y detenerte sin chocar.",
        ),
      },
      {
        id: "mock-lane-change",
        prompt: loc(
          "Before changing lanes, what should you do?",
          "Antes de cambiar de carril, ¿qué debes hacer?",
        ),
        choices: [
          {
            id: "a",
            label: loc(
              "Signal, check your mirrors, and check your blind spot",
              "Señalizar, revisar los espejos y revisar el punto ciego",
            ),
          },
          {
            id: "b",
            label: loc(
              "Change lanes quickly without signaling",
              "Cambiar de carril rápidamente sin señalizar",
            ),
          },
          {
            id: "c",
            label: loc(
              "Only glance at your rear-view mirror",
              "Solo mirar de reojo el espejo retrovisor",
            ),
          },
        ],
        correctChoiceIds: ["a"],
        explanation: loc(
          "Signaling early, checking your mirrors, and looking at your blind spot help you change lanes safely.",
          "Señalizar con anticipación, revisar los espejos y mirar el punto ciego te ayudan a cambiar de carril con seguridad.",
        ),
      },
    ],
  },
  modules: [
    {
      id: "getting-started",
      order: 1,
      title: loc("Getting Started", "Primeros pasos"),
      lessons: [
        {
          id: "welcome",
          slug: "welcome",
          order: 1,
          title: loc(
            "How this study guide works",
            "Cómo funciona esta guía de estudio",
          ),
          blocks: [
            {
              type: "text",
              body: loc(
                "This is an educational study guide to help you prepare for the Florida Class E knowledge test. Work through each lesson at your own pace, then use the practice questions to check your understanding.",
                "Esta es una guía de estudio educativa para ayudarte a prepararte para el examen teórico de Clase E de Florida. Avanza por cada lección a tu propio ritmo y luego usa las preguntas de práctica para comprobar lo que aprendiste.",
              ),
            },
            {
              type: "callout",
              variant: "note",
              body: loc(
                "This guide is for practice and study only. It is not the official exam and does not guarantee any result. Always confirm current requirements with official state sources.",
                "Esta guía es solo para práctica y estudio. No es el examen oficial y no garantiza ningún resultado. Confirma siempre los requisitos vigentes con las fuentes oficiales del estado.",
              ),
            },
            {
              type: "practice-question",
              question: {
                id: "welcome-study-habit",
                prompt: loc(
                  "What is the most helpful way to prepare for a knowledge test?",
                  "¿Cuál es la forma más útil de prepararse para un examen teórico?",
                ),
                choices: [
                  {
                    id: "a",
                    label: loc(
                      "Practice a little each day and review the questions you miss",
                      "Practicar un poco cada día y repasar las preguntas que fallas",
                    ),
                  },
                  {
                    id: "b",
                    label: loc(
                      "Study only once, right before the test",
                      "Estudiar una sola vez, justo antes del examen",
                    ),
                  },
                  {
                    id: "c",
                    label: loc(
                      "Skip the topics you find difficult",
                      "Saltarte los temas que te resultan difíciles",
                    ),
                  },
                ],
                correctChoiceIds: ["a"],
                explanation: loc(
                  "Spacing out your practice and reviewing your mistakes helps you remember more. This is a study habit, not a rule from any agency.",
                  "Espaciar tu práctica y repasar tus errores te ayuda a recordar más. Es un hábito de estudio, no una regla de ninguna agencia.",
                ),
              },
            },
          ],
        },
      ],
    },
  ],
};

export default LearnCourseSchema.parse(course);
