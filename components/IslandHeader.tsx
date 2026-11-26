"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stack", label: "Stack" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/quotes", label: "Quotes" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function IslandHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const dur = reduce ? 0 : 0.5;

  // Close the drawer whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <motion.div
        ref={rootRef}
        initial={reduce ? false : { y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: 0.2 }}
        className="pointer-events-auto overflow-hidden rounded-[30px] border border-line bg-ink/85 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md"
      >
        <motion.div
          animate={{
            width: open ? "min(calc(100vw - 1.5rem), 28rem)" : "min(calc(100vw - 1.5rem), 20rem)",
          }}
          transition={{ duration: dur, ease: EASE }}
          className="flex flex-col"
        >
          <div className="flex h-14 items-center justify-between gap-2 px-2">
            <button
              ref={burgerRef}
              type="button"
              aria-expanded={open}
              aria-controls="island-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/10"
            >
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-paper transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-paper transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-paper transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>

            <Link href="/" className="min-w-0 truncate font-display text-[0.95rem] font-semibold uppercase tracking-wide">
              Cortex<span className="text-accent">.</span>
            </Link>

            <Link
              href="/quotes"
              className="flex h-11 shrink-0 items-center rounded-full bg-accent px-4 text-sm font-semibold text-ink transition-colors hover:bg-cyan"
            >
              Hire me
            </Link>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.nav
                id="island-menu"
                aria-label="Main"
                key="drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: dur, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="grid grid-cols-2 gap-1 px-4 pb-4 pt-2">
                  {LINKS.map((l, i) => {
                    const active = pathname === l.href;
                    return (
                      <li key={l.href}>
                        <Link
                          ref={i === 0 ? firstLink : undefined}
                          href={l.href}
                          aria-current={active ? "page" : undefined}
                          className={`block rounded-xl px-3 py-3 text-lg transition-colors hover:bg-white/5 hover:text-accent ${
                            active ? "text-accent" : "text-paper/85"
                          }`}
                        >
                          {l.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </header>
  );
}
