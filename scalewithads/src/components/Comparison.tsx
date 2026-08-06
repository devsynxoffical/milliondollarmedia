import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const traditional = [
  "Runs Ads",
  "Delivers Leads",
  "Limited Follow-Up",
  "No CRM",
  "No Automation",
  "No Ownership",
  "No Guarantee",
];

const system = [
  "Complete Client Acquisition System",
  "Premium Client Acquisition",
  "AI Follow-Up",
  "CRM Included",
  "Full Automation",
  "You Own Everything",
  "90-Day Written Guarantee",
];

export function Comparison() {
  return (
    <section id="comparison" className="section-shell bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-bright">Why businesses choose us</p>
          <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            Traditional Agencies
            <br />
            <span className="text-[var(--accent-bright)]">Generate Leads.</span>
            <br />
            Scale With Ads™
            <br />
            <span className="text-[var(--accent-bright)]">
              Builds Predictable Growth.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
              <div className="px-8 py-6 md:px-10">
                <h3 className="display text-2xl text-white/80">
                  Traditional Agency
                </h3>
                <p className="mt-1 text-sm text-white/45">
                  Generate leads—then stop.
                </p>
              </div>
              <ul className="flex-1 space-y-3 px-8 pb-10 md:px-10">
                {traditional.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-4 w-4 shrink-0 text-white/25"
                      aria-hidden
                    >
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

          <Reveal delay={150} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-[var(--accent)] bg-white/[0.06] shadow-[0_24px_60px_-24px_rgba(237,28,36,0.5)] md:-translate-y-2">
              <div className="bg-[var(--accent)] px-8 py-6 text-white md:px-10">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="display text-2xl">Scale With Ads™</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Featured
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/80">
                  Builds predictable growth—end to end.
                </p>
              </div>
              <ul className="flex-1 space-y-3 px-8 py-8 md:px-10">
                {system.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-[var(--accent-soft)] px-4 py-3 text-sm font-semibold text-white"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="px-8 pb-8 md:px-10">
                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent w-full px-8 py-4 text-base"
                >
                  Book Your Free Strategy Call
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
