import Image from "next/image";

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
            <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-brand-200 bg-brand px-6 py-8 text-white shadow-[0_22px_55px_rgba(2,85,245,0.18)] sm:px-9 sm:py-10 lg:px-12">
              <div
                className="pointer-events-none absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full border border-white/15"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
                  {sponsorship.eyebrow}
                </p>
                <h2
                  id="sponsorship-title"
                  className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
                >
                  {sponsorship.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                  {sponsorship.description}
                </p>
              </div>

              <div
                className="sponsor-marquee mt-9"
                tabIndex={0}
                role="region"
                aria-label="Logo sponsor dan partner bergerak dari kanan ke kiri. Arahkan pointer atau fokuskan area ini untuk menjeda."
              >
                <div className="sponsor-marquee-track">
                  {[false, true].map((duplicate) => (
                    <div
                      key={duplicate ? "duplicate" : "primary"}
                      className="sponsor-marquee-group"
                      aria-hidden={duplicate || undefined}
                    >
                      {sponsorship.partners.map((partner) => (
                        <div
                          key={`${duplicate ? "duplicate-" : ""}${partner.id}`}
                          className="sponsor-logo-card"
                        >
                          <Image
                            src={partner.logo.src}
                            alt={partner.logo.alt}
                            width={partner.logo.width}
                            height={partner.logo.height}
                            sizes="(max-width: 639px) 9.5rem, 11rem"
                            loading={duplicate ? "lazy" : "eager"}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
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
        </div>
      </section>
    </>
  );
}
