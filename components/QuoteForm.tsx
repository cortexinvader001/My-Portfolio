"use client";

import { useState, type FormEvent } from "react";
import { site, web3forms } from "@/lib/site.config";

type Status = "idle" | "sending" | "sent" | "error";

const PROJECT_TYPES = [
  "Telegram bot or AI agent",
  "Website or landing page",
  "Interactive or animated site",
  "Automation",
  "Something else",
];

// Real people take longer than this to fill a form. Faster submissions are treated as bots.
const MIN_FILL_MS = 3000;

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [loadedAt] = useState(() => Date.now());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Spam guard: the honeypot text field must be empty, the hidden checkbox must be unticked,
    // and the form must not be filled in suspiciously fast. Bots get a silent success, so they learn nothing.
    const honeypotTripped = String(fd.get("website") ?? "") !== "" || fd.get("botcheck") === "on";
    const tooFast = Date.now() - loadedAt < MIN_FILL_MS;
    if (honeypotTripped || tooFast) {
      setStatus("sent");
      form.reset();
      return;
    }

    if (!web3forms.accessKey) {
      setStatus("error");
      setMessage(
        `The quote form is being connected. Please message me on WhatsApp (${site.whatsappDisplay}) in the meantime.`,
      );
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3forms.accessKey,
          subject: `New quote request from ${fd.get("name")}`,
          from_name: "Cortex portfolio",
          name: fd.get("name"),
          email: fd.get("email"),
          project: fd.get("project"),
          message: fd.get("message"),
        }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network problem. Please try again, or message me on WhatsApp.");
    }
  };

  const field =
    "mt-2 w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2" noValidate={false}>
      {/* Honeypot fields: hidden from people, visible to bots that fill every input. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Leave this unchecked
          <input type="checkbox" name="botcheck" tabIndex={-1} />
        </label>
      </div>

      <label className="block text-sm text-muted">
        Your name
        <input name="name" type="text" required autoComplete="name" className={field} placeholder="Ada Lovelace" />
      </label>

      <label className="block text-sm text-muted">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
      </label>

      <label className="block text-sm text-muted sm:col-span-2">
        What do you need?
        <select name="project" defaultValue={PROJECT_TYPES[0]} className={field}>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-muted sm:col-span-2">
        Tell me about it
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="Goals, timeline, and anything I should know."
        />
      </label>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-semibold text-ink transition-colors hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send request"}
        </button>

        <div role="status" aria-live="polite" className="min-h-6 text-sm">
          {status === "sent" && (
            <span className="text-cyan">Thanks, your request is in. I&apos;ll get back to you soon.</span>
          )}
          {status === "error" && <span className="text-accent">{message}</span>}
        </div>
      </div>
    </form>
  );
}
