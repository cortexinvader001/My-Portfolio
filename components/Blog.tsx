"use client";

import { useEffect, useState } from "react";
import AnimatedContent from "./reactbits/AnimatedContent";
import { wordpress } from "@/lib/site.config";

type WPPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
};

/** Turn WordPress HTML into plain text safely (no HTML is injected into the page). */
function plain(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function Blog() {
  const [posts, setPosts] = useState<WPPost[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const base = wordpress.apiBase.replace(/\/$/, "");
    if (!base) {
      setPosts([]);
      return;
    }
    const ctrl = new AbortController();
    // Newest first, straight from WordPress, then sorted again on the client as a safeguard.
    const url = `${base}/posts?per_page=6&orderby=date&order=desc&_fields=id,date,link,title,excerpt`;
    fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<WPPost[]>;
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setPosts([...list].sort((a, b) => +new Date(b.date) - +new Date(a.date)));
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setFailed(true);
        setPosts([]);
      });
    return () => ctrl.abort();
  }, []);

  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan">04 — Blog</p>
      <h2 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">Notes from the build.</h2>

      {posts === null && (
        <div className="mt-14 grid gap-6 md:grid-cols-3" aria-label="Loading posts">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-56 animate-pulse rounded-3xl border border-line bg-white/[0.03]" />
          ))}
        </div>
      )}

      {posts !== null && posts.length === 0 && (
        <AnimatedContent distance={30}>
          <div className="mt-14 rounded-3xl border border-dashed border-line p-10 text-center">
            <p className="font-display text-2xl">{failed ? "Posts couldn't load right now." : "No posts yet."}</p>
            <p className="mt-3 text-muted">
              {failed
                ? "Please check back shortly."
                : "New articles will appear here, newest first, as soon as they are published."}
            </p>
          </div>
        </AnimatedContent>
      )}

      {posts !== null && posts.length > 0 && (
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <AnimatedContent key={p.id} distance={30} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-white/[0.02] p-7 transition-colors hover:border-cyan/60">
                <time dateTime={p.date} className="text-xs uppercase tracking-[0.2em] text-muted">
                  {formatDate(p.date)}
                </time>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-snug">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {plain(p.title.rendered)}
                  </a>
                </h3>
                <p className="mt-4 line-clamp-4 text-muted">{plain(p.excerpt.rendered)}</p>
              </article>
            </AnimatedContent>
          ))}
        </div>
      )}
    </section>
  );
}
