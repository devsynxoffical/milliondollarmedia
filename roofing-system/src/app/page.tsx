import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ScrollMorphHero } from "../components/ScrollMorphHero";
import { ProblemSection } from "../components/ProblemSection";
import { BenefitsSection } from "../components/BenefitsSection";
import { InteractiveImageAccordion } from "../components/ui/interactive-image-accordion";
import { SystemStepsSection } from "../components/SystemStepsSection";
import { IncludedSection } from "../components/IncludedSection";
import { OwnershipSection } from "../components/OwnershipSection";
import { StatsBand } from "../components/StatsBand";
import { PipelineMotion } from "../components/PipelineMotion";
import { AuroraBg } from "../components/AuroraBg";
import { CountUp } from "../components/CountUp";
import { TrainingVideos } from "../components/TrainingVideos";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FaqSection } from "../components/FaqSection";
import { Footer } from "../components/Footer";
import { BOOKING_PATH } from "../lib/offer";
import Link from "next/link";
import { Reveal } from "../components/Reveal";

// Roofing Specialties, GetJobber "Proud Partner" grid
const specialties = [
  { label: "Residential Roofing", emoji: "🏠" },
  { label: "Commercial Roofing", emoji: "🏢" },
  { label: "Storm Damage", emoji: "⛈️" },
  { label: "Metal Roofing", emoji: "🔩" },
  { label: "Solar Roofing", emoji: "☀️" },
  { label: "Roof Repair", emoji: "🔧" },
  { label: "Insurance Claims", emoji: "📋" },
  { label: "New Construction", emoji: "🏗️" },
];

// 90-day guarantee points
const guaranteePoints = [
  "If we don't help you achieve the mutually agreed growth milestones within the first 90 days after implementing your Roofing Systems™ Client Acquisition System...",
  "We'll continue working for you at no management fee until we do.",
  "Everything is backed by a written agreement.",
];

// Results metrics, anchors to header "Results" (#proof)
type ProofMetric = {
  tag: string;
  label: string;
  metric?: string;
  end?: number;
  prefix?: string;
  suffix?: string;
};

const proofMetrics: ProofMetric[] = [
  { tag: "Call Volume", metric: "300–500", label: "Qualified sales calls booked every month" },
  { tag: "Roofing Scale", metric: "", end: 635, prefix: "", suffix: "", label: "Roofing leads generated in 45 days" },
  { tag: "Recurring Offer", metric: "", end: 86, prefix: "$", suffix: "K", label: "Client revenue from just $29K spend" },
  { tag: "CPL Drop", metric: "", end: 50, prefix: "-", suffix: "%", label: "Drop in cost per lead after relaunch" },
];

function SpecialtiesSection() {
  return (
    <section id="specialties" className="section-shell bg-[#09090b] text-white border-b border-zinc-800">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3 mx-auto">
            <span className="dot-red" />
            <span>PROUD PARTNER TO ROOFING PROS</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Proud partner to roofing pros{" "}
            <span className="text-[var(--accent)]">across all verticals</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Whether you run a residential shingle crew or a large commercial flat-roof operation, our acquisition system is built to fill your pipeline.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {specialties.map((s, i) => (
              <div
                key={s.label}
                className="stagger-fade glow-card group flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-bold text-white hover:bg-zinc-800"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span>{s.emoji}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section id="guarantee" className="section-shell relative overflow-hidden bg-[#09090b] text-white border-b border-zinc-800">
      <AuroraBg className="opacity-70" />
      <div className="relative mx-auto max-w-[1240px]">
        <Reveal>
          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 px-6 py-12 backdrop-blur-sm md:px-12 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="pill-badge-red mb-4">
                  <span className="dot-red" />
                  <span>OUR 90-DAY GUARANTEE</span>
                </div>
                <h2 className="display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  We Take The Risk...
                  <br />
                  <span className="text-[var(--accent)]">Not You.</span>
                </h2>
              </div>

              <div className="space-y-4">
                {guaranteePoints.map((item, i) => (
                  <div
                    key={item}
                    className="glow-card group flex items-start gap-4 rounded-2xl border border-zinc-800 bg-[#09090b] p-5 md:p-6"
                  >
                    <span className="pulse-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-extrabold text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-zinc-300 md:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-10 text-center">
          <Link href={BOOKING_PATH} className="btn btn-accent px-8 py-4 text-sm font-bold shadow-md inline-flex">
            Book Your Free Strategy Call →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="proof" className="section-shell relative overflow-hidden bg-[#09090b] text-white border-b border-zinc-800">
      <AuroraBg className="opacity-80" />
      <div className="relative mx-auto max-w-[1240px]">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3 mx-auto">
            <span className="dot-red" />
            <span>PROVEN RESULTS</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            A proven system with a{" "}
            <span className="text-gradient-animated">massive track record</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Not a one-off win. This is a client acquisition machine that repeats
            results across industries, built and optimized for roofing.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map((item, i) => (
            <Reveal key={item.tag} delay={i * 80}>
              <div className="glow-card group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 text-center hover:bg-zinc-800">
                <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {item.tag}
                </p>
                <p className="display mt-4 text-4xl font-extrabold text-white transition-transform duration-300 group-hover:scale-110">
                  {item.metric ? (
                    item.metric
                  ) : (
                    <CountUp
                      end={item.end!}
                      prefix={item.prefix}
                      suffix={item.suffix}
                    />
                  )}
                </p>
                <p className="mt-2 text-sm text-zinc-400">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <Link href={BOOKING_PATH} className="btn btn-accent px-8 py-4 text-sm font-bold shadow-md inline-flex">
            See These Results In Your Market →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ScrollMorphHero />
        <ProblemSection />
        <SystemStepsSection />
        <PipelineMotion />
        <IncludedSection />
        <BenefitsSection />
        <InteractiveImageAccordion />
        <SpecialtiesSection />
        <OwnershipSection />
        <GuaranteeSection />
        <ResultsSection />
        <TrainingVideos />
        <TestimonialsSection />
        <FaqSection />
        <StatsBand />
      </main>
      <Footer />
    </div>
  );
}
