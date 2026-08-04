import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "../../components/BookingForm";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Book Application Call | Scale with Ads",
  description:
    "Apply for Scale with Ads. $10K minimum. Done-for-you ads that sell across all industries. We double your revenue in 90 days — everything in the agreement.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="hero-dark relative overflow-hidden">
        <div className="studio-grid-dark absolute inset-0" />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div>
              <p className="animate-rise eyebrow-bright">
                $10K minimum · ads operators only
              </p>
              <h1 className="display animate-rise-d1 mt-4 text-[clamp(2.4rem,5vw,4rem)] text-white">
                Apply to double
                <br />
                your revenue
                <br />
                <span className="text-[var(--accent-bright)]">in 90 days</span>
              </h1>
              <p className="animate-rise-d2 mt-5 max-w-md text-base leading-relaxed text-white/60">
                Book your application call. We confirm fit, walk the agreement,
                and map done-for-you ads — or agency training — for your
                industry.
              </p>
              <ul className="animate-rise-d2 mt-8 space-y-3 text-sm text-white/75">
                {[
                  "Done-for-you ads that sell — all industries",
                  "$50M+ Meta spend · 12 years experience",
                  "Two Comma Club Winner · ClickFunnels Awards",
                  "We double your revenue in 90 days — in writing",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff4d5a]/15 text-[#ffb3b8]">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="card mt-10 overflow-hidden p-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image
                    src="/media/covers/cover-leadpilot.jpg"
                    alt="Application briefing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </div>
            <BookingForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
