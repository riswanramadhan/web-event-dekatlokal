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

function unavailableResponse() {
  return NextResponse.json(
    { error: "Community support updates are temporarily unavailable." },
    {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

export async function GET() {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return unavailableResponse();
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
      return unavailableResponse();
    }

    const rows = z.array(supporterRowSchema).max(10).safeParse(data);

    if (!rows.success) {
      return unavailableResponse();
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
    return unavailableResponse();
  }
}
