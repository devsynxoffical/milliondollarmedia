import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-black px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/logo.png"
            alt="Roofing Systems Co."
            width={140}
            height={100}
            className="h-auto w-[120px] opacity-90"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
            Roofing Systems Co. — acquisition systems for $1M+ roofers. Double
            revenue in 90 days. Everything in writing.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Navigate
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <a href="#masterclass" className="hover:text-white">
              Systems video
            </a>
            <a href="#system" className="hover:text-white">
              How it works
            </a>
            <a href="#results" className="hover:text-white">
              Results
            </a>
            <a href="#reviews" className="hover:text-white">
              Reviews
            </a>
            <Link href={BOOKING_PATH} className="hover:text-white">
              Book call
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Legal
          </p>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              DMCA Policy
            </a>
            <a href="#" className="hover:text-white">
              Income Disclosure
            </a>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/35">
        Copyright © {new Date().getFullYear()} Vaishali Media Productions LLC®.
        All rights reserved. Results vary. This page does not guarantee income.
      </div>
    </footer>
  );
}
