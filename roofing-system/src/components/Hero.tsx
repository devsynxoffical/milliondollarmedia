import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Marquee } from "./Marquee";

const trust = [
  "$50M+ in Meta Ads",
  "12+ Years Experience",
  "90-Day Written Guarantee",
  "100% Done-For-You",
];

const flow = ["Meta Ads", "Funnel", "CRM + AI", "Qualified Leads", "Booked"];

function RoofIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
      <defs>
        <linearGradient id="roof-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff3b43" />
          <stop offset="100%" stopColor="#ff8a5c" />
        </linearGradient>
      </defs>
      <path
        d="M4 22 L24 6 L44 22"
        fill="none"
        stroke="url(#roof-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.5 L24 9 L38 18.5"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 22 L24 34 L40 22"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="9" r="2.6" fill="#ff3b43" />
    </svg>
  );
}

function DashboardPanel() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-[var(--purple)] opacity-25 blur-3xl" />

      <div className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-[0_60px_160px_rgba(0,0,0,0.55)] md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <RoofIcon />
            </div>
            <div>
              <p className="display text-sm tracking-tight text-white">
                Roofing Systems™
              </p>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--red-bright)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--red-bright)]" />
                </span>
                Live system
              </p>
            </div>
          </div>
          <span className="rounded-full border border-[var(--red-bright)]/40 bg-[var(--red-bright)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--red-bright)]">
            $1M+ Roofers
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Cost / Lead", value: "-50%", up: true },
            { label: "Calls Booked", value: "48", up: true },
            { label: "Close Rate", value: "+38%", up: true },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5"
            >
              <p className="display text-xl text-white md:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
              90-day revenue
            </p>
            <p className="text-[10px] font-bold text-[var(--red-bright)]">
              2× target
            </p>
          </div>
          <svg viewBox="0 0 280 84" className="mt-3 w-full" aria-hidden>
            <defs>
              <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff3b43" />
                <stop offset="100%" stopColor="#ff8a5c" />
              </linearGradient>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3b43" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff3b43" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 70 L20 64 L44 66 L68 54 L92 58 L118 42 L144 46 L170 30 L196 34 L224 18 L250 22 L268 10 L280 12 L280 84 L0 84 Z"
              fill="url(#chart-fill)"
            />
            <path
              d="M0 70 L20 64 L44 66 L68 54 L92 58 L118 42 L144 46 L170 30 L196 34 L224 18 L250 22 L268 10 L280 12"
              fill="none"
              stroke="url(#chart-line)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="280" cy="12" r="4" fill="#ff3b43" />
            <circle cx="280" cy="12" r="8" fill="#ff3b43" opacity="0.25" />
          </svg>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {flow.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/85">
                {step}
              </span>
              {i < flow.length - 1 && (
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white/35" aria-hidden>
                  <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="float-icon-soft absolute -right-3 -top-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.4)] backdrop-blur-md md:-right-8">
        <p className="display text-lg text-white">
          -50% <span className="text-sm text-[var(--red-bright)]">CPL</span>
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Avg. result
        </p>
      </div>
      <div
        className="float-icon-soft absolute -bottom-5 -left-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.4)] backdrop-blur-md md:-left-8"
        style={{ animationDelay: "1.1s" }}
      >
        <p className="display text-lg text-white">
          2× <span className="text-sm text-[var(--red-bright)]">Revenue</span>
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Written guarantee
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="hero-noise absolute inset-0" />
      <div className="hero-grid-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[480px] w-[480px] rounded-full bg-[var(--purple)] opacity-25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[420px] w-[420px] rounded-full bg-[var(--purple)] opacity-20 blur-[130px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-12 pt-28 md:px-8 md:pt-32 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div className="text-left text-white">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm md:text-[11px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--red-bright)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--red-bright)]" />
            </span>
            Only for roofing companies doing $1M+ / year
          </p>

          <h1 className="animate-fade-up-delay-1 display mt-6 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98]">
            Double your roofing{" "}
            <span className="text-gradient">revenue</span>
            <br />
            in <span className="text-stroke">90 days</span>
            <span className="text-white/30">.</span>
            <br />
            <span className="text-white">Or we work free.</span>
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            We install our complete client acquisition system into your
            roofing company — offer, ads, funnel, CRM, AI follow-up, and
            qualification. You just run the appointments and close.
          </p>

          <div className="animate-fade-up-delay-3 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={BOOKING_PATH} className="cta-btn min-w-[280px]">
              <span className="display text-lg tracking-tight md:text-xl">
                Book Your Free Strategy Call
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                Backed by a written agreement
              </span>
            </Link>
            <a
              href="#system"
              className="cta-btn-outline min-w-[230px] px-6"
            >
              <span className="display text-base tracking-tight">
                See The 8-Step System
              </span>
            </a>
          </div>

          <div className="animate-fade-up-delay-3 mt-9 flex max-w-xl flex-wrap items-center gap-x-6 gap-y-3">
            {trust.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[13px] font-semibold text-white/75"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--red-bright)]" aria-hidden>
                  <path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-fade-up-delay-2 mx-auto w-full max-w-[540px] lg:mx-0 lg:justify-self-end">
          <DashboardPanel />
        </div>
      </div>

      <Marquee />
    </section>
  );
}
