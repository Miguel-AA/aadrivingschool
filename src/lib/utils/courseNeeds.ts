import type { CourseCategory } from "@/lib/schemas/content";

/** Situation-based "needs" used to filter the catalog (mirrors the gameplan IA). */
export type NeedKey =
  | "firstTime"
  | "teen"
  | "ticket"
  | "suspension"
  | "mature"
  | "spanish"
  | "newToFlorida";

/** Order of filter chips shown on /courses. */
export const NEED_KEYS: NeedKey[] = [
  "firstTime",
  "teen",
  "ticket",
  "suspension",
  "mature",
  "spanish",
  "newToFlorida",
];

const COURSE_NEEDS: Record<CourseCategory, NeedKey[]> = {
  tlsae: ["firstTime"],
  "permit-prep": ["firstTime"],
  "road-signs": ["firstTime"],
  "spanish-prep": ["spanish", "firstTime"],
  dets: ["teen"],
  "parent-teen": ["teen"],
  bdi: ["ticket"],
  wcd: ["ticket"],
  adi: ["suspension"],
  "suspension-guide": ["suspension"],
  mature55: ["mature"],
  "defensive-refresher": ["mature"],
  "new-to-fl": ["newToFlorida"],
  "dmv-checklist": ["newToFlorida", "firstTime"],
};

const PACKAGE_NEEDS: Record<string, NeedKey[]> = {
  "first-time-adult": ["firstTime"],
  "teen-permit": ["teen"],
  "spanish-help": ["spanish", "firstTime"],
  "ticket-solution": ["ticket"],
  "license-reinstatement": ["suspension"],
  "55-plus-discount": ["mature"],
  "new-to-florida": ["newToFlorida"],
};

export const getCourseNeeds = (category: CourseCategory): NeedKey[] =>
  COURSE_NEEDS[category] ?? [];

export const getPackageNeeds = (packageId: string): NeedKey[] =>
  PACKAGE_NEEDS[packageId] ?? [];
