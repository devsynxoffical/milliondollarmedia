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

// CTA section steps
const systemSteps = [
  { title: "Market Research & Homeowner Analysis", text: "We identify exactly which homeowners are most likely to invest in a roof replacement and what motivates them to buy." },
  { title: "Roofing Offer Positioning", text: "We position your roofing company so homeowners choose you over competing contractors." },
  { title: "Roofing Messaging & Creative Development", text: "We create roofing-specific ads, messaging, and creatives that attract premium homeowners, not price shoppers." },
  { title: "Landing Pages & Sales Funnel", text: "We build high-converting landing pages and sales funnels that turn roofing traffic into booked inspections and estimates." },
  { title: "Meta Ads Management", text: "We launch, manage, and optimize your roofing campaigns daily." },
  { title: "CRM & AI Automations", text: "Every roofing lead automatically enters your CRM with email, SMS, reminders, and automated follow-up." },
  { title: "Lead Qualification", text: "Our proprietary multi-validation process filters every roofing lead before it reaches your sales team, improving booking rates, show rates, and close rates." },
  { title: "Close More Roof Replacement Projects", text: "Your team simply runs the appointments, performs inspections, and closes profitable roofing projects while Roofing Systems™ works in the background." },
];

// Everything included grid
const includedItems = [
  "Roofing Offer Positioning",
  "Roofing Messaging Strategy",
  "Meta Ads",
  "Roofing Ad Creatives",
  "Landing Pages",
  "Complete Roofing Sales Funnel",
  "CRM Setup",
  "AI Automations",
  "Email Sequences",
  "SMS Follow-Up",
  "Appointment Reminders",
  "Roofing Lead Qualification System",
  "Calendar Booking System",
  "Ongoing Campaign Optimisation",
];

// You own everything grid
const ownedItems = [
  "Landing Pages",
  "Sales Funnel",
  "CRM",
  "Automations",
  "Roofing Ad Creatives",
  "Copy",
  "Follow-Up Sequences",
  "Customer Data",
];

// Why choose us comparison
const traditionalItems = [
  "Runs Ads",
  "Delivers Leads",
  "Limited Follow-Up",
  "No CRM",
  "No Automation",
  "No Ownership",
  "No Guarantee",
];

const systemItems = [
  "Complete Roofing Client Acquisition System",
  "Premium Homeowner Acquisition",
  "AI Follow-Up",
  "CRM Included",
  "Full Automation",
  "You Own Everything",
  "90-Day Written Guarantee",
];

// 90-day guarantee points
const guaranteePoints = [
  "If we don't help you achieve the mutually agreed growth milestones within the first 90 days after implementing your Roofing Systems™ Client Acquisition System...",
  "We'll continue working for you at no management fee until we do.",
  "Everything is backed by a written agreement.",
];

// Results metrics, anchors to header "Results" (#proof)
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
            <span>SECTION 5, THE 8-STEP SYSTEM</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            Our 8-Step Roofing{" "}
            <span className="text-[var(--accent)]">Client Acquisition System</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 leading-relaxed">
            Everything stays the same except for roofing terminology.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {systemSteps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 2) * 100}>
              <div className="flex h-full gap-5 rounded-2xl border border-zinc-100 bg-zinc-50 p-7 transition hover:border-zinc-200 hover:bg-white hover:shadow-sm">
                <div className="flex flex-col items-center gap-2">
                  <span className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-xl font-extrabold text-white shadow-md">
                    {i + 1}
                  </span>
                  {i < systemSteps.length - 1 && (
                    <span className="h-full w-px bg-zinc-200" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-zinc-950 leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {step.text}
                  </p>
                </div>
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

function IncludedSection() {
  return (
    <section id="included" className="section-shell bg-zinc-100 border-b border-zinc-200/80">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>EVERYTHING INCLUDED</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            Everything You Need.{" "}
            <span className="text-[var(--accent)]">Nothing Extra To Pay For.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 leading-relaxed">
            The complete roofing client acquisition system, installed, managed,
            and optimized for you.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {includedItems.map((item, i) => (
            <Reveal key={item} delay={(i % 4) * 70}>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 transition hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
                  ✓
                </span>
                <span className="text-sm font-semibold text-zinc-800">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OwnershipSection() {
  return (
    <section id="ownership" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>EVERYTHING BELONGS TO YOU</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            You Own{" "}
            <span className="text-[var(--accent)]">Everything We Build.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 leading-relaxed">
            Unlike most roofing marketing agencies... you own everything. When
            we build your Roofing Systems™, it becomes a permanent business
            asset.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 rounded-[1.75rem] bg-[#09090b] px-6 py-12 text-white md:px-12 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <h3 className="display text-2xl md:text-3xl font-extrabold tracking-tight">
                  You own every single{" "}
                  <span className="text-[var(--accent)]">asset we build.</span>
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                  No lock-ins. No hidden ownership. No dependence on another
                  marketing agency.
                </p>
                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent mt-8 px-7 py-3.5 text-sm font-bold shadow-md inline-flex"
                >
                  Book Your Free Strategy Call →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {ownedItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
                      ✓
                    </span>
                    <span className="text-sm font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="comparison" className="section-shell bg-zinc-100 border-b border-zinc-200/80">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>WHY ROOFING COMPANIES CHOOSE US</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            Traditional Agencies Generate Leads.
            <br />
            <span className="text-[var(--accent)]">
              Roofing Systems™ Builds Predictable Growth.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-[1.75rem] border border-zinc-200 bg-white p-8">
              <h3 className="display text-2xl font-extrabold text-zinc-950">
                Traditional Agency
              </h3>
              <p className="mt-1 text-sm text-zinc-500">Generate leads, then stop.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {traditionalItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-500"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
                      aria-hidden
                    >
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={150}>
            <article className="relative flex h-full flex-col rounded-[1.75rem] bg-[#09090b] p-8 text-white shadow-lg md:-translate-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="display text-2xl font-extrabold">Roofing Systems™</h3>
                <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Featured
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                Builds predictable growth, end to end.
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {systemItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={BOOKING_PATH}
                className="btn btn-accent mt-6 w-full px-7 py-3.5 text-sm font-bold shadow-md text-center"
              >
                Get This Running →
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section id="guarantee" className="section-shell bg-[#09090b] text-white border-b border-zinc-800">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 px-6 py-12 md:px-12 md:py-16">
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
                    className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-[#09090b] p-5 md:p-6"
                  >
                    <span className="display flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-extrabold text-white">
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
            results across industries, built and optimized for roofing.
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
          Book Your Free Strategy Call. Get Your Client Acquisition System. Stop overpaying for marketing.           Start building a roofing business that prints money.
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-base text-white/80 leading-relaxed">
          Install Roofing Systems™, a complete done-for-you acquisition engine that consistently attracts, qualifies, and books high-value roof replacement opportunities.
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
            See exactly how we install the acquisition system, offer
            positioning, Meta Ads, funnel, CRM and AI follow-up, so you can
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
        <SystemStepsSection />
        <IncludedSection />
        <OwnershipSection />
        <ComparisonSection />
        <GuaranteeSection />
        <SpecialtiesSection />
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
