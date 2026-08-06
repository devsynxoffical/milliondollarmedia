import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const owned = [
  "Landing Pages",
  "Sales Funnel",
  "CRM",
  "Automations",
  "Ad Creatives",
  "Copy",
  "Follow-Up Sequences",
  "Customer Data",
];

export function Ownership() {
  return (
    <section
      id="ownership"
      className="section-shell border-b border-zinc-100 bg-white"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>NO LOCK-INS · NO HIDDEN OWNERSHIP</span>
          </div>
          <h2 className="display text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            Unlike Most Agencies...
            <br />
            <span className="text-[var(--accent)]">You Own Everything.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500">
            When we build your Client Acquisition System, it becomes your
            business asset.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-[#09090b] px-6 py-12 text-white md:px-12 md:py-16">
            <div className="jobber-grid-dark pointer-events-none absolute inset-0" />
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <h3 className="display text-2xl font-extrabold tracking-tight md:text-3xl">
                  You own every single{" "}
                  <span className="text-[var(--accent)]">
                    asset we build.
                  </span>
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                  No lock-ins. No hidden ownership. No dependence on another
                  agency.
                </p>
                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent mt-8 inline-flex min-w-[260px] px-8 py-4 text-sm font-bold shadow-md"
                >
                  Book Your Free Strategy Call →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {owned.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-3.5 text-sm font-bold text-white transition duration-300 hover:border-[var(--accent)]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-extrabold text-white">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
