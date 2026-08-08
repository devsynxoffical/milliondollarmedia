import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { BackToTop } from "./BackToTop";
import { Reveal } from "./Reveal";

const navLinks = [
  { href: "/#system", label: "Acquisition System" },
  { href: "/#specialties", label: "Specialties" },
  { href: "/#proof", label: "Results" },
  { href: "/#training", label: "Academy" },
  { href: "/#guarantee", label: "Guarantee" },
  { href: BOOKING_PATH, label: "Book Strategy Call" },
];

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/dmca", label: "DMCA Policy" },
  { href: "/income-disclosure", label: "Income Disclosure" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#09090b] text-white border-t border-zinc-800">
      {/* Pre-footer CTA Bar */}
      <Reveal>
        <div className="relative overflow-hidden border-b border-zinc-800 bg-[var(--accent)] py-5 px-5 text-center">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.25)_50%,transparent_70%)] bg-[length:250%_100%] animate-[shimmer_4s_linear_infinite]"
          />
          <p className="relative text-sm font-bold tracking-wide">
            Proud partner to roofing pros across all verticals.{" "}
            <Link href={BOOKING_PATH} className="animated-underline underline underline-offset-4 hover:no-underline">
              Book your free strategy call →
            </Link>
          </p>
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-10 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand Column */}
          <Reveal delay={0}>
            <div>
              <Image
                src="/logo.png"
                alt="Roofing Systems Co."
                width={160}
                height={56}
                className="h-12 w-auto object-contain"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
                Roofing Systems Co., complete client acquisition systems for $1M+ roofing contractors. Double revenue in 90 days. Everything in writing.
              </p>
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={80}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                Navigate
              </p>
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="animated-underline w-fit text-sm text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </Reveal>

          {/* Legal */}
          <Reveal delay={160}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                Legal
              </p>
              <nav className="flex flex-col gap-2.5">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="animated-underline w-fit text-sm text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bar */}
        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Vaishali Media Productions LLC®. All rights reserved. Results vary.
            </p>
            <div className="flex gap-5">
              <Link href="/terms" className="animated-underline transition hover:text-white">Terms & Conditions</Link>
              <Link href="/privacy" className="animated-underline transition hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom Accent Line */}
      <div className="relative h-1 overflow-hidden bg-zinc-800">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent animate-[footer-sweep_3.5s_ease-in-out_infinite]" />
      </div>
      <BackToTop />
    </footer>
  );
}

