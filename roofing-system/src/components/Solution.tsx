import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

const journey = [
  {
    title: "Attracting",
    text: "qualified homeowners",
  },
  {
    title: "Qualifying",
    text: "every opportunity",
  },
  {
    title: "Nurturing",
    text: "every prospect",
  },
  {
    title: "Booking",
    text: "high-intent homeowners onto your sales calendar",
  },
];

const advantages = [
  "Complete Done-For-You Roofing Client Acquisition System",
  "Premium Homeowner Qualification & Multi-Validation Process",
  "CRM + AI Follow-Up Automations Included",
  "Everything We Build Becomes Your Business Asset",
  "Revenue-Focused Growth Strategy—Not Just More Roofing Leads",
];

export function Solution() {
  return (
    <section id="solution" className="section-shell relative overflow-hidden bg-[var(--ink-soft)] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 15% 15%, rgba(237,28,36,0.22), transparent 55%), radial-gradient(ellipse 45% 55% at 90% 85%, rgba(255,255,255,0.08), transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="eyebrow">What we actually do</p>
          <h2 className="display mx-auto mt-3 max-w-4xl text-[clamp(2rem,4.5vw,3.4rem)]">
            We Don&apos;t Just Generate Roofing Leads...
            <br />
            <span className="text-[var(--red-bright)]">
              We Build A Complete Roofing Client Acquisition System.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            Unlike traditional marketing agencies, we manage every step of your
            customer acquisition journey.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="relative flex h-full flex-col rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]">
                <span className="display text-3xl text-[var(--red-bright)]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base font-semibold leading-relaxed text-white/90 md:text-lg">
            Everything works together inside one proven system designed
            specifically for roofing companies.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm md:p-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--red-bright)]">
              Our core advantages
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {advantages.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold text-white/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--lime)] text-[10px] font-bold text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={260} className="mt-10 text-center">
          <Link href={BOOKING_PATH} className="cta-btn min-w-[280px]">
            <span className="display text-lg tracking-normal md:text-xl">
              Book Your Free Strategy Call
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
              No management fee until we deliver
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
