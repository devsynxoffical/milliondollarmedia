import Link from "next/link";
import type { FunnelConfig } from "../lib/funnels";
import { Footer } from "./Footer";
import { VideoPlayer } from "./VideoPlayer";
import { Reveal } from "./Reveal";
import { AuroraBg } from "./AuroraBg";
import { TiltCard } from "./TiltCard";
import { ShaderBackdrop } from "./axion/ShaderBackdrop";
import { SectionBadge } from "./axion/SectionBadge";
import { CTAButton } from "./ui/CTAButton";
import { RollButton } from "./ui/RollButton";
import { GuaranteeBadge } from "./ui/GuaranteeBadge";
import { TestimonialsSection } from "./TestimonialsSection";
import { MastermindFaq } from "./MastermindFaq";

function CtaButtons({ funnel }: { funnel: FunnelConfig }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-12 sm:gap-5">
      <CTAButton href={funnel.bookingPath} label={funnel.ctaPrimary} size="lg" />
      <Link
        href={funnel.bookingPath}
        className="group flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[13px] font-medium text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-colors duration-300 hover:bg-gray-50 sm:py-2 sm:pl-6 sm:text-[14px]"
      >
        <RollButton
          label={funnel.ctaSecondary}
          circleSize="h-7 w-7 sm:h-8 sm:w-8"
          arrowClass="text-gray-900"
        />
      </Link>
      <GuaranteeBadge />
    </div>
  );
}

function VideoSection({ funnel }: { funnel: FunnelConfig }) {
  return (
    <section className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionBadge num="01" label="Watch The Mastermind" />
          <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            Press play. Take notes. Apply it.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] font-medium leading-[1.6] text-gray-600 sm:text-[16px]">
            {funnel.videoLabel} — the full private recording, free to watch.
            Then book a free 1:1 call to see if the full acquisition system
            fits your roofing company.
          </p>
          <CTAButton
            href={funnel.bookingPath}
            label="Book Your Free 1:1 Call"
            size="lg"
            className="mt-8"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
            <div className="flex flex-wrap">
              <span className="bg-gray-900 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                Private Mastermind
              </span>
              <span className="bg-[#ed1c24] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                {funnel.videoLabel}
              </span>
            </div>
            <VideoPlayer
              src={funnel.videoSrc}
              cover={funnel.videoCover}
              title={funnel.videoLabel}
              autoPlay
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LearnSection({ funnel }: { funnel: FunnelConfig }) {
  if (funnel.variant === "b") {
    return (
      <section className="section-shell bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <SectionBadge num="02" label="Inside The Recording" />
            <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
              {funnel.learnTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {funnel.learnItems.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 90} className="h-full">
                <TiltCard className="border border-zinc-200 bg-white shadow-sm">
                  <div className="flex h-full flex-col p-6">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-[12px] font-medium text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 h-px w-10 bg-[#ed1c24]" />
                    <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-600">
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
          <SectionBadge num="02" label="Inside The Recording" />
          <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            {funnel.learnTitle}
          </h2>
        </Reveal>
        <ul className="space-y-4">
          {funnel.learnItems.map((item, i) => (
            <Reveal key={item} delay={(i % 4) * 80}>
              <li className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors duration-300 hover:border-[#ed1c24]/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-[#ed1c24]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-2 text-sm font-medium leading-relaxed text-zinc-600 md:text-base">
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
          <Reveal className="flex flex-col items-center">
            <SectionBadge num="03" label="Proven System" dark />
            <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
              {funnel.trackTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] font-medium leading-[1.7] text-gray-300 sm:text-[16px]">
              {funnel.trackBody}
            </p>
            <CTAButton
              href={funnel.bookingPath}
              label={funnel.ctaPrimary}
              size="lg"
              className="mt-10"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ funnel }: { funnel: FunnelConfig }) {
  return (
    <section className="section-shell relative overflow-hidden bg-[#ed1c24] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-blob-a -right-24 -top-24 h-[420px] w-[420px] bg-white/10" />
        <div className="aurora-blob aurora-blob-b -left-24 bottom-[-10%] h-[380px] w-[380px] bg-black/20" />
      </div>
      <div className="relative mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center">
          <SectionBadge num="06" label="Book Your Strategy Call" dark />
          <h2 className="mt-8 max-w-3xl text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
            Ready to build your
            <br />
            sales call machine?
          </h2>
          <p className="mt-5 max-w-xl text-[15px] font-medium leading-[1.6] text-white/90 sm:text-[16px]">
            Watch the mastermind. Then book if you&apos;re ready to install
            the full acquisition system for your roofing company.
          </p>
          <CTAButton
            href={funnel.bookingPath}
            label={funnel.ctaPrimary}
            color="black"
            size="lg"
            className="mt-10"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function MastermindPage({ funnel }: { funnel: FunnelConfig }) {
  return (
    <main>
      {/* Hero — text only */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#EFEFEF]">
        <ShaderBackdrop />

        <div className="flex-1" />

        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="mb-5 flex items-center gap-2.5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
            <span className="h-2 w-2 rounded-full bg-[#ed1c24]" />
            {funnel.eyebrow}
          </p>
          <h1 className="max-w-5xl text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
            {funnel.title}{" "}
            <span className="text-[#ed1c24]">{funnel.titleAccent}</span>
            {funnel.titleEnd ? (
              <>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                {funnel.titleEnd}
              </>
            ) : null}
          </h1>
          <p className="mt-6 max-w-xl text-[15px] font-medium leading-[1.6] text-gray-600 sm:text-[16px]">
            {funnel.subtitle}
          </p>

          <Reveal delay={200}>
            <CtaButtons funnel={funnel} />
          </Reveal>
        </div>
      </section>

      <VideoSection funnel={funnel} />

      <LearnSection funnel={funnel} />

      <TrackSection funnel={funnel} />

      <TestimonialsSection num="04" />

      <MastermindFaq bookingPath={funnel.bookingPath} />

      <FinalCtaSection funnel={funnel} />

      <Footer />
    </main>
  );
}
