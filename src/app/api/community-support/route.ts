import "server-only";

import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";

import {
  COMMUNITY_SUPPORT_DESTINATION_BANKS,
  COMMUNITY_SUPPORT_EVENT_SLUG,
  COMMUNITY_SUPPORT_PROOF_BUCKET,
  COMMUNITY_SUPPORT_PROOF_PREFIX,
} from "@/lib/community-support/constants";
import {
  validateCommunitySupportFile,
  type CommunitySupportFileError,
  type ValidatedCommunitySupportFile,
} from "@/lib/community-support/file-validation";
import type {
  CommunitySupportApiError,
  CommunitySupportSubmissionSuccess,
} from "@/lib/community-support/types";
import {
  buildCommunitySupportCandidate,
  communitySupportFieldErrors,
  communitySupportFormSchema,
  type CommunitySupportFormData,
} from "@/lib/community-support/validation";
import {
  checkRateLimit,
  getClientIp,
  hashIp,
} from "@/lib/security/rate-limit";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MULTIPART_BODY_BYTES = 6 * 1024 * 1024;
const SUBMIT_ATTEMPT_LIMIT = 5;
const SUBMIT_WINDOW_SECONDS = 10 * 60;
const MAX_INSERT_ATTEMPTS = 4;
const GENERIC_SUBMISSION_ERROR =
  "Something went wrong while submitting your support. Please try again.";

type DatabaseError = {
  code?: string;
  details?: string;
  message?: string;
};

type SupportInsertResult =
  | {
      outcome: "success";
      data: CommunitySupportSubmissionSuccess;
      discardUploadedProof?: boolean;
    }
  | { outcome: "failure" }
  | { outcome: "unknown" };

type ReconciliationResult =
  | { outcome: "found"; data: CommunitySupportSubmissionSuccess }
  | { outcome: "absent" }
  | { outcome: "unknown" };

type BufferedBodyResult =
  | { ok: true; body: ArrayBuffer }
  | { ok: false; reason: "invalid" | "size" };

type ExistingRequestResult =
  | {
      outcome: "found";
      data: CommunitySupportSubmissionSuccess;
      proofPath: string;
    }
  | { outcome: "absent" }
  | { outcome: "conflict" }
  | { outcome: "unknown" };

type ExistingSupportRow = {
  submission_code: string;
  supporter_name: string | null;
  is_anonymous: boolean;
  contact: string | null;
  amount: number;
  destination_bank: string;
  message: string | null;
  display_publicly: boolean;
  ticker_consent_at: string | null;
  proof_path: string;
  proof_mime_type: string;
  proof_sha256: string | null;
  proof_size_bytes: number;
  status: string;
};

function errorResponse(
  error: string,
  status: number,
  fieldErrors?: Record<string, string[]>,
  headers?: HeadersInit,
) {
  return NextResponse.json<CommunitySupportApiError>(
    {
      error,
      ...(fieldErrors && Object.keys(fieldErrors).length > 0
        ? { field_errors: fieldErrors }
        : {}),
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    },
  );
}

function fileErrorMessage(error: CommunitySupportFileError): string {
  if (error === "size") {
    return "File size must be under 5 MB.";
  }

  return "Please upload a JPG, PNG, WebP, or PDF file.";
}

function makassarYearAndMonth(): { year: string; month: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());

  return {
    year: parts.find((part) => part.type === "year")?.value ?? "0000",
    month: parts.find((part) => part.type === "month")?.value ?? "00",
  };
}

function proofPath(file: ValidatedCommunitySupportFile): string {
  const { year, month } = makassarYearAndMonth();
  const objectId = crypto.randomUUID();

  return `${COMMUNITY_SUPPORT_PROOF_PREFIX}/${year}/${month}/${objectId}.${file.extension}`;
}

function generateSubmissionCode(): string {
  const randomPart = crypto
    .randomUUID()
    .replaceAll("-", "")
    .slice(0, 10)
    .toUpperCase();

  return `AICL-CS-${randomPart}`;
}

function isSubmissionCodeConflict(error: DatabaseError): boolean {
  if (error.code !== "23505") {
    return false;
  }

  const context = `${error.message ?? ""} ${error.details ?? ""}`;
  return context.includes("submission_code");
}

