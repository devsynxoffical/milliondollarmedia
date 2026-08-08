"use client";

import {
  BarChart3,
  Palette,
  FileText,
  Funnel,
  Megaphone,
  Target,
  Database,
  Bot,
  Mail,
  MessageSquare,
  CalendarCheck2,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const BENEFITS_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4";

/* ── Left card services (Full-Funnel Roofing Ads) ── */
const adServices: { icon: LucideIcon; label: string }[] = [
  { icon: Target, label: "Offer Positioning" },
  { icon: Megaphone, label: "Messaging Strategy" },
  { icon: BarChart3, label: "Meta Ads" },
  { icon: Palette, label: "Ad Creatives" },
  { icon: FileText, label: "Landing Pages" },
  { icon: Funnel, label: "Sales Funnel" },
  { icon: TrendingUp, label: "Ongoing Optimisation" },
];

/* ── Right card services (Done-For-You Lead Management) ── */
const leadServices: { icon: LucideIcon; label: string }[] = [
  { icon: Database, label: "CRM Setup" },
  { icon: Bot, label: "AI Automations" },
  { icon: Mail, label: "Email Sequences" },
  { icon: MessageSquare, label: "SMS Follow-Up" },
  { icon: CalendarCheck2, label: "Appointment Reminders" },
  { icon: ShieldCheck, label: "Lead Qualification" },
];

function ServicePill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="group/pill flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-[#ed1c24]/40 hover:bg-[#ed1c24]/10 hover:shadow-[0_0_20px_-6px_rgba(237,28,36,0.3)]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#ed1c24]/15 text-[#ed1c24] transition-transform duration-300 group-hover/pill:scale-110">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="text-[12px] font-semibold tracking-wide text-white/80 transition-colors group-hover/pill:text-white">
        {label}
      </span>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="font-futura relative w-full bg-black px-4 py-12 sm:px-6 sm:py-20 md:px-10"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <h2
          className="mb-12 text-center text-3xl font-light text-white sm:mb-24 sm:text-4xl md:text-5xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          The Roofing Advantage
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {/* Card 1 — Full-Funnel Roofing Ads */}
          <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:p-8">
            <div className="absolute -left-[420px] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-[#b91c1c] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-light leading-tight text-white sm:text-2xl">
                Full-Funnel
                <br />
                Roofing Ads
              </h3>
              <p className="mt-4 max-w-[320px] text-[13px] font-light leading-relaxed text-white/60 sm:text-[14px]">
                Your ads run on proven, roofing-specific offer positioning and
                creatives that attract premium homeowners — not price shoppers.
              </p>

              {/* Service boxes */}
              <div className="mt-6 flex flex-wrap gap-2">
                {adServices.map((svc) => (
                  <ServicePill key={svc.label} icon={svc.icon} label={svc.label} />
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 — Video (center) */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl bg-neutral-950">
            <div className="relative w-full overflow-hidden" style={{ height: "75%" }}>
              <video
                className="block h-full w-full object-cover"
                src={BENEFITS_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
            </div>
            <div className="flex flex-1 items-center justify-start p-6 sm:p-8">
              <h3 className="text-left text-xl font-light leading-tight text-white sm:text-2xl">
                Proven Creative
                <br />
                & Campaigns
              </h3>
            </div>
          </div>

          {/* Card 3 — Done-For-You Lead Management */}
          <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:p-8">
            <div className="absolute -right-28 -top-28 h-56 w-56 rounded-full bg-[#b91c1c] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-light leading-tight text-white sm:text-2xl">
                Done-For-You
                <br />
                Lead Management
              </h3>
              <p className="mt-4 max-w-[320px] text-[13px] font-light leading-relaxed text-white/60 sm:text-[14px]">
                Every roofing lead lands in your CRM with email, SMS, and AI
                follow-up running automatically — then gets qualified before it
                ever reaches your sales team.
              </p>

              {/* Service boxes */}
              <div className="mt-6 flex flex-wrap gap-2">
                {leadServices.map((svc) => (
                  <ServicePill key={svc.label} icon={svc.icon} label={svc.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
