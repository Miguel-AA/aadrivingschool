import { CourseSchema, type Course } from "@/lib/schemas/content";
import { loc } from "./_loc";

/**
 * Course catalog as structured data. Every course page renders from this file —
 * there are no hardcoded course pages. Regulated courses carry a partner
 * `providerId` and the required compliance labels (enforced by CourseSchema's
 * refine); proprietary products are labeled "educational-guide".
 *
 * Prices are PLACEHOLDERS. Confirm pricing and partner attribution before launch.
 */
const courses: Course[] = [
  // ---------------------------------------------------------------------------
  // Regulated / partner-delivered courses
  // ---------------------------------------------------------------------------
  {
    id: "tlsae",
    slug: "tlsae",
    category: "tlsae",
    providerType: "partner",
    regulatoryStatus: "regulated-partner",
    providerId: "partner-pending",
    title: loc("TLSAE — Drug & Alcohol Course", "TLSAE — Curso de Drogas y Alcohol"),
    shortDescription: loc(
      "The Traffic Law & Substance Abuse Education course most first-time Florida drivers complete before applying for a learner's permit.",
      "El curso de Educación sobre Leyes de Tránsito y Abuso de Sustancias (TLSAE) que la mayoría de los conductores primerizos de Florida completan antes de solicitar el permiso de aprendizaje.",
    ),
    longDescription: loc(
      "TLSAE (also called the Drug & Alcohol course) is the required first-time-driver education program in Florida. It covers traffic laws, the effects of alcohol and other substances on driving, and safe-driving fundamentals. We connect you to an approved provider that delivers the course online and reports your completion. We are not the state and do not issue the completion ourselves.",
      "El TLSAE (también llamado curso de Drogas y Alcohol) es el programa de educación vial obligatorio para conductores primerizos en Florida. Cubre las leyes de tránsito, los efectos del alcohol y otras sustancias en la conducción, y los fundamentos del manejo seguro. Te conectamos con un proveedor aprobado que imparte el curso en línea y reporta tu finalización. No somos el estado y no emitimos la finalización por nuestra cuenta.",
    ),
    whoIsItFor: loc(
      "First-time Florida drivers — typically applying for a Class E learner's permit — who have not previously completed driver education.",
      "Conductores primerizos de Florida —generalmente quienes solicitan el permiso de aprendizaje de Clase E— que no han completado antes la educación vial.",
    ),
    bullets: [
      loc("Required before a first Florida learner's permit", "Obligatorio antes de tu primer permiso de aprendizaje en Florida"),
      loc("Completed fully online through an approved provider", "Se completa totalmente en línea a través de un proveedor aprobado"),
      loc("Provider reports your completion electronically", "El proveedor reporta tu finalización electrónicamente"),
      loc("Bilingual guidance available before and after you enroll", "Orientación bilingüe disponible antes y después de inscribirte"),
    ],
    priceUsd: 24.95,
    durationLabel: loc("About 4 hours", "Unas 4 horas"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["tlsae-what", "tlsae-who", "tlsae-after"],
    seo: {
      metaTitle: loc("TLSAE Drug & Alcohol Course in Florida | Get Started", "Curso TLSAE de Drogas y Alcohol en Florida | Comienza Ya"),
      metaDescription: loc(
        "Complete the Florida TLSAE (Drug & Alcohol) course online through an approved provider, with bilingual help every step of the way.",
        "Completa el curso TLSAE (Drogas y Alcohol) de Florida en línea a través de un proveedor aprobado, con ayuda bilingüe en cada paso del camino.",
      ),
    },
    featured: true,
  },
  {
    id: "dets",
    slug: "dets",
    category: "dets",
    providerType: "partner",
    regulatoryStatus: "regulated-partner",
    providerId: "partner-pending",
    title: loc("DETS — Teen Driver Education", "DETS — Educación Vial para Adolescentes"),
    shortDescription: loc(
      "Driver education for Florida teens working toward a permit or license, with parent-friendly guidance.",
      "Educación vial para adolescentes de Florida que avanzan hacia el permiso o la licencia, con orientación pensada para los padres.",
    ),
    longDescription: loc(
      "The Driver Education / Traffic Safety (DETS) path supports Florida teens under 18 as they learn the rules of the road and prepare for licensing. We help families understand the steps and connect teens to an approved provider for the regulated coursework. Behind-the-wheel instruction is not part of this remote program.",
      "El programa de Educación Vial / Seguridad en el Tránsito (DETS) apoya a los adolescentes de Florida menores de 18 años mientras aprenden las reglas de la carretera y se preparan para la licencia. Ayudamos a las familias a entender los pasos y conectamos a los adolescentes con un proveedor aprobado para el curso regulado. La instrucción al volante no forma parte de este programa a distancia.",
    ),
    whoIsItFor: loc(
      "Teens under 18 (and their parents) starting the Florida permit-and-license process.",
      "Adolescentes menores de 18 años (y sus padres) que inician el proceso de permiso y licencia en Florida.",
    ),
    bullets: [
      loc("Built around Florida's teen licensing steps", "Diseñado en torno a los pasos de licencia para adolescentes de Florida"),
      loc("Includes a parent-facing guide to support practice", "Incluye una guía para los padres para apoyar la práctica"),
      loc("Regulated coursework delivered by an approved provider", "Curso regulado impartido por un proveedor aprobado"),
      loc("Pairs well with our permit test preparation", "Combina muy bien con nuestra preparación del examen del permiso"),
    ],
    priceUsd: 39.95,
    durationLabel: loc("Self-paced", "A tu propio ritmo"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["dets-who", "dets-parent"],
    seo: {
      metaTitle: loc("Florida Teen Driver Education (DETS) | Parent Guide Included", "Educación Vial para Adolescentes en Florida (DETS) | Guía para Padres Incluida"),
      metaDescription: loc(
        "Help your teen start Florida's licensing process with driver education through an approved provider, plus a parent support guide.",
        "Ayuda a tu adolescente a iniciar el proceso de licencia en Florida con educación vial a través de un proveedor aprobado, además de una guía de apoyo para los padres.",
      ),
    },
    featured: true,
  },
  {
    id: "bdi",
    slug: "bdi",
    category: "bdi",
    providerType: "partner",
    regulatoryStatus: "regulated-partner",
    providerId: "partner-pending",
    title: loc("Basic Driver Improvement (BDI)", "Mejora Básica del Conductor (BDI)"),
    shortDescription: loc(
      "A driver improvement course many Florida drivers take in connection with a traffic citation. Eligibility depends on your situation.",
      "Un curso de mejora del conductor que muchos conductores de Florida toman en relación con una citación de tránsito. La elegibilidad depende de tu situación.",
    ),
    longDescription: loc(
      "Basic Driver Improvement (BDI) is a traffic-safety course often associated with a citation or a court/clerk election. Whether BDI applies to your situation — and any effect on points or your record — is determined by the court or clerk of court, not by us. We help you understand the option and, if eligible, connect you to an approved provider. Always follow the instructions from the court or clerk handling your citation.",
      "La Mejora Básica del Conductor (BDI) es un curso de seguridad vial que suele estar asociado con una citación o con una elección ante el tribunal o el secretario del tribunal. Si el BDI aplica a tu situación —y cualquier efecto sobre los puntos o tu historial— lo determina el tribunal o el secretario del tribunal, no nosotros. Te ayudamos a entender la opción y, si eres elegible, te conectamos con un proveedor aprobado. Sigue siempre las instrucciones del tribunal o del secretario que maneja tu citación.",
    ),
    whoIsItFor: loc(
      "Drivers who received a traffic citation and are considering, or have been directed to, a basic driver improvement course.",
      "Conductores que recibieron una citación de tránsito y están considerando, o han sido remitidos a, un curso de mejora básica del conductor.",
    ),
    bullets: [
      loc("Commonly associated with a traffic citation", "Comúnmente asociado con una citación de tránsito"),
      loc("Eligibility and outcomes are decided by the court or clerk", "La elegibilidad y los resultados los decide el tribunal o el secretario"),
      loc("Delivered online through an approved provider", "Impartido en línea a través de un proveedor aprobado"),
      loc("We help you confirm your next step first", "Primero te ayudamos a confirmar tu siguiente paso"),
    ],
    priceUsd: null,
    durationLabel: loc("About 4 hours", "Unas 4 horas"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["bdi-eligible", "bdi-points"],
    seo: {
      metaTitle: loc("Basic Driver Improvement (BDI) in Florida | Check Your Options", "Mejora Básica del Conductor (BDI) en Florida | Revisa tus Opciones"),
      metaDescription: loc(
        "Understand the Florida BDI course and whether it fits your citation. Connect to an approved provider once you confirm eligibility.",
        "Entiende el curso BDI de Florida y si encaja con tu citación. Conéctate con un proveedor aprobado una vez que confirmes tu elegibilidad.",
      ),
    },
    featured: false,
  },
  {
    id: "adi",
    slug: "adi",
    category: "adi",
    providerType: "partner",
    regulatoryStatus: "regulated-partner",
    providerId: "partner-pending",
    title: loc("Advanced Driver Improvement (ADI)", "Mejora Avanzada del Conductor (ADI)"),
    shortDescription: loc(
      "A longer driver improvement course associated with certain suspensions or court orders. We help you confirm whether it applies.",
      "Un curso de mejora del conductor más extenso asociado con ciertas suspensiones u órdenes judiciales. Te ayudamos a confirmar si aplica.",
    ),
    longDescription: loc(
      "Advanced Driver Improvement (ADI) is typically associated with a point-related suspension, a habitual-offender situation, or a court order. Whether ADI applies, and any effect on your driving status, is determined by the state, the court, or the clerk — not by us. Because these situations are time-sensitive, we focus on helping you understand your path and connecting you to an approved provider if eligible. Always follow official instructions from the court, clerk, or the state.",
      "La Mejora Avanzada del Conductor (ADI) suele estar asociada con una suspensión por puntos, una situación de infractor habitual o una orden judicial. Si el ADI aplica, y cualquier efecto sobre tu estatus como conductor, lo determina el estado, el tribunal o el secretario, no nosotros. Como estas situaciones son sensibles al tiempo, nos enfocamos en ayudarte a entender tu camino y en conectarte con un proveedor aprobado si eres elegible. Sigue siempre las instrucciones oficiales del tribunal, del secretario o del estado.",
    ),
    whoIsItFor: loc(
      "Drivers dealing with a suspension, court order, or reinstatement requirement that may involve an advanced driver improvement course.",
      "Conductores que enfrentan una suspensión, una orden judicial o un requisito de reinstalación que puede implicar un curso de mejora avanzada del conductor.",
    ),
    bullets: [
      loc("Associated with certain suspensions or court orders", "Asociado con ciertas suspensiones u órdenes judiciales"),
      loc("Applicability is determined by official authorities, not us", "La aplicabilidad la determinan las autoridades oficiales, no nosotros"),
      loc("Delivered online through an approved provider", "Impartido en línea a través de un proveedor aprobado"),
      loc("We include a general next-steps guide", "Incluimos una guía general de los siguientes pasos"),
    ],
    priceUsd: null,
    durationLabel: loc("About 12 hours", "Unas 12 horas"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["adi-when", "adi-reinstate"],
    seo: {
      metaTitle: loc("Advanced Driver Improvement (ADI) in Florida | Get Guidance", "Mejora Avanzada del Conductor (ADI) en Florida | Recibe Orientación"),
      metaDescription: loc(
        "Learn whether the Florida ADI course applies to your suspension or court order, and connect to an approved provider if eligible.",
        "Descubre si el curso ADI de Florida aplica a tu suspensión u orden judicial, y conéctate con un proveedor aprobado si eres elegible.",
      ),
    },
    featured: false,
  },
  {
    id: "mature55",
    slug: "mature-driver-55-plus",
    category: "mature55",
    providerType: "partner",
    regulatoryStatus: "regulated-partner",
    providerId: "partner-pending",
    title: loc("Mature Driver 55+ Course", "Curso para Conductor Maduro 55+"),
    shortDescription: loc(
      "A safety refresher for drivers age 55 and older. Some insurers may offer a premium discount for completion — check with your insurer.",
      "Un repaso de seguridad para conductores de 55 años o más. Algunas aseguradoras pueden ofrecer un descuento en la prima por completarlo; consulta con tu aseguradora.",
    ),
    longDescription: loc(
      "The Mature Driver course is a safety refresher designed for drivers age 55 and older. Some auto insurers may offer a premium reduction to drivers who complete an approved course, but any discount is determined solely by your insurance company — we cannot promise one. We connect you to an approved provider and explain how completion is typically submitted to an insurer.",
      "El curso para Conductor Maduro es un repaso de seguridad diseñado para conductores de 55 años o más. Algunas aseguradoras de autos pueden ofrecer una reducción de la prima a los conductores que completan un curso aprobado, pero cualquier descuento lo determina únicamente tu compañía de seguros; no podemos prometerlo. Te conectamos con un proveedor aprobado y te explicamos cómo se envía normalmente la finalización a una aseguradora.",
    ),
    whoIsItFor: loc(
      "Drivers age 55 and older who want a safety refresher and may wish to ask their insurer about a discount.",
      "Conductores de 55 años o más que quieren un repaso de seguridad y que quizás deseen preguntar a su aseguradora sobre un descuento.",
    ),
    bullets: [
      loc("Designed for drivers 55 and older", "Diseñado para conductores de 55 años o más"),
      loc("Completed online through an approved provider", "Se completa en línea a través de un proveedor aprobado"),
      loc("Includes guidance on submitting completion to an insurer", "Incluye orientación sobre cómo enviar la finalización a una aseguradora"),
      loc("Any insurance discount is set by your insurer, not by us", "Cualquier descuento de seguro lo fija tu aseguradora, no nosotros"),
    ],
    priceUsd: 19.95,
    durationLabel: loc("Self-paced", "A tu propio ritmo"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["mature-discount", "mature-who"],
    seo: {
      metaTitle: loc("Mature Driver 55+ Course in Florida | Safety Refresher", "Curso para Conductor Maduro 55+ en Florida | Repaso de Seguridad"),
      metaDescription: loc(
        "Take an approved Florida Mature Driver course online. Ask your insurer whether completion qualifies for a premium discount.",
        "Toma en línea un curso aprobado de Conductor Maduro de Florida. Pregunta a tu aseguradora si completarlo califica para un descuento en la prima.",
      ),
    },
    featured: false,
  },
  {
    id: "wcd",
    slug: "wireless-communications-device-course",
    category: "wcd",
    providerType: "partner",
    regulatoryStatus: "regulated-partner",
    providerId: "partner-pending",
    title: loc("Wireless Communications Device Course", "Curso sobre Dispositivos de Comunicación Inalámbrica"),
    shortDescription: loc(
      "A focused course addressing distracted-driving and cellphone-related citations, where an approved provider supports it.",
      "Un curso enfocado en la conducción distraída y en las citaciones relacionadas con el uso del celular, donde un proveedor aprobado lo respalda.",
    ),
    longDescription: loc(
      "This course addresses safe use of wireless communications devices and distracted driving. Whether it applies to a specific citation is determined by the court or clerk. We connect eligible drivers to an approved provider where this course is offered.",
      "Este curso aborda el uso seguro de los dispositivos de comunicación inalámbrica y la conducción distraída. Si aplica a una citación específica lo determina el tribunal o el secretario. Conectamos a los conductores elegibles con un proveedor aprobado donde se ofrece este curso.",
    ),
    whoIsItFor: loc(
      "Drivers addressing a texting or wireless-device-related citation who have been directed to a related course.",
      "Conductores que atienden una citación relacionada con enviar mensajes de texto o usar un dispositivo inalámbrico y que han sido remitidos a un curso relacionado.",
    ),
    bullets: [
      loc("Focused on distracted-driving safety", "Enfocado en la seguridad ante la conducción distraída"),
      loc("Applicability decided by the court or clerk", "La aplicabilidad la decide el tribunal o el secretario"),
      loc("Delivered online through an approved provider", "Impartido en línea a través de un proveedor aprobado"),
    ],
    priceUsd: null,
    durationLabel: loc("Self-paced", "A tu propio ritmo"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: [],
    seo: {
      metaTitle: loc("Wireless Communications Device Course | Florida", "Curso sobre Dispositivos de Comunicación Inalámbrica | Florida"),
      metaDescription: loc(
        "Understand the Florida wireless communications device course option and connect to an approved provider if eligible.",
        "Entiende la opción del curso sobre dispositivos de comunicación inalámbrica de Florida y conéctate con un proveedor aprobado si eres elegible.",
      ),
    },
    featured: false,
  },

  // ---------------------------------------------------------------------------
  // Proprietary educational products & guides
  // ---------------------------------------------------------------------------
  {
    id: "permit-prep",
    slug: "permit-test-prep",
    category: "permit-prep",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("Florida Permit Test Prep", "Preparación del Examen del Permiso de Florida"),
    shortDescription: loc(
      "Practice questions, road-sign drills, and clear explanations to help you prepare for the Florida Class E knowledge exam.",
      "Preguntas de práctica, ejercicios de señales de tránsito y explicaciones claras para ayudarte a prepararte para el examen teórico de Clase E de Florida.",
    ),
    longDescription: loc(
      "Our Permit Test Prep is an educational study product — not the official exam and not a state course. It walks you through the kinds of topics on the Florida Class E knowledge exam with practice questions, road-sign drills, and plain-language explanations in English and Spanish. Use it to build confidence before you take the official test.",
      "Nuestra Preparación del Examen del Permiso es un producto educativo de estudio, no el examen oficial ni un curso del estado. Te guía a través del tipo de temas del examen teórico de Clase E de Florida con preguntas de práctica, ejercicios de señales de tránsito y explicaciones en lenguaje sencillo en inglés y español. Úsalo para ganar confianza antes de presentar el examen oficial.",
    ),
    whoIsItFor: loc(
      "Anyone preparing for the Florida Class E knowledge (permit) exam who wants structured practice.",
      "Cualquier persona que se prepara para el examen teórico de Clase E (permiso) de Florida y que quiere una práctica estructurada.",
    ),
    bullets: [
      loc("Practice questions with explanations", "Preguntas de práctica con explicaciones"),
      loc("Florida road-signs drills", "Ejercicios de señales de tránsito de Florida"),
      loc("Available in English and Spanish", "Disponible en inglés y español"),
      loc("Study at your own pace on any device", "Estudia a tu propio ritmo en cualquier dispositivo"),
    ],
    priceUsd: 14.95,
    durationLabel: loc("Self-paced", "A tu propio ritmo"),
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["permit-official", "permit-spanish"],
    seo: {
      metaTitle: loc("Florida Permit Test Prep | Practice for the Class E Exam", "Preparación del Examen del Permiso de Florida | Practica para el Examen de Clase E"),
      metaDescription: loc(
        "Prepare for the Florida permit (Class E knowledge) exam with bilingual practice questions and road-sign drills. Educational prep only.",
        "Prepárate para el examen del permiso de Florida (examen teórico de Clase E) con preguntas de práctica bilingües y ejercicios de señales de tránsito. Solo preparación educativa.",
      ),
    },
    featured: true,
  },
  {
    id: "spanish-prep",
    slug: "spanish-permit-bootcamp",
    category: "spanish-prep",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("Spanish Permit Bootcamp", "Bootcamp del Permiso en Español"),
    shortDescription: loc(
      "A Spanish-language path that explains Florida's permit steps and gives you focused practice — built for Spanish-speaking learners.",
      "Un programa en español que explica los pasos del permiso de Florida y te da práctica enfocada, creado para estudiantes hispanohablantes.",
    ),
    longDescription: loc(
      "The Spanish Permit Bootcamp is an educational study product for Spanish-speaking learners. It explains the Florida permit process in Spanish and provides focused practice for the knowledge exam, with concierge help over WhatsApp. It is preparation and guidance only — not the official exam and not a state course.",
      "El Bootcamp del Permiso en Español es un producto educativo de estudio para estudiantes hispanohablantes. Explica el proceso del permiso de Florida en español y ofrece práctica enfocada para el examen teórico, con ayuda personalizada por WhatsApp. Es solo preparación y orientación, no el examen oficial ni un curso del estado.",
    ),
    whoIsItFor: loc(
      "Spanish-speaking learners who want the Florida permit process and practice explained in Spanish.",
      "Estudiantes hispanohablantes que quieren que el proceso del permiso de Florida y la práctica se les expliquen en español.",
    ),
    bullets: [
      loc("Florida permit steps explained in Spanish", "Los pasos del permiso de Florida explicados en español"),
      loc("Focused knowledge-exam practice", "Práctica enfocada para el examen teórico"),
      loc("WhatsApp concierge support", "Soporte personalizado por WhatsApp"),
      loc("Pairs with our DMV-ready checklist", "Combina con nuestra Lista de verificación para el DMV"),
    ],
    priceUsd: 19.95,
    durationLabel: loc("Self-paced", "A tu propio ritmo"),
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["spanish-what", "permit-spanish"],
    seo: {
      metaTitle: loc("Spanish Permit Bootcamp | Florida Permit Prep in Spanish", "Bootcamp del Permiso en Español | Preparación del Permiso de Florida en Español"),
      metaDescription: loc(
        "Prepare for the Florida permit in Spanish with guided steps, practice, and WhatsApp support. Educational prep only.",
        "Prepárate para el permiso de Florida en español con pasos guiados, práctica y soporte por WhatsApp. Solo preparación educativa.",
      ),
    },
    featured: true,
  },
  {
    id: "road-signs",
    slug: "road-signs-masterclass",
    category: "road-signs",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("Road Signs Masterclass", "Clase Magistral de Señales de Tránsito"),
    shortDescription: loc(
      "A short, focused micro-course on Florida road signs and the mistakes that trip up new drivers.",
      "Un micro-curso corto y enfocado sobre las señales de tránsito de Florida y los errores que hacen tropezar a los conductores nuevos.",
    ),
    longDescription: loc(
      "The Road Signs Masterclass is a short educational micro-course covering the road signs Florida drivers need to recognize, with a focus on the common mistakes that cost points on practice tests. It's a great add-on to permit prep and a useful refresher for any driver.",
      "La Clase Magistral de Señales de Tránsito es un micro-curso educativo corto que cubre las señales de tránsito que los conductores de Florida necesitan reconocer, con énfasis en los errores comunes que cuestan puntos en los exámenes de práctica. Es un excelente complemento para la preparación del permiso y un repaso útil para cualquier conductor.",
    ),
    whoIsItFor: loc(
      "New drivers and anyone who wants a quick, focused refresher on Florida road signs.",
      "Conductores nuevos y cualquier persona que quiera un repaso rápido y enfocado sobre las señales de tránsito de Florida.",
    ),
    bullets: [
      loc("Covers regulatory, warning, and guide signs", "Cubre señales reglamentarias, de advertencia y de guía"),
      loc("Highlights common mistakes", "Destaca los errores comunes"),
      loc("Short and focused — finish in one sitting", "Corto y enfocado: termínalo de una sola vez"),
    ],
    priceUsd: 9.95,
    durationLabel: loc("About 1 hour", "Alrededor de 1 hora"),
    complianceLabels: ["educational-guide", "no-guarantee"],
    faqIds: [],
    seo: {
      metaTitle: loc("Florida Road Signs Masterclass | Quick Refresher", "Clase Magistral de Señales de Tránsito de Florida | Repaso Rápido"),
      metaDescription: loc(
        "Learn Florida road signs and avoid common mistakes with this short educational micro-course.",
        "Aprende las señales de tránsito de Florida y evita los errores comunes con este micro-curso educativo corto.",
      ),
    },
    featured: false,
  },
  {
    id: "new-to-fl",
    slug: "new-to-florida-driver-guide",
    category: "new-to-fl",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("New to Florida Driver Guide", "Guía para Conductores Nuevos en Florida"),
    shortDescription: loc(
      "Step-by-step guidance for new residents and drivers from other countries on how to approach Florida licensing.",
      "Orientación paso a paso para nuevos residentes y conductores de otros países sobre cómo abordar el proceso de licencia de Florida.",
    ),
    longDescription: loc(
      "Moving to Florida or arriving from another country? This educational guide explains, in plain language, how to think about the Florida licensing process, what documents are commonly needed, and where to get official information. It is general guidance only — not legal advice — and we always point you to official state sources for current requirements.",
      "¿Te mudas a Florida o llegas de otro país? Esta guía educativa explica, en lenguaje sencillo, cómo abordar el proceso de licencia de Florida, qué documentos se necesitan comúnmente y dónde obtener información oficial. Es solo orientación general, no asesoría legal, y siempre te dirigimos a las fuentes oficiales del estado para conocer los requisitos vigentes.",
    ),
    whoIsItFor: loc(
      "New Florida residents and international drivers who need to understand the licensing path.",
      "Nuevos residentes de Florida y conductores internacionales que necesitan entender el camino hacia la licencia.",
    ),
    bullets: [
      loc("Plain-language overview of the Florida path", "Resumen en lenguaje sencillo del proceso de Florida"),
      loc("Common document checklist to prepare", "Lista de verificación de documentos comunes para preparar"),
      loc("Links to official sources for current rules", "Enlaces a fuentes oficiales para conocer las reglas vigentes"),
      loc("Available with bilingual support", "Disponible con soporte bilingüe"),
    ],
    priceUsd: 12.95,
    durationLabel: loc("Self-paced", "A tu propio ritmo"),
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["newfl-legal", "newfl-docs"],
    seo: {
      metaTitle: loc("New to Florida Driver Guide | Licensing for New Residents", "Guía para Conductores Nuevos en Florida | Licencia para Nuevos Residentes"),
      metaDescription: loc(
        "Understand the Florida licensing process as a new resident or international driver. General educational guidance, not legal advice.",
        "Entiende el proceso de licencia de Florida como nuevo residente o conductor internacional. Orientación educativa general, no es asesoría legal.",
      ),
    },
    featured: false,
  },
  {
    id: "parent-teen",
    slug: "parent-teen-driver-guide",
    category: "parent-teen",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("Parent Teen Driver Guide", "Guía para Padres de Conductores Adolescentes"),
    shortDescription: loc(
      "A coaching guide that helps parents support a teen driver through practice and Florida's requirements.",
      "Una guía de acompañamiento que ayuda a los padres a apoyar a un conductor adolescente a través de la práctica y los requisitos de Florida.",
    ),
    longDescription: loc(
      "This educational guide helps parents understand Florida's teen licensing steps and coach their teen through supervised practice. It includes practice planning, conversation tips, and a milestone overview. It's guidance for families — not a regulated course.",
      "Esta guía educativa ayuda a los padres a entender los pasos de licencia para adolescentes de Florida y a acompañar a su adolescente durante la práctica supervisada. Incluye planificación de la práctica, consejos de conversación y un resumen de los hitos. Es orientación para las familias, no un curso regulado.",
    ),
    whoIsItFor: loc(
      "Parents and guardians supporting a teen through the Florida permit-and-license process.",
      "Padres y tutores que apoyan a un adolescente durante el proceso de permiso y licencia de Florida.",
    ),
    bullets: [
      loc("Understand each licensing milestone", "Entiende cada hito del proceso de licencia"),
      loc("Plan supervised practice with confidence", "Planifica la práctica supervisada con confianza"),
      loc("Conversation and coaching tips", "Consejos de conversación y acompañamiento"),
    ],
    priceUsd: 9.95,
    durationLabel: loc("Self-paced", "A tu propio ritmo"),
    complianceLabels: ["educational-guide", "no-guarantee"],
    faqIds: ["dets-parent"],
    seo: {
      metaTitle: loc("Parent Teen Driver Guide | Support Your Teen in Florida", "Guía para Padres de Conductores Adolescentes | Apoya a tu Adolescente en Florida"),
      metaDescription: loc(
        "A coaching guide to help parents support a Florida teen driver through practice and licensing milestones.",
        "Una guía de acompañamiento para ayudar a los padres a apoyar a un conductor adolescente de Florida a través de la práctica y los hitos de la licencia.",
      ),
    },
    featured: false,
  },
  {
    id: "dmv-checklist",
    slug: "dmv-ready-checklist",
    category: "dmv-checklist",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("DMV Ready Checklist", "Lista de verificación para el DMV"),
    shortDescription: loc(
      "A downloadable checklist to help you gather documents and prepare for your appointment.",
      "Una lista de verificación descargable para ayudarte a reunir documentos y prepararte para tu cita.",
    ),
    longDescription: loc(
      "The DMV Ready Checklist is an educational tool that helps you prepare the documents and steps commonly needed for a Florida licensing appointment. We always recommend confirming current requirements with official state sources, since rules can change.",
      "La Lista de verificación para el DMV es una herramienta educativa que te ayuda a preparar los documentos y pasos que comúnmente se necesitan para una cita de licencia en Florida. Siempre recomendamos confirmar los requisitos vigentes con las fuentes oficiales del estado, ya que las reglas pueden cambiar.",
    ),
    whoIsItFor: loc(
      "Anyone preparing for a Florida licensing appointment who wants to arrive organized.",
      "Cualquier persona que se prepara para una cita de licencia en Florida y que quiere llegar organizada.",
    ),
    bullets: [
      loc("Document-gathering checklist", "Lista de verificación para reunir documentos"),
      loc("Appointment-prep tips", "Consejos para preparar tu cita"),
      loc("Reminder to verify with official sources", "Recordatorio para verificar con las fuentes oficiales"),
    ],
    priceUsd: null,
    durationLabel: null,
    complianceLabels: ["educational-guide", "not-official-dmv"],
    faqIds: ["checklist-official"],
    seo: {
      metaTitle: loc("DMV Ready Checklist | Prepare for Your Florida Appointment", "Lista de verificación para el DMV | Prepárate para tu Cita en Florida"),
      metaDescription: loc(
        "Get organized for your Florida licensing appointment with a free document checklist. Educational tool, not an official DMV service.",
        "Organízate para tu cita de licencia en Florida con una lista de verificación de documentos gratuita. Herramienta educativa, no un servicio oficial del DMV.",
      ),
    },
    featured: false,
  },
  {
    id: "defensive-refresher",
    slug: "defensive-driving-refresher",
    category: "defensive-refresher",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("Defensive Driving Refresher", "Repaso de Manejo Defensivo"),
    shortDescription: loc(
      "A general safety refresher to sharpen your defensive-driving habits. No official outcome is promised.",
      "Un repaso de seguridad general para afinar tus hábitos de manejo defensivo. No se promete ningún resultado oficial.",
    ),
    longDescription: loc(
      "This educational refresher reviews defensive-driving fundamentals — following distance, hazard awareness, and safe decision-making. It is for general safety improvement only and does not satisfy any court, state, or insurance requirement.",
      "Este repaso educativo revisa los fundamentos del manejo defensivo: distancia de seguimiento, conciencia de los peligros y toma de decisiones segura. Es solo para mejorar la seguridad general y no cumple con ningún requisito del tribunal, del estado ni de seguros.",
    ),
    whoIsItFor: loc(
      "Any driver who wants a quick refresher on safe-driving habits.",
      "Cualquier conductor que quiera un repaso rápido sobre los hábitos de manejo seguro.",
    ),
    bullets: [
      loc("Reviews defensive-driving fundamentals", "Repasa los fundamentos del manejo defensivo"),
      loc("Short and practical", "Corto y práctico"),
      loc("For general safety only — no official outcome", "Solo para seguridad general: sin resultado oficial"),
    ],
    priceUsd: 9.95,
    durationLabel: loc("About 1 hour", "Alrededor de 1 hora"),
    complianceLabels: ["educational-guide", "no-guarantee"],
    faqIds: [],
    seo: {
      metaTitle: loc("Defensive Driving Refresher | General Safety Course", "Repaso de Manejo Defensivo | Curso de Seguridad General"),
      metaDescription: loc(
        "Sharpen your defensive-driving habits with a short general safety refresher. Educational only; no official outcome promised.",
        "Afina tus hábitos de manejo defensivo con un repaso de seguridad general corto. Solo educativo; no se promete ningún resultado oficial.",
      ),
    },
    featured: false,
  },
  {
    id: "suspension-guide",
    slug: "license-suspension-first-steps",
    category: "suspension-guide",
    providerType: "proprietary",
    regulatoryStatus: "educational-guide",
    providerId: null,
    title: loc("License Suspension First Steps Guide", "Guía de Primeros Pasos ante una Suspensión de Licencia"),
    shortDescription: loc(
      "A plain-language guide to general next steps and course options if your license is suspended.",
      "Una guía en lenguaje sencillo sobre los siguientes pasos generales y las opciones de cursos si tu licencia está suspendida.",
    ),
    longDescription: loc(
      "If you're facing a suspension, this educational guide explains, in general terms, the kinds of steps drivers commonly take and the course options that may apply. It is not legal advice and does not determine your status. For your specific situation, always rely on the court, the clerk of court, and official state sources.",
      "Si enfrentas una suspensión, esta guía educativa explica, en términos generales, el tipo de pasos que los conductores suelen tomar y las opciones de cursos que pueden aplicar. No es asesoría legal y no determina tu estatus. Para tu situación específica, apóyate siempre en el tribunal, en el secretario del tribunal y en las fuentes oficiales del estado.",
    ),
    whoIsItFor: loc(
      "Drivers facing a suspension who want to understand general options before acting.",
      "Conductores que enfrentan una suspensión y que quieren entender las opciones generales antes de actuar.",
    ),
    bullets: [
      loc("General overview of common next steps", "Resumen general de los siguientes pasos comunes"),
      loc("Explains where ADI may fit", "Explica dónde puede encajar el ADI"),
      loc("Points you to official sources — not legal advice", "Te dirige a las fuentes oficiales: no es asesoría legal"),
    ],
    priceUsd: null,
    durationLabel: null,
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["adi-reinstate", "suspension-legal"],
    seo: {
      metaTitle: loc("License Suspension First Steps | Florida Guidance", "Primeros Pasos ante una Suspensión de Licencia | Orientación de Florida"),
      metaDescription: loc(
        "Understand general first steps and course options for a Florida license suspension. Educational guidance, not legal advice.",
        "Entiende los primeros pasos generales y las opciones de cursos para una suspensión de licencia en Florida. Orientación educativa, no es asesoría legal.",
      ),
    },
    featured: false,
  },
];

export default CourseSchema.array().parse(courses);
