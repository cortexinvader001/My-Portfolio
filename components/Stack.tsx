"use client";

import AnimatedContent from "./reactbits/AnimatedContent";

const GROUPS = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "HTML & CSS"] },
  { title: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "GSAP", "Motion", "Lenis"] },
  { title: "AI & bots", items: ["Telegram Bot API", "Gemini API", "Agent tool use", "Vision", "Model routing"] },
  { title: "Content & delivery", items: ["WordPress REST API", "Web3Forms", "Render", "Git & GitHub"] },
];

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan">02 — Stack</p>
      <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
        The tools I reach for, and why.
      </h2>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
        {GROUPS.map((g, i) => (
          <AnimatedContent key={g.title} distance={30} delay={i * 0.1}>
            <div className="h-full bg-ink p-8 sm:p-10">
              <h3 className="font-display text-lg font-semibold text-accent">{g.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3.5 py-1.5 text-sm text-paper/85 transition-colors hover:border-cyan hover:text-cyan"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
