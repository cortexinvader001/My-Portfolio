import type { Metadata } from "next";
import { BlogList } from "@/components/BlogList";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site.config";

const title = "Blog";
const description = "Notes on building AI agents, interactive websites and automation, by Kolawole Suleiman (Cortex).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/" },
  openGraph: { title, description, url: absoluteUrl("/blog/"), type: "website" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-40 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan">Blog</p>
      <h1 className="mt-6 font-display text-5xl font-semibold leading-tight sm:text-6xl">Notes from the build.</h1>
      <BlogList posts={posts} />
    </section>
  );
}
