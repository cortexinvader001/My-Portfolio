import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Thumb } from "@/components/Thumb";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-6xl px-6 pb-28 pt-40 sm:px-10">
      <Link href="/projects" className="text-sm text-muted hover:text-accent">
        ← All projects
      </Link>

      <p className="mt-10 text-xs uppercase tracking-[0.3em] text-cyan">{project.kind}</p>
      <h1 className="mt-4 font-display text-5xl font-bold leading-none tracking-tight sm:text-7xl">{project.name}</h1>

      <div className="relative mt-12 aspect-video overflow-hidden rounded-3xl border border-line bg-ink">
        <Thumb project={project} large />
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {project.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <aside>
          <h2 className="font-display text-lg font-semibold text-accent">Built with</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-paper/85">
                {s}
              </li>
            ))}
          </ul>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-accent px-6 font-semibold text-ink transition-colors hover:bg-cyan"
          >
            View on GitHub →
          </a>
        </aside>
      </div>
    </article>
  );
}
