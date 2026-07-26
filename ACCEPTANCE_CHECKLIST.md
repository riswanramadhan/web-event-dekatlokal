# Acceptance Checklist

## A. Repository and reference safety

- [ ] Existing repository inspected.
- [ ] Lockfile identified.
- [ ] Reference UI moved to `_reference/dekatlokal-ui` if necessary.
- [ ] No production import from `_reference`.
- [ ] `docs/ui-reference-audit.md` exists.
- [ ] No user work deleted.
- [ ] `.env.local` untouched.
- [ ] No secrets committed.

## B. Platform routes

- [ ] `/`
- [ ] `/events`
- [ ] `/privacy`
- [ ] `/terms`

## C. Event routes

- [ ] `/ai-co-creation-lab-makassar`
- [ ] `/ai-co-creation-lab-makassar/register`
- [ ] `/ai-co-creation-lab-makassar/register/student`
- [ ] `/ai-co-creation-lab-makassar/register/umkm`
- [ ] `/ai-co-creation-lab-makassar/register/success`
- [ ] `/ai-co-creation-lab-makassar/journey`
- [ ] `/ai-co-creation-lab-makassar/journey/[activitySlug]`
- [ ] `/ai-co-creation-lab-makassar/challenges`
- [ ] `/ai-co-creation-lab-makassar/teams`
- [ ] `/ai-co-creation-lab-makassar/documentation`
- [ ] `/ai-co-creation-lab-makassar/impact`

## D. Homepage quality

- [ ] DekatLokal Event positioning clear.
- [ ] Featured event card works.
- [ ] Future features marked `Segera Hadir`.
- [ ] Main DekatLokal link works.
- [ ] Responsive mobile.
- [ ] UI follows reference design language.

## E. Event landing quality

- [ ] Hero.
- [ ] Metrics.
- [ ] Problem.
- [ ] Solution.
- [ ] How it works.
- [ ] Student benefits.
- [ ] UMKM benefits.
- [ ] Rundown.
- [ ] Challenge examples.
- [ ] Journey preview.
- [ ] Partner status.
- [ ] FAQ.
- [ ] Registration CTA.
- [ ] No fabricated date or venue.
- [ ] No unapproved logo.

## F. Student registration

- [ ] Required fields present.
- [ ] Mobile usable.
- [ ] Client feedback.
- [ ] Server validation.
- [ ] WhatsApp normalization.
- [ ] Email normalization.
- [ ] Skills multi-select.
- [ ] Roles multi-select.
- [ ] Consent required.
- [ ] Honeypot.
- [ ] Pending state.
- [ ] Duplicate prevention.
- [ ] Supabase insert.
- [ ] Success code.
- [ ] Error handling.

## G. UMKM registration

- [ ] Required fields present.
- [ ] Nontechnical language.
- [ ] Sensitive-data warning.
- [ ] Server validation.
- [ ] WhatsApp normalization.
- [ ] Consent privacy.
- [ ] Consent monitoring.
- [ ] Honeypot.
- [ ] Pending state.
- [ ] Duplicate prevention.
- [ ] Supabase insert.
- [ ] Success code.
- [ ] Error handling.

## H. Supabase security

- [ ] Service role server-only.
- [ ] No direct client insert.
- [ ] RLS enabled.
- [ ] No anon registration read.
- [ ] No public participant data.
- [ ] Metadata JSONB only receives validated data.
- [ ] No PII in query string.
- [ ] No payload logging.
- [ ] Env missing state handled.

## I. GEP journey

- [ ] Week 1–4 shown.
- [ ] Unique URL per activity.
- [ ] Status system.
- [ ] Progress description.
- [ ] Copy description button.
- [ ] Output list.
- [ ] Evidence section.
- [ ] Leadership insight.
- [ ] Last updated.
- [ ] Previous/next navigation.
- [ ] Empty evidence state.
- [ ] Links are accessible.

## J. Impact

- [ ] Target and actual distinct.
- [ ] Null actual shown as `Belum Diukur`.
- [ ] No fake impact.
- [ ] Measurement method explained.
- [ ] Student indicators.
- [ ] UMKM indicators.
- [ ] Solution indicators.
- [ ] Monitoring plan.
- [ ] Testimonial placeholder state.

## K. Accessibility

- [ ] Keyboard navigation.
- [ ] Visible focus.
- [ ] Form labels.
- [ ] Error announcement.
- [ ] Contrast.
- [ ] Semantic headings.
- [ ] Alt text.
- [ ] Touch targets.
- [ ] Reduced motion respected.
- [ ] No color-only status.

## L. SEO and deployment

- [ ] Metadata.
- [ ] Canonical.
- [ ] Open Graph.
- [ ] Sitemap.
- [ ] Robots.
- [ ] Favicon.
- [ ] `NEXT_PUBLIC_SITE_URL`.
- [ ] Vercel deployment docs.
- [ ] Cloudflare subdomain docs.
- [ ] Event JSON-LD only with valid date/location.

## M. Build verification

- [ ] Lint passes.
- [ ] TypeScript passes.
- [ ] Production build passes.
- [ ] No horizontal mobile overflow.
- [ ] No internal broken links.
- [ ] No hydration warnings.
- [ ] Registration code compiles.
- [ ] Development missing-env behavior verified.
- [ ] Final implementation summary written.

## N. User placeholders to complete

- [ ] Final event date.
- [ ] Final venue.
- [ ] Contact email.
- [ ] Contact WhatsApp.
- [ ] Approved partners.
- [ ] Approved logos.
- [ ] Evidence links.
- [ ] Journey status.
- [ ] Registration open status.
- [ ] Supabase credentials.
- [ ] Production domain.
