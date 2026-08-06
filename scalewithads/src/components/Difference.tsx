import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";

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
      className="section-shell border-b border-zinc-200/80 bg-zinc-100"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>WHAT MAKES SCALE WITH ADS™ DIFFERENT</span>
          </div>
          <h2 className="display text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            We Don&apos;t Just Generate Leads...
            <br />
            <span className="text-[var(--accent)]">
              We Build A Complete Client Acquisition Ecosystem.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">
            Unlike traditional marketing agencies, we handle every step of your
            customer journey.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="display text-4xl font-extrabold text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-zinc-950">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base font-semibold leading-relaxed text-zinc-800 md:text-lg">
            Everything works together inside one proven system.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm md:p-10">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Our core advantages
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {advantages.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold text-zinc-800"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-[var(--accent)]">
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
