"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
      language: string;
      theme: "light";
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({ siteKey }: { siteKey: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [apiReady, setApiReady] = useState(false);
  const [token, setToken] = useState("");
  const [verificationError, setVerificationError] = useState(false);

  useEffect(() => {
    if (!apiReady || !containerRef.current || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (nextToken) => {
        setToken(nextToken);
        setVerificationError(false);
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setVerificationError(true);
      },
      language: "id",
      theme: "light",
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [apiReady, siteKey]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <Script
        id="cloudflare-turnstile-api"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setApiReady(true)}
        onReady={() => setApiReady(true)}
      />
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
        Verifikasi keamanan
      </p>
      <div ref={containerRef} className="min-h-16 overflow-x-auto" />
      <input type="hidden" name="turnstileToken" value={token} />
      <p className="mt-2 text-xs leading-5 text-slate-500" aria-live="polite">
        {verificationError
          ? "Verifikasi belum dapat dimuat. Periksa koneksi lalu coba lagi."
          : "Selesaikan verifikasi sebelum mengirim formulir."}
      </p>
    </div>
  );
}
