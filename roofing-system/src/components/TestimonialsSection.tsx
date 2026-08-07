import { Reveal } from "./Reveal";
import { AuroraBg } from "./AuroraBg";

const testimonials = [
  {
    quote:
      "We went from 8 calls a week to 40+ booked inspections in 60 days. The qualification system is a game changer.",
    name: "Marcus D.",
    company: "Owner, PeakView Roofing",
  },
  {
    quote:
      "First agency that actually owns the funnel for us. Cost per lead dropped 50% within the first month.",
    name: "Sarah K.",
    company: "Co-Founder, Summit Roofing Co.",
  },
  {
    quote:
      "The AI follow-up alone paid for the whole system. No more roof repair leads dying in the inbox.",
    name: "James R.",
    company: "Apex Roofing & Restoration",
  },
  {
    quote:
      "We booked $635K in roofing projects from just $29K in ad spend. The math finally works.",
    name: "Daniel T.",
    company: "Titan Roofing",
  },
  {
    quote:
      "Everything is in writing. They put their money where their mouth is with the 90-day guarantee.",
    name: "Chris M.",
    company: "Legacy Roofing Solutions",
  },
  {
    quote:
      "Their team runs our ads, CRM, and follow-ups. We just run inspections and close roofing jobs.",
    name: "Aaron B.",
    company: "Redline Roofing",
  },
  {
    quote:
      "Premium homeowners, not price shoppers. The lead quality completely changed our sales process.",
    name: "Mike P.",
    company: "Sterling Roofing Group",
  },
  {
      quote:
        "Went from chasing leads to a pipeline that books itself. Hands down the best money we&apos;ve spent.",
    name: "Tony S.",
    company: "Frontier Roofing",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[var(--accent)]" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="glow-card mx-3 flex h-full w-[320px] shrink-0 flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:w-[360px]">
      <Stars />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-zinc-800 pt-4">
        <p className="text-sm font-extrabold text-white">{t.name}</p>
        <p className="mt-0.5 text-xs font-medium text-zinc-500">{t.company}</p>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];
  const third = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#09090b] text-white border-b border-zinc-800 py-20 md:py-28">
      <AuroraBg className="opacity-60" />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3 mx-auto">
            <span className="dot-red" />
            <span>WHAT ROOFERS SAY</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Roofing companies that{" "}
            <span className="text-gradient-animated">trust the system</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Real owners. Real numbers. Here&apos;s what happens when a roofing
            company stops renting leads and starts owning its pipeline.
          </p>
        </Reveal>
      </div>

      {/* Marquee row 1 */}
      <Reveal delay={100}>
        <div className="clients-marquee mt-12">
          <div className="clients-marquee-track">
            {doubled.map((t, i) => (
              <TestimonialCard key={`row1-${i}`} t={t} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Marquee row 2 (reverse) */}
      <Reveal delay={180}>
        <div className="clients-marquee mt-4">
          <div className="clients-marquee-track clients-reverse">
            {third.map((t, i) => (
              <TestimonialCard key={`row2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
