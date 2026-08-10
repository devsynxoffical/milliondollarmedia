import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SectionBackground } from "./ui/SectionBackground";

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
    <section className="relative overflow-hidden border-b border-zinc-200 bg-[#fafafa] py-16 text-zinc-950 md:py-24">
      <SectionBackground variant="light" grid />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="THE PROVEN SYSTEM"
          title={
            <>
              The proven system behind{" "}
              <span className="text-[#ed1c24]">
                $50M+ in managed ad spend
              </span>
            </>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, idx) => (
            <Reveal key={s.label} delay={idx * 70}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ed1c24] hover:shadow-md">
                <span className="display text-2xl font-extrabold text-[#ed1c24] sm:text-3xl">
                  {s.value}
                </span>
                <p className="mt-1.5 text-sm font-bold text-zinc-900">{s.label}</p>
                <p className="mt-0.5 text-xs font-medium text-zinc-500">
                  {s.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mt-10 text-center text-xs font-bold uppercase tracking-widest text-zinc-400">
            20+ industries · 17+ client operators · one system
          </p>
        </Reveal>
      </div>
    </section>
  );
}

