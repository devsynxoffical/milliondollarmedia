import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

const navLinks = [
  { href: "/#systems", label: "Acquisition Systems" },
  { href: "/#clients", label: "9-Figure Operators" },
  { href: "/#shorts", label: "Short Creatives" },
  { href: "/#results", label: "Campaign Results" },
  { href: "/medialibrary", label: "Media Library" },
  { href: BOOKING_PATH, label: "Book Strategy Call" },
];

const pageLinks = [
  { href: "/metads", label: "Meta Ads System" },
  { href: "/leadpilot", label: "Lead Pilot DFY" },
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
    <footer className="relative border-t border-zinc-800 bg-[#070709] text-white">
      {/* Pre-footer CTA Bar */}
      <div className="border-b border-zinc-800 bg-[#ed1c24] px-5 py-5 text-center">
        <p className="text-sm font-extrabold uppercase tracking-wide">
          Proudly building client acquisition systems for businesses across all
          industries.{" "}
          <Link
            href={BOOKING_PATH}
            className="underline underline-offset-4 hover:no-underline ml-1"
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
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-zinc-400">
              Scale With Ads™, complete client acquisition systems for
              agencies, coaches, high-ticket services &amp; B2B founders.
              Double revenue in 90 days or we work free. Everything in writing.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#ed1c24]">
              Navigate
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold text-zinc-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Pages */}
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#ed1c24]">
              Systems
            </p>
            <nav className="flex flex-col gap-2.5">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold text-zinc-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#ed1c24]">
              Legal
            </p>
            <nav className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold text-zinc-400 transition hover:text-white"
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
          <p className="font-extrabold uppercase tracking-widest text-zinc-400">
            For $10K+/month businesses only
          </p>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-[#ed1c24]" />
    </footer>
  );
}
