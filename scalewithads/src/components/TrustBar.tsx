import { Reveal } from "./Reveal";

const stats = [
  {
    value: "12+",
    label: "Years of Experience",
    sub: "Across agencies, coaches & B2B",
  },
  {
    value: "$50M+",
    label: "Managed in Meta Ads",
    sub: "Tested & proven campaigns",
  },
  {
    value: "90 Days",
    label: "Revenue Guarantee",
    sub: "Backed by written agreement",
  },
  {
    value: "100% DFY",
    label: "Client Acquisition",
    sub: "Offer, Ads, CRM, AI & Funnels",
  },
];

export function TrustBar() {
  return (
    <section className="relative border-b border-zinc-800 bg-[#09090b] py-16 text-white md:py-20">
      <div className="jobber-grid-dark pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            The proven system behind{" "}
            <span className="text-[var(--accent)]">
              $50M+ in managed ad spend
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, idx) => (
            <Reveal key={s.label} delay={idx * 70}>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 text-center shadow-xs transition duration-300 hover:border-[var(--accent)]">
                <span className="display text-2xl font-extrabold text-[var(--accent)] sm:text-3xl">
                  {s.value}
                </span>
                <p className="mt-1.5 text-xs font-bold text-white sm:text-sm">
                  {s.label}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-zinc-400">
                  {s.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
