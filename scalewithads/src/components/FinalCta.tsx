import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const pains = [
  "Stop guessing.",
  "Stop relying on referrals.",
  "Stop switching agencies.",
];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--accent)] py-24 text-white md:py-32">
      {/* Ambient light + grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 120%, rgba(0,0,0,0.35), transparent 60%), radial-gradient(80% 60% at 50% -20%, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 text-center md:px-8">
        <Reveal>
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="dot-red" />
            <span className="text-xs font-extrabold uppercase tracking-[0.16em]">
              Final Step
            </span>
          </div>
          <h2 className="display mx-auto max-w-4xl text-balance text-3xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
            Ready To Build A Predictable Client Acquisition System?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85">
            Install a complete Client Acquisition System that consistently
            attracts, qualifies, nurtures, and books premium clients, so you can
            focus on closing deals and scaling your business.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {pains.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={BOOKING_PATH}
              className="btn-shine group relative inline-flex items-center gap-2 overflow-hidden bg-white px-9 py-4 text-sm font-extrabold text-[var(--accent)] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_-14px_rgba(0,0,0,0.55)]"
            >
              <span>Book Your Free Strategy Call</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="#system"
              className="btn btn-outline-dark px-7 py-4 text-sm font-semibold transition-all duration-300 hover:bg-white/15"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold text-white/75">
            $10K/month minimum · 90-day written guarantee · You own everything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
