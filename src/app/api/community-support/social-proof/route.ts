import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

import type { CommunitySupportSocialProof } from "@/lib/community-support/types";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const safeAmount = z.coerce.number().int().safe().positive();

const supporterRowSchema = z.object({
  supporter_name: z.string().min(2).max(120),
  amount: safeAmount,
});

function maskSupporterName(value: string): string {
  const tokens = value
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  const initials = tokens
    .map((token) => Array.from(token).find((character) => /\p{L}/u.test(character)))
    .filter((initial): initial is string => Boolean(initial));

  if (initials.length === 0) {
    return "Pendukung";
  }

  return initials
    .map((initial, index) => `${initial.toLocaleUpperCase("id-ID")}${index === 0 ? "***" : "**"}`)
    .join(" ");
}

function createIncidentReference(): string {
  return `CS-${crypto
    .randomUUID()
    .replaceAll("-", "")
    .slice(0, 8)
    .toUpperCase()}`;
}

function safeFailureCode(error: unknown): string {
  if (!error || typeof error !== "object" || !("code" in error)) {
    return "UNKNOWN";
  }

  const code = (error as { code?: unknown }).code;

  return typeof code === "string" && /^[A-Z0-9_]{1,24}$/i.test(code)
    ? code.toUpperCase()
    : "UNKNOWN";
}

function unavailableResponse(reference: string) {
  return NextResponse.json(
    {
      error: "Community support updates are temporarily unavailable.",
      reference,
    },
    {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

export async function GET() {
  const reference = createIncidentReference();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    console.error("[community-support] social proof unavailable.", {
      reference,
      stage: "environment",
      code: "UNKNOWN",
      httpStatus: 503,
    });
    return unavailableResponse(reference);
  }

  try {
    const { data, error } = await supabase
      .from("community_supports")
      .select("supporter_name,amount")
      .eq("status", "submitted")
      .eq("display_publicly", true)
      .eq("is_anonymous", false)
      .not("ticker_consent_at", "is", null)
      .not("supporter_name", "is", null)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("[community-support] social proof unavailable.", {
        reference,
        stage: "query",
        code: safeFailureCode(error),
        httpStatus: 503,
      });
      return unavailableResponse(reference);
    }

    const rows = z.array(supporterRowSchema).max(10).safeParse(data);

    if (!rows.success) {
      console.error("[community-support] social proof unavailable.", {
        reference,
        stage: "response_validation",
        code: "INVALID_SHAPE",
        httpStatus: 503,
      });
      return unavailableResponse(reference);
    }

    const response: CommunitySupportSocialProof = {
      latest_supporters: rows.data.map((row) => ({
        name: maskSupporterName(row.supporter_name),
        amount: row.amount,
      })),
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    console.error("[community-support] social proof unavailable.", {
      reference,
      stage: "query",
      code: "UNKNOWN",
      httpStatus: 503,
    });
    return unavailableResponse(reference);
  }
}
