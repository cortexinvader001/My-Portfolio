import Link from "next/link";
import { site } from "@/lib/site.config";

const PAGES = [
  { href: "/about", label: "About" },
  { href: "/stack", label: "Stack" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/quotes", label: "Quotes" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-semibold leading-tight">
            Let&apos;s build something <span className="text-accent">curious.</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-3 text-muted">
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-accent">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-3 text-paper">
          <li>
            <a href={`mailto:${site.email}`} className="break-all hover:text-accent">
              {site.email}
            </a>
          </li>
          <li>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              WhatsApp {site.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              GitHub · cortexinvader001
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-10">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>
            Motion by{" "}
            <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-cyan">
              React Bits
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
