import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const stats = [
  { end: 48, suffix: "+", label: "Qualified calls", sub: "Booked every week" },
  { end: 90, suffix: "", label: "Days to target", sub: "Written in the agreement" },
  { end: 2, suffix: "×", label: "Revenue goal", sub: "The performance promise" },
  { end: 100, suffix: "%", label: "System handled", sub: "You just take the call" },
];

export function Guarantee() {
  return (
    <section className="section-shell bg-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--ink-soft)] px-6 py-12 text-white shadow-[var(--shadow)] md:px-12 md:py-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 80% at 10% 50%, rgba(237,28,36,0.28), transparent 55%), radial-gradient(ellipse 40% 60% at 90% 20%, rgba(255,255,255,0.1), transparent 50%)",
              }}
            />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="bob-icon mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-[var(--red-bright)] backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden>
                    <path
                      d="M12 2c4 1.5 6.5 5 6.5 9.5 1.5 1.8 2.5 4 2.5 6.5l-4-1c-1.2 1.6-3 2.8-5 3-2-.2-3.8-1.4-5-3l-4 1c0-2.5 1-4.7 2.5-6.5C5.5 7 8 3.5 12 2z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--red-bright)]">
                  Performance guarantee
                </p>
                <h2 className="display mt-3 text-[clamp(1.8rem,4vw,2.8rem)]">
                  If we don&apos;t perform,
                  <br />
                  you don&apos;t pay
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                  The promise to double your revenue in 90 days is written into
                  the agreement. Results — or you don&apos;t pay for this.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <p className="display text-4xl text-[var(--red-bright)] md:text-5xl">
                      <CountUp end={item.end} suffix={item.suffix} />
                    </p>
                    <p className="mt-2 font-bold text-white">{item.label}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/55">
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {["In writing", "Live access", "You take calls"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--purple)]/30 bg-[var(--purple-light)] px-5 py-3 text-sm font-semibold text-[var(--ink)]"
              >
                {item}
              </span>
            ))}
          </div>
          <Link href={BOOKING_PATH} className="cta-btn min-w-[260px]">
            <span className="display text-lg tracking-normal md:text-xl">
              Apply For Your Spot
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/70">
              $1M+ roofers only
            </span>
          </Link>
        </Reveal>

        {/* Decorative MDM proof strip */}
        <Reveal delay={180} className="mt-14 hidden items-center justify-center gap-4 md:flex">
          {[
            "/media/reviews/poster-edgar.png",
            "/media/reviews/poster-ibam.png",
            "/media/reviews/poster-edgar-2.png",
          ].map((src) => (
            <div
              key={src}
              className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-white shadow-[var(--shadow-soft)]"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
