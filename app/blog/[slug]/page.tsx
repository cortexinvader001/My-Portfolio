import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPosts, normalise, plain, postPath, titleAlias, type WPPost } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site.config";

// Every post and every title-style address is generated at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // Static export needs at least one page. The placeholder is marked noindex and never linked.
  if (posts.length === 0) return [{ slug: "_no-posts" }];
  const segments = new Set<string>();
  posts.forEach((p) => {
    segments.add(p.slug);
    segments.add(titleAlias(p.title.rendered));
  });
  return [...segments].map((slug) => ({ slug }));
}

async function findPost(param: string): Promise<WPPost | undefined> {
  let decoded = param;
  try {
    decoded = decodeURIComponent(param);
  } catch {
    // Keep the raw value if it is not valid percent-encoding.
  }
  const key = normalise(decoded);
  const posts = await getPosts();
  return posts.find((p) => normalise(p.slug) === key) ?? posts.find((p) => normalise(plain(p.title.rendered)) === key);
}

function socialImage(post: WPPost): string {
  return absoluteUrl(post.thumbnail || "/images/og-cover.jpg");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false, follow: false } };

  const title = plain(post.title.rendered);
  const description = plain(post.excerpt.rendered).slice(0, 160);
  const url = absoluteUrl(postPath(post.slug));
  const image = socialImage(post);
  return {
    title,
    description,
    alternates: { canonical: postPath(post.slug) },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Cortex",
      publishedTime: post.date,
      authors: [site.name],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

// Escape "<" so the JSON cannot close the script tag early.
function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();

  const title = plain(post.title.rendered);
  const url = absoluteUrl(postPath(post.slug));
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: plain(post.excerpt.rendered).slice(0, 160),
    datePublished: post.date,
    image: socialImage(post),
    mainEntityOfPage: url,
    url,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-40 sm:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <Link href="/blog/" className="text-sm text-muted hover:text-accent">
        ← All posts
      </Link>
      <time dateTime={post.date} className="mt-10 block text-xs uppercase tracking-[0.3em] text-cyan">
        {formatDate(post.date)}
      </time>
      <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{title}</h1>
      {post.thumbnail && (
        <img src={post.thumbnail} alt={title} className="mt-10 w-full rounded-3xl border border-line object-cover" />
      )}
      <div className="post-body mt-12" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
