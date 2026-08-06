import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Problem } from "../components/Problem";
import { Solution } from "../components/Solution";
import { StatsBand } from "../components/StatsBand";
import { TrainingVideos } from "../components/TrainingVideos";
import { BookingForm } from "../components/BookingForm";
import { Footer } from "../components/Footer";
import { VideoPlayer } from "../components/VideoPlayer";
import { BOOKING_PATH } from "../lib/offer";
import { MASTERCLASS_COVER, MASTERCLASS_VIDEO } from "../lib/video";
import Link from "next/link";
import { Reveal } from "../components/Reveal";

// Roofing Specialties — GetJobber "Proud Partner" grid
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

// CTA section steps
const systemSteps = [
  { num: "01", label: "Offer Positioning", sub: "Stand out from local competitors" },
  { num: "02", label: "Meta Ads", sub: "Targeted homeowner campaigns" },
  { num: "03", label: "CRM & AI Follow-Up", sub: "60-sec speed-to-lead automation" },
  { num: "04", label: "Qualified Bookings", sub: "Only ready-to-buy homeowners" },
];

// Results metrics — anchors to header "Results" (#proof)
const proofMetrics = [
  { tag: "Call Volume", metric: "300–500", label: "Qualified sales calls booked every month" },
  { tag: "Roofing Scale", metric: "635", label: "Roofing leads generated in 45 days" },
  { tag: "Recurring Offer", metric: "$86K", label: "Client revenue from just $29K spend" },
  { tag: "CPL Drop", metric: "-50%", label: "Drop in cost per lead after relaunch" },
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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {specialties.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-bold text-white transition hover:border-[var(--accent)] hover:bg-zinc-800"
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemStepsSection() {
  return (
    <section id="system" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            Your complete roofing client acquisition system, installed in 30 days
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systemSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 text-center transition hover:border-zinc-200 hover:bg-white hover:shadow-sm">
                <span className="text-4xl font-extrabold text-[var(--accent)]">{step.num}</span>
                <h3 className="mt-4 text-base font-extrabold text-zinc-950">{step.label}</h3>
                <p className="mt-1 text-sm text-zinc-400">{step.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <Link href={BOOKING_PATH} className="btn btn-accent px-8 py-4 text-sm font-bold shadow-md inline-flex">
            Install The System →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="proof" className="section-shell bg-[#09090b] text-white border-b border-zinc-800">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3 mx-auto">
            <span className="dot-red" />
            <span>PROVEN RESULTS</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            A proven system with a{" "}
            <span className="text-[var(--accent)]">massive track record</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Not a one-off win. This is a client acquisition machine that repeats
            results across industries — built and optimized for roofing.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map((item, i) => (
            <Reveal key={item.tag} delay={i * 80}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center transition hover:border-[var(--accent)] hover:bg-zinc-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {item.tag}
                </p>
                <p className="display mt-4 text-4xl font-extrabold text-white">
                  {item.metric}
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

function CtaSection() {
  return (
    <section className="section-shell bg-[var(--accent)] text-white">
      <div className="mx-auto max-w-[1240px] text-center">
        <h2 className="display text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-4xl mx-auto">
          Ready to build a predictable roofing client acquisition system?
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
          Install Roofing Systems™ — a complete done-for-you acquisition engine that consistently attracts, qualifies, and books high-value roof replacement opportunities.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={BOOKING_PATH} className="btn bg-white text-[var(--accent)] font-bold px-8 py-4 text-sm hover:bg-zinc-100 shadow-md">
            Book Your Free Strategy Call →
          </Link>
          <Link href="#system" className="btn btn-outline-dark px-7 py-4 text-sm font-semibold">
            See How It Works
          </Link>
        </div>
        <p className="mt-4 text-sm text-white/60 font-medium">
          For roofing companies doing $1M+/year only.
        </p>
      </div>
    </section>
  );
}

function MasterclassSection() {
  return (
    <section className="bg-[#09090b] text-white border-b border-zinc-800">
      <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-24">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3 mx-auto">
            <span className="dot-red" />
            <span>SYSTEMS BREAKDOWN</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Watch the{" "}
            <span className="text-[var(--accent)]">full breakdown</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            See exactly how we install the acquisition system — offer
            positioning, Meta Ads, funnel, CRM and AI follow-up — so you can
            run a stronger roofing business.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-xl">
            <VideoPlayer
              src={MASTERCLASS_VIDEO}
              cover={MASTERCLASS_COVER}
              title="Systems breakdown"
              autoPlay
            />
          </div>
        </Reveal>

        <Reveal delay={180} className="mt-10 text-center">
          <Link href={BOOKING_PATH} className="btn btn-accent px-8 py-4 text-sm font-bold shadow-md inline-flex">
            Install The System →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section id="book" className="section-shell bg-zinc-50 border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="pill-badge-red mb-3">
              <span className="dot-red" />
              <span>APPLY NOW</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Book your free strategy call
            </h2>
            <p className="mt-4 text-base text-zinc-500 leading-relaxed">
              We&apos;ll review your current marketing setup, identify your biggest revenue bottlenecks, and show you exactly how our system can double your roofing revenue in 90 days.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "90-Minute Deep-Dive Strategy Session",
                "Custom Roofing Market Analysis",
                "Live Competitor & Ad Audit",
                "90-Day Revenue Doubling Roadmap",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
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
        <StatsBand />
        <Problem />
        <Solution />
        <SpecialtiesSection />
        <SystemStepsSection />
        <TrainingVideos />
        <ResultsSection />
        <CtaSection />
        <MasterclassSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
