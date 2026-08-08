import Link from "next/link";
import { Check } from "lucide-react";
import type { FunnelConfig } from "../lib/funnels";
import { Footer } from "./Footer";
import { VideoPlayer } from "./VideoPlayer";
import { Reveal } from "./Reveal";
import { AuroraBg } from "./AuroraBg";
import { TiltCard } from "./TiltCard";
import { TestimonialsSection } from "./TestimonialsSection";

function CtaButtons({ funnel }: { funnel: FunnelConfig }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        href={funnel.bookingPath}
        className="btn btn-accent flex-col w-full sm:w-auto px-8 py-4 shadow-md"
      >
        <span className="text-base font-extrabold uppercase tracking-wide">
          {funnel.ctaPrimary}
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
          {funnel.ctaPrimarySub}
        </span>
      </Link>
      <Link
        href={funnel.bookingPath}
        className="btn btn-outline-dark flex-col w-full sm:w-auto px-8 py-4"
      >
        <span className="text-base font-bold">{funnel.ctaSecondary}</span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
          {funnel.ctaSecondarySub}
        </span>
      </Link>
    </div>
  );
}

function LearnSection({ funnel }: { funnel: FunnelConfig }) {
  if (funnel.variant === "b") {
    return (
      <section className="section-shell bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="pill-badge-red mb-3">
              <span className="dot-red" />
              <span>INSIDE THE RECORDING</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
              {funnel.learnTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {funnel.learnItems.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 90} className="h-full">
                <TiltCard className="border border-zinc-200 bg-white shadow-sm">
                  <div className="flex h-full flex-col p-6">
                    <span className="display text-4xl font-extrabold text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 h-px w-10 bg-[var(--accent)]/30" />
                    <p className="mt-4 text-sm leading-relaxed text-zinc-700">
                      {item}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>INSIDE THE RECORDING</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            {funnel.learnTitle}
          </h2>
        </Reveal>
        <ul className="space-y-4">
          {funnel.learnItems.map((item, i) => (
            <Reveal key={item} delay={(i % 4) * 80}>
              <li className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors duration-300 hover:border-[var(--accent)]/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-extrabold text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
                  {item}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrackSection({ funnel }: { funnel: FunnelConfig }) {
  return (
    <section className="relative overflow-hidden bg-[#09090b] py-20 md:py-24 text-white border-b border-zinc-800">
      <AuroraBg />
      <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="pill-badge-red mb-3 mx-auto">
              <span className="dot-red" />
              <span>PROVEN SYSTEM</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {funnel.trackTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {funnel.trackBody}
            </p>
            <Link
              href={funnel.bookingPath}
              className="btn btn-accent mt-10 px-8 py-4 shadow-md inline-flex"
            >
              <span className="text-sm font-extrabold uppercase tracking-wide">
                {funnel.ctaPrimary}
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ funnel }: { funnel: FunnelConfig }) {
  return (
    <section className="section-shell bg-white">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <TiltCard className="bg-[var(--accent)] shadow-[0_30px_80px_-20px_rgba(237,28,36,0.5)]">
            <div className="relative overflow-hidden px-6 py-14 text-center text-white md:px-12">
              <div
                className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-20"
                aria-hidden="true"
              />
              <div className="relative">
                <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] tracking-tight">
                  Ready to build your
                  <br />
                  sales call machine?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm text-white/85 md:text-base">
                  Watch the mastermind. Then book if you&apos;re ready to install
                  the full acquisition system for your roofing company.
                </p>
                <Link
                  href={funnel.bookingPath}
                  className="mt-8 inline-flex flex-col items-center rounded-full bg-white px-10 py-4 font-extrabold text-[var(--accent)] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <span className="text-base uppercase tracking-wide">Book Application Call</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Free 1:1 · roofers only
                  </span>
                </Link>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

const resultStats = [
  { value: "40+", label: "Booked inspections in 60 days" },
  { value: "$635K", label: "Roofing booked from $29K spend" },
  { value: "-50%", label: "Average cost-per-lead drop" },
  { value: "86%+", label: "Inspection show rate" },
];

function StatsStrip() {
  return (
    <section className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {resultStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm sm:p-8">
                <p className="display text-4xl font-extrabold tracking-tight text-[var(--accent)] sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection({ funnel }: { funnel: FunnelConfig }) {
  const promises = [
    "Done-for-you install, not a DIY template",
    "Results tied to a written agreement",
    "No management fee until we hit the target",
    "The exact system behind every client in the recordings",
  ];
  return (
    <section className="relative overflow-hidden bg-[#09090b] py-20 text-white md:py-24 border-b border-zinc-800">
      <AuroraBg />
      <div
        className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-[var(--accent)]/40 bg-zinc-900/70 shadow-[0_30px_90px_-20px_rgba(237,28,36,0.35)] backdrop-blur-sm">
            <div className="grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
              <div>
                <div className="pill-badge-red mb-4">
                  <span className="dot-red" />
                  <span>BACKED IN WRITING</span>
                </div>
                <h2 className="display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Double your revenue in 90 days —{" "}
                  <span className="text-[var(--accent)]">or we keep working for free.</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-base">
                  The entire promise sits in a written agreement before you spend a cent. If the
                  system doesn&apos;t deliver, there&apos;s no management fee until it does.
                </p>
                <Link
                  href={funnel.bookingPath}
                  className="btn btn-accent mt-7 inline-flex px-8 py-4 shadow-md"
                >
                  <span className="text-sm font-extrabold uppercase tracking-wide">
                    {funnel.ctaPrimary}
                  </span>
                </Link>
              </div>
              <ul className="flex flex-col justify-center gap-4">
                {promises.map((item, i) => (
                  <Reveal key={item} delay={i * 80}>
                    <li className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <p className="text-sm font-medium text-zinc-300 md:text-base">{item}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const aboutFacts = [
  { value: "12+", label: "Years in roofing marketing" },
  { value: "$50M+", label: "Managed in Meta Ads" },
  { value: "25+", label: "Roofing niches served" },
  { value: "100%", label: "Done-for-you delivery" },
];

function AboutSection({ funnel }: { funnel: FunnelConfig }) {
  return (
    <section className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="pill-badge-red mb-3">
              <span className="dot-red" />
              <span>WHY IT&apos;S FREE</span>
            </div>
            <h2 className="display text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              No pitch. No email wall.{" "}
              <span className="text-[var(--accent)]">Just the recording.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 md:text-lg">
              We record these masterminds for serious roofing owners who want to see how the system
              actually works before they ever get on a call. Watch it. If it fits, book the free 1:1
              and we&apos;ll show you exactly what we&apos;d install for your market.
            </p>
            <Link
              href={funnel.bookingPath}
              className="btn btn-outline mt-7 inline-flex px-8 py-4"
            >
              <span className="text-sm font-bold">{funnel.ctaSecondary}</span>
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {aboutFacts.map((f, i) => (
              <Reveal key={f.label} delay={i * 90}>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <p className="display text-3xl font-extrabold text-[var(--accent)] sm:text-4xl">
                    {f.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    {f.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MastermindPage({ funnel }: { funnel: FunnelConfig }) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#09090b] pt-28 pb-20 md:pt-32 md:pb-24 text-white">
        <div className="jobber-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <AuroraBg />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(237,28,36,0.16), transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="pill-badge-red mb-6 mx-auto w-fit">
                <span className="dot-red" />
                <span>{funnel.eyebrow}</span>
              </div>
            </Reveal>

            <h1 className="display text-[clamp(2rem,5vw,3.8rem)] tracking-tight">
              <Reveal delay={80}>
                <>
                  {funnel.title}{" "}
                  <span className="text-[var(--accent)]">{funnel.titleAccent}</span>
                  {funnel.titleEnd ? (
                    <>
                      <br />
                      {funnel.titleEnd}
                    </>
                  ) : null}
                </>
              </Reveal>
            </h1>

            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                {funnel.subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={240}>
            <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex flex-wrap">
                <div className="bg-white px-4 py-2">
                  <p className="display text-sm text-zinc-900 md:text-base">
                    Private Mastermind
                  </p>
                </div>
                <div className="bg-[var(--accent)] px-4 py-2">
                  <p className="display text-sm text-white md:text-base">
                    {funnel.videoLabel}
                  </p>
                </div>
              </div>
              <VideoPlayer
                src={funnel.videoSrc}
                cover={funnel.videoCover}
                title={funnel.videoLabel}
                autoPlay
              />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <CtaButtons funnel={funnel} />
          </Reveal>
        </div>
      </section>

      <LearnSection funnel={funnel} />

      <TrackSection funnel={funnel} />

      <StatsStrip />

      <GuaranteeSection funnel={funnel} />

      <AboutSection funnel={funnel} />

      <TestimonialsSection />

      <FinalCtaSection funnel={funnel} />

      <Footer />
    </main>
  );
}
