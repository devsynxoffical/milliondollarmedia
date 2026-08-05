import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { ProofGrid } from "./ProofGrid";
import { Reveal } from "./Reveal";

const DASHBOARDS = ["proof-695d97e2.png", "proof-695d9820.png"];

export function ProofGallery() {
  return (
    <section id="results" className="section-shell bg-[var(--fog)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="eyebrow">Proof wall</p>
            <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
              Real dashboards.
              <br />
              <span className="text-[var(--purple)]">Real leads.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] md:justify-self-end md:text-base">
              Real spend. Real results. Tap &quot;See more&quot; to scroll
              deeper into a campaign, or &quot;View full&quot; for the complete
              dashboard — the same transparency you get with live access.
            </p>
          </Reveal>
        </div>

        <ProofGrid files={DASHBOARDS} />

        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[1.75rem] bg-[var(--purple)] px-6 py-8 text-white md:flex-row md:px-10">
            <p className="display text-2xl md:text-3xl">
              Want this running on{" "}
              <span className="text-white">your company?</span>
            </p>
            <Link href={BOOKING_PATH} className="cta-btn min-w-[220px]">
              <span className="display text-lg tracking-normal">Apply Now</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                $1M+ roofers only
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
