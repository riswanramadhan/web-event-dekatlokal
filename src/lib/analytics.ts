export type AnalyticsEventName =
  | "view_platform_home"
  | "view_event"
  | "click_student_registration"
  | "click_umkm_registration"
  | "student_registration_started"
  | "student_registration_submitted"
  | "umkm_registration_started"
  | "umkm_registration_submitted"
  | "view_journey_activity"
  | "copy_progress_description"
  | "click_evidence"
  | "view_impact"
  | "click_dekatlokal_main_site";

type SafeAnalyticsProperties = Record<string, string | number | boolean | undefined>;

/**
 * Emits a local, PII-free browser event. An analytics provider can subscribe to
 * `dekatlokal:analytics` later without changing product components.
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties: SafeAnalyticsProperties = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("dekatlokal:analytics", {
      detail: { name, properties },
    }),
  );
}
