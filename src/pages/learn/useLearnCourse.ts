import { useOutletContext } from "react-router-dom";
import type { LearnCourse, LearnProgress } from "@/lib/schemas/learn";

/** Progress mutators exposed by LearnLayout (persist + update UI state). */
export interface LearnProgressActions {
  /** Set a lesson complete/incomplete. */
  setComplete: (lessonId: string, complete: boolean) => void;
  /** Mark a lesson complete. */
  markComplete: (lessonId: string) => void;
  /** Record the last-visited lesson (for resume). */
  visit: (lessonSlug: string) => void;
  /** Store a mock-test attempt summary (score/total only, no PII). */
  recordMockAttempt: (score: number, total: number) => void;
  /** Toggle a checklist item's checked state (wizard/checklist track). */
  setChecklist: (itemId: string, checked: boolean) => void;
  /** Clear this course's progress. */
  reset: () => void;
}

/**
 * Context passed from LearnLayout to every learn child page. Kept in a .ts file
 * (no component export) so the react-refresh lint rule stays happy.
 */
export interface LearnOutletContext {
  /** The validated learn track for the current :courseSlug. */
  course: LearnCourse;
  /** Marketing catalog slug (== the :courseSlug route param). */
  catalogSlug: string;
  /** Localized display title, resolved from the marketing catalog. */
  courseTitle: string;
  /** Current localStorage-backed progress for this course. */
  progress: LearnProgress;
  /** Progress actions (persist + refresh UI state). */
  actions: LearnProgressActions;
}

/** Typed accessor for the learn outlet context. */
export function useLearnCourse(): LearnOutletContext {
  return useOutletContext<LearnOutletContext>();
}
