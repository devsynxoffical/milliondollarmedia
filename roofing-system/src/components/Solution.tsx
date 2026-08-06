"use client";

import Link from "next/link";
import { useState } from "react";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const tabs = [
  { id: "all", label: "For Roofers" },
  { id: "ads", label: "Ad Leads" },
  { id: "crm", label: "CRM & AI Nurture" },
  { id: "qual", label: "Qualified Vetting" },
];

const tabContent = {
  all: {
    title: "Help high-value homeowners find & hire you.",
    subtitle: "Everything your roofing business needs to dominate your local market — installed into one automated revenue system.",
    bullets: [
      "Targeted Meta Ads reaching property owners looking for roof replacement",
      "High-converting landing pages built specifically for roofing contractors",
      "24/7 AI & SMS follow-up booking calls before leads cold off",
      "Strict lead qualification ensuring only ready-to-buy homeowners hit your calendar",
    ],
    metric1: "48 Qualified Inspections",
    metric2: "+38% Close Rate",
  },
  ads: {
    title: "High-intent Meta Ads & Direct-Response Creatives",
    subtitle: "Stop burning ad budget on low-quality leads. We build custom visual ad assets that attract premium homeowners.",
    bullets: [
      "Hyper-targeted local demographic targeting",
      "High-converting video & photo ad creatives",
      "Continuous daily ad budget & ROAS optimization",
    ],
    metric1: "$50M+ Meta Spend",
    metric2: "-50% Cost Per Lead",
  },
  crm: {
    title: "Automated CRM & 24/7 AI Speed-To-Lead",
    subtitle: "Zero leads slip through the cracks. Every lead is instantly contacted within 60 seconds via SMS and AI booking agents.",
    bullets: [
      "Instant 60-second lead contact speed",
      "Automated appointment reminders & SMS confirmation",
      "Built-in pipeline management for your roofing sales reps",
    ],
    metric1: "60-Sec Response",
    metric2: "24/7 AI Nurture",
  },
  qual: {
    title: "Multi-Step Homeowner Qualification Vetting",
    subtitle: "Screen out tire-kickers and low-budget renters before your estimators drive out to perform inspections.",
    bullets: [
      "Roof age & material validation survey",
      "Homeownership & insurance coverage verification",
      "Confirmed decision-maker availability on calendar",
    ],
    metric1: "100% Homeowners",
    metric2: "90-Day Guarantee",
  },
};

export function Solution() {
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>("all");
  const current = tabContent[activeTab];

  return (
    <section id="solution" className="section-shell bg-zinc-100 border-b border-zinc-200/80">
      <div className="mx-auto max-w-[1240px]">
        {/* Header — GetJobber Style */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>ALL-IN-ONE ROOFING SYSTEM</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            The all-in-one system for high-performing roofing pros
          </h2>
        </div>

        {/* Tab Selection Pills — GetJobber Style */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as keyof typeof tabContent)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                activeTab === t.id
                  ? "bg-[var(--accent)] text-white shadow-xs"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Interactive Content Card — GetJobber Split Layout */}
        <div className="mt-10 rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left Column — Dashboard Mockup Preview */}
            <div className="lg:col-span-6 bg-zinc-950 rounded-xl p-6 text-white border border-zinc-800 shadow-md">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono font-bold text-zinc-400">roofing-system-crm.v1</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  ● Live Pipeline Active
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-zinc-900 p-4 border border-zinc-800">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Metrics</p>
                  <p className="text-xl font-bold text-white mt-1">{current.metric1}</p>
                </div>
                <div className="rounded-lg bg-zinc-900 p-4 border border-zinc-800">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Status</p>
                  <p className="text-xl font-bold text-[var(--accent)] mt-1">{current.metric2}</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-zinc-900 p-4 border border-zinc-800">
                <p className="text-xs font-semibold text-zinc-300">Upcoming Inspection Bookings:</p>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-zinc-950 p-2.5 rounded border border-zinc-800">
                    <span className="font-bold text-zinc-200">1248 Oakridge Dr. (Full Roof Replacement)</span>
                    <span className="text-emerald-400 font-bold">Confirmed Today</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-950 p-2.5 rounded border border-zinc-800">
                    <span className="font-bold text-zinc-200">890 Pine Valley Rd. (Storm Damage Claim)</span>
                    <span className="text-emerald-400 font-bold">Confirmed Tomorrow</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Feature Details */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h3 className="display text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                {current.title}
              </h3>
              <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                {current.subtitle}
              </p>

              <div className="mt-6 space-y-3">
                {current.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-sm font-semibold text-zinc-800">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[var(--accent)] text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent px-7 py-3.5 text-sm font-bold shadow-md"
                >
                  Explore System →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

