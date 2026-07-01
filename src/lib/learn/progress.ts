import { LearnProgressSchema, type LearnProgress } from "@/lib/schemas/learn";

/**
 * localStorage-backed course progress (CE3c).
 *
 * Per course, versioned, no PII, validated on read. Every read that finds
 * missing / corrupt / invalid / wrong-version / wrong-course data returns a
 * fresh default instead of throwing, and every write is wrapped in try/catch so
 * a disabled/full localStorage (private mode) never breaks the UI. Storage is
 * device-local only — there is no account, sync, or backend.
 */

const KEY_PREFIX = "aa-learn:v1:";

/** Storage key for a course's progress. */
export function progressKey(courseSlug: string): string {
  return `${KEY_PREFIX}${courseSlug}`;
}

/** A clean, empty progress record for a course. */
export function defaultProgress(courseSlug: string): LearnProgress {
  return {
    version: "v1",
    courseSlug,
    completedLessonIds: [],
    lastLessonSlug: null,
    checklistState: {},
    flashcardState: {},
    mockAttempts: [],
  };
}

/**
 * Read + validate a course's progress. Returns a fresh default when storage is
 * unavailable, empty, unparseable, schema-invalid, the wrong version, or belongs
 * to a different course slug.
 */
export function readProgress(courseSlug: string): LearnProgress {
  if (typeof window === "undefined") return defaultProgress(courseSlug);
  try {
    const raw = window.localStorage.getItem(progressKey(courseSlug));
    if (!raw) return defaultProgress(courseSlug);
    const parsed = LearnProgressSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || parsed.data.courseSlug !== courseSlug) {
      return defaultProgress(courseSlug);
    }
    return parsed.data;
  } catch {
    // Corrupt JSON or storage access denied — fall back safely.
    return defaultProgress(courseSlug);
  }
}

/** Persist progress. Returns false (no throw) if storage is unavailable. */
function writeProgress(progress: LearnProgress): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(
      progressKey(progress.courseSlug),
      JSON.stringify(progress),
    );
    return true;
  } catch {
    // Storage full or disabled (private mode) — fail silently.
    return false;
  }
}

/**
 * Set a lesson's completion on/off. Idempotent: completing an already-complete
 * lesson (or un-completing a missing one) is a no-op and never duplicates ids.
 * Returns the resulting progress (same reference when unchanged, so React state
 * updates can short-circuit re-renders).
 */
export function setLessonComplete(
  courseSlug: string,
  lessonId: string,
  complete: boolean,
): LearnProgress {
  const current = readProgress(courseSlug);
  const has = current.completedLessonIds.includes(lessonId);
  if (complete === has) return current;
  const completedLessonIds = complete
    ? [...current.completedLessonIds, lessonId]
    : current.completedLessonIds.filter((id) => id !== lessonId);
  const next: LearnProgress = { ...current, completedLessonIds };
  writeProgress(next);
  return next;
}

/** Mark a lesson complete (convenience over setLessonComplete). */
export function markLessonComplete(
  courseSlug: string,
  lessonId: string,
): LearnProgress {
  return setLessonComplete(courseSlug, lessonId, true);
}

/** Record the last-visited lesson (drives the "resume" CTA). */
export function setLastLesson(
  courseSlug: string,
  lessonSlug: string,
): LearnProgress {
  const current = readProgress(courseSlug);
  if (current.lastLessonSlug === lessonSlug) return current;
  const next: LearnProgress = { ...current, lastLessonSlug: lessonSlug };
  writeProgress(next);
  return next;
}

/**
 * Append a mock-test attempt summary (score/total only — no answers, no PII).
 * Practice feedback data for the learner; never an official result.
 */
export function addMockAttempt(
  courseSlug: string,
  score: number,
  total: number,
): LearnProgress {
  const current = readProgress(courseSlug);
  const next: LearnProgress = {
    ...current,
    mockAttempts: [...current.mockAttempts, { score, total, takenClientSide: true }],
  };
  writeProgress(next);
  return next;
}

/**
 * Set a checklist item's checked state (used by the wizard/checklist track).
 * Stores only a boolean per item id — no PII. Returns the same reference when
 * unchanged so React state updates can short-circuit.
 */
export function setChecklistItem(
  courseSlug: string,
  itemId: string,
  checked: boolean,
): LearnProgress {
  const current = readProgress(courseSlug);
  if ((current.checklistState[itemId] ?? false) === checked) return current;
  const next: LearnProgress = {
    ...current,
    checklistState: { ...current.checklistState, [itemId]: checked },
  };
  writeProgress(next);
  return next;
}

/** Delete a single course's stored progress. */
export function resetCourseProgress(courseSlug: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(progressKey(courseSlug));
  } catch {
    // Nothing to do if storage is unavailable.
  }
}

/** Delete progress for every learn course (used by a global reset control). */
export function clearAllLearnProgress(): void {
  if (typeof window === "undefined") return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(KEY_PREFIX)) keys.push(key);
    }
    keys.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Ignore storage errors — best-effort cleanup.
  }
}
