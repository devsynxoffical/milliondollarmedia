import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

const HERO_VIDEO =
  "https://assets.cdn.filesafe.space/HWyar6Z3u3aF6ydghkCx/media/69b311b6cab7f7b0b5822c7a.mp4";
const HERO_VIDEO_COVER = "/media/covers/cover-mastermind.jpeg";

const metrics = [
  {
    value: "$50M+",
    label: "Ad Spend Managed",
    sub: "Proven ROI across industries",
  },
  {
    value: "90-Day",
    label: "Revenue Double Guarantee",
    sub: "Backed by written agreement",
  },
  {
    value: "100%",
    label: "Done-For-You Ecosystem",
    sub: "Ads, Funnels, CRM & AI",
  },
];

const heroLogos = Array.from(
  { length: 12 },
  (_, i) => `/media/logos/logo-${String(i + 1).padStart(2, "0")}.png`
);

export function Hero() {
  const logoTrack = [...heroLogos, ...heroLogos];

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[var(--band)]">
      {/* Video background layer */}
      <div className="absolute inset-0">
        <video
          src={HERO_VIDEO}
          poster={HERO_VIDEO_COVER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--band)] via-[var(--band)]/45 to-[var(--band)]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--band)]/80 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 70% 20%, rgba(237,28,36,0.22), transparent 60%)",
          }}
        />
      </div>

      <div className="studio-grid pointer-events-none absolute inset-0" />

      {/* Floating metric card — right side */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
        <div className="mx-auto flex max-w-[1240px] justify-end px-8">
          <div
            className="animate-fade-up pointer-events-auto w-[300px] rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Live system status
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent-bright)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-bright)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-bright)]" />
                </span>
                Active
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {metrics.map((m) => (
                <div key={m.label} className="flex items-baseline justify-between gap-3">
                  <span className="display text-xl text-white">{m.value}</span>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white/90">{m.label}</p>
                    <p className="text-[10px] text-white/50">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content — bottom left, staggered */}
      <div className="pointer-events-none absolute inset-x-0 inset-y-0 z-10 flex items-end">
        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-44 md:px-8 md:pb-52">
          <div
            className="animate-fade-up flex items-center gap-2.5"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="pill-badge-green">
              <span className="dot-green" />
              <span>Scale With Ads™ Client Acquisition System</span>
            </span>
          </div>

          <h1
            className="animate-fade-up mt-6 text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white"
            style={{ animationDelay: "0.25s" }}
          >
            Scale With Ads<span className="text-[var(--accent-bright)]">™</span>
          </h1>

          <p
            className="animate-fade-up mt-5 text-[clamp(1.15rem,2.4vw,1.6rem)] font-semibold text-white"
            style={{ animationDelay: "0.35s" }}
          >
            We implement client acquisition <span className="text-[var(--accent-bright)]">correctly.</span>
          </p>

          <p
            className="animate-fade-up mt-4 max-w-xl text-base leading-relaxed text-white/70"
            style={{ animationDelay: "0.45s" }}
          >
            Enterprise client acquisition systems built in days — offer
            positioning, Meta Ads, high-converting funnels, CRM, and AI
            follow-up deployed with zero-trust qualification. Done right, not
            just fast.
          </p>

          <div
            className="animate-fade-up pointer-events-auto mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              href={BOOKING_PATH}
              className="btn btn-accent w-full px-8 py-4 text-base sm:w-auto"
            >
              Book Your Free Strategy Call
            </Link>
            <Link
              href="#system"
              className="btn pointer-events-auto w-full px-7 py-4 text-base sm:w-auto"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              See the 8-Step System →
            </Link>
          </div>
        </div>
      </div>

      {/* Partner logo marquee — bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="border-t border-white/10 bg-black/50 backdrop-blur-md">
          <div className="mx-auto max-w-[1240px] px-5 pt-5 md:px-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
              Trusted by operators across 20+ industries
            </p>
          </div>
          <div className="relative mt-4 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black/60 to-transparent md:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black/60 to-transparent md:w-28" />
            <div className="marquee-track items-center gap-10 px-6 py-4">
              {logoTrack.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-1.5 transition duration-300 hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_-6px_rgba(237,28,36,0.6)] md:h-14 md:w-14"
                >
                  <Image
                    src={src}
                    alt={`Partner brand ${(i % heroLogos.length) + 1}`}
                    width={207}
                    height={207}
                    className="h-full w-full object-contain opacity-70 transition duration-300 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
