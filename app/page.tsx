import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectGrid } from "@/components/ProjectGrid";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: { absolute: "Kolawole Suleiman — Cortex | Developer, AI agents and interactive web" },
  description:
    "Kolawole Suleiman (Cortex) builds Telegram AI agents, food ordering sites and interactive web experiences. Cortex — Where Curiosity Meets Intelligence.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <section className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">03 — Projects</p>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">Selected work.</h2>
          </div>
          <Link href="/projects" className="font-semibold text-accent underline-offset-4 hover:underline">
            All projects →
          </Link>
        </div>
        <ProjectGrid projects={PROJECTS.slice(0, 3)} />
      </section>
    </>
  );
}
