import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const advantages = [
  {
    title: "100% Done-For-You",
    text: "Our system is built, managed, and optimized for you. You don't lift a finger.",
  },
  {
    title: "Roofing-Specific",
    text: "Built for the roofing industry. Not a repackaged generic marketing funnel.",
  },
  {
    title: "Proven Track Record",
    text: "$50M+ managed in Meta ads and a proven 8-step growth framework.",
  },
  {
    title: "90-Day Written Guarantee",
    text: "If we don't double your revenue in 90 days, we work for free.",
  },
  {
    title: "Everything Included",
    text: "Ads, landing pages, CRM, AI follow-up, lead qualification, booking system.",
  },
];

export function Solution() {
  return (
    <section id="solution" className="section-shell bg-zinc-100 border-b border-zinc-200/80">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>SECTION 3 — THE SOLUTION</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            We Don&apos;t Just Generate Roofing Leads…
            <br />
            <span className="text-[var(--accent)]">
              We Build A Complete Roofing Client Acquisition System.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
            A system that finds homeowners who want to work with you, attracts
            them through Meta Ads, books inspections automatically, and gets
            them to show up.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
              Our Core Advantages
            </p>
            <div className="mt-6 space-y-4">
              {advantages.map((a) => (
                <div key={a.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
                    ✓
                  </span>
                  <p className="text-base font-semibold text-zinc-800">
                    <span className="font-extrabold text-zinc-950">
                      {a.title}:
                    </span>{" "}
                    {a.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={BOOKING_PATH}
                className="btn btn-accent px-7 py-3.5 text-sm font-bold shadow-md"
              >
                Install The System →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
