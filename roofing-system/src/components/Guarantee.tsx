import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function Guarantee() {
  return (
    <section className="relative overflow-hidden bg-[var(--black)] section-shell">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(225,6,0,0.28), transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[var(--red)] bg-[var(--red)]/10 md:h-32 md:w-32">
          <div>
            <p className="display text-3xl text-[var(--red)] md:text-4xl">90</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Days
            </p>
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--red)]">
          Performance guarantee
        </p>
        <h2 className="display mt-4 text-[clamp(2.6rem,6.5vw,5rem)] text-white">
          IF WE DON&apos;T PERFORM,
          <br />
          <span className="text-[var(--red)]">YOU DON&apos;T PAY</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          We put our skin in the game. The promise to double your revenue in 90
          days is written into the agreement. No games. No fluff. Results — or
          you don&apos;t pay for this.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {["In writing", "Live access", "You take calls"].map((item) => (
            <div
              key={item}
              className="border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/80"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href={BOOKING_PATH} className="cta-btn min-w-[280px] md:min-w-[380px]">
            <span className="display text-xl tracking-[0.06em] md:text-2xl">
              APPLY FOR YOUR SPOT
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              $1M+ roofers only
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
