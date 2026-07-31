import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--black)]">
      <div className="hero-noise pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pb-16 pt-24 md:px-8 md:pb-20 md:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="text-left">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 border border-[var(--red)] bg-[var(--red)]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--red)] md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
            Only for roofers · $1M+ minimum
          </p>

          <h1 className="animate-fade-up-delay-1 display text-[clamp(2.8rem,6.5vw,5.4rem)] text-white">
            WE DOUBLE YOUR
            <br />
            <span className="text-[var(--red)]">ROOFING REVENUE</span>
            <br />
            IN 90 DAYS
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Funnel. Creatives. Ad management. Follow-up. We run the full
            acquisition system — you just show up to sales calls. Everything is
            written in the agreement.
          </p>

          <div className="animate-fade-up-delay-3 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={BOOKING_PATH} className="cta-btn min-w-[250px]">
              <span className="display text-xl tracking-[0.06em] md:text-2xl">
                BOOK APPLICATION CALL
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                $1M+ roofers only — don&apos;t apply if below
              </span>
            </Link>
            <a
              href="#masterclass"
              className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              Watch the breakdown →
            </a>
          </div>

          <div className="animate-fade-up-delay-3 mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-7">
            {[
              ["90 DAYS", "Revenue target"],
              ["FULL SYSTEM", "We run it"],
              ["NO PERFORM", "You don't pay"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="display text-lg text-[var(--red)] md:text-xl">{k}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up-delay-2">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
