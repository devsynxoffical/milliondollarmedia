import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const owned = [
  "Landing Pages",
  "Sales Funnel",
  "CRM",
  "Automations",
  "Ad Creatives",
  "Copy",
  "Follow-Up Sequences",
  "Customer Data",
];

const industries = [
  "Digital Marketing Agencies",
  "Business Coaches",
  "Consultants",
  "High-Ticket Service Providers",
  "B2B Companies",
  "Home Service Businesses",
  "Roofing Companies",
  "HVAC Companies",
  "Solar Companies",
  "Personal Injury Law Firms",
  "Medical Malpractice Attorneys",
  "Healthcare Practices",
  "Med Spas & Aesthetic Clinics",
  "Chiropractors",
  "Real Estate Companies",
  "Mortgage Brokers",
  "Insurance Agencies",
  "Fitness Brands & Gyms",
  "E-Commerce Brands",
  "Construction Companies",
  "Garage Door Companies",
  "Kitchen & Bathroom Remodeling",
  "Painting Companies",
  "Window & Door Companies",
  "Landscaping Businesses",
  "Pressure Washing Companies",
  "Car Detailing Businesses",
  "Pest Control Companies",
  "Plumbing Companies",
  "Electrical Companies",
  "Carpet Cleaning Companies",
  "Air Duct Cleaning Companies",
];

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Ownership() {
  return (
    <section id="ownership" className="section-shell bg-[var(--band-2)]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="eyebrow-bright">No lock-ins · No hidden ownership</p>
          <h2 className="display mx-auto mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            Unlike Most Agencies...
            <br />
            <span className="text-[var(--accent-bright)]">You Own Everything.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60">
            When we build your Client Acquisition System, it becomes your
            business asset.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-[var(--band)] px-6 py-12 text-white shadow-[0_24px_60px_-24px_rgba(16,24,40,0.4)] md:px-12 md:py-16">
            <div className="studio-grid absolute inset-0 opacity-60" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 70% at 85% 15%, rgba(237,28,36,0.25), transparent 55%), radial-gradient(ellipse 45% 60% at 10% 90%, rgba(255,255,255,0.08), transparent 55%)",
              }}
            />
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <h3 className="display text-2xl leading-snug md:text-3xl">
                  You own every single
                  <br />
                  <span className="text-[var(--accent-bright)]">
                    asset we build.
                  </span>
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                  No lock-ins. No hidden ownership. No dependence on another
                  agency.
                </p>
                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent mt-8 min-w-[260px] px-8 py-4 text-base"
                >
                  Book Your Free Strategy Call
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {owned.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.07] px-5 py-4 backdrop-blur-sm transition hover:bg-white/[0.12]"
                  >
                    <CheckIcon />
                    <span className="text-sm font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-14">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-bright)]">
              Industries We&apos;ve Worked With
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {industries.map((item) => (
                <span
                  key={item}
                  className="chip border border-white/12 bg-white/[0.05] text-white/70 transition hover:border-[var(--accent)]/50 hover:bg-[var(--accent-soft)] hover:text-[var(--accent-bright)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
