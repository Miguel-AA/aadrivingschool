import type {
  LearnCourse,
  LearnLesson,
  LearnProgress,
} from "@/lib/schemas/learn";

/**
 * Pure, testable selectors over a LearnCourse + LearnProgress. No React, no
 * storage — just derived views (ordering, counts, percent, resume target).
 */

/** All lessons in course order (module.order, then lesson.order). */
export function orderedLessons(course: LearnCourse): LearnLesson[] {
  return [...course.modules]
    .sort((a, b) => a.order - b.order)
    .flatMap((m) => [...m.lessons].sort((a, b) => a.order - b.order));
}

export function findLessonBySlug(
  course: LearnCourse,
  slug: string,
): LearnLesson | undefined {
  return orderedLessons(course).find((l) => l.slug === slug);
}

/** Previous/next lesson (and the current index) relative to a slug. */
export function getAdjacentLessons(
  course: LearnCourse,
  slug: string,
): { index: number; prev?: LearnLesson; next?: LearnLesson } {
  const list = orderedLessons(course);
  const index = list.findIndex((l) => l.slug === slug);
  return {
    index,
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function totalLessons(course: LearnCourse): number {
  return orderedLessons(course).length;
}

export function isLessonComplete(
  progress: LearnProgress,
  lessonId: string,
): boolean {
  return progress.completedLessonIds.includes(lessonId);
}

/** Count of completed lessons that still exist in the course (ignores stale ids). */
export function completedCount(
  course: LearnCourse,
  progress: LearnProgress,
): number {
  const existing = new Set(orderedLessons(course).map((l) => l.id));
  return progress.completedLessonIds.filter((id) => existing.has(id)).length;
}

/** Whole-number percent complete (0–100). */
export function percentComplete(
  course: LearnCourse,
  progress: LearnProgress,
): number {
  const total = totalLessons(course);
  if (total === 0) return 0;
  return Math.round((completedCount(course, progress) / total) * 100);
}

export function firstLesson(course: LearnCourse): LearnLesson | undefined {
  return orderedLessons(course)[0];
}

/** The last-visited lesson, if it still exists; otherwise undefined. */
export function resumeLesson(
  course: LearnCourse,
  progress: LearnProgress,
): LearnLesson | undefined {
  if (!progress.lastLessonSlug) return undefined;
  return findLessonBySlug(course, progress.lastLessonSlug);
}

export function allLessonsComplete(
  course: LearnCourse,
  progress: LearnProgress,
): boolean {
  const total = totalLessons(course);
  return total > 0 && completedCount(course, progress) === total;
}
