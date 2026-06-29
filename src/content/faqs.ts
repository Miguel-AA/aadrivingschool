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
    question: loc("Are you a DMV office or a state-approved school?"),
    answer: loc(
      "No. We are an independent help center. We are not the Florida DMV/FLHSMV, a court, or a testing site, and we do not claim state approval. For regulated courses we connect you to an approved provider, and we always point you to official state sources for current requirements.",
    ),
    scope: "global",
    sortOrder: 1,
  },
  {
    id: "global-spanish",
    question: loc("Do you offer help in Spanish?"),
    answer: loc(
      "Yes. Our site, key guides, and concierge support are available in English and Spanish, including WhatsApp help.",
    ),
    scope: "global",
    sortOrder: 2,
  },
  {
    id: "global-guarantee",
    question: loc("Can you guarantee I'll pass or that points will be removed?"),
    answer: loc(
      "No. We can't guarantee exam results, ticket dismissal, point removal, reinstatement, or an insurance discount. Those outcomes are decided by the state, courts, or your insurer. We provide preparation, guidance, and connections to approved providers.",
    ),
    scope: "global",
    sortOrder: 3,
  },
  // TLSAE
  {
    id: "tlsae-what",
    question: loc("What is the TLSAE / Drug & Alcohol course?"),
    answer: loc(
      "TLSAE (Traffic Law & Substance Abuse Education) is the first-time-driver education course most people complete before their first Florida learner's permit. It's delivered online by an approved provider.",
    ),
    scope: "course",
    scopeRef: "tlsae",
    sortOrder: 1,
  },
  {
    id: "tlsae-who",
    question: loc("Do I need TLSAE?"),
    answer: loc(
      "Most first-time Florida drivers do. If you're unsure, use our Course Finder or message us and we'll help you confirm before you enroll.",
    ),
    scope: "course",
    scopeRef: "tlsae",
    sortOrder: 2,
  },
  {
    id: "tlsae-after",
    question: loc("What happens after I finish TLSAE?"),
    answer: loc(
      "The approved provider reports your completion. You'll typically then prepare for and take the Class E knowledge exam — our Permit Test Prep can help.",
    ),
    scope: "course",
    scopeRef: "tlsae",
    sortOrder: 3,
  },
  // DETS
  {
    id: "dets-who",
    question: loc("Who is the teen driver education (DETS) path for?"),
    answer: loc(
      "It's for Florida teens under 18 starting the licensing process, and the parents supporting them. The regulated coursework is delivered by an approved provider.",
    ),
    scope: "course",
    scopeRef: "dets",
    sortOrder: 1,
  },
  {
    id: "dets-parent",
    question: loc("How can parents help?"),
    answer: loc(
      "Our Parent Teen Driver Guide explains the milestones and how to plan supervised practice, so families know what to expect at each step.",
    ),
    scope: "course",
    scopeRef: "dets",
    sortOrder: 2,
  },
  // BDI
  {
    id: "bdi-eligible",
    question: loc("Am I eligible for the BDI course?"),
    answer: loc(
      "Eligibility is determined by the court or clerk of court handling your citation — not by us. Confirm with them first, then we can connect you to an approved provider.",
    ),
    scope: "course",
    scopeRef: "bdi",
    sortOrder: 1,
  },
  {
    id: "bdi-points",
    question: loc("Will BDI remove points from my record?"),
    answer: loc(
      "Any effect on points or your record is decided by the court or clerk, not by us. We can't promise a specific outcome. Always follow the instructions you received.",
    ),
    scope: "course",
    scopeRef: "bdi",
    sortOrder: 2,
  },
  // ADI
  {
    id: "adi-when",
    question: loc("When does the ADI course apply?"),
    answer: loc(
      "ADI is usually associated with certain suspensions or court orders. Whether it applies to you is determined by the state, court, or clerk. We help you understand the option and connect you if eligible.",
    ),
    scope: "course",
    scopeRef: "adi",
    sortOrder: 1,
  },
  {
    id: "adi-reinstate",
    question: loc("Will completing ADI reinstate my license?"),
    answer: loc(
      "We can't promise reinstatement. Reinstatement is governed by the state and any court orders. Follow official instructions; our guide explains general steps.",
    ),
    scope: "course",
    scopeRef: "adi",
    sortOrder: 2,
  },
  // Mature 55+
  {
    id: "mature-discount",
    question: loc("Will I get an insurance discount for the 55+ course?"),
    answer: loc(
      "Possibly — but any discount is determined solely by your insurance company. We can't promise one. We do explain how completion is typically submitted to an insurer.",
    ),
    scope: "course",
    scopeRef: "mature55",
    sortOrder: 1,
  },
  {
    id: "mature-who",
    question: loc("Who can take the Mature Driver course?"),
    answer: loc(
      "It's designed for drivers age 55 and older who want a safety refresher. It's completed online through an approved provider.",
    ),
    scope: "course",
    scopeRef: "mature55",
    sortOrder: 2,
  },
  // Proprietary
  {
    id: "permit-official",
    question: loc("Is Permit Test Prep the official exam?"),
    answer: loc(
      "No. It's an educational study product to help you prepare. The official Class E knowledge exam is administered by the state.",
    ),
    scope: "course",
    scopeRef: "permit-prep",
    sortOrder: 1,
  },
  {
    id: "permit-spanish",
    question: loc("Is permit practice available in Spanish?"),
    answer: loc(
      "Yes. Our Spanish Permit Bootcamp explains the process and provides practice in Spanish, with WhatsApp support.",
    ),
    scope: "course",
    scopeRef: "permit-prep",
    sortOrder: 2,
  },
  {
    id: "spanish-what",
    question: loc("What is the Spanish Permit Bootcamp?"),
    answer: loc(
      "A Spanish-language educational study path that explains Florida's permit steps and provides focused practice. It is preparation only — not the official exam or a state course.",
    ),
    scope: "course",
    scopeRef: "spanish-prep",
    sortOrder: 1,
  },
  {
    id: "newfl-legal",
    question: loc("Is the New to Florida guide legal advice?"),
    answer: loc(
      "No. It's general educational guidance only. For your specific situation and current requirements, rely on official state sources.",
    ),
    scope: "course",
    scopeRef: "new-to-fl",
    sortOrder: 1,
  },
  {
    id: "newfl-docs",
    question: loc("What documents will I need?"),
    answer: loc(
      "Requirements vary and can change. Our checklist lists commonly needed documents, and we always recommend confirming the current list with official sources.",
    ),
    scope: "course",
    scopeRef: "new-to-fl",
    sortOrder: 2,
  },
  {
    id: "checklist-official",
    question: loc("Is the DMV Ready Checklist an official document?"),
    answer: loc(
      "No. It's an educational preparation tool. Always verify current requirements with official state sources before your appointment.",
    ),
    scope: "course",
    scopeRef: "dmv-checklist",
    sortOrder: 1,
  },
  {
    id: "suspension-legal",
    question: loc("Can you tell me how to get my license back?"),
    answer: loc(
      "We provide general educational guidance and course connections, not legal advice. Your exact path is determined by the court, clerk, and state — please rely on those official sources.",
    ),
    scope: "course",
    scopeRef: "suspension-guide",
    sortOrder: 1,
  },
];

export default FaqSchema.array().parse(faqs);
