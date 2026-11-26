"use client";

import Link from "next/link";
import AnimatedContent from "./reactbits/AnimatedContent";
import { Thumb } from "./Thumb";
import type { Project } from "@/lib/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <AnimatedContent key={p.slug} distance={40} delay={i * 0.1} className={p.flagship ? "md:col-span-2" : ""}>
          <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.02] transition-colors duration-500 hover:border-accent/60">
            <Link
              href={`/projects/${p.slug}`}
              aria-label={`${p.name} case study`}
              className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-ink"
            >
              <Thumb project={p} />
            </Link>

            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-cyan">{p.kind}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight">
                <Link href={`/projects/${p.slug}`} className="hover:text-accent">
                  {p.name}
                </Link>
              </h3>
              <p className="mt-4 text-muted">{p.summary}</p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <ul className="flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((s) => (
                    <li key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs text-paper/80">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href={`/projects/${p.slug}`} className="font-semibold text-accent underline-offset-4 hover:underline">
                  Case study →
                </Link>
              </div>
            </div>
          </article>
        </AnimatedContent>
      ))}
    </div>
  );
}
