import { MetadataRoute } from "next";
import { comparisons, bestofs } from "@/lib/tools";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://stack-pick.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/vs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/best`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE_URL}/vs/${c.slug}`,
    lastModified: new Date(c.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const bestofPages: MetadataRoute.Sitemap = bestofs.map((b) => ({
    url: `${BASE_URL}/best/${b.slug}`,
    lastModified: new Date(b.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...comparisonPages, ...bestofPages];
}
