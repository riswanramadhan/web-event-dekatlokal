"use client";

import { Check, Copy } from "iconoir-react";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

export function CopyProgressButton({
  text,
  activitySlug,
}: {
  text: string;
  activitySlug: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent("copy_progress_description", { activity_slug: activitySlug });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-200 bg-white px-4 text-sm font-semibold text-brand transition hover:bg-brand-50"
      aria-live="polite"
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? "Deskripsi tersalin" : "Salin deskripsi"}
    </button>
  );
}
