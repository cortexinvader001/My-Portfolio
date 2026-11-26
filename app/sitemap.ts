import type { MetadataRoute } from "next";
import { getPosts, postPath } from "@/lib/blog";
import { PROJECTS } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site.config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = ["/", "/about/", "/stack/", "/projects/", "/blog/", "/quotes/", "/contact/"];
  const posts = await getPosts();
  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...PROJECTS.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(postPath(p.slug)),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
