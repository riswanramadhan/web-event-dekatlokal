import type { EventConfig } from "@/data/events";
import { absoluteUrl } from "@/lib/site";

export function buildEventJsonLd(event: EventConfig) {
  if (!event.date.value || !event.location.name || !event.location.address) {
    return null;
  }

  const payload = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date.value,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location.name,
      address: event.location.address,
    },
    organizer: {
      "@type": "Organization",
      name: "DekatLokal",
      url: "https://dekatlokal.com",
    },
    url: absoluteUrl(event.route),
  };

  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
