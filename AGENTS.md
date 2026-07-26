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

- `referensi-ui-dekatlokal` is a read-only visual reference.
- Never import runtime modules from the reference folder.
- Do not delete or edit reference files.
- Rebuild production components cleanly.
- Document the visual audit in `docs/ui-reference-audit.md`.

## Technical rules

- Next.js App Router.
- TypeScript strict.
- Server Components by default.
- Client Components only when interactivity requires them.
- Use npm, the package manager selected when this project was scaffolded.
- Avoid unnecessary dependencies.
- Use Zod for all external input.
- Use semantic HTML and accessible forms.
- Use `next/image` and `next/font`.

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

## Validation commands

- `npm run lint`
- `npm run typecheck`
- `npm run build`
