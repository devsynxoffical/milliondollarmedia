import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const stats = [
  { value: 50, prefix: "$", suffix: "M+", label: "Meta ads spent", sub: "Behind roofing campaigns" },
  { value: 12, prefix: "", suffix: " yrs", label: "Experience", sub: "Acquisition systems" },
  { value: 90, prefix: "", suffix: " days", label: "Revenue target", sub: "Doubling, in writing" },
  { value: 1, prefix: "$", suffix: "M+", label: "Roofers only", sub: "Minimum annual revenue" },
];

const awards = ["Two Comma Club Winner", "ClickFunnels Awards", "300–500 calls / month"];

export function StatsBand() {
  return (
    <section className="border-b border-[var(--line)] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">The numbers</p>
            <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.2rem)] text-[var(--ink)]">
              Built on proof, not
              <br />
              <span className="text-[var(--purple)]">promises</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              {awards.map((award) => (
                <span
                  key={award}
                  className="rounded-full border border-[var(--purple)]/30 bg-[var(--purple-light)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--purple)]"
                >
                  {award}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="bg-white px-6 py-8 md:px-8">
                <p className="display text-3xl text-[var(--ink)] md:text-4xl">
                  <CountUp
                    end={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </p>
                <p className="mt-2 text-sm font-bold text-[var(--ink)]">{item.label}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