function isRequestIdConflict(error: DatabaseError): boolean {
  if (error.code !== "23505") {
    return false;
  }

  const context = `${error.message ?? ""} ${error.details ?? ""}`;
  return context.includes("request_id");
}

function isSupportStatus(value: string): value is "submitted" | "excluded" {
  return value === "submitted" || value === "excluded";
}

function matchesExistingRequest(
  row: ExistingSupportRow,
  data: CommunitySupportFormData,
  file: ValidatedCommunitySupportFile,
): boolean {
  return (
    row.supporter_name === data.supporter_name &&
    row.is_anonymous === data.is_anonymous &&
    row.contact === (data.contact ?? null) &&
    row.amount === data.amount &&
    row.destination_bank === data.destination_bank &&
    row.message === (data.message ?? null) &&
    row.display_publicly === data.display_publicly &&
    (row.ticker_consent_at !== null) === data.display_publicly &&
    row.proof_mime_type === file.mimeType &&
    row.proof_sha256 === file.sha256 &&
    row.proof_size_bytes === file.sizeBytes
  );
}

async function findExistingRequest(
  supabase: SupabaseClient,
  data: CommunitySupportFormData,
  file: ValidatedCommunitySupportFile,
): Promise<ExistingRequestResult> {
  try {
    const { data: row, error } = await supabase
      .from("community_supports")
      .select(
        "submission_code,supporter_name,is_anonymous,contact,amount,destination_bank,message,display_publicly,ticker_consent_at,proof_path,proof_mime_type,proof_sha256,proof_size_bytes,status",
      )
      .eq("request_id", data.request_id)
      .maybeSingle<ExistingSupportRow>();

    if (error) {
      return { outcome: "unknown" };
    }

    if (!row) {
      return { outcome: "absent" };
    }

    if (
      !/^AICL-CS-[A-Z0-9]{10}$/.test(row.submission_code) ||
      !Number.isSafeInteger(row.amount) ||
      row.amount <= 0 ||
      !COMMUNITY_SUPPORT_DESTINATION_BANKS.includes(
        row.destination_bank as (typeof COMMUNITY_SUPPORT_DESTINATION_BANKS)[number],
      ) ||
      !isSupportStatus(row.status) ||
      !row.proof_path
    ) {
      return { outcome: "unknown" };
    }

    if (!matchesExistingRequest(row, data, file)) {
      return { outcome: "conflict" };
    }

    return {
      outcome: "found",
      proofPath: row.proof_path,
      data: {
        submission_code: row.submission_code,
        amount: row.amount,
        destination_bank:
          row.destination_bank as CommunitySupportSubmissionSuccess["destination_bank"],
      },
    };
  } catch {
    return { outcome: "unknown" };
  }
}

async function reconcileUnknownInsert(
  supabase: SupabaseClient,
  data: CommunitySupportFormData,
  objectPath: string,
): Promise<ReconciliationResult> {
  try {
    const { data: row, error } = await supabase
      .from("community_supports")
      .select("submission_code,status")
      .eq("proof_path", objectPath)
      .maybeSingle<{ submission_code: string; status: string }>();

    if (error) {
      return { outcome: "unknown" };
    }

    if (!row) {
      return { outcome: "absent" };
    }

    if (
      !isSupportStatus(row.status) ||
      !/^AICL-CS-[A-Z0-9]{10}$/.test(row.submission_code)
    ) {
      return { outcome: "unknown" };
    }

    return {
      outcome: "found",
      data: {
        submission_code: row.submission_code,
        amount: data.amount,
        destination_bank: data.destination_bank,
      },
    };
  } catch {
    return { outcome: "unknown" };
  }
}

async function reconcileAmbiguousInsert(
  supabase: SupabaseClient,
  data: CommunitySupportFormData,
  file: ValidatedCommunitySupportFile,
  objectPath: string,
): Promise<SupportInsertResult> {
  const byProofPath = await reconcileUnknownInsert(
    supabase,
    data,
    objectPath,
  );

  if (byProofPath.outcome === "found") {
    return { outcome: "success", data: byProofPath.data };
  }

  const byRequestId = await findExistingRequest(supabase, data, file);

  if (byRequestId.outcome === "found") {
    return {
      outcome: "success",
      data: byRequestId.data,
      discardUploadedProof: byRequestId.proofPath !== objectPath,
    };
  }

  // An absent follow-up read does not prove an ambiguous write failed: the
  // upstream request may still commit after a timeout or gateway error.
  return { outcome: "unknown" };
}

