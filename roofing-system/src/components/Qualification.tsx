import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

const rules = [
  {
    n: "01",
    title: "Roofers only",
    body: "Built specifically for roofing companies. Not agencies. Not other trades.",
  },
  {
    n: "02",
    title: "$1M+ minimum",
    body: "Under $1M a year? Don’t apply. We only partner with operators ready to scale hard.",
  },
  {
    n: "03",
    title: "Written agreement",
    body: "90-day revenue doubling terms are spelled out clearly before you start.",
  },
];

export function Qualification() {
  return (
    <section className="section-shell bg-[var(--black-soft)]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--red)]">
            Qualification gate
          </p>
          <h2 className="display mt-4 text-[clamp(2.6rem,6vw,4.5rem)] text-white">
            THIS IS
            <br />
            <span className="text-[var(--red)]">NOT FOR</span>
            <br />
            EVERYONE
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)]">
            Serious roofers only. If you&apos;re not at $1M yet — come back when
            you are.
          </p>
          <Link href={BOOKING_PATH} className="cta-btn-outline mt-8 inline-flex">
            <span className="display text-lg tracking-[0.08em]">
              I QUALIFY — BOOK MY CALL
            </span>
          </Link>
        </div>

        <div className="space-y-4">
          {rules.map((item) => (
            <div
              key={item.n}
              className="group grid grid-cols-[auto_1fr] gap-5 border border-white/10 bg-black/50 p-6 transition hover:border-[var(--red)]/70 md:gap-8 md:p-8"
            >
              <p className="display text-4xl text-[var(--red)] md:text-5xl">
                {item.n}
              </p>
              <div>
                <h3 className="display text-2xl text-white md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
