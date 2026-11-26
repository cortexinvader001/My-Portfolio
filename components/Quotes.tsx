"use client";

import AnimatedContent from "./reactbits/AnimatedContent";
import { QuoteForm } from "./QuoteForm";
import { site } from "@/lib/site.config";

export function Quotes() {
  return (
    <section id="quotes" className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">05 — Quotes</p>

      <div className="mt-6 grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
        <AnimatedContent distance={40}>
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Have something in mind?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Tell me what you want built. I&apos;ll reply with a quote and a realistic timeline. You can also
              reach me directly on WhatsApp at{" "}
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline-offset-4 hover:text-accent hover:underline"
              >
                {site.whatsappDisplay}
              </a>
              .
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent distance={40} delay={0.15}>
          <div className="rounded-3xl border border-line bg-white/[0.02] p-6 sm:p-10">
            <QuoteForm />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
