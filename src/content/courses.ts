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
    title: loc("TLSAE — Drug & Alcohol Course"),
    shortDescription: loc(
      "The Traffic Law & Substance Abuse Education course most first-time Florida drivers complete before applying for a learner's permit.",
    ),
    longDescription: loc(
      "TLSAE (also called the Drug & Alcohol course) is the required first-time-driver education program in Florida. It covers traffic laws, the effects of alcohol and other substances on driving, and safe-driving fundamentals. We connect you to an approved provider that delivers the course online and reports your completion. We are not the state and do not issue the completion ourselves.",
    ),
    whoIsItFor: loc(
      "First-time Florida drivers — typically applying for a Class E learner's permit — who have not previously completed driver education.",
    ),
    bullets: [
      loc("Required before a first Florida learner's permit"),
      loc("Completed fully online through an approved provider"),
      loc("Provider reports your completion electronically"),
      loc("Bilingual guidance available before and after you enroll"),
    ],
    priceUsd: 24.95,
    durationLabel: loc("About 4 hours"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["tlsae-what", "tlsae-who", "tlsae-after"],
    seo: {
      metaTitle: loc("TLSAE Drug & Alcohol Course in Florida | Get Started"),
      metaDescription: loc(
        "Complete the Florida TLSAE (Drug & Alcohol) course online through an approved provider, with bilingual help every step of the way.",
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
    title: loc("DETS — Teen Driver Education"),
    shortDescription: loc(
      "Driver education for Florida teens working toward a permit or license, with parent-friendly guidance.",
    ),
    longDescription: loc(
      "The Driver Education / Traffic Safety (DETS) path supports Florida teens under 18 as they learn the rules of the road and prepare for licensing. We help families understand the steps and connect teens to an approved provider for the regulated coursework. Behind-the-wheel instruction is not part of this remote program.",
    ),
    whoIsItFor: loc(
      "Teens under 18 (and their parents) starting the Florida permit-and-license process.",
    ),
    bullets: [
      loc("Built around Florida's teen licensing steps"),
      loc("Includes a parent-facing guide to support practice"),
      loc("Regulated coursework delivered by an approved provider"),
      loc("Pairs well with our permit test preparation"),
    ],
    priceUsd: 39.95,
    durationLabel: loc("Self-paced"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["dets-who", "dets-parent"],
    seo: {
      metaTitle: loc("Florida Teen Driver Education (DETS) | Parent Guide Included"),
      metaDescription: loc(
        "Help your teen start Florida's licensing process with driver education through an approved provider, plus a parent support guide.",
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
    title: loc("Basic Driver Improvement (BDI)"),
    shortDescription: loc(
      "A driver improvement course many Florida drivers take in connection with a traffic citation. Eligibility depends on your situation.",
    ),
    longDescription: loc(
      "Basic Driver Improvement (BDI) is a traffic-safety course often associated with a citation or a court/clerk election. Whether BDI applies to your situation — and any effect on points or your record — is determined by the court or clerk of court, not by us. We help you understand the option and, if eligible, connect you to an approved provider. Always follow the instructions from the court or clerk handling your citation.",
    ),
    whoIsItFor: loc(
      "Drivers who received a traffic citation and are considering, or have been directed to, a basic driver improvement course.",
    ),
    bullets: [
      loc("Commonly associated with a traffic citation"),
      loc("Eligibility and outcomes are decided by the court or clerk"),
      loc("Delivered online through an approved provider"),
      loc("We help you confirm your next step first"),
    ],
    priceUsd: null,
    durationLabel: loc("About 4 hours"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["bdi-eligible", "bdi-points"],
    seo: {
      metaTitle: loc("Basic Driver Improvement (BDI) in Florida | Check Your Options"),
      metaDescription: loc(
        "Understand the Florida BDI course and whether it fits your citation. Connect to an approved provider once you confirm eligibility.",
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
    title: loc("Advanced Driver Improvement (ADI)"),
    shortDescription: loc(
      "A longer driver improvement course associated with certain suspensions or court orders. We help you confirm whether it applies.",
    ),
    longDescription: loc(
      "Advanced Driver Improvement (ADI) is typically associated with a point-related suspension, a habitual-offender situation, or a court order. Whether ADI applies, and any effect on your driving status, is determined by the state, the court, or the clerk — not by us. Because these situations are time-sensitive, we focus on helping you understand your path and connecting you to an approved provider if eligible. Always follow official instructions from the court, clerk, or the state.",
    ),
    whoIsItFor: loc(
      "Drivers dealing with a suspension, court order, or reinstatement requirement that may involve an advanced driver improvement course.",
    ),
    bullets: [
      loc("Associated with certain suspensions or court orders"),
      loc("Applicability is determined by official authorities, not us"),
      loc("Delivered online through an approved provider"),
      loc("We include a general next-steps guide"),
    ],
    priceUsd: null,
    durationLabel: loc("About 12 hours"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["adi-when", "adi-reinstate"],
    seo: {
      metaTitle: loc("Advanced Driver Improvement (ADI) in Florida | Get Guidance"),
      metaDescription: loc(
        "Learn whether the Florida ADI course applies to your suspension or court order, and connect to an approved provider if eligible.",
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
    title: loc("Mature Driver 55+ Course"),
    shortDescription: loc(
      "A safety refresher for drivers age 55 and older. Some insurers may offer a premium discount for completion — check with your insurer.",
    ),
    longDescription: loc(
      "The Mature Driver course is a safety refresher designed for drivers age 55 and older. Some auto insurers may offer a premium reduction to drivers who complete an approved course, but any discount is determined solely by your insurance company — we cannot promise one. We connect you to an approved provider and explain how completion is typically submitted to an insurer.",
    ),
    whoIsItFor: loc(
      "Drivers age 55 and older who want a safety refresher and may wish to ask their insurer about a discount.",
    ),
    bullets: [
      loc("Designed for drivers 55 and older"),
      loc("Completed online through an approved provider"),
      loc("Includes guidance on submitting completion to an insurer"),
      loc("Any insurance discount is set by your insurer, not by us"),
    ],
    priceUsd: 19.95,
    durationLabel: loc("Self-paced"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: ["mature-discount", "mature-who"],
    seo: {
      metaTitle: loc("Mature Driver 55+ Course in Florida | Safety Refresher"),
      metaDescription: loc(
        "Take an approved Florida Mature Driver course online. Ask your insurer whether completion qualifies for a premium discount.",
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
    title: loc("Wireless Communications Device Course"),
    shortDescription: loc(
      "A focused course addressing distracted-driving and cellphone-related citations, where an approved provider supports it.",
    ),
    longDescription: loc(
      "This course addresses safe use of wireless communications devices and distracted driving. Whether it applies to a specific citation is determined by the court or clerk. We connect eligible drivers to an approved provider where this course is offered.",
    ),
    whoIsItFor: loc(
      "Drivers addressing a texting or wireless-device-related citation who have been directed to a related course.",
    ),
    bullets: [
      loc("Focused on distracted-driving safety"),
      loc("Applicability decided by the court or clerk"),
      loc("Delivered online through an approved provider"),
    ],
    priceUsd: null,
    durationLabel: loc("Self-paced"),
    complianceLabels: ["partner-provided", "not-official-dmv", "no-guarantee"],
    faqIds: [],
    seo: {
      metaTitle: loc("Wireless Communications Device Course | Florida"),
      metaDescription: loc(
        "Understand the Florida wireless communications device course option and connect to an approved provider if eligible.",
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
    title: loc("Florida Permit Test Prep"),
    shortDescription: loc(
      "Practice questions, road-sign drills, and clear explanations to help you prepare for the Florida Class E knowledge exam.",
    ),
    longDescription: loc(
      "Our Permit Test Prep is an educational study product — not the official exam and not a state course. It walks you through the kinds of topics on the Florida Class E knowledge exam with practice questions, road-sign drills, and plain-language explanations in English and Spanish. Use it to build confidence before you take the official test.",
    ),
    whoIsItFor: loc(
      "Anyone preparing for the Florida Class E knowledge (permit) exam who wants structured practice.",
    ),
    bullets: [
      loc("Practice questions with explanations"),
      loc("Florida road-signs drills"),
      loc("Available in English and Spanish"),
      loc("Study at your own pace on any device"),
    ],
    priceUsd: 14.95,
    durationLabel: loc("Self-paced"),
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["permit-official", "permit-spanish"],
    seo: {
      metaTitle: loc("Florida Permit Test Prep | Practice for the Class E Exam"),
      metaDescription: loc(
        "Prepare for the Florida permit (Class E knowledge) exam with bilingual practice questions and road-sign drills. Educational prep only.",
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
    title: loc("Spanish Permit Bootcamp"),
    shortDescription: loc(
      "A Spanish-language path that explains Florida's permit steps and gives you focused practice — built for Spanish-speaking learners.",
    ),
    longDescription: loc(
      "The Spanish Permit Bootcamp is an educational study product for Spanish-speaking learners. It explains the Florida permit process in Spanish and provides focused practice for the knowledge exam, with concierge help over WhatsApp. It is preparation and guidance only — not the official exam and not a state course.",
    ),
    whoIsItFor: loc(
      "Spanish-speaking learners who want the Florida permit process and practice explained in Spanish.",
    ),
    bullets: [
      loc("Florida permit steps explained in Spanish"),
      loc("Focused knowledge-exam practice"),
      loc("WhatsApp concierge support"),
      loc("Pairs with our DMV-ready checklist"),
    ],
    priceUsd: 19.95,
    durationLabel: loc("Self-paced"),
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["spanish-what", "permit-spanish"],
    seo: {
      metaTitle: loc("Spanish Permit Bootcamp | Florida Permit Prep in Spanish"),
      metaDescription: loc(
        "Prepare for the Florida permit in Spanish with guided steps, practice, and WhatsApp support. Educational prep only.",
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
    title: loc("Road Signs Masterclass"),
    shortDescription: loc(
      "A short, focused micro-course on Florida road signs and the mistakes that trip up new drivers.",
    ),
    longDescription: loc(
      "The Road Signs Masterclass is a short educational micro-course covering the road signs Florida drivers need to recognize, with a focus on the common mistakes that cost points on practice tests. It's a great add-on to permit prep and a useful refresher for any driver.",
    ),
    whoIsItFor: loc(
      "New drivers and anyone who wants a quick, focused refresher on Florida road signs.",
    ),
    bullets: [
      loc("Covers regulatory, warning, and guide signs"),
      loc("Highlights common mistakes"),
      loc("Short and focused — finish in one sitting"),
    ],
    priceUsd: 9.95,
    durationLabel: loc("About 1 hour"),
    complianceLabels: ["educational-guide", "no-guarantee"],
    faqIds: [],
    seo: {
      metaTitle: loc("Florida Road Signs Masterclass | Quick Refresher"),
      metaDescription: loc(
        "Learn Florida road signs and avoid common mistakes with this short educational micro-course.",
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
    title: loc("New to Florida Driver Guide"),
    shortDescription: loc(
      "Step-by-step guidance for new residents and drivers from other countries on how to approach Florida licensing.",
    ),
    longDescription: loc(
      "Moving to Florida or arriving from another country? This educational guide explains, in plain language, how to think about the Florida licensing process, what documents are commonly needed, and where to get official information. It is general guidance only — not legal advice — and we always point you to official state sources for current requirements.",
    ),
    whoIsItFor: loc(
      "New Florida residents and international drivers who need to understand the licensing path.",
    ),
    bullets: [
      loc("Plain-language overview of the Florida path"),
      loc("Common document checklist to prepare"),
      loc("Links to official sources for current rules"),
      loc("Available with bilingual support"),
    ],
    priceUsd: 12.95,
    durationLabel: loc("Self-paced"),
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["newfl-legal", "newfl-docs"],
    seo: {
      metaTitle: loc("New to Florida Driver Guide | Licensing for New Residents"),
      metaDescription: loc(
        "Understand the Florida licensing process as a new resident or international driver. General educational guidance, not legal advice.",
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
    title: loc("Parent Teen Driver Guide"),
    shortDescription: loc(
      "A coaching guide that helps parents support a teen driver through practice and Florida's requirements.",
    ),
    longDescription: loc(
      "This educational guide helps parents understand Florida's teen licensing steps and coach their teen through supervised practice. It includes practice planning, conversation tips, and a milestone overview. It's guidance for families — not a regulated course.",
    ),
    whoIsItFor: loc(
      "Parents and guardians supporting a teen through the Florida permit-and-license process.",
    ),
    bullets: [
      loc("Understand each licensing milestone"),
      loc("Plan supervised practice with confidence"),
      loc("Conversation and coaching tips"),
    ],
    priceUsd: 9.95,
    durationLabel: loc("Self-paced"),
    complianceLabels: ["educational-guide", "no-guarantee"],
    faqIds: ["dets-parent"],
    seo: {
      metaTitle: loc("Parent Teen Driver Guide | Support Your Teen in Florida"),
      metaDescription: loc(
        "A coaching guide to help parents support a Florida teen driver through practice and licensing milestones.",
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
    title: loc("DMV Ready Checklist"),
    shortDescription: loc(
      "A downloadable checklist to help you gather documents and prepare for your appointment.",
    ),
    longDescription: loc(
      "The DMV Ready Checklist is an educational tool that helps you prepare the documents and steps commonly needed for a Florida licensing appointment. We always recommend confirming current requirements with official state sources, since rules can change.",
    ),
    whoIsItFor: loc(
      "Anyone preparing for a Florida licensing appointment who wants to arrive organized.",
    ),
    bullets: [
      loc("Document-gathering checklist"),
      loc("Appointment-prep tips"),
      loc("Reminder to verify with official sources"),
    ],
    priceUsd: null,
    durationLabel: null,
    complianceLabels: ["educational-guide", "not-official-dmv"],
    faqIds: ["checklist-official"],
    seo: {
      metaTitle: loc("DMV Ready Checklist | Prepare for Your Florida Appointment"),
      metaDescription: loc(
        "Get organized for your Florida licensing appointment with a free document checklist. Educational tool, not an official DMV service.",
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
    title: loc("Defensive Driving Refresher"),
    shortDescription: loc(
      "A general safety refresher to sharpen your defensive-driving habits. No official outcome is promised.",
    ),
    longDescription: loc(
      "This educational refresher reviews defensive-driving fundamentals — following distance, hazard awareness, and safe decision-making. It is for general safety improvement only and does not satisfy any court, state, or insurance requirement.",
    ),
    whoIsItFor: loc(
      "Any driver who wants a quick refresher on safe-driving habits.",
    ),
    bullets: [
      loc("Reviews defensive-driving fundamentals"),
      loc("Short and practical"),
      loc("For general safety only — no official outcome"),
    ],
    priceUsd: 9.95,
    durationLabel: loc("About 1 hour"),
    complianceLabels: ["educational-guide", "no-guarantee"],
    faqIds: [],
    seo: {
      metaTitle: loc("Defensive Driving Refresher | General Safety Course"),
      metaDescription: loc(
        "Sharpen your defensive-driving habits with a short general safety refresher. Educational only; no official outcome promised.",
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
    title: loc("License Suspension First Steps Guide"),
    shortDescription: loc(
      "A plain-language guide to general next steps and course options if your license is suspended.",
    ),
    longDescription: loc(
      "If you're facing a suspension, this educational guide explains, in general terms, the kinds of steps drivers commonly take and the course options that may apply. It is not legal advice and does not determine your status. For your specific situation, always rely on the court, the clerk of court, and official state sources.",
    ),
    whoIsItFor: loc(
      "Drivers facing a suspension who want to understand general options before acting.",
    ),
    bullets: [
      loc("General overview of common next steps"),
      loc("Explains where ADI may fit"),
      loc("Points you to official sources — not legal advice"),
    ],
    priceUsd: null,
    durationLabel: null,
    complianceLabels: ["educational-guide", "not-official-dmv", "no-guarantee"],
    faqIds: ["adi-reinstate", "suspension-legal"],
    seo: {
      metaTitle: loc("License Suspension First Steps | Florida Guidance"),
      metaDescription: loc(
        "Understand general first steps and course options for a Florida license suspension. Educational guidance, not legal advice.",
      ),
    },
    featured: false,
  },
];

export default CourseSchema.array().parse(courses);
