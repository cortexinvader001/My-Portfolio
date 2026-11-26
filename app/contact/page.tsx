import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kolawole Suleiman (Cortex) by email, WhatsApp or GitHub.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-40 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan">Contact</p>
      <h1 className="mt-6 font-display text-5xl font-semibold leading-tight sm:text-6xl">
        Let&apos;s build something <span className="text-accent">curious.</span>
      </h1>

      <ul className="mt-16 space-y-6 text-2xl">
        <li>
          <span className="block text-sm uppercase tracking-[0.2em] text-muted">Email</span>
          <a href={`mailto:${site.email}`} className="break-all hover:text-accent">
            {site.email}
          </a>
        </li>
        <li>
          <span className="block text-sm uppercase tracking-[0.2em] text-muted">WhatsApp</span>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            {site.whatsappDisplay}
          </a>
        </li>
        <li>
          <span className="block text-sm uppercase tracking-[0.2em] text-muted">GitHub</span>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            cortexinvader001
          </a>
        </li>
      </ul>

      <Link
        href="/quotes"
        className="mt-16 inline-flex h-12 items-center rounded-full bg-accent px-6 font-semibold text-ink transition-colors hover:bg-cyan"
      >
        Request a quote
      </Link>
    </section>
  );
}
