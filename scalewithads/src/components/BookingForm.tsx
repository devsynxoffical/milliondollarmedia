"use client";

import { FormEvent, useState } from "react";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card bg-white p-8 text-center shadow-[0_24px_60px_-24px_rgba(16,24,40,0.24)] md:p-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="display mt-5 text-2xl text-[var(--ink)]">
          Application received
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          We’ll review the $10K minimum fit and follow up shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-white p-6 shadow-[0_24px_60px_-24px_rgba(16,24,40,0.24)] md:p-8"
    >
      <p className="eyebrow-accent">Application</p>
      <h2 className="display mt-2 text-3xl text-[var(--ink)] md:text-4xl">
        Book your call
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        $10K minimum. Everything in the agreement.
      </p>

      <div className="mt-8 grid gap-4">
        {[
          ["name", "Full name", "text"],
          ["email", "Email", "email"],
          ["phone", "Phone", "tel"],
          ["business", "Business / brand / agency", "text"],
        ].map(([id, label, type]) => (
          <label key={id} className="block text-sm font-medium text-[var(--ink-soft)]">
            {label}
            <input
              required
              id={id}
              name={id}
              type={type}
              className={inputClass}
            />
          </label>
        ))}

        <label className="block text-sm font-medium text-[var(--ink-soft)]">
          Industry / vertical
          <input
            required
            name="industry"
            type="text"
            className={inputClass}
            placeholder="Any industry — we work countless verticals"
          />
        </label>

        <label className="block text-sm font-medium text-[var(--ink-soft)]">
          Monthly budget (ads + retainers)
          <select
            required
            name="budget"
            className={`${inputClass} appearance-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Select range
            </option>
            <option value="under-10k">Under $10k (do not apply)</option>
            <option value="10-25k">$10k – $25k</option>
            <option value="25-50k">$25k – $50k</option>
            <option value="50k-plus">$50k+</option>
          </select>
        </label>

        <label className="flex items-start gap-3 text-sm text-[var(--ink-soft)]">
          <input
            required
            type="checkbox"
            name="minimum"
            className="mt-1 h-4 w-4 rounded accent-[var(--accent)]"
          />
          <span>
            I confirm I meet the <strong>$10K minimum</strong> and understand the
            90-day revenue agreement is in writing.
          </span>
        </label>

        <label className="block text-sm font-medium text-[var(--ink-soft)]">
          What do you need?
          <textarea
            name="notes"
            rows={4}
            className={inputClass}
            placeholder="Done-for-you ads, agency client-getting training, Meta LTO…"
          />
        </label>
      </div>

      <button type="submit" className="btn btn-accent mt-8 w-full py-4 text-base">
        Submit application
      </button>
    </form>
  );
}
