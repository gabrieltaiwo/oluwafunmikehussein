import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Scale } from "lucide-react";
import { AnimatedProofValue } from "@/components/AnimatedProofValue";
import { ContactForm } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";
import { profile } from "@/data/profile";
import {
  formatPerspectiveDate,
  getAllPerspectives,
} from "@/lib/perspectives";

export default function HomePage() {
  const perspectives = getAllPerspectives();
  const hasPerspectives = perspectives.length > 0;
  const latestPerspectives = perspectives.slice(0, 3);
  const tickerItems = profile.expertise.map((item) => item.title);

  return (
    <div className="fade-in">
      {/* 1. Hero Header Banner: Full-bleed GEPLAW-style banner with left portrait & right title, responsive */}
      <section className="relative overflow-hidden border-b border-border-dark bg-bg-dark text-[#F4F7F8]">
        {profile.portraitPath ? (
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:absolute md:inset-y-0 md:left-0 md:h-full md:w-[46%] lg:w-[40%]">
            <Image
              src={profile.portraitPath}
              alt={profile.portraitAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 46vw"
              className="object-cover object-[50%_22%] md:object-[50%_18%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-bg-dark/45"
            />
            <div
              aria-hidden="true"
              className="hidden md:block md:absolute md:inset-y-0 md:right-0 md:w-32 md:bg-gradient-to-r md:from-transparent md:to-bg-dark"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-dark to-transparent md:hidden"
            />
          </div>
        ) : null}

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8 md:flex md:min-h-[360px] md:items-center md:justify-end md:py-14 lg:min-h-[400px]">
          <div
            className={
              profile.portraitPath
                ? "md:w-[58%] md:pl-8 lg:w-[60%] lg:pl-12"
                : "max-w-3xl"
            }
          >
            <p className="inline-block border-b-2 border-accent pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-bright">
              {profile.hero.eyebrow}
            </p>

            <h1 className="mt-4 font-serif text-3xl font-semibold uppercase leading-[1.08] tracking-[0.02em] text-[#F4F7F8] sm:text-4xl lg:text-[3.1rem]">
              {profile.displayName}
            </h1>
            <p className="mt-2 text-xs font-medium tracking-wide text-[#B7C7CC] sm:text-sm">
              Also known as {profile.alternateName}
            </p>

            <p className="mt-5 max-w-xl font-serif text-lg font-normal leading-snug text-[#E6ECEE] sm:text-xl">
              {profile.hero.headline}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#B7C7CC] sm:text-base">
              {profile.hero.subline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <TrackedLink
                href="/practice"
                eventName="Hero Primary CTA"
                eventProps={{ target: "practice" }}
                className="inline-flex min-h-[46px] items-center justify-center bg-accent px-6 py-2.5 text-sm font-semibold text-btn-ink transition-colors hover:bg-accent-hover"
              >
                Explore her practice
              </TrackedLink>

              <TrackedLink
                href="#contact"
                eventName="Hero Secondary CTA"
                eventProps={{ target: "contact" }}
                className="inline-flex min-h-[46px] items-center justify-center border border-border-dark bg-bg-dark-elevated px-6 py-2.5 text-sm font-medium text-[#F4F7F8] transition-colors hover:border-accent-bright hover:text-accent-bright"
              >
                Get in touch
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-header role strip + centered scales-of-justice divider (GEPLAW pattern) */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-serif text-base font-semibold text-ink sm:text-lg">
              {profile.displayName}{" "}
              <span className="font-normal text-ink-muted">
                — Head of Company Secretarial Services, George Etomi &amp; Partners
              </span>
            </p>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
              Lagos, Nigeria
            </span>
          </div>
          <div className="mt-4 flex justify-center" aria-hidden="true">
            <Scale className="h-7 w-7 text-accent-text" strokeWidth={1.6} />
          </div>
        </div>
      </div>

      {/* 2. Slow scrolling practice ticker */}
      <div
        aria-label="Practice areas"
        className="ticker-viewport border-y border-border-dark bg-bg-dark py-4 text-[#F4F7F8]"
      >
        <div className="ticker-track">
          <div className="flex shrink-0 items-center gap-6 px-3">
            {tickerItems.map((title) => (
              <span
                key={title}
                className="inline-flex items-center gap-6 whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em]"
              >
                <span>{title}</span>
                <span aria-hidden="true" className="text-accent-bright">
                  ✦
                </span>
              </span>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="ticker-duplicate shrink-0 items-center gap-6 px-3"
          >
            {tickerItems.map((title) => (
              <span
                key={`dup-${title}`}
                className="inline-flex items-center gap-6 whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em]"
              >
                <span>{title}</span>
                <span className="text-accent-bright">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Proof row of three large animated figures */}
      <section className="border-b border-border bg-bg">
        <div className="mx-auto grid max-w-6xl divide-y divide-border px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {profile.proofFigures.map((item) => (
            <div
              key={item.label}
              className="py-10 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <p className="font-serif text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                <AnimatedProofValue value={item.value} />
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                {item.label}
              </p>
              <p className="mt-1.5 text-sm text-ink-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. High-contrast dark statement block (typographic) */}
      <section className="bg-bg-dark text-[#F4F7F8]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">
                {profile.statement.eyebrow}
              </p>
              <div className="mt-3 h-0.5 w-10 bg-accent-bright" />
            </div>

            <div className="lg:col-span-9">
              <blockquote className="font-serif text-2xl font-normal leading-[1.42] text-[#F4F7F8] sm:text-3xl lg:text-[2.125rem]">
                {profile.statement.quote}
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-dark pt-6">
                <p className="text-sm font-medium text-[#B7C7CC]">
                  — {profile.statement.attribution}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href="/practice"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent-bright underline underline-offset-4 hover:text-white"
                  >
                    <span>Explore practice areas</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[#C4D3D7] underline underline-offset-4 hover:text-white"
                  >
                    <span>Read full background</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Perspectives */}
      {hasPerspectives ? (
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Perspectives
              </h2>
              <Link
                href="/perspectives"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-accent-text underline underline-offset-4 hover:text-accent-hover"
              >
                All perspectives
              </Link>
            </div>

            <ul className="mt-8 divide-y divide-border border-y border-border">
              {latestPerspectives.map((piece) => (
                <li key={piece.slug} className="py-6">
                  <article className="grid gap-2 md:grid-cols-12 md:items-baseline md:gap-8">
                    <time
                      dateTime={piece.date}
                      className="text-sm text-ink-muted md:col-span-3"
                    >
                      {formatPerspectiveDate(piece.date)}
                    </time>
                    <div className="md:col-span-9">
                      <h3 className="font-serif text-xl font-semibold text-ink">
                        <Link
                          href={`/perspectives/${piece.slug}`}
                          className="transition-colors hover:text-accent-text"
                        >
                          {piece.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-ink-muted">
                        {piece.summary}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 6. Credentials */}
      <section className="border-t border-border bg-bg-subtle/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
              Credentials
            </h2>
          </div>

          <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
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
        </div>
      </section>

      {/* 7. Closing Contact block */}
      <section id="contact" className="scroll-mt-20 border-t border-border bg-bg">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
                Contact
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Initiate a conversation
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                For board advisory enquiries, governance briefings, or to
                request a full professional profile.
              </p>
            </div>

            <div className="space-y-3 border-t border-border pt-6 text-sm">
              {profile.email ? (
                <p>
                  <span className="block text-xs uppercase tracking-[0.1em] text-ink-muted">
                    Email
                  </span>
                  <TrackedLink
                    href={`mailto:${profile.email}`}
                    external
                    eventName="Email Click"
                    className="mt-1 inline-flex min-h-[44px] items-center font-medium text-accent-text underline underline-offset-4 hover:text-accent-hover"
                  >
                    {profile.email}
                  </TrackedLink>
                </p>
              ) : null}

              <p>
                <span className="block text-xs uppercase tracking-[0.1em] text-ink-muted">
                  LinkedIn
                </span>
                <TrackedLink
                  href={profile.linkedinUrl}
                  external
                  eventName="LinkedIn Click"
                  eventProps={{ location: "home_contact" }}
                  className="mt-1 inline-flex min-h-[44px] items-center font-medium text-accent-text underline underline-offset-4 hover:text-accent-hover"
                >
                  LinkedIn
                </TrackedLink>
              </p>

              <div className="pt-2">
                <TrackedLink
                  href="/contact?intent=profile"
                  eventName="Request Profile Click"
                  eventProps={{ location: "home_contact" }}
                  className="inline-flex min-h-[44px] items-center border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-text"
                >
                  Request profile
                </TrackedLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
