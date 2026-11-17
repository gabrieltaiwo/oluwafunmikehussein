import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="fade-in mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
          Perspectives
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
              className="inline-flex min-h-[44px] items-center text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              Read about her practice
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-accent"
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
                  <span className="block pt-1 text-xs">{piece.readingTime}</span>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-serif text-2xl font-semibold text-ink">
                    <Link
                      href={`/perspectives/${piece.slug}`}
                      className="transition-colors hover:text-accent"
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
    </div>
  );
}
