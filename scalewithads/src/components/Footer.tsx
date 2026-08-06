import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

const navLinks = [
  { href: "/#system", label: "Acquisition System" },
  { href: "/#results", label: "Results" },
  { href: "/#reviews", label: "Client Videos" },
  { href: "/#comparison", label: "Why Us" },
  { href: "/#guarantee", label: "Guarantee" },
  { href: BOOKING_PATH, label: "Book Strategy Call" },
];

const pageLinks = [
  { href: "/metads", label: "Meta Ads" },
  { href: "/leadpilot", label: "Lead Pilot" },
  { href: "/privatemastermind", label: "Private Mastermind" },
  { href: BOOKING_PATH, label: "Apply Now" },
];

const legalLinks = [
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Income Disclosure" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800 bg-[#09090b] text-white">
      {/* Pre-footer CTA Bar */}
      <div className="border-b border-zinc-800 bg-[var(--accent)] px-5 py-5 text-center">
        <p className="text-sm font-bold tracking-wide">
          Proudly building client acquisition systems for businesses across all
          industries.{" "}
          <Link
            href={BOOKING_PATH}
            className="underline underline-offset-4 hover:no-underline"
          >
            Book your free strategy call →
          </Link>
        </p>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 pb-10 pt-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand Column */}
          <div>
            <Image
              src="/logo-alt.png"
              alt="Scale With Ads"
              width={2000}
              height={1538}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
              Scale With Ads™, complete client acquisition systems for
              agencies, coaches, high-ticket services &amp; B2B founders.
              Double revenue in 90 days or we work free. Everything in writing.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
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

          {/* Pages */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Systems
            </p>
            <nav className="flex flex-col gap-2.5">
              {pageLinks.map((link) => (
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

          {/* Legal */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Legal
            </p>
            <nav className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
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
            © {new Date().getFullYear()} Scale With Ads™. All rights reserved.
            Results vary.
          </p>
          <p className="font-semibold uppercase tracking-widest text-zinc-600">
            For $10K+/month businesses only
          </p>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-[var(--accent)]" />
    </footer>
  );
}
