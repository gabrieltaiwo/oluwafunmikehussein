import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ShareBar } from "@/components/ShareBar";
import { profile } from "@/data/profile";
import {
  formatPerspectiveDate,
  getAllPerspectives,
  getPerspectiveBySlug,
} from "@/lib/perspectives";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPerspectives().map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPerspectiveBySlug(slug);
  if (!piece) {
    return { title: "Perspective not found" };
  }

  return {
    title: piece.title,
    description: piece.summary,
    openGraph: {
      type: "article",
      title: piece.title,
      description: piece.summary,
      publishedTime: piece.date,
      authors: [profile.displayName],
    },
  };
}

export default async function PerspectiveDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const piece = getPerspectiveBySlug(slug);

  if (!piece) {
    notFound();
  }

  const canonicalUrl = `${profile.siteUrl}/perspectives/${piece.slug}`;

  return (
    <article className="fade-in mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="max-w-[65ch]">
        <Link
          href="/perspectives"
          className="inline-flex min-h-[44px] items-center text-sm font-medium text-ink-muted transition-colors hover:text-accent"
        >
          ← Back to perspectives
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
            <time dateTime={piece.date}>
              {formatPerspectiveDate(piece.date)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{piece.readingTime}</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-[1.16] tracking-tight text-ink sm:text-4xl">
            {piece.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {piece.summary}
          </p>
        </header>

        <div className="prose-editorial py-10">
          <MDXRemote source={piece.content} />
        </div>

        <ShareBar title={piece.title} url={canonicalUrl} />
      </div>
    </article>
  );
}
