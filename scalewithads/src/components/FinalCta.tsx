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
    <section className="relative overflow-hidden bg-[var(--band-2)]">
      <div className="section-shell">
        <Reveal className="h-full">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] bg-[var(--band)] px-6 py-14 text-white shadow-[0_24px_60px_-24px_rgba(237,28,36,0.3)] md:px-12 md:py-16">
            <div className="studio-grid absolute inset-0 opacity-60" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 85% 20%, rgba(237,28,36,0.24), transparent 55%), radial-gradient(ellipse 50% 70% at 10% 90%, rgba(255,255,255,0.1), transparent 60%)",
              }}
            />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-bright)]">
                Final step
              </p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,3.6rem)]">
                Ready To Build A Predictable
                <br />
                <span className="text-[var(--accent-bright)]">
                  Client Acquisition System?
                </span>
              </h2>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {pains.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/75">
                Install a complete Client Acquisition System that consistently
                attracts, qualifies, nurtures, and books premium clients—so you
                can focus on closing deals and scaling your business.
              </p>

              <div className="mt-10 flex justify-center">
                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent min-w-[300px] px-8 py-4 text-base"
                >
                  Book Your Free Strategy Call
                </Link>
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                Only for $10K+/month businesses · 90-day written guarantee
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
