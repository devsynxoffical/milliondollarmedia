"use client";

import { ShieldCheck, KeyRound, CalendarCheck2, Quote } from "lucide-react";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { testimonials } from "@/lib/data";
import { site } from "@/lib/site";

const TRUST_WORDS = [
  "No cold outreach",
  "You own everything",
  "90-day guarantee",
  "No lock-in contracts",
  "Done-for-you",
  "Qualified calls only",
  "$100K+ client months",
  "No exit fees",
];

function FloatingQuote({ t, className }: { t: (typeof testimonials)[number]; className?: string }) {
  return (
    <div className={className}>
      <div className="animate-float-slow panel-glass max-w-[17rem] rounded-2xl p-5 shadow-soft">
        <Quote className="h-4 w-4 text-lime" />
        <p className="mt-2 text-sm leading-relaxed text-fog">“{t.quote}”</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim">
          {t.name} · {t.role}
        </p>
      </div>
    </div>
  );
}

export function FinalCTA() {
  return (
    <section id="book" className="relative overflow-hidden pb-10 pt-24 sm:pt-32">
      {/* Animated background */}
      <div className="absolute inset-0">
        <MeshGradient colors={["#0a0c0f", "#2a1013", "#160a0d", "#1a1206"]} speed={1.4} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent" />

      {/* Floating testimonials */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatingQuote t={testimonials[0]} className="absolute left-[3%] top-[22%]" />
        <FloatingQuote t={testimonials[1]} className="absolute right-[2%] top-[30%]" />
        <FloatingQuote t={testimonials[2]} className="absolute bottom-[14%] left-[6%]" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <span className="eyebrow-xl justify-center">The next step is yours</span>
        </Reveal>

        <SplitReveal
          as="h2"
          className="mt-6 max-w-5xl text-balance text-[clamp(2.4rem,6.5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fog"
        >
          Ready to build a{" "}
          <em className="font-semibold not-italic text-lime">
            predictable roofing client acquisition system?
          </em>
        </SplitReveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-mist">
            Stop guessing. Stop relying on referrals. Stop switching agencies. Install a complete
            system that attracts, qualifies, nurtures and books premium roofing clients — so you
            can focus on closing jobs and scaling your business.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center gap-5">
            <Button
              href={site.bookCallUrl}
              size="xl"
              icon="up-right"
              className="px-12"
              ariaLabel="Book your free strategy call"
            >
              Book Your Free Strategy Call
            </Button>
            <p className="font-mono text-[11px] uppercase tracking-widest text-dim">
              Free · No pressure · 90-day written guarantee
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-dim">
            {[
              { icon: ShieldCheck, label: "90-day written guarantee" },
              { icon: KeyRound, label: "You own everything" },
              { icon: CalendarCheck2, label: "Qualified inspections in weeks" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-lime" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Trust word marquee */}
      <Reveal delay={0.3}>
        <div className="relative mt-20">
          <Marquee speed="45s">
            {TRUST_WORDS.map((w) => (
              <span key={w} className="flex items-center">
                <span className="px-6 text-3xl font-semibold tracking-tight text-fog/25 sm:text-4xl">
                  {w}
                </span>
                <span className="h-2 w-2 rounded-full bg-lime/40" />
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
