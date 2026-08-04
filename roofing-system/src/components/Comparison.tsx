import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const before = [
  "Lead generation — inconsistent / DIY",
  "Creatives — guesswork",
  "Follow-up — you chase them",
  "Visibility — black box agencies",
  "Risk — you pay either way",
  "Your role — do everything",
];

const after = [
  "Funnel + ads managed daily",
  "Built for roofing close rates",
  "Follow-up handled for you",
  "Complete live access",
  "No perform = you don’t pay",
  "Your role — just take sales calls",
];

export function Comparison() {
  return (
    <section className="section-shell bg-[var(--fog)]">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Before vs with us</p>
          <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
            Stop doing
            <br />
            <span className="text-[var(--purple)]">everything yourself</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
            The difference between a typical setup and the full Roofing Systems
            Co. machine.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]">
              <div className="bg-[var(--fog)] px-8 py-6 md:px-10">
                <div className="flex items-center justify-between">
                  <h3 className="display text-2xl text-[var(--ink)]">
                    Typical Setup
                  </h3>
                  <span className="rounded-full border border-black/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/50">
                    Before
                  </span>
                </div>
              </div>
              <ul className="flex-1 space-y-4 px-8 py-8 md:px-10">
                {before.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-[var(--line)] pb-3 text-sm font-medium text-[var(--ink)]/65 last:border-0"
                  >
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-black/30" aria-hidden>
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={150}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-[var(--purple)] bg-white shadow-[var(--shadow)] md:-translate-y-2">
              <div className="bg-[var(--purple)] px-8 py-6 text-white md:px-10">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="display text-2xl">Roofing Systems Co.</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--purple)]">
                    Featured
                  </span>
                </div>
              </div>
              <ul className="flex-1 space-y-4 px-8 py-8 md:px-10">
                {after.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-[var(--line)] pb-3 text-sm font-medium text-[var(--ink)]/80 last:border-0"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--purple)] text-[10px] font-bold text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="px-8 pb-8 md:px-10">
                <Link href={BOOKING_PATH} className="cta-btn-dark w-full">
                  <span className="display text-lg tracking-normal md:text-xl">
                    Get This Running
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                    Book application call
                  </span>
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
