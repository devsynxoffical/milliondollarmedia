import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { BackToTop } from "./BackToTop";
import { NewsletterForm } from "./NewsletterForm";

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M14 8h2.5V5H14a4 4 0 00-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13V9.5c0-.8.6-1.5 1-1.5z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M12 4.5c2.4 0 2.7 0 3.6.1 1 0 1.6.2 2 .4.5.2.9.5 1.2.9.4.3.7.7.9 1.2.2.4.3 1 .4 2 .1.9.1 1.2.1 3.6s0 2.7-.1 3.6c0 1-.2 1.6-.4 2-.2.5-.5.9-.9 1.2-.3.4-.7.7-1.2.9-.4.2-1 .3-2 .4-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-1 0-1.6-.2-2-.4-.5-.2-.9-.5-1.2-.9-.4-.3-.7-.7-.9-1.2-.2-.4-.3-1-.4-2-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c0-1 .2-1.6.4-2 .2-.5.5-.9.9-1.2.3-.4.7-.7 1.2-.9.4-.2 1-.3 2-.4.9-.1 1.2-.1 3.6-.1zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M6.5 8.5V20H3V8.5h3.5zM4.7 7a1.9 1.9 0 110-3.8 1.9 1.9 0 010 3.8zM21 13.6V20h-3.5v-6.1c0-1.5-.6-2.6-2-2.6-1 0-1.7.7-2 1.5-.1.2-.1.6-.1.9V20H9.9V8.5h3.4v1.5c.5-.8 1.4-1.7 3.1-1.7 2.3 0 4.6 1.5 4.6 5.3z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M4 4l6.4 8.6L4.4 20h2.4l4.9-5.9L15.8 20H20l-6.8-9.1L19 4h-2.4l-4.5 5.4L8.2 4H4z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--navy)] px-5 pb-10 pt-16 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr]">
        <div>
          <Image
            src="/logo.png"
            alt="Roofing Systems Co."
            width={140}
            height={100}
            className="h-auto w-[120px] brightness-0 invert opacity-95"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
            Roofing Systems Co. — acquisition systems for $1M+ roofers. Double
            revenue in 90 days. Everything in writing.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:scale-105 hover:border-[var(--lime)] hover:bg-[var(--lime)] hover:text-[var(--ink)]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Navigate
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <a href="#masterclass" className="transition hover:text-[var(--lime)]">
              Systems video
            </a>
            <a href="#system" className="transition hover:text-[var(--lime)]">
              How it works
            </a>
            <a href="#results" className="transition hover:text-[var(--lime)]">
              Results
            </a>
            <a href="#reviews" className="transition hover:text-[var(--lime)]">
              Reviews
            </a>
            <Link href="/privatemastermind" className="transition hover:text-[var(--lime)]">
              Audience segmentation
            </Link>
            <Link href="/privatemastermind-504306" className="transition hover:text-[var(--lime)]">
              Ads copy mastermind
            </Link>
            <Link href={BOOKING_PATH} className="transition hover:text-[var(--lime)]">
              Book call
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Legal
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <a href="#" className="transition hover:text-[var(--lime)]">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-[var(--lime)]">
              Privacy
            </a>
            <a href="#" className="transition hover:text-[var(--lime)]">
              DMCA Policy
            </a>
            <a href="#" className="transition hover:text-[var(--lime)]">
              Income Disclosure
            </a>
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Get updates
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            New breakdowns and masterminds for $1M+ roofers. No spam.
          </p>
          <NewsletterForm />
          <label className="mt-3 flex items-start gap-2 text-xs text-white/40">
            <input type="checkbox" className="mt-0.5 accent-[var(--purple)]" />
            I agree to the Privacy Policy.
          </label>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
        <p>
          Copyright © {new Date().getFullYear()} Vaishali Media Productions
          LLC®. All rights reserved. Results vary. This page does not guarantee
          income.
        </p>
        <div className="flex gap-5">
          <a href="#" className="transition hover:text-[var(--lime)]">
            Terms & Condition
          </a>
          <a href="#" className="transition hover:text-[var(--lime)]">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--purple)]" />
      <BackToTop />
    </footer>
  );
}
