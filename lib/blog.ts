import { blog } from "./site.config";

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  thumbnail?: string;
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&nbsp;": " ",
};

/** Strip HTML tags and decode common entities so blog text can be shown as plain text. */
export function plain(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:amp|lt|gt|quot|nbsp|#0?39);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

/** "Why do people like Apple" and "why-do-people-like-apple" both become "why-do-people-like-apple". */
export function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The title typed into a URL, such as "Why+do+people+like+Apple". */
export function titleAlias(title: string): string {
  return plain(title)
    .split(" ")
    .filter(Boolean)
    .map((w) => encodeURIComponent(w))
    .join("+");
}

export function postPath(slug: string): string {
  return `/blog/${slug}/`;
}

/**
 * Fetch published posts from the blog service during the build, newest first.
 * If the API link is set but cannot be reached, the build fails on purpose,
 * so Render keeps the last working version instead of publishing an empty blog.
 */
export async function getPosts(): Promise<WPPost[]> {
  const base = blog.apiBase.replace(/\/$/, "");
  if (!base) return [];
  const res = await fetch(`${base}/posts`, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Blog API returned ${res.status}. Stopping the build so the live site keeps its last good version.`);
  }
  const data = (await res.json()) as WPPost[];
  if (!Array.isArray(data)) throw new Error("Blog API returned unexpected data.");
  return [...data].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
