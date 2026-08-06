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
    <section className="section-shell bg-[var(--accent)] text-white">
      <div className="mx-auto max-w-[1240px] text-center">
        <Reveal>
          <div className="pill-badge mx-auto mb-4 inline-flex items-center gap-2 border-white/25 bg-white/10 text-white">
            <span className="dot-red" />
            <span>FINAL STEP</span>
          </div>
          <h2 className="display mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready To Build A Predictable Client Acquisition System?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            Install a complete Client Acquisition System that consistently
            attracts, qualifies, nurtures, and books premium clients, so you can
            focus on closing deals and scaling your business.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {pains.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={BOOKING_PATH}
              className="btn bg-white px-8 py-4 text-sm font-bold text-[var(--accent)] shadow-md transition hover:bg-zinc-100"
            >
              Book Your Free Strategy Call →
            </Link>
            <Link
              href="#system"
              className="btn btn-outline-dark px-7 py-4 text-sm font-semibold"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-5 text-sm font-semibold text-white/70">
            $10K/month minimum · 90-day written guarantee · You own everything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
