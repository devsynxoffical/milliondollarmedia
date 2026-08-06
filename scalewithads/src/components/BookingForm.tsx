"use client";

import { FormEvent, useState } from "react";

const options = [
  "Marketing & Ads",
  "Scale Funnels",
  "AI Automations",
  "Lead Qualification",
];

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:bg-white/[0.07]";

const labelCls =
  "block text-xs font-extrabold uppercase tracking-wider text-white/50 mb-1";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Marketing & Ads");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center shadow-lg">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="display mt-4 text-2xl text-white">Application Received</h3>
        <p className="mt-2 text-sm text-white/60">
          Thank you! Our growth team will review your business fit and contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div id="booking" className="section-shell bg-[var(--bg)] border-b border-white/10">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column — Header & Details */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="pill-badge mb-4">
              <span className="dot-accent" />
              <span>APPLY NOW</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Tell us what you&apos;re working on.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
              We build client acquisition systems for scale. Tell us about your business goals and let&apos;s build a system engineered to double your revenue.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "100% Done-For-You Implementation",
                "Backed by a Written 90-Day Revenue Agreement",
                "Exclusive to $10K+/month Businesses",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white text-xs font-bold">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8 shadow-xl backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Work Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="john@company.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelCls}>Phone / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={inputCls}
                />
              </div>

              {/* Topic Pills Selector */}
              <div className="mt-5">
                <label className={`${labelCls} mb-2`}>
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
                          : "border border-white/15 bg-white/[0.04] text-white/70 hover:bg-white/[0.1] hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className={labelCls}>Current Monthly Revenue *</label>
                <select
                  required
                  className={`${inputCls} bg-[var(--surface)] [&>option]:bg-[var(--surface)] [&>option]:text-white`}
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
                <label className={labelCls}>Message / Details</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your current offer and client acquisition goals..."
                  className={inputCls}
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent mt-6 w-full py-4 text-base font-bold shadow-md hover:shadow-xl"
              >
                Send Message →
              </button>

              <p className="mt-3 text-center text-xs text-white/45">
                By submitting, you agree to our terms. Backed by a written agreement.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
