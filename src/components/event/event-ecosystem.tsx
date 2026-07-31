import { ArrowRight, ArrowUpRight, Building } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import type { EventConfig } from "@/data/events";

type EventEcosystemProps = Pick<
  EventConfig,
  "sponsorship" | "supportingEcosystem"
>;

export function EventEcosystem({
  sponsorship,
  supportingEcosystem,
}: EventEcosystemProps) {
  const approvedMembers = supportingEcosystem.members.filter(
    (member) => member.approvedForDisplay,
  );
  const mainMembers = approvedMembers.filter(
    (member) => member.cluster === "main",
  );
  const bumnMembers = approvedMembers.filter(
    (member) => member.cluster === "bumn",
  );

  return (
    <>
      <section
        aria-labelledby="sponsorship-title"
        className="px-4 py-14 sm:px-6 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-[74rem]">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-brand-200 bg-brand px-6 py-8 text-white shadow-[0_22px_55px_rgba(2,85,245,0.18)] sm:px-9 sm:py-10 lg:grid lg:grid-cols-[1fr_19rem] lg:items-center lg:gap-12 lg:px-12">
              <div
                className="pointer-events-none absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full border border-white/15"
                aria-hidden="true"
              />
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
                  {sponsorship.eyebrow}
                </p>
                <h2
                  id="sponsorship-title"
                  className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
                >
                  {sponsorship.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                  {sponsorship.description}
                </p>
                <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={sponsorship.proposalCtaHref}
                    className="button-loop inline-flex min-h-12 w-fit max-w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand shadow-[0_12px_28px_rgba(0,31,92,0.2)] transition hover:-translate-y-0.5 hover:bg-brand-50 sm:px-6"
                  >
                    {sponsorship.proposalCtaLabel}
                    <ArrowRight
                      className="h-4 w-4 shrink-0"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </Link>
                  <a
                    href={sponsorship.ctaHref}
                    className="inline-flex min-h-12 w-fit max-w-full items-center justify-center gap-2 rounded-full border border-white/45 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:px-6"
                  >
                    {sponsorship.ctaLabel}
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              <div className="mt-8 flex min-h-40 items-center justify-center rounded-[1.4rem] border border-dashed border-white/45 bg-white/10 p-6 text-center backdrop-blur-sm lg:mt-0">
                <div>
                  <Building
                    className="mx-auto h-9 w-9 text-white"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                    {sponsorship.placeholderLabel}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-white/65">
                    Bisa ada di sini
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="supporting-ecosystem-title"
        className="border-y border-slate-200 bg-white/80 py-14 sm:py-20"
      >
        <div className="page-container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {supportingEcosystem.eyebrow}
            </p>
            <h2
              id="supporting-ecosystem-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl"
            >
              {supportingEcosystem.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {supportingEcosystem.description}
            </p>
          </Reveal>

          <div
            className="ecosystem-marquee mt-10"
            tabIndex={0}
            role="region"
            aria-label="Logo supporting ecosystem bergerak dari kanan ke kiri. Arahkan pointer atau fokuskan area ini untuk menjeda."
          >
            <div className="ecosystem-marquee-track">
              {[false, true].map((duplicate) => (
                <div
                  key={duplicate ? "duplicate" : "primary"}
                  className="ecosystem-marquee-group"
                  aria-hidden={duplicate || undefined}
                >
                  {mainMembers.map((member) => (
                    <div
                      key={`${duplicate ? "duplicate-" : ""}${member.id}`}
                      className="ecosystem-logo-card"
                    >
                      <Image
                        src={member.logo.src}
                        alt={member.logo.alt}
                        width={member.logo.width}
                        height={member.logo.height}
                        sizes="(max-width: 639px) 10rem, 12rem"
                        loading={duplicate ? "lazy" : "eager"}
                        className="h-full max-h-20 w-full object-contain sm:max-h-24"
                      />
                    </div>
                  ))}

                  <div
                    className="ecosystem-bumn-cluster"
                    aria-label={duplicate ? undefined : "Klaster ecosystem BUMN"}
                  >
                    {bumnMembers.map((member) => (
                      <div
                        key={`${duplicate ? "duplicate-" : ""}${member.id}`}
                        className="ecosystem-logo-card ecosystem-logo-card-bumn"
                      >
                        <Image
                          src={member.logo.src}
                          alt={member.logo.alt}
                          width={member.logo.width}
                          height={member.logo.height}
                          sizes="(max-width: 639px) 8.5rem, 10rem"
                          loading={duplicate ? "lazy" : "eager"}
                          className="h-full max-h-16 w-full object-contain sm:max-h-20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="mx-auto mt-6 max-w-2xl text-center">
            <p className="text-xs leading-6 text-slate-500">
              {supportingEcosystem.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
