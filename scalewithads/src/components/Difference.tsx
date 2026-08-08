import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const journey = [
  { title: "Attracting", text: "the right prospects" },
  { title: "Qualifying", text: "them" },
  { title: "Nurturing", text: "them" },
  { title: "Booking", text: "them onto your calendar" },
];

const advantages = [
  "Complete Done-For-You Client Acquisition System",
  "Premium Lead Qualification & Multi-Validation Process",
  "CRM + AI Follow-Up Automations Included",
  "Everything We Build Becomes Your Business Asset",
  "Revenue-Focused Growth Strategy, Not Just More Leads",
];

export function Difference() {
  return (
    <section
      id="solution"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#09090b] py-16 text-white md:py-24"
    >
      <div className="jobber-grid-dark pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(237,28,36,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="WHAT MAKES SCALE WITH ADS™ DIFFERENT"
          title={
            <>
              We Don&apos;t Just Generate Leads...
              <br className="hidden sm:block" />
              <span className="text-[var(--accent)]">
                We Build A Complete Client Acquisition Ecosystem.
              </span>
            </>
          }
          description="Unlike traditional marketing agencies, we handle every step of your customer journey."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_24px_50px_-20px_rgba(237,28,36,0.35)]">
                <span className="display text-4xl font-extrabold text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base font-semibold leading-relaxed text-zinc-300 md:text-lg">
            Everything works together inside one proven system.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-sm md:p-10">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Our core advantages
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {advantages.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold text-zinc-100"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-extrabold text-white">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={260} className="mt-10 text-center">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent inline-flex min-w-[280px] px-8 py-4 text-sm font-bold shadow-md"
          >
            Book Your Free Strategy Call →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
