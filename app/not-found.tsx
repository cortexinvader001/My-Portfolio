import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-6 pt-32 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-6 font-display text-5xl font-semibold">This page isn&apos;t here.</h1>
      <Link href="/" className="mt-10 font-semibold text-cyan hover:underline">
        Back to home →
      </Link>
    </section>
  );
}
