import { Reveal } from "./Reveal";

const features = [
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    badgeBg: "bg-emerald-50 border-emerald-200/60",
    title: "Meta Ads & Creatives",
    description:
      "High-converting visual assets, direct-response copy, and hyper-targeted audience campaigns managed for maximum ROI.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    badgeBg: "bg-emerald-50 border-emerald-200/60",
    title: "Funnels & Landing Pages",
    description:
      "Lightning-fast direct-response landing pages custom built to turn cold ad traffic into eager booking requests.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badgeBg: "bg-emerald-50 border-emerald-200/60",
    title: "AI & CRM Follow-up",
    description:
      "Automated SMS, email, and AI booking agents that instantly nurture leads 24/7 so zero opportunities slip away.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    badgeBg: "bg-emerald-50 border-emerald-200/60",
    title: "Qualified Lead Vetting",
    description:
      "Multi-step qualification surveys filtering out tire-kickers so you only speak with ready-to-buy decision makers.",
  },
];

const categoryPills = [
  "All Systems",
  "Meta Ads",
  "AI Automations",
  "Funnels & Conversion",
  "Lead Qualification",
];

export function Problem() {
  return (
    <section id="problem" className="section-shell bg-zinc-50/50 border-b border-zinc-200/60">
      <div className="mx-auto max-w-[1240px]">
        {/* Split Section Layout — Matching Reference Image ("We're building...") */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Headline Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="pill-badge mb-4">
              <span className="dot-accent" />
              <span>THE ECOSYSTEM</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.1]">
              We&apos;re building the acquisition system your business deserves.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Most agencies only run ads or design pages. We construct the full end-to-end client acquisition machinery, seamlessly connecting ads, landing pages, CRM, and AI qualification into a predictable revenue stream.
            </p>
          </div>

          {/* Right 2x2 Feature Grid */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {features.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group h-full flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:shadow-md hover:border-zinc-300">
                  <div>
                    <div className={`inline-flex items-center justify-center p-2.5 rounded-xl border ${item.badgeBg}`}>
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-zinc-900 group-hover:text-[var(--accent)] transition">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Filter Pills Bar Below Grid */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2 pt-8 border-t border-zinc-200/60">
          {categoryPills.map((pill, idx) => (
            <button
              key={pill}
              type="button"
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                idx === 0
                  ? "bg-[var(--accent)] text-white shadow-xs"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

