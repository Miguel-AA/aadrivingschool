/**
 * Analytics seam. The stub logs to the console; swap `analytics.track` for GA4 /
 * Segment / Meta Pixel later without touching call sites. Every funnel event has
 * a name here so CTAs can reference a single source of truth.
 */
export const EVENTS = {
  PAGE_VIEW: "page_view",
  CTA_CLICK: "cta_click",
  QUIZ_START: "quiz_start",
  QUIZ_QUESTION_ANSWERED: "quiz_question_answered",
  QUIZ_COMPLETE: "quiz_complete",
  QUIZ_RECOMMENDATION_CTA: "quiz_recommendation_cta",
  LEAD_FORM_VIEW: "lead_form_view",
  LEAD_SUBMIT_ATTEMPT: "lead_submit_attempt",
  LEAD_SUBMIT_SUCCESS: "lead_submit_success",
  LEAD_SUBMIT_ERROR: "lead_submit_error",
  WHATSAPP_CLICK: "whatsapp_click",
  COURSE_VIEW: "course_view",
  CHECKOUT_START: "checkout_start",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

export interface Analytics {
  track(event: AnalyticsEvent, props?: Record<string, unknown>): void;
}

export const analytics: Analytics = {
  track(event, props) {
    if (typeof console !== "undefined") {
      console.log("[analytics]", event, props ?? {});
    }
  },
};

export const trackEvent = (
  event: AnalyticsEvent,
  props?: Record<string, unknown>,
) => analytics.track(event, props);
