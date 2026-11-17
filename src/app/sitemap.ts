import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { getAllPerspectives } from "@/lib/perspectives";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = profile.siteUrl;
  const perspectives = getAllPerspectives();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  if (perspectives.length === 0) {
    return staticRoutes;
  }

  return [
    ...staticRoutes,
    {
      url: `${baseUrl}/perspectives`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...perspectives.map((piece) => ({
      url: `${baseUrl}/perspectives/${piece.slug}`,
      lastModified: new Date(piece.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
