import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { BackToTop } from "./BackToTop";

const navLinks = [
  { href: "/#system", label: "Acquisition System" },
  { href: "/#specialties", label: "Specialties" },
  { href: "/#proof", label: "Results" },
  { href: "/#training", label: "Academy" },
  { href: "/#guarantee", label: "Guarantee" },
  { href: BOOKING_PATH, label: "Book Strategy Call" },
];

const legalLinks = [
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "DMCA Policy" },
  { href: "#", label: "Income Disclosure" },
];

const specialties = [
  "Residential Roofing",
  "Commercial Roofing",
  "Storm Damage",
  "Metal Roofing",
  "Solar Roofing",
  "Roof Repair",
];

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
        <path d="M12 4.5c2.4 0 2.7 0 3.6.1 1 0 1.6.2 2 .4.5.2.9.5 1.2.9.4.3.7.7.9 1.2.2.4.3 1 .4 2 .1.9.1 1.2.1 3.6s0 2.7-.1 3.6c0 1-.2 1.6-.4 2-.2.5-.5.9-.9 1.2-.3.4-.7.7-1.2.9-.4.2-1 .3-2 .4-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-1 0-1.6-.2-2-.4-.5-.2-.9-.5-1.2-.9-.4-.3-.7-.7-.9-1.2-.2-.4-.3-1-.4-2-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c0-1 .2-1.6.4-2 .2-.5.5-.9.9-1.2.3-.4.7-.7 1.2-.9.4-.2 1-.3 2-.4.9-.1 1.2-.1 3.6-.1z" />
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
];

export function Footer() {
  return (
    <footer className="relative bg-[#09090b] text-white border-t border-zinc-800">
      {/* Pre-footer CTA Bar */}
      <div className="border-b border-zinc-800 bg-[var(--accent)] py-5 px-5 text-center">
        <p className="text-sm font-bold tracking-wide">
          Proud partner to roofing pros across all verticals.{" "}
          <Link href={BOOKING_PATH} className="underline underline-offset-4 hover:no-underline">
            Book your free strategy call →
          </Link>
        </p>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-10 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand Column */}
          <div>
            <Image
              src="/logo.png"
              alt="Roofing Systems Co."
              width={160}
              height={56}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
              Roofing Systems Co. — complete client acquisition systems for $1M+ roofing contractors. Double revenue in 90 days. Everything in writing.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Specialties */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Specialties
            </p>
            <nav className="flex flex-col gap-2.5">
              {specialties.map((item) => (
                <span key={item} className="text-sm text-zinc-400">
                  {item}
                </span>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Legal
            </p>
            <nav className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Vaishali Media Productions LLC®. All rights reserved. Results vary.
          </p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white">Terms & Conditions</a>
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-[var(--accent)]" />
      <BackToTop />
    </footer>
  );
}

