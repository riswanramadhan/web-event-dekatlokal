import type { EventConfig } from "@/data/events";
import { absoluteUrl } from "@/lib/site";

export function buildEventJsonLd(event: EventConfig) {
  if (
    !event.date.value ||
    event.date.status !== "confirmed" ||
    !event.location.name ||
    !event.location.city ||
    event.location.status !== "confirmed"
  ) {
    return null;
  }

  const startTime = event.mainActivity.startTime.replace(".", ":");
  const endTime = event.mainActivity.endTime.replace(".", ":");
  const startDate = `${event.date.value}T${startTime}:00+08:00`;
  const endDate = `${event.date.value}T${endTime}:00+08:00`;

  const payload = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate,
    endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      event.status === "completed"
        ? "https://schema.org/EventCompleted"
        : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location.city,
        addressCountry: "ID",
        ...(event.location.address
          ? { streetAddress: event.location.address }
          : {}),
      },
    },
    organizer: {
      "@type": "Organization",
      name: "DekatLokal",
      url: "https://dekatlokal.com",
    },
    image: absoluteUrl("/aicl-cocreation-indonesia.webp"),
    url: absoluteUrl(event.route),
  };

  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
