import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import {
  formatPerspectiveDate,
  getAllPerspectives,
} from "@/lib/perspectives";

export const metadata: Metadata = {
  title: "Perspectives",
  description: `Notes and commentary on corporate governance, board practice, and regulatory compliance by ${profile.displayName}.`,
};

export default function PerspectivesPage() {
  const pieces = getAllPerspectives();

  return (
    <div className="fade-in">
      {/* 1. First-person Perspective statement banner (moved from Home) */}
      <section className="border-b border-border-dark bg-bg-dark text-[#F4F7F8]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="inline-block border-b-2 border-accent pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">
                {profile.statement.eyebrow}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[#B7C7CC]">
                Commentary on board procedure, statutory compliance, and company
                secretarial practice.
              </p>
            </div>

            <div className="lg:col-span-9">
              <blockquote className="font-serif text-2xl font-normal leading-[1.42] text-[#F4F7F8] sm:text-3xl lg:text-[2.125rem]">
                {profile.statement.quote}
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-dark pt-6">
                <div className="flex items-center gap-3.5">
                  {profile.portraitPath ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-accent/60 bg-bg-dark-elevated">
                      <Image
                        src={profile.portraitPath}
                        alt={profile.portraitAlt}
                        fill
                        sizes="48px"
                        className="object-cover object-[50%_20%]"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="font-serif text-base font-semibold text-[#F4F7F8]">
                      {profile.statement.attribution}
                    </p>
                    <p className="block text-xs text-[#B7C7CC]">
                      Head of Company Secretarial Services, George Etomi &amp;
                      Partners
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact?intent=briefing"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent-bright underline underline-offset-4 hover:text-white"
                >
                  <span>Request a governance briefing</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Perspectives Articles Index */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
            Published Notes
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Notes on corporate governance
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Observations on board procedure, statutory compliance, and company
            secretarial practice.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="mt-12 border-t border-border pt-10">
            <p className="text-base text-ink-muted">
              Perspectives are currently being prepared for publication.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-accent-text underline underline-offset-4 hover:text-accent-hover"
              >
                Read about her background
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-accent-text"
              >
                Get in touch
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {pieces.map((piece) => (
              <li key={piece.slug} className="py-8">
                <article className="grid gap-3 md:grid-cols-12 md:items-baseline md:gap-8">
                  <div className="text-sm text-ink-muted md:col-span-3">
                    <time dateTime={piece.date}>
                      {formatPerspectiveDate(piece.date)}
                    </time>
                    <span className="block pt-1 text-xs">
                      {piece.readingTime}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="font-serif text-2xl font-semibold text-ink">
                      <Link
                        href={`/perspectives/${piece.slug}`}
                        className="transition-colors hover:text-accent-text"
                      >
                        {piece.title}
                      </Link>
                    </h2>
                    <p className="mt-2.5 text-base leading-relaxed text-ink-muted">
                      {piece.summary}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
