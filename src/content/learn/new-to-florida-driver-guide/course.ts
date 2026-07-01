import {
  LearnCourseSchema,
  type LearnCourseInput,
} from "@/lib/schemas/learn";
import { loc } from "@/content/_loc";

/**
 * New to Florida Driver Guide — a lightweight "wizard" track (CE5).
 *
 * A short, step-by-step guide/checklist for people moving to Florida — NOT a
 * long course, not legal advice, and not the DMV/FLHSMV. Every step frames
 * things as general guidance ("you may need", "common next steps") and points
 * to official sources for confirmation. MVP content only.
 */
const course: LearnCourseInput = {
  id: "new-to-florida-driver-guide",
  catalogSlug: "new-to-florida-driver-guide",
  format: "wizard",
  localeMode: "bilingual",
  disclaimerPreset: "info-guide",
  lastReviewed: "2026-07-01",
  estimatedMinutes: 10,
  mockTest: null,
  modules: [
    {
      id: "guide",
      order: 1,
      title: loc("New to Florida guide", "Guía para quienes son nuevos en Florida"),
      lessons: [
        {
          id: "situation",
          slug: "situation",
          order: 1,
          title: loc("Your situation", "Tu situación"),
          blocks: [
            {
              type: "text",
              body: loc(
                "Moving to Florida (or arriving from another country) usually means updating your driver license and vehicle paperwork within a certain time. This guide walks through common next steps at a high level.",
                "Mudarte a Florida (o llegar de otro país) generalmente implica actualizar tu licencia de conducir y los documentos de tu vehículo dentro de cierto plazo. Esta guía explica, en general, los siguientes pasos comunes.",
              ),
            },
            {
              type: "callout",
              variant: "note",
              body: loc(
                "This is general guidance only, not legal advice. Your exact steps depend on your situation — always confirm current requirements with official sources.",
                "Esto es solo orientación general, no asesoría legal. Tus pasos exactos dependen de tu situación; confirma siempre los requisitos vigentes con las fuentes oficiales.",
              ),
            },
          ],
        },
        {
          id: "transfer",
          slug: "license-transfer-path",
          order: 2,
          title: loc("License transfer path", "Ruta para transferir la licencia"),
          blocks: [
            {
              type: "text",
              body: loc(
                "New residents with a valid license from another U.S. state, and drivers from other countries, may follow different paths. In many cases you may need to visit a service center and pass required checks. Confirm what applies to you before you go.",
                "Los nuevos residentes con una licencia válida de otro estado de EE. UU. y los conductores de otros países pueden seguir rutas distintas. En muchos casos es posible que necesites visitar un centro de servicio y aprobar las verificaciones requeridas. Confirma qué aplica a tu caso antes de ir.",
              ),
            },
            {
              type: "official-source-link",
              label: loc(
                "Florida new resident information (FLHSMV)",
                "Información para nuevos residentes de Florida (FLHSMV)",
              ),
              href: "https://www.flhsmv.gov/driver-licenses-id-cards/new-florida-resident/",
              note: loc(
                "Use the official site to confirm current steps and timelines.",
                "Usa el sitio oficial para confirmar los pasos y plazos vigentes.",
              ),
            },
          ],
        },
        {
          id: "documents",
          slug: "document-checklist",
          order: 3,
          title: loc("Document checklist", "Lista de documentos"),
          blocks: [
            {
              type: "text",
              body: loc(
                "Gathering documents ahead of time makes your visit easier. You may need items like these — check the official list for exactly what to bring.",
                "Reunir los documentos con anticipación facilita tu visita. Es posible que necesites elementos como estos; revisa la lista oficial para saber exactamente qué llevar.",
              ),
            },
            {
              type: "checklist",
              title: loc("Documents to prepare", "Documentos para preparar"),
              items: [
                {
                  id: "doc-identity",
                  label: loc(
                    "Proof of identity (for example, a passport or birth certificate)",
                    "Comprobante de identidad (por ejemplo, pasaporte o acta de nacimiento)",
                  ),
                },
                {
                  id: "doc-ssn",
                  label: loc(
                    "Proof of your Social Security number, if you have one",
                    "Comprobante de tu número de Seguro Social, si tienes uno",
                  ),
                },
                {
                  id: "doc-residency",
                  label: loc(
                    "Two documents showing your Florida residential address",
                    "Dos documentos que muestren tu domicilio en Florida",
                  ),
                },
                {
                  id: "doc-current-license",
                  label: loc(
                    "Your current driver license, if you have one",
                    "Tu licencia de conducir actual, si tienes una",
                  ),
                },
              ],
            },
          ],
        },
        {
          id: "road-rules",
          slug: "road-rules-refresher",
          order: 4,
          title: loc("Florida road rules refresher", "Repaso de las reglas de tránsito de Florida"),
          blocks: [
            {
              type: "text",
              body: loc(
                "Even experienced drivers benefit from a quick refresher on local rules and signs. If you also need to take a knowledge test, our Permit Test Prep is a good place to practice.",
                "Incluso los conductores con experiencia se benefician de un repaso rápido de las reglas y señales locales. Si además necesitas presentar un examen teórico, nuestra Preparación del Examen del Permiso es un buen lugar para practicar.",
              ),
            },
            {
              type: "callout",
              variant: "tip",
              body: loc(
                "Give yourself time to practice safe habits like signaling early, keeping a safe following distance, and checking blind spots.",
                "Date tiempo para practicar hábitos seguros como señalizar con anticipación, mantener una distancia de seguimiento segura y revisar los puntos ciegos.",
              ),
            },
          ],
        },
        {
          id: "registration",
          slug: "registration-and-insurance",
          order: 5,
          title: loc("Vehicle registration & insurance basics", "Conceptos básicos de registro del vehículo y seguro"),
          blocks: [
            {
              type: "text",
              body: loc(
                "If you brought a vehicle, you will generally need to register it and carry the required insurance. Requirements and deadlines can change, so confirm the current rules before you start.",
                "Si trajiste un vehículo, por lo general deberás registrarlo y contar con el seguro requerido. Los requisitos y plazos pueden cambiar, así que confirma las reglas vigentes antes de comenzar.",
              ),
            },
            {
              type: "official-source-link",
              label: loc(
                "Vehicle registration & titles (FLHSMV)",
                "Registro y títulos de vehículos (FLHSMV)",
              ),
              href: "https://www.flhsmv.gov/motor-vehicles-tags-titles/",
              note: loc(
                "Confirm registration and insurance requirements on the official site.",
                "Confirma los requisitos de registro y seguro en el sitio oficial.",
              ),
            },
          ],
        },
        {
          id: "next-steps",
          slug: "next-steps",
          order: 6,
          title: loc("Next steps & request help", "Siguientes pasos y solicitar ayuda"),
          blocks: [
            {
              type: "text",
              body: loc(
                "Once you have confirmed your path and gathered your documents, you can plan your visit. If you would like help understanding your options, A&A Driving School can guide you in English or Spanish.",
                "Una vez que hayas confirmado tu ruta y reunido tus documentos, puedes planear tu visita. Si quieres ayuda para entender tus opciones, A&A Driving School puede orientarte en inglés o español.",
              ),
            },
            {
              type: "lead-cta",
              headline: loc(
                "Have questions about your next step? We can help you understand your options.",
                "¿Tienes preguntas sobre tu siguiente paso? Podemos ayudarte a entender tus opciones.",
              ),
              sourcePage: "/learn/new-to-florida-driver-guide",
              recommendation: "new-to-fl",
            },
          ],
        },
      ],
    },
  ],
};

export default LearnCourseSchema.parse(course);
