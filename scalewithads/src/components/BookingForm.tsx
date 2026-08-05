"use client";

import { FormEvent, useState } from "react";

const options = [
  "Marketing & Ads",
  "Scale Funnels",
  "AI Automations",
  "Lead Qualification",
];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Marketing & Ads");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-lg">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="display mt-4 text-2xl text-zinc-900">Application Received</h3>
        <p className="mt-2 text-sm text-zinc-600">
          Thank you! Our growth team will review your business fit and contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div id="booking" className="section-shell bg-zinc-50/50 border-b border-zinc-200/60">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column — Header & Details */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="pill-badge mb-4">
              <span className="dot-accent" />
              <span>APPLY NOW</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.1]">
              Tell us what you&apos;re working on.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              We build client acquisition systems for scale. Tell us about your business goals and let&apos;s build a system engineered to double your revenue.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "100% Done-For-You Implementation",
                "Backed by a Written 90-Day Revenue Agreement",
                "Exclusive to $10K+/month Businesses",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-zinc-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Form Card (Matching Reference Design) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-[var(--accent)] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-[var(--accent)] focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-[var(--accent)] focus:bg-white"
                />
              </div>

              {/* Topic Pills Selector */}
              <div className="mt-5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-2">
                  What is your primary focus?
                </label>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedTopic(opt)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        selectedTopic === opt
                          ? "bg-[var(--accent)] text-white shadow-xs"
                          : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1">
                  Current Monthly Revenue *
                </label>
                <select
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[var(--accent)] focus:bg-white"
                  defaultValue="$10k - $25k/mo"
                >
                  <option value="under-10k">Under $10k/mo (do not apply)</option>
                  <option value="$10k - $25k/mo">$10k - $25k / month</option>
                  <option value="$25k - $50k/mo">$25k - $50k / month</option>
                  <option value="$50k - $100k/mo">$50k - $100k / month</option>
                  <option value="$100k+/mo">$100k+ / month</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1">
                  Message / Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your current offer and client acquisition goals..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-[var(--accent)] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent mt-6 w-full py-4 text-base font-bold shadow-md hover:shadow-xl"
              >
                Send Message →
              </button>

              <p className="mt-3 text-center text-xs text-zinc-500">
                By submitting, you agree to our terms. Backed by a written agreement.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

