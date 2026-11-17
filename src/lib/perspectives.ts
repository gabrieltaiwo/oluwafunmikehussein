import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface PerspectiveMeta {
  title: string;
  date: string;
  summary: string;
  slug: string;
  readingTime: string;
}

export interface PerspectivePiece extends PerspectiveMeta {
  content: string;
}

const PERSPECTIVES_DIR = path.join(process.cwd(), "content", "perspectives");

function getMdxFiles(): string[] {
  if (!fs.existsSync(PERSPECTIVES_DIR)) {
    return [];
  }
  return fs
    .readdirSync(PERSPECTIVES_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export function getAllPerspectives(): PerspectiveMeta[] {
  const files = getMdxFiles();
  if (files.length === 0) return [];

  const items = files
    .map((filename) => {
      const fullPath = path.join(PERSPECTIVES_DIR, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);

      if (!data.title || !data.date || !data.summary) {
        return null;
      }

      const slug =
        typeof data.slug === "string" && data.slug.trim().length > 0
          ? data.slug.trim()
          : filename.replace(/\.mdx?$/, "");

      return {
        title: String(data.title),
        date: String(data.date),
        summary: String(data.summary),
        slug,
        readingTime: readingTime(content).text,
      } satisfies PerspectiveMeta;
    })
    .filter((item): item is PerspectiveMeta => item !== null);

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPerspectiveBySlug(slug: string): PerspectivePiece | null {
  const files = getMdxFiles();
  for (const filename of files) {
    const fullPath = path.join(PERSPECTIVES_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const fileSlug =
      typeof data.slug === "string" && data.slug.trim().length > 0
        ? data.slug.trim()
        : filename.replace(/\.mdx?$/, "");

    if (fileSlug === slug && data.title && data.date && data.summary) {
      return {
        title: String(data.title),
        date: String(data.date),
        summary: String(data.summary),
        slug: fileSlug,
        readingTime: readingTime(content).text,
        content,
      };
    }
  }
  return null;
}

export function formatPerspectiveDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}
