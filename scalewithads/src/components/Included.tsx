import { Reveal } from "./Reveal";

const included = [
  "Offer Positioning",
  "Messaging Strategy",
  "Meta Ads",
  "Ad Creatives",
  "Landing Pages",
  "Complete Sales Funnel",
  "CRM Setup",
  "AI Automations",
  "Email Sequences",
  "SMS Follow-Up",
  "Appointment Reminders",
  "Lead Qualification System",
  "Calendar Booking System",
  "Ongoing Campaign Optimisation",
];

export function Included() {
  return (
    <section id="included" className="section-shell bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="eyebrow-bright">Everything included</p>
          <h2 className="display mx-auto mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            Here&apos;s Everything
            <br />
            <span className="text-[var(--accent-bright)]">We Build For You</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
            The complete client acquisition system—installed, managed, and
            optimised for you.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:bg-white/[0.07] hover:shadow-[0_12px_32px_-12px_rgba(237,28,36,0.35)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-white/85">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
