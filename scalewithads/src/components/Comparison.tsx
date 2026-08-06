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
    <section
      id="comparison"
      className="section-shell border-b border-zinc-200/80 bg-zinc-100"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>WHY BUSINESSES CHOOSE US</span>
          </div>
          <h2 className="display text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            Traditional Agencies{" "}
            <span className="text-zinc-400">Generate Leads.</span>
            <br />
            Scale With Ads™{" "}
            <span className="text-[var(--accent)]">
              Builds Predictable Growth.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
              <div className="px-7 py-6 md:px-8">
                <h3 className="display text-2xl font-extrabold tracking-tight text-zinc-500">
                  Traditional Agency
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Generate leads, then stop.
                </p>
              </div>
              <ul className="flex-1 space-y-3 px-7 pb-8 md:px-8">
                {traditional.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-400"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={150} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[var(--accent)] bg-white shadow-md md:-translate-y-2">
              <div className="flex items-center justify-between gap-3 bg-[var(--accent)] px-7 py-5 text-white md:px-8">
                <h3 className="display text-2xl font-extrabold tracking-tight">
                  Scale With Ads™
                </h3>
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                  Featured
                </span>
              </div>
              <p className="px-7 pt-4 text-sm text-zinc-500 md:px-8">
                Builds predictable growth, end to end.
              </p>
              <ul className="flex-1 space-y-3 px-7 py-5 md:px-8">
                {system.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-zinc-800"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-extrabold text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="px-7 pb-7 md:px-8">
                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent w-full px-8 py-4 text-sm font-bold shadow-md"
                >
                  Book Your Free Strategy Call →
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
