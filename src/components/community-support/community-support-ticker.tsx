"use client";

import { Pause, Play, Sparks } from "iconoir-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";

const supporterSchema = z.object({
  name: z.string().trim().min(1).max(40),
  amount: z.number().int().safe().positive(),
});

const responseSchema = z.object({
  latest_supporters: z.array(supporterSchema).max(10),
});

type Supporter = z.output<typeof supporterSchema>;

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function formatRupiah(amount: number) {
  return rupiahFormatter.format(amount).replace(/\s/g, "");
}

export function CommunitySupportTicker() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const loadSupporters = useCallback(async () => {
    try {
      const response = await fetch("/api/community-support/social-proof", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const parsed = responseSchema.safeParse(await response.json());

      if (parsed.success) {
        setSupporters(parsed.data.latest_supporters);
      }
    } catch {
      // Keep the honest campaign fallback when live data is unavailable.
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadSupporters(), 0);
    const interval = window.setInterval(loadSupporters, 60_000);
    const refresh = () => void loadSupporters();
    window.addEventListener("community-support:submitted", refresh);

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
      window.removeEventListener("community-support:submitted", refresh);
    };
  }, [loadSupporters]);

  const messages = useMemo(
    () =>
      supporters.length > 0
        ? supporters.map(
            (supporter) =>
              `${supporter.name} mengirim konfirmasi dukungan senilai ${formatRupiah(supporter.amount)}`,
          )
        : [
            "Community support dibuka untuk AI Co-Creation Lab Makassar — jadilah bagian dari kolaborasi ini.",
          ],
    [supporters],
  );

  return (
    <aside
      aria-label="Kabar community support terbaru"
      className="relative z-[60] flex min-h-11 items-center overflow-hidden bg-ink text-white"
    >
      <p className="sr-only">
        {supporters.length > 0
          ? `Kabar dukungan terbaru: ${messages.join(". ")}`
          : messages[0]}
      </p>
      <div
        aria-hidden="true"
        className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        <div
          className={`community-support-ticker-track flex w-max items-center whitespace-nowrap ${isPaused ? "[animation-play-state:paused]" : ""}`}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex min-w-[100vw] shrink-0 items-center justify-around"
            >
              {messages.map((message, index) => (
                <span
                  key={`${copy}-${index}-${message}`}
                  className="inline-flex items-center gap-2 px-7 text-xs font-semibold tracking-[0.01em] sm:px-10 sm:text-sm"
                >
                  <Sparks className="h-4 w-4 text-amber-300" aria-hidden="true" />
                  {message}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsPaused((current) => !current)}
        aria-pressed={isPaused}
        aria-label={isPaused ? "Lanjutkan ticker" : "Jeda ticker"}
        className="grid min-h-11 w-11 shrink-0 place-items-center border-l border-white/20 bg-ink text-white transition hover:bg-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
      >
        {isPaused ? (
          <Play className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Pause className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      <style jsx>{`
        .community-support-ticker-track {
          animation: community-support-ticker 32s linear infinite;
        }

        .community-support-ticker-track:hover,
        .community-support-ticker-track:focus-within {
          animation-play-state: paused;
        }

        @keyframes community-support-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .community-support-ticker-track {
            animation: none;
          }
        }
      `}</style>
    </aside>
  );
}
