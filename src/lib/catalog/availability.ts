import {
  PENDING_PROVIDER_IDS,
  type CatalogStatus,
  type Course,
  type Package,
} from "@/lib/schemas/content";

/**
 * Single source of truth for course/package availability gating.
 *
 * Phase 1 rule: a regulated Florida course (regulatoryStatus
 * "regulated-partner") whose approved provider is not yet confirmed (a
 * placeholder providerId, or none) is GATED — it must not show a price and must
 * not route to /checkout. It stays viewable as a "request info" / consultation
 * item. Every component derives price/CTA decisions from these helpers so no
 * surface can bypass the gate.
 */

/** A regulated course with no confirmed approved provider is gated. */
export function isCourseGated(course: Course): boolean {
  return (
    course.regulatoryStatus === "regulated-partner" &&
    (course.providerId === null || PENDING_PROVIDER_IDS.has(course.providerId))
  );
}

/** A package inherits the most restrictive behavior: gated if ANY included
 *  course is gated. */
export function isPackageGated(includedCourses: Course[]): boolean {
  return includedCourses.some(isCourseGated);
}

export interface CatalogAvailability {
  /** Effective status — a gate forces "consultation". */
  status: CatalogStatus;
  /** True when regulated + no confirmed provider. */
  gated: boolean;
  /** Whether a price may be displayed. */
  showPrice: boolean;
  /** Whether the primary CTA may route to /checkout. */
  canCheckout: boolean;
}

export function courseAvailability(course: Course): CatalogAvailability {
  const gated = isCourseGated(course);
  const hasPrice = course.priceUsd !== null;
  return {
    status: gated ? "consultation" : course.status,
    gated,
    showPrice: !gated && hasPrice,
    canCheckout: !gated && hasPrice,
  };
}

export function packageAvailability(
  pkg: Package,
  includedCourses: Course[],
): CatalogAvailability {
  const gated = isPackageGated(includedCourses);
  const hasPrice = pkg.priceUsd !== null;
  return {
    status: gated ? "consultation" : pkg.status,
    gated,
    showPrice: !gated && hasPrice,
    canCheckout: !gated && hasPrice,
  };
}
