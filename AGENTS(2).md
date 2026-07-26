# AGENTS.md

## Project identity

Project: DekatLokal Event  
Primary event: AI Co-Creation Lab Makassar  
Owner: DekatLokal  
Language: Bahasa Indonesia  
Primary domain: `event.dekatlokal.com`

## Read first

Before code changes, read:

- `PRD_DEKATLOKAL_EVENT_MVP.md`
- `CONTENT_AND_ROUTES.md`
- `SUPABASE_SCHEMA.sql`
- `.env.example`
- `ACCEPTANCE_CHECKLIST.md`

## Product rules

- Keep the MVP focused.
- Static event content stays in typed data config.
- Supabase is required only for registration data in this phase.
- Do not build payment, ticket marketplace, certificates, QR check-in, organizer builder, or multi-tenant auth.
- Distinguish target metrics from actual metrics.
- Never fabricate participant, UMKM, partner, venue, testimonial, evidence, date, or impact data.
- Use honest placeholders and status labels.

## Reference UI rules

- The copied DekatLokal `app` and `components` are read-only visual references.
- Move conflicting reference code to `referesnsi-ui-dekatlokal`.
- Never import runtime modules from `referensi`.
- Do not delete reference files.
- Rebuild production components cleanly.
- Document the visual audit in `referensi-ui-dekatlokal`.

## Technical rules

- Next.js App Router.
- TypeScript strict.
- Server Components by default.
- Client Components only when interactivity requires them.
- Use package manager from the existing lockfile.
- Do not pin arbitrary package versions.
- Avoid unnecessary dependencies.
- Use Zod for all external input.
- Use semantic HTML and accessible forms.
- Use `next/image` and `next/font`.
- Follow existing repository conventions when they do not conflict with this file.

## Supabase rules

- Never expose `SUPABASE_SERVICE_ROLE_KEY`.
- Registration writes must occur server-side.
- Do not allow public read access to registrations.
- Do not allow direct anonymous insert to registrations.
- RLS must remain enabled.
- Validate, trim, normalize, and limit all fields.
- Do not log registration payloads.
- Do not place PII in URLs.
- Do not render registration records publicly.

## Content rules

- Use Bahasa Indonesia.
- Keep copy clear for UMKM and students.
- Avoid unnecessary AI jargon.
- Do not imply Google is a sponsor or partner.
- Do not use organization logos without explicit approval.
- Use `Dalam Proses`, `Dalam Validasi`, or `Belum Dikonfirmasi` when applicable.

## Design rules

- Primary blue: `#0255F5`.
- Clean, modern, mobile-first.
- Strong visual hierarchy.
- Generous whitespace.
- Consistent radius and spacing.
- Avoid excessive gradients, glassmorphism, blobs, and generic AI aesthetics.
- Match DekatLokal design language without coupling to old code.

## Validation commands

Run the repository-equivalent commands:

- lint;
- TypeScript check;
- production build.

If tests exist, run relevant tests.

Do not claim success without command evidence.

## Documentation rules

Maintain:

- `README.md`
- `docs/setup-supabase.md`
- `docs/content-editing.md`
- `docs/deployment.md`
- `docs/ui-reference-audit.md`
- `docs/implementation-plan.md`
- `docs/implementation-summary.md`

## Scope discipline

Do not refactor unrelated code unless required for correctness or build.

Do not change existing secrets, deployment settings, or database projects.

Do not write to the copied production database of another DekatLokal product.
