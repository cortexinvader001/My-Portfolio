"use client";

import { useRef, type PointerEvent } from "react";
import SplitText from "./reactbits/SplitText";
import AnimatedContent from "./reactbits/AnimatedContent";
import Link from "next/link";
import { site } from "@/lib/site.config";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-16 pt-32 sm:px-10"
    >
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-6">
        <div className="order-2 md:order-1">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-cyan">
            Developer · AI agents · Interactive web
          </p>

          <SplitText
            text={site.displayName}
            tag="h1"
            splitType="chars"
            trigger="load"
            delay={30}
            duration={0.8}
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
            className="font-display text-[clamp(2.6rem,7vw,7rem)] font-bold leading-[0.92] tracking-tight"
          />

          <p className="mt-8 max-w-xl font-display text-[clamp(1.25rem,2.4vw,1.85rem)] leading-snug text-paper/90">
            Cortex — <span className="text-accent">Where Curiosity Meets Intelligence.</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-semibold text-ink transition-colors hover:bg-cyan"
            >
              View projects
            </Link>
            <Link
              href="/quotes"
              className="inline-flex h-12 items-center rounded-full border border-line px-6 font-semibold text-paper transition-colors hover:border-cyan hover:text-cyan"
            >
              Request a quote
            </Link>
          </div>
        </div>

        <AnimatedContent distance={60} duration={1} delay={0.3} className="order-1 md:order-2">
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px] md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-accent/20 blur-3xl"
            />
            <img
              src="/images/hero-portrait.png"
              alt="Illustrated portrait of Kolawole Suleiman in a grey hoodie"
              width={1211}
              height={1299}
              className="relative h-auto w-full select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              draggable={false}
            />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
