"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { BOOKING_PATH } from "../lib/offer";
import { Footer } from "../components/Footer";
import { VideoPlayer } from "../components/VideoPlayer";

const HALO_FONT = "'TT Norms Pro', var(--font-body), ui-sans-serif, system-ui, sans-serif";

function PillButton({
  children,
  className = "",
  arrow = false,
  href,
  variant = "red",
}: {
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  href?: string;
  variant?: "red" | "white";
}) {
  const base =
    variant === "white"
      ? "inline-flex items-center gap-3 bg-white text-[#ED1C24] font-medium rounded-full hover:bg-white/90 transition-colors duration-200"
      : "inline-flex items-center gap-3 bg-[#ED1C24] text-white font-medium rounded-full hover:bg-[#C4181E] transition-colors duration-200";
  const cls = `${base} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={`rounded-full p-2 ${
            variant === "white" ? "bg-[#ED1C24]" : "bg-white"
          }`}
        >
          <ArrowRight
            className={`w-5 h-5 ${variant === "white" ? "text-white" : "text-black"}`}
          />
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls}>
      {inner}
    </button>
  );
}

function SectionHeader({
  eyebrow,
  title,
  highlight,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  highlight?: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-black/60 text-sm mb-2">{eyebrow}</p>
      <h2
        className="text-black text-4xl md:text-5xl font-medium leading-tight"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
        {highlight && (
          <>
            <br />
            <span className="text-[#ED1C24]">{highlight}</span>
          </>
        )}
      </h2>
      {sub && <p className="mt-5 text-black/60 text-base md:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

const HERO_MARQUEE = [
  "Roofing client acquisition system",
  "Only for $1M+ roofers",
  "Double your roofing revenue in 90 days",
  "Backed by a written agreement",
  "Offer · Meta Ads · Creatives · Landing Pages · CRM · AI Follow-up",
  "You own everything",
];

const TRUST = [
  "$50M+ in Meta Ads",
  "12+ Years Experience",
  "90-Day Written Guarantee",
  "100% Done-For-You",
];

function HeroSection() {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <div className="flex-1 px-6 pt-20 pb-6 flex items-end">
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ height: "calc(100vh - 96px)" }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-medium text-black/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ED1C24]" />
              Only for roofing companies doing $1M+ / year
            </p>
            <h1
              className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
              style={{ letterSpacing: "-0.04em" }}
            >
              Double your roofing
              <br />
              <span className="text-[#ED1C24]">revenue</span> in 90 days.
              <br />
              Or we work free.
            </h1>
            <p
              className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
              style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
            >
              We install our complete client acquisition system into your roofing company — offer,
              ads, funnel, CRM, AI follow-up, and qualification. You just run the appointments and
              close.
            </p>
            <PillButton className="pl-8 pr-2 py-2 text-base md:text-lg" arrow href={BOOKING_PATH}>
              Book Your Free Strategy Call
            </PillButton>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {TRUST.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-black/60"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ED1C24] text-[9px] font-bold text-white">
                    ✓
                  </span>
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-12 w-full max-w-md overflow-hidden">
              <div className="halo-marquee-track">
                {[...HERO_MARQUEE, ...HERO_MARQUEE].map((phrase, i) => (
                  <span
                    key={`${phrase}-${i}`}
                    className="mx-7 shrink-0 text-black/60 whitespace-nowrap"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PROBLEM_PLAYERS = [
  { label: "Most marketing agencies", note: "only run ads" },
  { label: "Some", note: "build landing pages" },
  { label: "Others", note: "generate leads" },
  { label: "Someone else", note: "handles follow-up" },
];

function ProblemSection() {
  return (
    <section id="problem" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <SectionHeader
          eyebrow="The real problem"
          title="Most roofing companies don't have a lead problem."
          highlight="They have a client acquisition system problem."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROBLEM_PLAYERS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-7 flex flex-col items-center text-center "
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F5] text-[#ED1C24]">
                <X className="w-5 h-5" />
              </span>
              <p className="mt-4 text-base font-medium text-black">{item.label}</p>
              <p className="text-sm text-black/60">{item.note}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-black/60 text-base leading-relaxed md:text-lg">
            Nobody owns the entire customer journey. That&apos;s exactly why roofing companies
            struggle to scale consistently.
          </p>
          <p className="mt-5 text-black text-base font-medium leading-relaxed md:text-lg">
            At Roofing Systems™, we build one complete client acquisition ecosystem where every
            part works together—from the first click to a qualified homeowner sitting on your sales
            calendar.
          </p>
        </div>
      </div>
    </section>
  );
}

const JOURNEY = [
  { title: "Attracting", text: "qualified homeowners" },
  { title: "Qualifying", text: "every opportunity" },
  { title: "Nurturing", text: "every prospect" },
  { title: "Booking", text: "high-intent homeowners onto your sales calendar" },
];

const ADVANTAGES = [
  "Complete Done-For-You Roofing Client Acquisition System",
  "Premium Homeowner Qualification & Multi-Validation Process",
  "CRM + AI Follow-Up Automations Included",
  "Everything We Build Becomes Your Business Asset",
  "Revenue-Focused Growth Strategy—Not Just More Roofing Leads",
];

function SolutionSection() {
  return (
    <section id="solution" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <SectionHeader
          center
          eyebrow="What we actually do"
          title="We don't just generate roofing leads."
          highlight="We build a complete roofing client acquisition system."
          sub="Unlike traditional marketing agencies, we manage every step of your customer acquisition journey."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {JOURNEY.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-7 flex flex-col "
            >
              <span className="text-3xl font-medium text-[#ED1C24]" style={{ letterSpacing: "-0.02em" }}>
                0{i + 1}
              </span>
              <h3 className="mt-4 text-lg font-medium text-black">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-black/60">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-2xl text-center text-black text-base font-medium leading-relaxed md:text-lg">
          Everything works together inside one proven system designed specifically for roofing
          companies.
        </p>
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-[#C4181E] p-8 md:p-10">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white/60">
            Our core advantages
          </p>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2">
            {ADVANTAGES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-medium text-white/90">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#C4181E]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 text-center">
          <PillButton className="pl-8 pr-2 py-2 text-base" arrow href={BOOKING_PATH}>
            Book Your Free Strategy Call
          </PillButton>
          <p className="mt-4 text-sm text-black/60">No management fee until we deliver</p>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: "Market Research & Homeowner Analysis",
    text: "We identify exactly which homeowners are most likely to invest in a roof replacement and what motivates them to buy.",
  },
  {
    title: "Roofing Offer Positioning",
    text: "We position your roofing company so homeowners choose you over competing contractors.",
  },
  {
    title: "Roofing Messaging & Creative Development",
    text: "We create roofing-specific ads, messaging, and creatives that attract premium homeowners—not price shoppers.",
  },
  {
    title: "Landing Pages & Sales Funnel",
    text: "We build high-converting landing pages and sales funnels that turn roofing traffic into booked inspections and estimates.",
  },
  {
    title: "Meta Ads Management",
    text: "We launch, manage, and optimize your roofing campaigns daily.",
  },
  {
    title: "CRM & AI Automations",
    text: "Every roofing lead automatically enters your CRM with email, SMS, reminders, and automated follow-up.",
  },
  {
    title: "Lead Qualification",
    text: "Our proprietary multi-validation process filters every roofing lead before it reaches your sales team, improving booking rates, show rates, and close rates.",
  },
  {
    title: "Close More Roof Replacement Projects",
    text: "Your team simply runs the appointments, performs inspections, and closes profitable roofing projects while Roofing Systems™ works in the background.",
  },
];

function StepsSection() {
  return (
    <section id="system" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <SectionHeader
          center
          eyebrow="How it works"
          title="Our 8-Step Roofing"
          highlight="Client Acquisition System"
          sub="Everything stays the same except for roofing terminology."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-5 rounded-2xl bg-white p-7 "
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ED1C24] text-2xl text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-medium leading-snug text-black md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <PillButton className="pl-8 pr-2 py-2 text-base" arrow href={BOOKING_PATH}>
            Install The System
          </PillButton>
        </div>
      </div>
    </section>
  );
}

const INCLUDED = [
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

function IncludedSection() {
  return (
    <section id="included" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <SectionHeader
          center
          eyebrow="Everything included"
          title="Everything you need."
          highlight="Nothing extra to pay for."
          sub="The complete roofing client acquisition system—installed, managed, and optimized for you."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {INCLUDED.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 "
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ED1C24] text-[11px] font-bold text-white">
                ✓
              </span>
              <span className="text-sm font-medium text-black">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const OWNED = [
  "Landing Pages",
  "Sales Funnel",
  "CRM",
  "Automations",
  "Roofing Ad Creatives",
  "Copy",
  "Follow-Up Sequences",
  "Customer Data",
];

function OwnershipSection() {
  return (
    <section id="ownership" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <SectionHeader
          eyebrow="No lock-ins · No hidden ownership"
          title="Everything"
          highlight="Belongs to you"
          sub="Unlike most roofing marketing agencies... you own everything. When we build your Roofing Systems™, it becomes a permanent business asset."
        />
        <div className="mt-14 grid items-center gap-10 rounded-3xl bg-[#C4181E] p-8 md:p-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h3 className="text-2xl md:text-3xl font-medium leading-snug text-white">
              You own every single
              <br />
              <span className="text-[#ff7b81]">asset we build.</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              No lock-ins. No hidden ownership. No dependence on another marketing agency.
            </p>
            <div className="mt-8">
              <PillButton className="pl-8 pr-2 py-2 text-base" arrow href={BOOKING_PATH}>
                Book Your Free Strategy Call
              </PillButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {OWNED.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#C4181E]">
                  ✓
                </span>
                <span className="text-sm font-medium text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TRADITIONAL = [
  "Runs Ads",
  "Delivers Leads",
  "Limited Follow-Up",
  "No CRM",
  "No Automation",
  "No Ownership",
  "No Guarantee",
];

const SYSTEM = [
  "Complete Roofing Client Acquisition System",
  "Premium Homeowner Acquisition",
  "AI Follow-Up",
  "CRM Included",
  "Full Automation",
  "You Own Everything",
  "90-Day Written Guarantee",
];

function ComparisonSection() {
  return (
    <section id="comparison" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <SectionHeader
          center
          eyebrow="Why roofing companies choose us"
          title="Traditional roofing marketing agencies generate leads."
          highlight="Roofing Systems™ builds predictable growth."
        />
        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
          <article className="flex h-full flex-col rounded-3xl bg-white p-8 md:p-10">
            <h3 className="text-2xl font-medium text-black" style={{ letterSpacing: "-0.02em" }}>
              Traditional Agency
            </h3>
            <p className="mt-1 text-sm text-black/60">Generate leads—then stop.</p>
            <ul className="mt-6 flex-1 space-y-3">
              {TRADITIONAL.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-[#F5F5F5] px-4 py-3 text-sm font-medium text-black/50"
                >
                  <X className="w-4 h-4 shrink-0 text-black/30" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="relative flex h-full flex-col rounded-3xl bg-[#ED1C24] p-8 md:p-10 text-white shadow-[0_24px_60px_rgba(237,28,36,0.25)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-medium" style={{ letterSpacing: "-0.02em" }}>
                Roofing Systems™
              </h3>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ED1C24]">
                Featured
              </span>
            </div>
            <p className="mt-1 text-sm text-white/80">Builds predictable growth—end to end.</p>
            <ul className="mt-6 flex-1 space-y-3">
              {SYSTEM.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#ED1C24]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PillButton className="pl-8 pr-2 py-2 text-base" variant="white" arrow>
                Get This Running
              </PillButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const GUARANTEE_POINTS = [
  "If we don't help you achieve the mutually agreed growth milestones within the first 90 days after implementing your Roofing Systems™ Client Acquisition System...",
  "We'll continue working for you at no management fee until we do.",
  "Everything is backed by a written agreement.",
];

function GuaranteeSection() {
  return (
    <section id="guarantee" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid items-center gap-10 rounded-3xl bg-[#C4181E] p-8 md:p-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-[#ff7b81]">
              <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden>
                <path
                  d="M12 2c4 1.5 6.5 5 6.5 9.5 1.5 1.8 2.5 4 2.5 6.5l-4-1c-1.2 1.6-3 2.8-5 3-2-.2-3.8-1.4-5-3l-4 1c0-2.5 1-4.7 2.5-6.5C5.5 7 8 3.5 12 2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Our 90-day guarantee
            </p>
            <h2
              className="mt-3 text-4xl md:text-5xl font-medium leading-tight text-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              We take the risk...
              <br />
              <span className="text-[#ff7b81]">Not you.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {GUARANTEE_POINTS.map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-sm md:p-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-medium text-[#C4181E]">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-white/85 md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <PillButton className="pl-8 pr-2 py-2 text-base" arrow href={BOOKING_PATH}>
            Book Your Free Strategy Call
          </PillButton>
        </div>
      </div>
    </section>
  );
}

const PAINS = [
  "Stop guessing.",
  "Stop relying on referrals.",
  "Stop switching marketing agencies.",
];

function FinalCtaSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="relative mx-auto max-w-7xl rounded-3xl bg-[#C4181E] px-6 py-14 text-white md:px-12 md:py-16">
          <h2
            className="text-center text-4xl md:text-5xl font-medium leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Ready to build a predictable roofing
            <br />
            <span className="text-[#ff7b81]">client acquisition system?</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {PAINS.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white/85 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-white/75">
            Install Roofing Systems™—a complete roofing client acquisition system that consistently
            attracts, qualifies, nurtures, and books high-value roof replacement opportunities, so
            your team can focus on running appointments, closing profitable projects, and scaling
            your roofing company.
          </p>
          <div className="mt-10 flex justify-center">
            <PillButton
              className="pl-8 pr-2 py-2 text-base"
              variant="white"
              arrow
              href={BOOKING_PATH}
            >
              Book Your Free Strategy Call
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const VIDEOS = [
  {
    id: "DVjcGrUEr1Y",
    src: "/media/training/DVjcGrUEr1Y.mp4",
    cover: "/media/training/DVjcGrUEr1Y-poster.jpg",
    index: "01",
    tag: "Lowest-Cost Leads",
    title: "50% Drop In Cost Per Lead",
    quote: "Roofing agency client? 50% drop in his cost per lead.",
    body: "How we generate high-quality roofing leads at the lowest possible cost — and what changed in the account to get there.",
  },
  {
    id: "DQXUnRNkjR3",
    src: "/media/training/DQXUnRNkjR3.mp4",
    cover: "/media/training/DQXUnRNkjR3-poster.jpg",
    index: "02",
    tag: "System Strategy",
    title: "Why Most Programs Fail",
    quote: "I've spent over $10,000+ on different programs.",
    body: "The strategic thinking behind our client acquisition system — and why the way roofing companies buy marketing is usually the problem.",
  },
  {
    id: "DPHgI7fEuIA",
    src: "/media/training/DPHgI7fEuIA.mp4",
    cover: "/media/training/DPHgI7fEuIA-poster.jpg",
    index: "03",
    tag: "Realistic Results",
    title: "Inside A Live Roofing Team Training",
    quote: "2-hour roofing team training — behind the scenes.",
    body: "What results you can realistically expect once we launch and optimize your campaigns — straight from a live training session with a roofing team.",
  },
];

function TrainingVideosSection() {
  return (
    <section id="training" className="bg-[#F5F5F5] px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <SectionHeader
          center
          eyebrow="Training library"
          title="Watch how we"
          highlight="scale roofing companies"
          sub="Three short training clips that show exactly how Roofing Systems™ works — before you ever get on a strategy call."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video) => (
            <article
              key={video.id}
              className="flex h-full flex-col rounded-3xl bg-white p-4  md:p-5"
            >
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl bg-black">
                  <VideoPlayer
                    src={video.src}
                    cover={video.cover}
                    title={video.title}
                    aspect="aspect-square"
                  />
                </div>
                <span className="absolute left-5 top-5 rounded-full bg-[#ED1C24] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Video {video.index}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#ED1C24]">
                  {video.tag}
                </p>
                <h3 className="text-xl font-medium leading-snug text-black md:text-2xl">
                  {video.title}
                </h3>
                <p className="text-sm italic leading-relaxed text-black/60">“{video.quote}”</p>
                <p className="text-sm leading-relaxed text-black/60">{video.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-base leading-relaxed text-black/60">
            Seen enough? Book a free strategy call and we&apos;ll walk you through what this looks
            like for your roofing company.
          </p>
          <PillButton className="mt-8 pl-8 pr-2 py-2 text-base" arrow href={BOOKING_PATH}>
            Book Your Free Strategy Call
          </PillButton>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col bg-[#F5F5F5]" style={{ fontFamily: HALO_FONT }}>
      <style>{`
        @font-face {
          font-family: "TT Norms Pro";
          src: url("/fonts/tt-norms-pro-regular.woff2") format("woff2");
          font-weight: 400;
          font-display: swap;
        }
        @font-face {
          font-family: "TT Norms Pro";
          src: url("/fonts/tt-norms-pro-semibold.woff2") format("woff2");
          font-weight: 600;
          font-display: swap;
        }
        @keyframes halo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .halo-marquee-track {
          display: flex;
          width: max-content;
          animation: halo-marquee 22s linear infinite;
        }
      `}</style>

      <HeroSection />

      <ProblemSection />
      <SolutionSection />
      <StepsSection />
      <IncludedSection />
      <OwnershipSection />
      <ComparisonSection />
      <GuaranteeSection />
      <FinalCtaSection />
      <TrainingVideosSection />
      <Footer />
    </div>
  );
}
