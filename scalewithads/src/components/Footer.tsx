import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-white px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/logo-dark.png"
            alt="Scale with Ads"
            width={535}
            height={812}
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            Done-for-you ads that sell across all industries. We train media
            agencies to get clients. $50M+ Meta spend. 12 years. $10K minimum.
          </p>
          <div className="mt-6 flex gap-2">
            <span className="chip bg-[var(--accent-soft)] text-[var(--accent)]">
              Two Comma Club Winner
            </span>
            <span className="chip bg-[var(--surface-2)] text-[var(--ink-soft)]">
              ClickFunnels Awards
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
            Funnels
          </p>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[var(--muted)]">
            <Link href="/leadpilot" className="transition hover:text-[var(--ink)]">
              Lead Pilot
            </Link>
            <Link href="/metads" className="transition hover:text-[var(--ink)]">
              LTO Meta Ads
            </Link>
            <Link
              href="/privatemastermind"
              className="transition hover:text-[var(--ink)]"
            >
              Private Mastermind
            </Link>
            <Link href={BOOKING_PATH} className="transition hover:text-[var(--ink)]">
              Book a call
            </Link>
          </nav>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
            Legal
          </p>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[var(--muted)]">
            <a href="#" className="transition hover:text-[var(--ink)]">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-[var(--ink)]">
              Privacy
            </a>
            <a href="#" className="transition hover:text-[var(--ink)]">
              Income Disclosure
            </a>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <span>
          Copyright © {new Date().getFullYear()} Vaishali Media Productions LLC®.
          Results vary. This page does not guarantee income.
        </span>
        <span className="text-[var(--muted)]">
          1309 Coffeen Avenue STE 1200 Sheridan, Wyoming 82801
        </span>
      </div>
    </footer>
  );
}
