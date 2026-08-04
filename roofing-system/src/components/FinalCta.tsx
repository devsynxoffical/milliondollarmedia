import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const points = [
  "Only for $1M+ roofing companies",
  "We run funnel, creatives, ads, follow-up",
  "You take the sales calls",
  "Complete live access",
  "If we don’t perform — you don’t pay",
];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--fog)]">
      <div className="section-shell">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--ink-soft)] px-6 py-14 text-white shadow-[var(--shadow)] md:px-12 md:py-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 85% 20%, rgba(237,28,36,0.24), transparent 55%), radial-gradient(ellipse 50% 70% at 10% 90%, rgba(255,255,255,0.1), transparent 60%)",
              }}
            />
            <div className="bob-icon pointer-events-none absolute right-8 top-8 z-10 hidden text-[var(--red-bright)] md:block">
              <svg viewBox="0 0 24 24" className="h-14 w-14" aria-hidden>
                <path
                  d="M12 2c4 1.5 6.5 5 6.5 9.5 1.5 1.8 2.5 4 2.5 6.5l-4-1c-1.2 1.6-3 2.8-5 3-2-.2-3.8-1.4-5-3l-4 1c0-2.5 1-4.7 2.5-6.5C5.5 7 8 3.5 12 2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M9.5 14.5L7 20l2.5-1.2L12 20l2.5-1.2L17 20l-2.5-5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
                  Ready to double
                  <br />
                  your revenue?
                </h2>
                <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
                  {points.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/90"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[var(--purple)]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start gap-5 lg:items-end">
                <p className="display text-2xl leading-snug text-white/80 md:text-3xl lg:text-right">
                  Book your call.
                  <br />
                  We fill the
                  <br />
                  calendar.
                </p>
                <Link href={BOOKING_PATH} className="cta-btn min-w-[240px]">
                  <span className="display text-lg tracking-normal md:text-xl">
                    Book Application Call
                  </span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/70">
                    $1M+ roofers only
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
