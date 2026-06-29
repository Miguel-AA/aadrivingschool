import { PackageSchema, type Package } from "@/lib/schemas/content";
import { loc } from "./_loc";

/**
 * Situation-based packages. Each bundles courses/guides for a specific user
 * problem. Prices are PLACEHOLDERS. `courseIds` reference entries in courses.ts.
 */
const packages: Package[] = [
  {
    id: "first-time-adult",
    slug: "first-time-adult",
    title: loc("First-Time Florida Driver Package"),
    targetUser: loc("For adults starting the Florida license process"),
    shortDescription: loc(
      "A guided starting point for adults beginning the Florida license process, with the TLSAE path, permit prep, and a DMV-ready checklist.",
    ),
    benefits: [
      loc("TLSAE course guidance"),
      loc("Permit test prep"),
      loc("DMV-ready checklist"),
      loc("Bilingual support"),
    ],
    courseIds: ["tlsae", "permit-prep", "dmv-checklist"],
    priceUsd: 39.95,
    featured: true,
  },
  {
    id: "teen-permit",
    slug: "teen-permit",
    title: loc("Teen Permit Preparation Package"),
    targetUser: loc("For parents helping a teen prepare for the learner's permit"),
    shortDescription: loc(
      "A clear path for parents helping a teen prepare for the learner's permit — teen path guidance, practice support, and permit prep.",
    ),
    benefits: [
      loc("Teen permit path guidance"),
      loc("Practice support checklist"),
      loc("Permit test preparation"),
      loc("Parent guidance"),
    ],
    courseIds: ["dets", "permit-prep", "parent-teen", "dmv-checklist"],
    priceUsd: 54.95,
    featured: true,
  },
  {
    id: "spanish-help",
    slug: "spanish-help",
    title: loc("Spanish Guidance Package"),
    targetUser: loc("For drivers who prefer support and explanations in Spanish"),
    shortDescription: loc(
      "Support and explanations in Spanish: a course recommendation for your situation, permit prep support, and a WhatsApp option.",
    ),
    benefits: [
      loc("Spanish-language guidance"),
      loc("Course recommendation"),
      loc("Permit prep support"),
      loc("WhatsApp support option"),
    ],
    courseIds: ["spanish-prep", "permit-prep", "dmv-checklist"],
    priceUsd: 29.95,
    featured: true,
  },
  {
    id: "ticket-solution",
    slug: "ticket-solution",
    title: loc("Ticket Help Support Package"),
    targetUser: loc("For drivers who need help understanding ticket-related education options"),
    shortDescription: loc(
      "Help understanding traffic school and ticket-related education options, with a situation review and a clear next-step explanation.",
    ),
    benefits: [
      loc("Ticket situation review"),
      loc("Traffic school option guidance"),
      loc("Next-step explanation"),
      loc("English or Spanish support"),
    ],
    courseIds: ["bdi"],
    priceUsd: null,
    featured: true,
  },
  {
    id: "license-reinstatement",
    slug: "license-reinstatement",
    title: loc("License Reinstatement Package"),
    targetUser: loc("Drivers with a suspended license"),
    shortDescription: loc(
      "For suspension situations: the ADI path (if applicable), a first-steps guide, and a checklist.",
    ),
    benefits: [
      loc("ADI course path through an approved provider, if applicable"),
      loc("License Suspension First Steps Guide"),
      loc("DMV Ready Checklist"),
    ],
    courseIds: ["adi", "suspension-guide", "dmv-checklist"],
    priceUsd: null,
    featured: false,
  },
  {
    id: "55-plus-discount",
    slug: "55-plus-discount",
    title: loc("55+ Insurance Discount Package"),
    targetUser: loc("Mature drivers age 55+"),
    shortDescription: loc(
      "The Mature Driver course path plus guidance on submitting completion to your insurer. Any discount is set by your insurer.",
    ),
    benefits: [
      loc("Mature Driver 55+ course through an approved provider"),
      loc("Insurer-submission guidance"),
      loc("Defensive Driving Refresher add-on"),
    ],
    courseIds: ["mature55", "defensive-refresher"],
    priceUsd: 24.95,
    featured: false,
  },
  {
    id: "new-to-florida",
    slug: "new-to-florida",
    title: loc("New to Florida Package"),
    targetUser: loc("New residents and international drivers"),
    shortDescription: loc(
      "A route recommendation, a document checklist, and permit/license guidance for getting set up in Florida.",
    ),
    benefits: [
      loc("New to Florida Driver Guide"),
      loc("DMV Ready Checklist"),
      loc("Florida Permit Test Prep"),
    ],
    courseIds: ["new-to-fl", "dmv-checklist", "permit-prep"],
    priceUsd: 24.95,
    featured: false,
  },
];

export default PackageSchema.array().parse(packages);
