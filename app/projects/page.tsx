import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/" },
  title: "Projects",
  description:
    "Selected projects by Kolawole Suleiman (Cortex).",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-40 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Projects</p>
      <h1 className="mt-6 font-display text-5xl font-semibold leading-tight sm:text-6xl">Selected work.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        AI agents, restaurant sites and ordering experiences, each with a case study.
      </p>
      <ProjectGrid projects={PROJECTS} />
    </section>
  );
}