function isDefiniteInsertRejection(status: number): boolean {
  return status >= 400 && status < 500 && status !== 408 && status !== 499;
}

async function bufferMultipartBody(request: Request): Promise<BufferedBodyResult> {
  if (!request.body) {
    return { ok: false, reason: "invalid" };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > MAX_MULTIPART_BODY_BYTES) {
        await reader.cancel();
        return { ok: false, reason: "size" };
      }

      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "invalid" };
  }

  if (totalBytes === 0) {
    return { ok: false, reason: "invalid" };
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { ok: true, body: body.buffer };
}

async function removePrivateProof(
  supabase: SupabaseClient,
  objectPath: string,
): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(COMMUNITY_SUPPORT_PROOF_BUCKET)
      .remove([objectPath]);

    if (error) {
      console.error(
        "[community-support] private proof cleanup failed.",
      );
    }
  } catch {
    // Do not log the object path or any payload-derived details.
    console.error(
      "[community-support] private proof cleanup was interrupted.",
    );
  }
}

async function insertSupport(
  supabase: SupabaseClient,
  data: CommunitySupportFormData,
  file: ValidatedCommunitySupportFile,
  objectPath: string,
): Promise<SupportInsertResult> {
  for (let attempt = 0; attempt < MAX_INSERT_ATTEMPTS; attempt += 1) {
    const submissionCode = generateSubmissionCode();

    try {
      const { error, status } = await supabase.from("community_supports").insert({
        request_id: data.request_id,
        submission_code: submissionCode,
        event_slug: COMMUNITY_SUPPORT_EVENT_SLUG,
        supporter_name: data.supporter_name,
        is_anonymous: data.is_anonymous,
        contact: data.contact ?? null,
        amount: data.amount,
        destination_bank: data.destination_bank,
        message: data.message ?? null,
        display_publicly: data.display_publicly,
        ticker_consent_at: data.display_publicly
          ? new Date().toISOString()
          : null,
        proof_bucket: COMMUNITY_SUPPORT_PROOF_BUCKET,
        proof_path: objectPath,
        proof_original_name: file.originalName,
        proof_mime_type: file.mimeType,
        proof_sha256: file.sha256,
        proof_size_bytes: file.sizeBytes,
        status: "submitted",
      });

      if (!error) {
        return {
          outcome: "success",
          data: {
            submission_code: submissionCode,
            amount: data.amount,
            destination_bank: data.destination_bank,
          },
        };
      }

      if (isSubmissionCodeConflict(error as DatabaseError)) {
        continue;
      }

      if (isRequestIdConflict(error as DatabaseError)) {
        const existing = await findExistingRequest(supabase, data, file);

        return existing.outcome === "found"
          ? {
              outcome: "success",
              data: existing.data,
              discardUploadedProof: existing.proofPath !== objectPath,
            }
          : { outcome: "unknown" };
      }

      if (isDefiniteInsertRejection(status)) {
        return { outcome: "failure" };
      }

      return reconcileAmbiguousInsert(supabase, data, file, objectPath);
    } catch {
      // A transport timeout can occur after Postgres committed. Reconcile by
      // the unique proof path. If the read is also inconclusive, preserve the
      // private object: an orphan can be reconciled safely, while deleting it
      // could leave a committed row pointing at a missing proof.
      return reconcileAmbiguousInsert(supabase, data, file, objectPath);
    }
  }

  return { outcome: "failure" };
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader
    ? Number(contentLengthHeader)
    : null;

  if (!/^multipart\/form-data(?:;|$)/i.test(contentType)) {
    return errorResponse(GENERIC_SUBMISSION_ERROR, 415);
  }

  if (
    contentLength !== null &&
    Number.isSafeInteger(contentLength) &&
    contentLength > MAX_MULTIPART_BODY_BYTES
  ) {
    const message = fileErrorMessage("size");
    return errorResponse(message, 413, { proof_file: [message] });
  }

  // Apply the distributed limiter before multipart parsing. This keeps an
  // attacker from repeatedly forcing the server to buffer invalid 5 MB files
  // without consuming quota.
  const ipHash = hashIp(await getClientIp());
  const rateLimit = await checkRateLimit(
    `community-support:${ipHash}`,
    SUBMIT_ATTEMPT_LIMIT,
    SUBMIT_WINDOW_SECONDS,
  );

  if (!rateLimit.allowed) {
    return errorResponse(
      "Too many submission attempts. Please try again later.",
      429,
      undefined,
      { "Retry-After": String(Math.max(1, rateLimit.retryAfterSeconds)) },
    );
  }

  const bufferedBody = await bufferMultipartBody(request);

  if (!bufferedBody.ok) {
    if (bufferedBody.reason === "size") {
      const message = fileErrorMessage("size");
      return errorResponse(message, 413, { proof_file: [message] });
    }

    return errorResponse(GENERIC_SUBMISSION_ERROR, 400);
  }

  let formData: FormData;

  try {
    formData = await new Request(request.url, {
      method: "POST",
      headers: request.headers,
      body: bufferedBody.body,
    }).formData();
  } catch {
    return errorResponse(GENERIC_SUBMISSION_ERROR, 400);
  }

  // Check the honeypot separately so a bot never receives detailed field
  // feedback that would help it adapt its payload.
  const website = formData.get("website");

  if (
    website !== null &&
    (typeof website !== "string" || website.trim() !== "")
  ) {
    return errorResponse(GENERIC_SUBMISSION_ERROR, 400);
  }

  const parsed = communitySupportFormSchema.safeParse(
    buildCommunitySupportCandidate(formData),
  );

  if (!parsed.success) {
    return errorResponse(
      "Please check the highlighted fields and try again.",
      400,
      communitySupportFieldErrors(parsed.error),
    );
  }

  const fileResult = await validateCommunitySupportFile(
    formData.get("proof_file"),
  );

  if (!fileResult.ok) {
    const message = fileErrorMessage(fileResult.error);
    return errorResponse(message, 400, { proof_file: [message] });
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return errorResponse(GENERIC_SUBMISSION_ERROR, 503);
  }

  const existingRequest = await findExistingRequest(
    supabase,
    parsed.data,
    fileResult.file,
  );

  if (existingRequest.outcome === "found") {
    return NextResponse.json<CommunitySupportSubmissionSuccess>(
      existingRequest.data,
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  if (existingRequest.outcome === "unknown") {
    return errorResponse(GENERIC_SUBMISSION_ERROR, 503);
  }

  if (existingRequest.outcome === "conflict") {
    return errorResponse(
      "This form no longer matches an earlier submission. Check your previous confirmation before starting a new submission.",
      409,
    );
  }

  const objectPath = proofPath(fileResult.file);

  try {
    const { error: uploadError } = await supabase.storage
      .from(COMMUNITY_SUPPORT_PROOF_BUCKET)
      .upload(objectPath, fileResult.file.bytes, {
        cacheControl: "0",
        contentType: fileResult.file.mimeType,
        upsert: false,
      });

    if (uploadError) {
      return errorResponse(
        "We couldn\u2019t upload your transfer proof. Please try again.",
        503,
      );
    }
  } catch {
    return errorResponse(
      "We couldn\u2019t upload your transfer proof. Please try again.",
      503,
    );
  }

  const result = await insertSupport(
    supabase,
    parsed.data,
    fileResult.file,
    objectPath,
  );

  if (result.outcome === "failure") {
    await removePrivateProof(supabase, objectPath);
    return errorResponse(GENERIC_SUBMISSION_ERROR, 503);
  }

  if (result.outcome === "unknown") {
    console.error(
      "[community-support] database insert outcome is unknown; private proof retained for reconciliation.",
    );
    return errorResponse(GENERIC_SUBMISSION_ERROR, 503);
  }

  if (result.discardUploadedProof) {
    await removePrivateProof(supabase, objectPath);
  }

  return NextResponse.json<CommunitySupportSubmissionSuccess>(result.data, {
    status: 201,
    headers: { "Cache-Control": "no-store" },
  });
}
