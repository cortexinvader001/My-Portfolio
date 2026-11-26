import Link from "next/link";
import type { WPPost } from "@/lib/blog";
import { formatDate, plain, postPath } from "@/lib/blog";

export function BlogList({ posts }: { posts: WPPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="mt-14 rounded-3xl border border-dashed border-line p-10 text-center">
        <p className="font-display text-2xl">No posts yet.</p>
        <p className="mt-3 text-muted">New articles will appear here, newest first, as soon as they are published.</p>
      </div>
    );
  }

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {posts.map((p) => {
        const title = plain(p.title.rendered);
        return (
          <article key={p.id} className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.02] transition-colors hover:border-cyan/60">
            {p.thumbnail && (
              <Link href={postPath(p.slug)} className="block aspect-[16/10] overflow-hidden border-b border-line bg-ink">
                <img src={p.thumbnail} alt={title} loading="lazy" className="h-full w-full object-cover" />
              </Link>
            )}
            <div className="flex flex-1 flex-col p-7">
              <time dateTime={p.date} className="text-xs uppercase tracking-[0.2em] text-muted">
                {formatDate(p.date)}
              </time>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-snug">
                <Link href={postPath(p.slug)} className="hover:text-accent">
                  {title}
                </Link>
              </h2>
              <p className="mt-4 line-clamp-4 text-muted">{plain(p.excerpt.rendered)}</p>
              <Link href={postPath(p.slug)} className="mt-auto pt-6 font-semibold text-accent underline-offset-4 hover:underline">
                Read post →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
