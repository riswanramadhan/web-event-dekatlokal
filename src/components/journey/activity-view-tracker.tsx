"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function ActivityViewTracker({ activitySlug }: { activitySlug: string }) {
  useEffect(() => {
    trackEvent("view_journey_activity", { activity_slug: activitySlug });
  }, [activitySlug]);

  return null;
}
