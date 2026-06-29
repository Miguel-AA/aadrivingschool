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
    title: loc("First-Time Adult Package"),
    targetUser: loc("Adult first-time drivers"),
    shortDescription: loc(
      "Everything an adult new driver needs to get started: the required TLSAE path plus permit prep and a DMV-ready checklist.",
    ),
    benefits: [
      loc("TLSAE course path through an approved provider"),
      loc("Florida Permit Test Prep"),
      loc("DMV Ready Checklist"),
      loc("Bilingual support"),
    ],
    courseIds: ["tlsae", "permit-prep", "dmv-checklist"],
    priceUsd: 39.95,
    featured: true,
  },
  {
    id: "teen-permit",
    slug: "teen-permit",
    title: loc("Teen Permit Package"),
    targetUser: loc("Parents and teen drivers"),
    shortDescription: loc(
      "A teen-focused bundle: the DETS path, permit prep, and a parent guide to support practice.",
    ),
    benefits: [
      loc("DETS teen education through an approved provider"),
      loc("Florida Permit Test Prep"),
      loc("Parent Teen Driver Guide"),
      loc("DMV Ready Checklist"),
    ],
    courseIds: ["dets", "permit-prep", "parent-teen", "dmv-checklist"],
    priceUsd: 54.95,
    featured: true,
  },
  {
    id: "spanish-help",
    slug: "spanish-help",
    title: loc("Spanish Help Package"),
    targetUser: loc("Spanish-speaking users"),
    shortDescription: loc(
      "A Spanish-first bundle: the right course path for your situation plus the Spanish Permit Bootcamp and WhatsApp concierge.",
    ),
    benefits: [
      loc("Guided recommendation for your situation"),
      loc("Spanish Permit Bootcamp"),
      loc("DMV Ready Checklist"),
      loc("WhatsApp concierge in Spanish"),
    ],
    courseIds: ["spanish-prep", "permit-prep", "dmv-checklist"],
    priceUsd: 29.95,
    featured: true,
  },
  {
    id: "ticket-solution",
    slug: "ticket-solution",
    title: loc("Ticket Solution Package"),
    targetUser: loc("Drivers with a traffic citation"),
    shortDescription: loc(
      "If you have a citation: the BDI path (where eligible) plus a clear next-steps guide and reminders.",
    ),
    benefits: [
      loc("BDI course path through an approved provider, if eligible"),
      loc("Next-steps guidance"),
      loc("Reminder to follow court/clerk instructions"),
    ],
    courseIds: ["bdi"],
    priceUsd: null,
    featured: false,
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
