import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const phases = [
  {
    phase: "PHASE 01",
    day: "DAYS 1-14",
    title: "Market Positioning & Creative Development",
    desc: "We analyze your top competitors, refine your core high-ticket offer, write direct-response ad copy, and produce high-converting visual assets.",
    logoText: "Ads",
    logoBg: "bg-red-600 text-white",
    tags: ["Featured", "DFY Creative", "Positioning"],
  },
  {
    phase: "PHASE 02",
    day: "DAYS 15-30",
    title: "Meta Ads Launch & High-Converting Funnel Setup",
    desc: "We build custom direct-response landing pages and deploy targeted Meta Ads campaigns designed to generate high-intent inbound inquiries.",
    logoText: "Funnel",
    logoBg: "bg-zinc-900 text-white",
    tags: ["Guaranteed", "Meta Ads", "Landing Page"],
  },
  {
    phase: "PHASE 03",
    day: "DAYS 31-60",
    title: "CRM Integration & AI 24/7 Nurture Automations",
    desc: "Every incoming lead is instantly synced to your dedicated CRM with automated SMS, email sequences, and AI booking agents for 24/7 lead nurturing.",
    logoText: "Ai",
    logoBg: "bg-emerald-600 text-white",
    tags: ["Automated", "CRM", "24/7 Nurture"],
  },
  {
    phase: "PHASE 04",
    day: "DAYS 61-90",
    title: "Lead Qualification Vetting & Revenue Scaling",
    desc: "Multi-step validation surveys screen every lead before they hit your calendar, leaving you with qualified buyers ready to close.",
    logoText: "Scale",
    logoBg: "bg-[var(--accent)] text-white",
    tags: ["Revenue Double", "Qualified Only", "Scale"],
  },
];

export function Steps() {
  return (
    <section id="system" className="section-shell bg-zinc-50 border-b border-zinc-200/60">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header — Matching "Live calendar, powered by Luma." layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80">
          <div>
            <div className="pill-badge-green mb-3">
              <span className="dot-green" />
              <span>SYSTEM WORKFLOW</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
              Live acquisition pipeline.
            </h2>
            <p className="mt-2 text-base text-zinc-600">
              4 distinct phases fully installed into your business within 90 days.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-bold text-zinc-700 shadow-xs">
              <span>View All 4 Phases</span>
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Structured Component List Rows — Matching Reference Image */}
        <div className="mt-8 space-y-4">
          {phases.map((item, idx) => (
            <Reveal key={item.phase} delay={idx * 70}>
              <div className="group rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Phase Info & Badge */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-bold text-sm tracking-tight shadow-xs ${item.logoBg}`}
                    >
                      {item.logoText}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                        <span className="text-[var(--accent)]">{item.phase}</span>
                        <span>·</span>
                        <span>{item.day}</span>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-900 mt-1 group-hover:text-[var(--accent)] transition">
                        {item.title}
                      </h3>

                      <p className="text-sm text-zinc-600 mt-1 max-w-3xl leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((t, tIdx) => (
                          <span
                            key={t}
                            className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${
                              tIdx === 0
                                ? "bg-amber-100 text-amber-800"
                                : tIdx === 1
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="shrink-0 pt-2 md:pt-0">
                    <Link
                      href={BOOKING_PATH}
                      className="btn btn-outline text-xs py-2 px-4 border-zinc-200 hover:bg-zinc-900 hover:text-white"
                    >
                      Explore Phase →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

