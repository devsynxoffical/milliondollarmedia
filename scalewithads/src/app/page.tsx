import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { LogoStrip } from "../components/LogoStrip";
import { ProofGallery } from "../components/ProofGallery";
import { Reviews } from "../components/Reviews";
import { BOOKING_PATH, OFFER } from "../lib/offer";

const funnels = [
  {
    href: "/leadpilot",
    label: "Lead Pilot",
    title: "Done-for-you ads that sell",
    body: "We run Meta ads across all industries. $10K minimum. Double revenue in 90 days.",
    cover: "/media/covers/cover-leadpilot.jpg",
  },
  {
    href: "/metads",
    label: "Meta Ads",
    title: "LTO training that converts",
    body: "See the Meta selling system behind million-dollar funnel results.",
    cover: "/media/covers/cover-metads.png",
  },
  {
    href: "/privatemastermind",
    label: "Private Mastermind",
    title: "Train agencies to get clients",
    body: "How media agencies win clients with ads that sell — not excuses.",
    cover: "/media/covers/cover-mastermind.jpeg",
  },
];

const credentials = [
  { value: "$50M+", label: "Meta ads spent" },
  { value: "12 yrs", label: "Experience" },
  { value: "$10K+", label: "Minimum" },
  { value: "90 days", label: "Double revenue" },
];

const gates = [
  ["Ads only", "Done-for-you media that sells — that is the product."],
  ["All industries", "Countless verticals. If you sell with Meta, it fits."],
  ["Agency training", "We teach media agencies how to get clients."],
  ["$10K minimum", "Under $10K? Do not apply."],
  ["90-day target", "We double your revenue in 90 days."],
  ["In writing", "Everything is mentioned in the agreement."],
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-dark relative overflow-hidden pt-[4.25rem]">
        <div className="studio-grid-dark absolute inset-0" />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="animate-rise chip-glass">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-bright)]" />
              Done-for-you ads · all industries
            </p>
            <h1 className="display animate-rise-d1 mt-7 text-[clamp(2.6rem,7vw,4.9rem)] text-white">
              Ads that sell. Revenue that{" "}
              <span className="text-[var(--accent-bright)]">
                doubles in 90 days.
              </span>
            </h1>
            <p className="animate-rise-d2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Scale with Ads is specifically for ads — across countless
              verticals. We train media agencies to get clients.{" "}
              {OFFER.agreement}.
            </p>
            <div className="animate-rise-d2 mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={BOOKING_PATH} className="btn btn-accent min-w-[240px] px-7 py-4 text-base">
                Book application call
              </Link>
              <Link href="/leadpilot" className="btn-line-white">
                Watch Lead Pilot →
              </Link>
            </div>
          </div>

          <div className="animate-rise-d2 relative mx-auto mt-14 max-w-[960px] md:mt-16">
            <div className="absolute -inset-x-8 -top-8 h-48 rounded-full bg-[rgba(227,27,35,0.3)] blur-3xl" />
            <div className="card relative overflow-hidden shadow-[0_24px_60px_-20px_rgba(16,24,40,0.28)]">
              <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#e5484d]" />
                <span className="h-3 w-3 rounded-full bg-[#f0a120]" />
                <span className="h-3 w-3 rounded-full bg-[#30a46c]" />
                <span className="ml-3 hidden text-xs text-[var(--muted)] sm:block">
                  scale-with-ads.com — live campaign dashboard
                </span>
              </div>
              <div className="relative aspect-[16/9] bg-[var(--band)] sm:aspect-[16/8]">
                <Image
                  src="/media/covers/cover-leadpilot.jpg"
                  alt="Scale with Ads live system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 920px"
                  priority
                />
              </div>
              <div className="flex flex-col items-start justify-between gap-3 border-t border-[var(--line)] bg-white px-5 py-4 sm:flex-row sm:items-center md:px-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    Two Comma Club · ClickFunnels Awards
                  </p>
                  <p className="display mt-1 text-lg text-[var(--ink)] md:text-xl">
                    $50M+ Meta spend · 12 years
                  </p>
                </div>
                <Link
                  href="/leadpilot"
                  className="chip bg-[var(--accent-soft)] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                >
                  Watch the system →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="band bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          {credentials.map((item, i) => (
            <div
              key={item.label}
              className={`px-5 py-8 text-center md:px-8 ${
                i > 0 ? "md:border-l md:border-[var(--line)]" : ""
              } ${i % 2 === 1 ? "border-l border-[var(--line)] md:border-l" : ""}`}
            >
              <p className="display text-3xl text-[var(--ink)] md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <LogoStrip />

      {/* Qualification gate */}
      <section className="section-shell bg-[var(--bg)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow-accent">Qualification gate</p>
              <h2 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)] text-[var(--ink)]">
                Built for ads operators — not everyone.
              </h2>
            </div>
            <p className="max-w-xl text-[var(--muted)]">
              Brands we work with. Media agencies we train. Million-dollar
              funnel testimonials across countless verticals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gates.map(([title, body], i) => (
              <div
                key={title}
                className="card group p-7 transition hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(16,24,40,0.14)]"
              >
                <p className="display text-sm text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="display mt-3 text-xl text-[var(--ink)]">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to scale: featured + two paths */}
      <section className="panel-ink section-shell">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[640px]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb3b8]">
              Choose a path
            </p>
            <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.4rem)] text-white">
              Three ways to scale with ads
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[funnels[0], funnels[2]].map((item) => (
              <div
                key={item.href}
                className="card overflow-hidden bg-[var(--band-2)] p-3 transition duration-300 hover:-translate-y-1.5 hover:border-[#3a2a30]"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="px-3 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ffb3b8]">
                    {item.label}
                  </p>
                  <p className="display mt-2 text-xl text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {item.body}
                  </p>
                  <Link
                    href={item.href}
                    className="btn btn-accent mt-5 w-full"
                  >
                    Open funnel →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-5 py-8 md:px-8">
          <p className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            Awards & proof
          </p>
          {OFFER.awards.map((award) => (
            <span
              key={award}
              className="chip bg-[var(--accent-soft)] text-[var(--accent)]"
            >
              {award}
            </span>
          ))}
        </div>
      </section>

      <ProofGallery />
      <Reviews />

      {/* Final CTA */}
      <section className="section-shell bg-[var(--bg)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="panel-ink relative overflow-hidden rounded-3xl px-6 py-16 text-center md:py-24">
            <div className="pointer-events-none absolute inset-0 studio-grid opacity-60" />
            <div className="relative mx-auto max-w-[640px]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb3b8]">
                Next step
              </p>
              <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-white">
                Ready to scale with ads that sell?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/55">
                $10K minimum. All industries. We double your revenue in 90
                days — everything in the agreement.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={BOOKING_PATH} className="btn btn-accent min-w-[240px] px-7 py-4 text-base">
                  Book application call
                </Link>
                <Link href="/privatemastermind" className="btn btn-outline bg-white/5 text-white hover:border-white/50 hover:bg-white/10">
                  Train my agency
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
