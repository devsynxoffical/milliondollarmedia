import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "../../components/BookingForm";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Book Application Call | Roofing Systems Co.",
  description:
    "Apply for Roofing Systems Co. Only for roofers doing $1M+. Double your revenue in 90 days — or you don't pay.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[var(--black)]">
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="hero-noise pointer-events-none absolute inset-0 opacity-80" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-24 md:px-8 md:pb-14 md:pt-28">
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 border border-[var(--red)] bg-[var(--red)]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--red)]">
                Booking funnel · roofers only
              </p>
              <h1 className="display mt-5 text-[clamp(2.6rem,5vw,4.2rem)] text-white">
                APPLY TO DOUBLE
                <br />
                YOUR REVENUE
                <br />
                <span className="text-[var(--red)]">IN 90 DAYS</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)]">
                Book your application call. We confirm you&apos;re a $1M+
                roofing company, walk through the agreement, and show live
                access to the system.
              </p>

              <div className="mt-8 overflow-hidden border border-white/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/media/covers/cover-masterclass.png"
                    alt="Application briefing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>

              <ul className="mt-8 space-y-4 text-sm text-white/75">
                {[
                  "Only for roofers — $1M minimum or don’t apply",
                  "Funnel + creatives + ads + follow-up handled for you",
                  "You just take the sales call",
                  "Live access to everything — full transparency",
                  "If we don’t perform, you don’t pay",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 bg-[var(--red)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
