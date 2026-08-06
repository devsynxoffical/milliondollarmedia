import { Reveal } from "./Reveal";

const features = [
  {
    icon: "⚡",
    tag: "Speed-to-Lead",
    title: "AI contacts every lead in under 60 seconds",
    description: "Our 24/7 SMS and AI voice bot reaches every inbound lead before they cool off — booking inspections automatically while your competitors are sleeping.",
    stat: "60 sec",
    statLabel: "Avg. response time",
    badge: "No more missed leads",
  },
  {
    icon: "🎯",
    tag: "Precision Targeting",
    title: "Meta Ads engineered for homeowners ready to buy",
    description: "Stop wasting budget on renters and unqualified clicks. Our direct-response creatives specifically target homeowners with roof damage, high home value, and decision-making authority.",
    stat: "-50%",
    statLabel: "Cost per qualified lead",
    badge: "Higher-intent traffic",
  },
  {
    icon: "🏗️",
    tag: "Full System",
    title: "Built end-to-end for roofing — not generic marketing",
    description: "Unlike general marketing agencies, every component of our system is built around the roofing sales process — qualification surveys, storm damage angles, insurance claim workflows.",
    stat: "90 days",
    statLabel: "To double your revenue",
    badge: "Written guarantee",
  },
];

export function Problem() {
  return (
    <section id="problem" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>AI BUILT FOR ROOFING</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            AI built for roofing businesses
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 leading-relaxed">
            Other agencies run generic ads. We install a complete, AI-powered acquisition system purpose-built for high-performance roofing contractors.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 100}>
              <div className="group relative flex flex-col h-full rounded-2xl border border-zinc-200 bg-white p-7 shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
                {/* Icon + Tag */}
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-lg">
                    {feat.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] bg-red-50 px-2.5 py-1 rounded-full">
                    {feat.tag}
                  </span>
                </div>

                {/* Card Content */}
                <h3 className="mt-5 text-lg font-extrabold text-zinc-950 leading-snug tracking-tight">
                  {feat.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500 flex-1">
                  {feat.description}
                </p>

                {/* Floating Metric Callout */}
                <div className="mt-6 rounded-xl border border-zinc-100 bg-zinc-50 p-4 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-zinc-950">{feat.stat}</span>
                    <p className="text-[11px] font-semibold text-zinc-400 mt-0.5">{feat.statLabel}</p>
                  </div>
                  <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    {feat.badge}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

