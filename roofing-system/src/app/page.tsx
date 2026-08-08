import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ScrollMorphHero } from "../components/ScrollMorphHero";
import { ProblemSection } from "../components/ProblemSection";
import { BenefitsSection } from "../components/BenefitsSection";
import { InteractiveImageAccordion } from "../components/ui/interactive-image-accordion";
import { SystemStepsSection } from "../components/SystemStepsSection";
import { OwnershipSection } from "../components/OwnershipSection";
import { StatsBand } from "../components/StatsBand";
import { PipelineMotion } from "../components/PipelineMotion";
import { TrainingVideos } from "../components/TrainingVideos";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FaqSection } from "../components/FaqSection";
import { Footer } from "../components/Footer";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "../components/Reveal";
import { SectionBadge } from "../components/axion/SectionBadge";
import { CTAButton } from "../components/ui/CTAButton";

// Roofing Specialties, GetJobber "Proud Partner" grid
const guaranteePoints = [
  "If we don't help you achieve the mutually agreed growth milestones within the first 90 days after implementing your Roofing Systems™ Client Acquisition System...",
  "We'll continue working for you at no management fee until we do.",
  "Everything is backed by a written agreement.",
];

function GuaranteeSection() {
  return (
    <section id="guarantee" className="section-shell relative overflow-hidden bg-[#ed1c24] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-blob-a -right-24 -top-24 h-[420px] w-[420px] bg-white/10" />
        <div className="aurora-blob aurora-blob-b -left-24 bottom-[-10%] h-[380px] w-[380px] bg-black/20" />
      </div>
      <div className="relative mx-auto max-w-[1240px]">
        <Reveal>
          <div className="rounded-[2rem] border border-white/25 bg-white/10 px-6 py-12 backdrop-blur-sm md:px-12 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <SectionBadge num="08" label="Our 90-Day Guarantee" dark />
                <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
                  We Take The Risk.{" "}
                  <span className="text-black">Not You.</span>
                </h2>
              </div>

              <div className="space-y-4">
                {guaranteePoints.map((item, i) => (
                  <div
                    key={item}
                    className="group flex items-start gap-4 rounded-2xl border border-white/25 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 md:p-6"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-lg font-medium text-white transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm font-medium leading-relaxed text-white md:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="mt-10 flex justify-center">
          <CTAButton href={BOOKING_PATH} label="Book Your Free Strategy Call" color="black" size="lg" />
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
        <InteractiveImageAccordion />
        <BenefitsSection />
        <OwnershipSection />
        <TestimonialsSection />
        <TrainingVideos />
        <GuaranteeSection />
        <FaqSection />
        <StatsBand />
      </main>
      <Footer />
    </div>
  );
}
