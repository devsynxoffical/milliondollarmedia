"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "done";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Hook this to Formspree / API / CRM later.
    window.setTimeout(() => setStatus("done"), 700);
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[var(--red)] bg-white p-8 text-center shadow-[var(--shadow)] md:p-10">
        <p className="font-[family-name:var(--font-display)] text-3xl tracking-[0.04em] text-black md:text-4xl">
          APPLICATION RECEIVED
        </p>
        <p className="mt-4 text-[var(--muted)]">
          We&apos;ll review your details and reach out to confirm your call.
          $1M+ roofers only — unqualified applications are declined.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-[var(--red)] underline-offset-4 hover:underline"
        >
          Back to main page
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.5rem] border border-[var(--line)] bg-white p-6 shadow-[0_30px_80px_rgba(21,21,40,0.08)] md:p-8"
    >
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl tracking-[0.04em] text-black md:text-3xl">
            BOOK YOUR CALL
          </p>
          <p className="mt-1 text-sm text-black/50">
            Application for $1M+ roofing companies
          </p>
        </div>
        <Image
          src="/logo.png"
          alt=""
          width={72}
          height={52}
          className="hidden h-auto w-16 opacity-90 sm:block"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Company name" name="company" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
            Annual revenue
          </label>
          <select
            name="revenue"
            required
            defaultValue=""
            className="w-full border border-black/15 bg-[var(--fog)] px-4 py-3 text-sm text-black outline-none transition focus:border-[var(--red)]"
          >
            <option value="" disabled>
              Select revenue range
            </option>
            <option value="under-1m">Under $1M — Do not apply</option>
            <option value="1-3m">$1M – $3M</option>
            <option value="3-5m">$3M – $5M</option>
            <option value="5m-plus">$5M+</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
            Preferred call time
          </label>
          <input
            name="preferredTime"
            required
            placeholder="e.g. Tue / Thu mornings EST"
            className="w-full border border-black/15 bg-[var(--fog)] px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-[var(--red)]"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
            Anything we should know?
          </label>
          <textarea
            name="notes"
            rows={4}
            placeholder="Current lead sources, team size, markets…"
            className="w-full resize-y border border-black/15 bg-[var(--fog)] px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-[var(--red)]"
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-left text-sm text-black/65">
        <input
          type="checkbox"
          name="qualify"
          required
          className="mt-1 accent-[var(--red)]"
        />
        <span>
          I confirm my roofing company does{" "}
          <strong className="text-black">$1M+ annual revenue</strong> and I
          understand this offer is only for qualified roofers.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-btn mt-8 w-full disabled:cursor-wait disabled:opacity-70"
      >
        <span className="display text-lg tracking-normal md:text-xl">
          {status === "submitting" ? "Submitting…" : "Submit Application"}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
          Double Revenue in 90 Days — Or You Don&apos;t Pay
        </span>
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-black/15 bg-[var(--fog)] px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-[var(--red)]"
      />
    </div>
  );
}
