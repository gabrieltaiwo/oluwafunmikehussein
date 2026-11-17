import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PracticeMandateList } from "@/components/PracticeMandateList";
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
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
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

            <aside
              aria-label="Mandate and regulatory scope"
              className="border border-border-dark bg-bg-dark-elevated p-6 sm:p-7 lg:col-span-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">
                Mandate &amp; Regulatory Scope
              </p>
              <ol className="mt-4 divide-y divide-border-dark border-t border-border-dark">
                {profile.expertise.map((area, index) => {
                  const meta = practiceContextMeta[area.title];
                  const pillarNum = `0${index + 1}`;
                  return (
                    <li key={area.title}>
                      <a
                        href={`#practice-${pillarNum}`}
                        className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-accent-bright"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-serif text-sm font-semibold text-accent-bright">
                            {pillarNum}
                          </span>
                          <span className="text-sm font-medium text-[#F4F7F8] transition-colors group-hover:text-accent-bright">
                            {area.title}
                          </span>
                        </span>
                        {meta ? (
                          <span className="shrink-0 text-right text-[11px] uppercase tracking-[0.1em] text-[#9FB2B8]">
                            {meta.scope}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-5 border-t border-border-dark pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9FB2B8]">
                  Primary Frameworks
                </p>
                <p className="mt-1.5 text-xs tracking-wide text-[#E6ECEE]">
                  CAMA 2020 &middot; NCCG 2018 &middot; SEC &middot; NGX
                </p>
              </div>
            </aside>
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

          <PracticeMandateList
            items={profile.expertise}
            contextMeta={practiceContextMeta}
          />
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
