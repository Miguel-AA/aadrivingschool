import { PackageSchema, type PackageInput } from "@/lib/schemas/content";
import { loc } from "./_loc";

/**
 * Situation-based packages. Each bundles courses/guides for a specific user
 * problem. Prices are PLACEHOLDERS. `courseIds` reference entries in courses.ts.
 */
const packages: PackageInput[] = [
  {
    id: "first-time-adult",
    slug: "first-time-adult",
    title: loc("First-Time Driver Pathway", "Ruta del conductor primerizo"),
    targetUser: loc(
      "For adults starting the Florida license process",
      "Para adultos que inician el proceso de licencia en Florida",
    ),
    shortDescription: loc(
      "A guided starting point for adults beginning the Florida license process, with the TLSAE path, permit prep, and a DMV-ready checklist.",
      "Un punto de partida guiado para adultos que comienzan el proceso de licencia en Florida, con la ruta TLSAE, preparación del permiso y una lista de verificación para el DMV.",
    ),
    benefits: [
      loc("TLSAE course guidance", "Orientación del curso TLSAE"),
      loc("Permit test prep", "Preparación del examen del permiso"),
      loc("DMV-ready checklist", "Lista de verificación para el DMV"),
      loc("Bilingual support", "Soporte bilingüe"),
    ],
    courseIds: ["tlsae", "permit-prep", "dmv-checklist"],
    priceUsd: 39.95,
    featured: true,
    badge: "most-popular",
  },
  {
    id: "teen-permit",
    slug: "teen-permit",
    title: loc("Teen Permit Pathway", "Ruta del permiso para adolescentes"),
    targetUser: loc(
      "For parents helping a teen prepare for the learner's permit",
      "Para padres que ayudan a un adolescente a prepararse para el permiso de aprendizaje",
    ),
    shortDescription: loc(
      "A clear path for parents helping a teen prepare for the learner's permit — teen path guidance, practice support, and permit prep.",
      "Una ruta clara para padres que ayudan a un adolescente a prepararse para el permiso de aprendizaje — orientación de la ruta para adolescentes, apoyo de práctica y preparación del permiso.",
    ),
    benefits: [
      loc("Teen permit path guidance", "Orientación de la ruta del permiso para adolescentes"),
      loc("Practice support checklist", "Lista de apoyo para la práctica"),
      loc("Permit test preparation", "Preparación del examen del permiso"),
      loc("Parent guidance", "Orientación para padres"),
    ],
    courseIds: ["dets", "permit-prep", "parent-teen", "dmv-checklist"],
    priceUsd: 54.95,
    featured: true,
    badge: "parent-favorite",
  },
  {
    id: "spanish-help",
    slug: "spanish-help",
    title: loc("Spanish-Speaking Driver Pathway", "Ruta del conductor hispanohablante"),
    targetUser: loc(
      "For drivers who prefer support and explanations in Spanish",
      "Para conductores que prefieren apoyo y explicaciones en español",
    ),
    shortDescription: loc(
      "Support and explanations in Spanish: a course recommendation for your situation, permit prep support, and a WhatsApp option.",
      "Apoyo y explicaciones en español: una recomendación de curso para tu situación, apoyo en la preparación del permiso y una opción por WhatsApp.",
    ),
    benefits: [
      loc("Spanish-language guidance", "Orientación en español"),
      loc("Course recommendation", "Recomendación de curso"),
      loc("Permit prep support", "Apoyo en la preparación del permiso"),
      loc("WhatsApp support option", "Opción de soporte por WhatsApp"),
    ],
    courseIds: ["spanish-prep", "permit-prep", "dmv-checklist"],
    priceUsd: 29.95,
    featured: true,
    badge: "best-spanish",
  },
  {
    id: "ticket-solution",
    slug: "ticket-solution",
    title: loc("Ticket Education Pathway", "Ruta de educación sobre multas"),
    targetUser: loc(
      "For drivers who need help understanding ticket-related education options",
      "Para conductores que necesitan ayuda para entender las opciones educativas relacionadas con multas",
    ),
    shortDescription: loc(
      "Help understanding traffic school and ticket-related education options, with a situation review and a clear next-step explanation.",
      "Ayuda para entender las opciones de escuela de tráfico y educación relacionada con multas, con una revisión de tu situación y una explicación clara del siguiente paso.",
    ),
    benefits: [
      loc("Ticket situation review", "Revisión de tu situación de multa"),
      loc("Traffic school option guidance", "Orientación sobre opciones de escuela de tráfico"),
      loc("Next-step explanation", "Explicación del siguiente paso"),
      loc("English or Spanish support", "Soporte en inglés o español"),
    ],
    courseIds: ["bdi"],
    priceUsd: null,
    featured: true,
    badge: null,
  },
  {
    id: "license-reinstatement",
    slug: "license-reinstatement",
    title: loc("License Reinstatement Pathway", "Ruta de reinstalación de licencia"),
    targetUser: loc("Drivers with a suspended license", "Conductores con la licencia suspendida"),
    shortDescription: loc(
      "For suspension situations: the ADI path (if applicable), a first-steps guide, and a checklist.",
      "Para situaciones de suspensión: la ruta ADI (si corresponde), una guía de primeros pasos y una lista de verificación.",
    ),
    benefits: [
      loc(
        "ADI course path through an approved provider, if applicable",
        "Ruta del curso ADI a través de un proveedor aprobado, si corresponde",
      ),
      loc(
        "License Suspension First Steps Guide",
        "Guía de primeros pasos ante una suspensión de licencia",
      ),
      loc("DMV Ready Checklist", "Lista de verificación para el DMV"),
    ],
    courseIds: ["adi", "suspension-guide", "dmv-checklist"],
    priceUsd: null,
    featured: false,
    badge: null,
  },
  {
    id: "55-plus-discount",
    slug: "55-plus-discount",
    title: loc("55+ Mature Driver Pathway", "Ruta del conductor maduro 55+"),
    targetUser: loc("Mature drivers age 55+", "Conductores maduros de 55 años o más"),
    shortDescription: loc(
      "The Mature Driver course path plus guidance on submitting completion to your insurer. Any discount is set by your insurer.",
      "La ruta del curso para conductores maduros más orientación para enviar tu constancia de finalización a tu aseguradora. Cualquier descuento lo determina tu aseguradora.",
    ),
    benefits: [
      loc(
        "Mature Driver 55+ course through an approved provider",
        "Curso para conductores maduros 55+ a través de un proveedor aprobado",
      ),
      loc("Insurer-submission guidance", "Orientación para el envío a la aseguradora"),
      loc("Defensive Driving Refresher add-on", "Complemento de repaso de manejo defensivo"),
    ],
    courseIds: ["mature55", "defensive-refresher"],
    priceUsd: 24.95,
    featured: false,
    badge: null,
  },
  {
    id: "new-to-florida",
    slug: "new-to-florida",
    title: loc("New to Florida Pathway", "Ruta para quienes son nuevos en Florida"),
    targetUser: loc(
      "New residents and international drivers",
      "Nuevos residentes y conductores internacionales",
    ),
    shortDescription: loc(
      "A route recommendation, a document checklist, and permit/license guidance for getting set up in Florida.",
      "Una recomendación de ruta, una lista de documentos y orientación sobre el permiso y la licencia para establecerte en Florida.",
    ),
    benefits: [
      loc("New to Florida Driver Guide", "Guía para conductores nuevos en Florida"),
      loc("DMV Ready Checklist", "Lista de verificación para el DMV"),
      loc("Florida Permit Test Prep", "Preparación del examen del permiso de Florida"),
    ],
    courseIds: ["new-to-fl", "dmv-checklist", "permit-prep"],
    priceUsd: 24.95,
    featured: false,
    badge: null,
  },
];

export default PackageSchema.array().parse(packages);
