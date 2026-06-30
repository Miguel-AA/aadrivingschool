import { FaqSchema, type Faq } from "@/lib/schemas/content";
import { loc } from "./_loc";

/**
 * FAQs render in the FAQAccordion and feed FAQ JSON-LD. `scope` + `scopeRef`
 * let a page pull global FAQs plus those targeting a specific course/page.
 * Course pages also reference FAQs by id via Course.faqIds.
 */
const faqs: Faq[] = [
  // Global
  {
    id: "global-official",
    question: loc(
      "Are regulated courses included in the platform roadmap?",
      "¿Los cursos regulados están incluidos en la hoja de ruta de la plataforma?",
    ),
    answer: loc(
      "Yes. Florida Top 1 Driving School is being built with a compliance-aware roadmap for regulated driving education. Any regulated course delivery will follow applicable Florida approval, licensing, and operating requirements before being offered as an official state-regulated course. The platform is an independent service and is not the Florida DMV/FLHSMV, a court, or a testing site.",
      "Sí. Florida Top 1 Driving School se está construyendo con una hoja de ruta consciente de cumplimiento para la educación vial regulada. Cualquier curso regulado seguirá los requisitos aplicables de aprobación, licencia y operación de Florida antes de ofrecerse como un curso oficial regulado por el estado. La plataforma es un servicio independiente y no es el DMV/FLHSMV de Florida, ni un tribunal, ni un sitio de exámenes.",
    ),
    scope: "global",
    sortOrder: 1,
  },
  {
    id: "global-spanish",
    question: loc(
      "Is the platform bilingual (English & Spanish)?",
      "¿La plataforma es bilingüe (inglés y español)?",
    ),
    answer: loc(
      "Yes. English and Spanish are part of the core experience — the site, guides, course finder, and concierge support, including WhatsApp. Spanish-first learning paths are on the roadmap.",
      "Sí. El inglés y el español son parte del núcleo de la experiencia — el sitio, las guías, el buscador de cursos y el soporte personalizado, incluido WhatsApp. Las rutas de aprendizaje pensadas primero en español están en la hoja de ruta.",
    ),
    scope: "global",
    sortOrder: 2,
  },
  {
    id: "global-guarantee",
    question: loc(
      "Does the platform guarantee exam or ticket outcomes?",
      "¿La plataforma garantiza resultados de exámenes o multas?",
    ),
    answer: loc(
      "No. Exam results, ticket dismissal, point removal, reinstatement, and insurance discounts are decided by the state, courts, or your insurer. The platform provides structured preparation, guidance, and a compliance-aware path to approved course delivery.",
      "No. Los resultados de exámenes, la desestimación de multas, la eliminación de puntos, la reinstalación y los descuentos de seguro los deciden el estado, los tribunales o tu aseguradora. La plataforma ofrece preparación estructurada, orientación y una ruta consciente de cumplimiento hacia la entrega de cursos aprobados.",
    ),
    scope: "global",
    sortOrder: 3,
  },
  // TLSAE
  {
    id: "tlsae-what",
    question: loc(
      "What is the TLSAE / Drug & Alcohol course?",
      "¿Qué es el curso TLSAE / de Drogas y Alcohol?",
    ),
    answer: loc(
      "TLSAE (Traffic Law & Substance Abuse Education) is the first-time-driver education course most people complete before their first Florida learner's permit. It's delivered online by an approved provider.",
      "El TLSAE (Educación sobre Leyes de Tránsito y Abuso de Sustancias) es el curso de educación para conductores primerizos que la mayoría completa antes de su primer permiso de aprendizaje en Florida. Lo imparte en línea un proveedor aprobado.",
    ),
    scope: "course",
    scopeRef: "tlsae",
    sortOrder: 1,
  },
  {
    id: "tlsae-who",
    question: loc("Do I need TLSAE?", "¿Necesito el TLSAE?"),
    answer: loc(
      "Most first-time Florida drivers do. If you're unsure, use our Course Finder or message us and we'll help you confirm before you enroll.",
      "La mayoría de los conductores primerizos en Florida sí. Si tienes dudas, usa nuestro buscador de cursos o escríbenos y te ayudamos a confirmarlo antes de inscribirte.",
    ),
    scope: "course",
    scopeRef: "tlsae",
    sortOrder: 2,
  },
  {
    id: "tlsae-after",
    question: loc(
      "What happens after I finish TLSAE?",
      "¿Qué pasa después de terminar el TLSAE?",
    ),
    answer: loc(
      "The approved provider reports your completion. You'll typically then prepare for and take the Class E knowledge exam — our Permit Test Prep can help.",
      "El proveedor aprobado reporta tu finalización. Por lo general, después te preparas y tomas el examen teórico de Clase E — nuestra preparación del permiso puede ayudarte.",
    ),
    scope: "course",
    scopeRef: "tlsae",
    sortOrder: 3,
  },
  // DETS
  {
    id: "dets-who",
    question: loc(
      "Who is the teen driver education (DETS) path for?",
      "¿Para quién es la ruta de educación para conductores adolescentes (DETS)?",
    ),
    answer: loc(
      "It's for Florida teens under 18 starting the licensing process, and the parents supporting them. The regulated coursework is delivered by an approved provider.",
      "Es para adolescentes de Florida menores de 18 años que inician el proceso de licencia, y para los padres que los apoyan. El curso regulado lo imparte un proveedor aprobado.",
    ),
    scope: "course",
    scopeRef: "dets",
    sortOrder: 1,
  },
  {
    id: "dets-parent",
    question: loc("How can parents help?", "¿Cómo pueden ayudar los padres?"),
    answer: loc(
      "Our Parent Teen Driver Guide explains the milestones and how to plan supervised practice, so families know what to expect at each step.",
      "Nuestra Guía para padres de conductores adolescentes explica las etapas y cómo planificar la práctica supervisada, para que las familias sepan qué esperar en cada paso.",
    ),
    scope: "course",
    scopeRef: "dets",
    sortOrder: 2,
  },
  // BDI
  {
    id: "bdi-eligible",
    question: loc(
      "Am I eligible for the BDI course?",
      "¿Soy elegible para el curso BDI?",
    ),
    answer: loc(
      "Eligibility is determined by the court or clerk of court handling your citation — not by us. Confirm with them first, then we can connect you to an approved provider.",
      "La elegibilidad la determina el tribunal o el secretario del tribunal que maneja tu citación — no nosotros. Confírmalo primero con ellos y luego podemos conectarte con un proveedor aprobado.",
    ),
    scope: "course",
    scopeRef: "bdi",
    sortOrder: 1,
  },
  {
    id: "bdi-points",
    question: loc(
      "Will BDI remove points from my record?",
      "¿El BDI eliminará puntos de mi historial?",
    ),
    answer: loc(
      "Any effect on points or your record is decided by the court or clerk, not by us. We can't promise a specific outcome. Always follow the instructions you received.",
      "Cualquier efecto sobre los puntos o tu historial lo decide el tribunal o el secretario, no nosotros. No podemos prometer un resultado específico. Sigue siempre las instrucciones que recibiste.",
    ),
    scope: "course",
    scopeRef: "bdi",
    sortOrder: 2,
  },
  // ADI
  {
    id: "adi-when",
    question: loc(
      "When does the ADI course apply?",
      "¿Cuándo aplica el curso ADI?",
    ),
    answer: loc(
      "ADI is usually associated with certain suspensions or court orders. Whether it applies to you is determined by the state, court, or clerk. We help you understand the option and connect you if eligible.",
      "El ADI suele estar asociado con ciertas suspensiones u órdenes judiciales. Si aplica a tu caso lo determinan el estado, el tribunal o el secretario. Te ayudamos a entender la opción y te conectamos si eres elegible.",
    ),
    scope: "course",
    scopeRef: "adi",
    sortOrder: 1,
  },
  {
    id: "adi-reinstate",
    question: loc(
      "Will completing ADI reinstate my license?",
      "¿Completar el ADI reinstalará mi licencia?",
    ),
    answer: loc(
      "We can't promise reinstatement. Reinstatement is governed by the state and any court orders. Follow official instructions; our guide explains general steps.",
      "No podemos prometer la reinstalación. La reinstalación se rige por el estado y cualquier orden judicial. Sigue las instrucciones oficiales; nuestra guía explica los pasos generales.",
    ),
    scope: "course",
    scopeRef: "adi",
    sortOrder: 2,
  },
  // Mature 55+
  {
    id: "mature-discount",
    question: loc(
      "Will I get an insurance discount for the 55+ course?",
      "¿Obtendré un descuento de seguro por el curso 55+?",
    ),
    answer: loc(
      "Possibly — but any discount is determined solely by your insurance company. We can't promise one. We do explain how completion is typically submitted to an insurer.",
      "Posiblemente — pero cualquier descuento lo determina únicamente tu compañía de seguros. No podemos prometerlo. Sí explicamos cómo se suele enviar la constancia de finalización a una aseguradora.",
    ),
    scope: "course",
    scopeRef: "mature55",
    sortOrder: 1,
  },
  {
    id: "mature-who",
    question: loc(
      "Who can take the Mature Driver course?",
      "¿Quién puede tomar el curso para conductores maduros?",
    ),
    answer: loc(
      "It's designed for drivers age 55 and older who want a safety refresher. It's completed online through an approved provider.",
      "Está diseñado para conductores de 55 años o más que quieren un repaso de seguridad. Se completa en línea a través de un proveedor aprobado.",
    ),
    scope: "course",
    scopeRef: "mature55",
    sortOrder: 2,
  },
  // Proprietary
  {
    id: "permit-official",
    question: loc(
      "Is Permit Test Prep the official exam?",
      "¿La preparación del permiso es el examen oficial?",
    ),
    answer: loc(
      "No. It's an educational study product to help you prepare. The official Class E knowledge exam is administered by the state.",
      "No. Es un producto educativo de estudio para ayudarte a prepararte. El examen teórico oficial de Clase E lo administra el estado.",
    ),
    scope: "course",
    scopeRef: "permit-prep",
    sortOrder: 1,
  },
  {
    id: "permit-spanish",
    question: loc(
      "Is permit practice available in Spanish?",
      "¿La práctica del permiso está disponible en español?",
    ),
    answer: loc(
      "Yes. Our Spanish Permit Bootcamp explains the process and provides practice in Spanish, with WhatsApp support.",
      "Sí. Nuestro Bootcamp del permiso en español explica el proceso y ofrece práctica en español, con soporte por WhatsApp.",
    ),
    scope: "course",
    scopeRef: "permit-prep",
    sortOrder: 2,
  },
  {
    id: "spanish-what",
    question: loc(
      "What is the Spanish Permit Bootcamp?",
      "¿Qué es el Bootcamp del permiso en español?",
    ),
    answer: loc(
      "A Spanish-language educational study path that explains Florida's permit steps and provides focused practice. It is preparation only — not the official exam or a state course.",
      "Una ruta de estudio educativa en español que explica los pasos del permiso de Florida y ofrece práctica enfocada. Es solo preparación — no es el examen oficial ni un curso del estado.",
    ),
    scope: "course",
    scopeRef: "spanish-prep",
    sortOrder: 1,
  },
  {
    id: "newfl-legal",
    question: loc(
      "Is the New to Florida guide legal advice?",
      "¿La guía para nuevos en Florida es asesoría legal?",
    ),
    answer: loc(
      "No. It's general educational guidance only. For your specific situation and current requirements, rely on official state sources.",
      "No. Es solo orientación educativa general. Para tu situación específica y los requisitos vigentes, apóyate en las fuentes oficiales del estado.",
    ),
    scope: "course",
    scopeRef: "new-to-fl",
    sortOrder: 1,
  },
  {
    id: "newfl-docs",
    question: loc(
      "What documents will I need?",
      "¿Qué documentos necesitaré?",
    ),
    answer: loc(
      "Requirements vary and can change. Our checklist lists commonly needed documents, and we always recommend confirming the current list with official sources.",
      "Los requisitos varían y pueden cambiar. Nuestra lista incluye los documentos que suelen necesitarse, y siempre recomendamos confirmar la lista vigente con fuentes oficiales.",
    ),
    scope: "course",
    scopeRef: "new-to-fl",
    sortOrder: 2,
  },
  {
    id: "checklist-official",
    question: loc(
      "Is the DMV Ready Checklist an official document?",
      "¿La lista de verificación para el DMV es un documento oficial?",
    ),
    answer: loc(
      "No. It's an educational preparation tool. Always verify current requirements with official state sources before your appointment.",
      "No. Es una herramienta educativa de preparación. Verifica siempre los requisitos vigentes con las fuentes oficiales del estado antes de tu cita.",
    ),
    scope: "course",
    scopeRef: "dmv-checklist",
    sortOrder: 1,
  },
  {
    id: "suspension-legal",
    question: loc(
      "Can you tell me how to get my license back?",
      "¿Pueden decirme cómo recuperar mi licencia?",
    ),
    answer: loc(
      "We provide general educational guidance and course connections, not legal advice. Your exact path is determined by the court, clerk, and state — please rely on those official sources.",
      "Ofrecemos orientación educativa general y conexiones con cursos, no asesoría legal. Tu ruta exacta la determinan el tribunal, el secretario y el estado — apóyate en esas fuentes oficiales.",
    ),
    scope: "course",
    scopeRef: "suspension-guide",
    sortOrder: 1,
  },
];

export default FaqSchema.array().parse(faqs);
