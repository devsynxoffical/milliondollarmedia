import type { Metadata } from "next";
import { BookingForm } from "../../components/BookingForm";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Book Application Call | Scale with Ads",
  description:
    "Apply for Scale with Ads. $10K minimum. Done-for-you ads that sell across all industries. We double your revenue in 90 days, everything in the agreement.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="hero-dark relative overflow-hidden pb-14 pt-28 md:pb-16 md:pt-36">
        <div className="studio-grid-dark absolute inset-0" />
        <div className="relative mx-auto max-w-[900px] px-5 text-center md:px-8">
          <p className="animate-rise eyebrow-bright">
            $10K minimum · ads operators only
          </p>
          <h1 className="display animate-rise-d1 mt-4 text-[clamp(2.4rem,5vw,4rem)] text-white">
            Apply to double your revenue{" "}
            <span className="text-[var(--accent-bright)]">in 90 days</span>
          </h1>
          <p className="animate-rise-d2 mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85">
            Book your application call. We confirm fit, walk the agreement, and
            map done-for-you ads, or agency training, for your industry.
          </p>
          <ul className="animate-rise-d2 mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/75">
            {[
              "Done-for-you ads that sell, all industries",
              "$50M+ Meta spend · 12 years experience",
              "We double your revenue in 90 days, in writing",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff4d5a]/15 text-[var(--accent-bright)]">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookingForm />
      <Footer />
    </main>
  );
}
