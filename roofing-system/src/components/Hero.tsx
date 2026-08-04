import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Marquee } from "./Marquee";
import { HeroVisual } from "./HeroVisual";

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className = "", fill = false }: { className?: string; fill?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.6 5.8 21l1.6-7L2 9.2l7.1-.6L12 2z"
        fill={fill ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RocketIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2c4 1.5 6.5 5 6.5 9.5 1.5 1.8 2.5 4 2.5 6.5l-4-1c-1.2 1.6-3 2.8-5 3-2-.2-3.8-1.4-5-3l-4 1c0-2.5 1-4.7 2.5-6.5C5.5 7 8 3.5 12 2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 14.5L7 20l2.5-1.2L12 20l2.5-1.2L17 20l-2.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PlayRing() {
  return (
    <a
      href="#masterclass"
      className="group absolute -bottom-6 left-6 z-20 hidden sm:block md:left-10"
      aria-label="Watch the systems breakdown"
    >
      <div className="relative h-28 w-28 md:h-32 md:w-32">
        <svg
          viewBox="0 0 100 100"
          className="spin-ring absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <path id="ringPath" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
          </defs>
          <text className="fill-white text-[10.5px] font-bold uppercase tracking-[0.22em]">
            <textPath href="#ringPath">
              Watch the systems breakdown • live system •
            </textPath>
          </text>
        </svg>
        <span className="pulse-ring absolute inset-5 flex items-center justify-center rounded-full bg-[var(--lime)] text-[var(--ink)] shadow-[0_14px_40px_rgba(212,255,68,0.4)] transition duration-300 group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </a>
  );
}

const avatars = [
  "/media/reviews/poster-edgar.png",
  "/media/reviews/poster-ibam.png",
  "/media/reviews/poster-edgar-2.png",
];

function TrustRow() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex -space-x-3">
        {avatars.map((src) => (
          <div
            key={src}
            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/80 ring-1 ring-white/20"
          >
            <Image src={src} alt="Client" fill className="object-cover" sizes="40px" />
          </div>
        ))}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-[var(--lime)] text-[11px] font-bold text-[var(--ink)]">
          +48
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[var(--lime)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} fill className="h-3.5 w-3.5" />
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
          300–500 qualified sales calls / month
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-noise absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-28 pt-28 md:px-8 md:pb-36 md:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="text-left text-white">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime)]" />
            Only for roofers · $1M+ minimum
          </p>

          <p className="animate-fade-up-delay-1 display text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.92] text-white">
            SCALE NOW
          </p>

          <h1 className="animate-fade-up-delay-1 mt-3 display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white">
            Double your{" "}
            <span className="text-[var(--lime)]">roofing revenue</span>
            <br />
            in 90 days
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Funnel. Creatives. Ad management. Follow-up. We run the full
            acquisition system — you just show up to sales calls. Everything is
            written in the agreement.
          </p>

          <div className="animate-fade-up-delay-3 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={BOOKING_PATH} className="cta-btn min-w-[250px]">
              <span className="display text-lg tracking-normal md:text-xl">
                Book Application Call
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/70">
                $1M+ roofers only — don&apos;t apply if below
              </span>
            </Link>
            <a
              href="#masterclass"
              className="text-sm font-semibold text-white/80 underline-offset-4 transition hover:text-[var(--lime)] hover:underline"
            >
              Watch the breakdown →
            </a>
          </div>

          <div className="animate-fade-up-delay-3 mt-10 max-w-xl border-t border-white/15 pt-7">
            <TrustRow />
          </div>
        </div>

        <div className="relative animate-fade-up-delay-2">
          <div className="float-icon absolute -left-4 -top-8 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--purple)] shadow-[0_16px_40px_rgba(21,21,40,0.2)] md:-left-8 md:h-16 md:w-16">
            <BoltIcon className="h-7 w-7" />
          </div>
          <div className="bob-icon absolute -right-2 -top-10 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--lime)] text-[var(--ink)] md:-right-4 md:h-16 md:w-16">
            <RocketIcon className="h-7 w-7" />
          </div>
          <div
            className="float-icon absolute -bottom-2 -right-2 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--purple)] shadow-[0_16px_40px_rgba(21,21,40,0.2)] md:h-14 md:w-14"
            style={{ animationDelay: "1.2s" }}
          >
            <StarIcon fill className="h-6 w-6" />
          </div>

          <HeroVisual />
          <PlayRing />
        </div>
      </div>

      <Marquee />
    </section>
  );
}
