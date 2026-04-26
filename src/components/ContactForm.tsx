"use client";

import { useState } from "react";

/**
 * Contact form. Client component so we can show inline success/error
 * feedback rather than navigating to a JSON response.
 *
 * Subjects mirror the site's IA + the audience use-cases the rest of
 * the site has been organised around. Each subject has an ideal
 * destination if the visitor would be better served by a dedicated
 * page; the form still works for any of them.
 *
 * Posts FormData to /api/contact (existing route handler), which
 * relays via Resend if RESEND_API_KEY is set, otherwise logs and
 * succeeds in dev.
 */

const SUBJECTS = [
  "Tournament or corporate day",
  "Banquet inquiry",
  "Membership inquiry",
  "Lessons with the head pro",
  "Stay & play / multi-day trip",
  "Pro Shop question",
  "Bistro / dining question",
  "Lost and found",
  "Press or partnership",
  "Other",
] as const;

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;
    setState({ kind: "submitting" });

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const json: { ok: boolean; error?: string } = await res.json().catch(() => ({ ok: false }));
      if (json.ok) {
        setState({ kind: "success" });
        form.reset();
      } else {
        setState({ kind: "error", message: json.error ?? "Something went wrong. Please call instead." });
      }
    } catch {
      setState({ kind: "error", message: "Network trouble. Please try again or call the office." });
    }
  }

  if (state.kind === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-cedar/30 bg-cedar/5 p-7 md:p-8"
      >
        <p className="eyebrow text-cedar mb-3">Sent</p>
        <p className="font-display text-2xl text-granite mb-3">
          Thanks for the note.
        </p>
        <p className="prose-editorial text-granite/85">
          We&apos;ll get back to you within a business day. If it&apos;s
          urgent, the Office is{" "}
          <a
            href="tel:+12506932366"
            className="underline underline-offset-2 hover:text-amber"
          >
            250-693-2366
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setState({ kind: "idle" })}
          className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-granite hover:text-amber underline underline-offset-2"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot. Bots fill, humans don't see it. */}
      <input
        type="text"
        name="company"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="eyebrow block mb-2">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="w-full bg-paper border border-granite/25 px-4 py-3 min-h-[44px] rounded-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow block mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className="w-full bg-paper border border-granite/25 px-4 py-3 min-h-[44px] rounded-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="eyebrow block mb-2">
          What&apos;s this about?
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue={SUBJECTS[0]}
          className="w-full bg-paper border border-granite/25 px-4 py-3 min-h-[44px] rounded-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          placeholder="Tell us a bit. Date range, head count, or just the question on your mind."
          className="w-full bg-paper border border-granite/25 px-4 py-3 rounded-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
        />
      </div>

      {state.kind === "error" && (
        <p
          role="alert"
          aria-live="assertive"
          className="font-mono text-xs text-amber border-l-2 border-amber pl-4 py-2"
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={state.kind === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state.kind === "submitting" ? "Sending…" : "Send message"}
          <span aria-hidden>{state.kind === "submitting" ? "" : "→"}</span>
        </button>
        <p className="font-mono text-xs text-silt">
          Or call the Office at{" "}
          <a
            href="tel:+12506932366"
            className="text-granite underline underline-offset-2 hover:text-amber"
          >
            250-693-2366
          </a>
          .
        </p>
      </div>
    </form>
  );
}
