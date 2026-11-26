"use client";

import AnimatedContent from "./reactbits/AnimatedContent";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">01 — About</p>

      <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
        <AnimatedContent distance={50} duration={0.9}>
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            I build software that thinks, moves, and ships.
          </h2>
        </AnimatedContent>

        <AnimatedContent distance={50} duration={0.9} delay={0.15}>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m Kolawole Suleiman, known online as <span className="text-paper">Cortex</span>. I build AI
              agents that run inside Telegram, ordering sites for food businesses, and interactive web
              experiences with purposeful motion.
            </p>
            <p>
              I handle the whole path: the logic behind a product, the interface people use, and the content
              around it, including a WordPress blog for writing. I also take on freelance work for clients who
              need something that works well and looks deliberate.
            </p>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
