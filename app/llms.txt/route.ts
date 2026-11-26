import { getPosts, plain, postPath } from "@/lib/blog";
import { PROJECTS } from "@/lib/projects";
import { absoluteUrl, site } from "@/lib/site.config";

// Served at /llms.txt: a plain-text guide for AI assistants that summarises the site and links its key pages.
export const dynamic = "force-static";

export async function GET() {
  const posts = await getPosts();
  const lines = [
    `# ${site.name} (${site.handle})`,
    "",
    `> ${site.description}`,
    "",
    "Kolawole Suleiman builds Telegram AI agents, food ordering sites, and interactive web experiences. This site is the portfolio, blog, and quote request page.",
    "",
    "## Main pages",
    `- [Home](${absoluteUrl("/")}): introduction and featured work`,
    `- [About](${absoluteUrl("/about/")}): background and approach`,
    `- [Stack](${absoluteUrl("/stack/")}): languages, frameworks and services used`,
    `- [Projects](${absoluteUrl("/projects/")}): all projects with case studies`,
    `- [Blog](${absoluteUrl("/blog/")}): articles on AI agents, the web and building things`,
    `- [Quotes](${absoluteUrl("/quotes/")}): request a quote for a bot, website or automation`,
    `- [Contact](${absoluteUrl("/contact/")}): email, WhatsApp and GitHub`,
    "",
    "## Projects",
    ...PROJECTS.map((p) => `- [${p.name}](${absoluteUrl(`/projects/${p.slug}/`)}): ${p.kind}. ${p.summary}`),
    "",
    "## Blog posts",
    ...(posts.length
      ? posts.map((p) => `- [${plain(p.title.rendered)}](${absoluteUrl(postPath(p.slug))}): ${plain(p.excerpt.rendered)}`)
      : ["- No posts published yet."]),
    "",
    "## Contact",
    `- Email: ${site.email}`,
    `- WhatsApp: ${site.whatsappDisplay} (https://wa.me/${site.whatsapp})`,
    `- GitHub: ${site.github}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
