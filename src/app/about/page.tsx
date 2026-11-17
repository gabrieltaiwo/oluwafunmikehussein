import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: `Background and corporate governance career of ${profile.displayName} (also known as ${profile.alternateName}).`,
};

export default function AboutPage() {
  return (
    <div className="fade-in">
      {/* Full-width background portrait hero with semi-transparent About overlay panel */}
      <section className="relative flex min-h-[640px] items-center overflow-hidden border-b border-border bg-[#CBD6D9] text-ink sm:min-h-[740px] lg:min-h-[820px]">
        {profile.aboutBgPath ? (
          <div aria-hidden="true" className="absolute inset-0">
            <Image
              src={profile.aboutBgPath}
              alt={profile.portraitAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[35%_top] sm:object-[center_15%]"
            />
          </div>
        ) : null}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
          <div className="max-w-2xl border-l-4 border-accent bg-surface/80 p-6 shadow-[0_24px_60px_rgba(15,35,40,0.16)] backdrop-blur-sm sm:p-10 lg:ml-auto">
            <p className="inline-block border-b-2 border-accent pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
              About
            </p>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {profile.displayName}
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Also known as {profile.alternateName}
            </p>

            <p className="mt-8 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
              {profile.about.lead}
            </p>

            <div className="mt-8 space-y-5 text-base leading-[1.78] text-ink">
              {profile.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              {profile.careerInBrief.earlyCareer1987To2006 ? (
                <p>{profile.careerInBrief.earlyCareer1987To2006}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Career timeline
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {profile.about.careerTimeline.map((entry) => (
              <article
                key={`${entry.role}-${entry.period}`}
                className="border border-border border-t-2 border-t-accent bg-surface p-7 shadow-[0_8px_24px_rgba(15,35,40,0.04)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                  {entry.period}
                </p>
                <h3 className="mt-2.5 font-serif text-xl font-semibold text-ink">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">
                  {entry.organization}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {entry.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border border-border bg-surface p-8 sm:p-10">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Credentials
          </h2>
          <dl className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                Education
              </dt>
              {profile.credentials.education.map((deg) => (
                <dd key={deg} className="mt-2 text-base text-ink">
                  {deg}
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                Bar admission
              </dt>
              <dd className="mt-2 text-base text-ink">
                {profile.credentials.barCall}
              </dd>
            </div>
            {profile.credentials.memberships.length > 0 ? (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                  Memberships
                </dt>
                <dd className="mt-2 space-y-1 text-base text-ink">
                  {profile.credentials.memberships.map((m) => (
                    <p key={m}>{m}</p>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
          <Link
            href="/contact?intent=profile"
            className="inline-flex min-h-[48px] items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover"
          >
            Request full profile
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center border border-ink-muted bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-text"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
