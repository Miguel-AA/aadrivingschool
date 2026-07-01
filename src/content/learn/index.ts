import type { LearnCourse } from "@/lib/schemas/learn";

/**
 * Learn-track registry (CE3a).
 *
 * Maps a catalog slug to a LAZY loader for that track's validated LearnCourse.
 * Loaders use dynamic `import()` so no learn content (and no future question
 * banks) is pulled into the main bundle — a track is fetched only when the
 * player enters it (CE3b wires this to the /learn routes).
 *
 * To add a track later, register its `course.ts` loader here. Nothing is eager.
 */
export type LearnTrackModule = { default: LearnCourse };
export type LearnTrackLoader = () => Promise<LearnTrackModule>;

const LEARN_TRACKS: Record<string, LearnTrackLoader> = {
  "permit-test-prep": () => import("./permit-test-prep/course"),
  "new-to-florida-driver-guide": () =>
    import("./new-to-florida-driver-guide/course"),
};

/** True when the given catalog slug has a learn track registered. */
export function hasLearnTrack(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(LEARN_TRACKS, slug);
}

/** The lazy loader for a track, or undefined for an unknown slug. */
export function getLearnCourseLoader(slug: string): LearnTrackLoader | undefined {
  return LEARN_TRACKS[slug];
}

/** All registered learn-track slugs. */
export function getLearnTrackSlugs(): string[] {
  return Object.keys(LEARN_TRACKS);
}
