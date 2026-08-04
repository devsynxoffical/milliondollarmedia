import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Marquee } from "./Marquee";
import { HeroVisual } from "./HeroVisual";

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
          <p className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime)]" />
            Only for roofers · $1M+ minimum
          </p>

          <h1 className="animate-fade-up-delay-1 display text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.05] text-white">
            Double your roofing revenue
            <br />
            in <span className="text-[var(--lime)]">90 days</span> — or you
            don&apos;t pay.
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Funnel, creatives, ads, and follow-up — fully handled. You just
            take the sales calls. Everything is written in the agreement.
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
          <HeroVisual />
        </div>
      </div>

      <Marquee />
    </section>
  );
}
