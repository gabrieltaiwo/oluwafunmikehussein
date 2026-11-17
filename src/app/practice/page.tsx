import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Practice",
  description: `Corporate governance advisory, company secretarial practice, regulatory compliance, and board briefings by ${profile.displayName}.`,
};

const practiceContextMeta: Record<
  string,
  { scope: string; focus: string }
> = {
  "Board governance and advisory": {
    scope: "Listed & Regulated Boards",
    focus: "Board charters, committee mandates, director induction & evaluation",
  },
  "Company secretarial services": {
    scope: "Public Company Secretariat",
    focus: "AGM procedure, board packs, statutory minutes & shareholder engagement",
  },
  "Regulatory compliance and filings": {
    scope: "Statutory & Market Rules",
    focus: "CAMA 2020 compliance, CAC filings, SEC & NGX governance disclosures",
  },
  "Corporate transactions and statutory obligations": {
    scope: "Corporate Structuring",
    focus: "Restructurings, capital changes & subsidiary governance alignment",
  },
};

export default function PracticePage() {
  return (
    <div className="fade-in">
      {/* 1. Practice Header Banner */}
      <section className="border-b border-border-dark bg-bg-dark text-[#F4F7F8]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-3xl">
            <p className="inline-block border-b-2 border-accent pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">
              Practice &amp; Advisory
            </p>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#F4F7F8] sm:text-5xl">
              How she advises boards and executive teams
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#C4D3D7] sm:text-lg">
              Practical corporate governance, company secretarial, and statutory
              compliance counsel for listed companies, financial institutions,
              and regulated corporate groups across Nigeria.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TrackedLink
                href="/contact?intent=briefing"
                eventName="Practice Hero CTA"
                className="inline-flex min-h-[48px] items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover"
              >
                Request a briefing
              </TrackedLink>
              <Link
                href="/contact?intent=profile"
                className="inline-flex min-h-[48px] items-center justify-center border border-border-dark bg-bg-dark-elevated px-6 py-3 text-sm font-medium text-[#F4F7F8] transition-colors hover:border-accent-bright hover:text-accent-bright"
              >
                Request full profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Alternating Practice / Offer Blocks */}
      <section className="bg-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
              Core Mandate
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Four areas of corporate governance practice
            </h2>
          </div>

          <div className="mt-12 space-y-10">
            {profile.expertise.map((area, index) => {
              const reversed = index % 2 === 1;
              const meta = practiceContextMeta[area.title];
              return (
                <div
                  key={area.title}
                  className="grid items-stretch gap-6 border-t border-border pt-10 lg:grid-cols-12 lg:gap-10"
                >
                  <div
                    className={`flex flex-col justify-between border-l-4 border-accent bg-surface p-7 shadow-[0_8px_30px_rgba(15,35,40,0.04)] sm:p-9 lg:col-span-5 ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                        {area.eyebrow}
                      </span>
                      <span className="font-serif text-2xl font-semibold text-border">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-6 space-y-2 border-t border-border pt-5">
                      {meta ? (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink">
                            {meta.scope}
                          </p>
                          <p className="text-sm leading-relaxed text-ink-muted">
                            {meta.focus}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className={`flex flex-col justify-center space-y-4 lg:col-span-7 ${
                      reversed ? "lg:order-1" : ""
                    }`}
                  >
                    <h3 className="font-serif text-2xl font-semibold text-ink sm:text-[1.65rem]">
                      {area.title}
                    </h3>
                    <p className="max-w-xl text-base leading-[1.78] text-ink-muted">
                      {area.description}
                    </p>
                    <div className="pt-1">
                      <TrackedLink
                        href={`/contact?intent=briefing&topic=${encodeURIComponent(
                          area.title
                        )}`}
                        eventName="Practice Briefing CTA"
                        eventProps={{ area: area.title }}
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent-text underline underline-offset-4 hover:text-accent-hover"
                      >
                        <span>Request a briefing</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </TrackedLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Briefing Topic Tiles */}
      <section
        id="briefings"
        className="scroll-mt-20 border-t border-border bg-bg-subtle/60"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
              Briefings &amp; Board Sessions
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Focused sessions for boards and governance teams
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {profile.briefingTopics.map((topic) => (
              <article
                key={topic.title}
                className="flex flex-col justify-between border border-border bg-surface p-7 transition-colors hover:border-accent"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                    {topic.audience}
                  </p>
                  <h3 className="mt-2.5 font-serif text-xl font-semibold text-ink">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {topic.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <TrackedLink
                    href={`/contact?intent=briefing&topic=${encodeURIComponent(
                      topic.title
                    )}`}
                    eventName="Briefing Tile CTA"
                    eventProps={{ topic: topic.title }}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent-text underline underline-offset-4 hover:text-accent-hover"
                  >
                    <span>Request a briefing</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
