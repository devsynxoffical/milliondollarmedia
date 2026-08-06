import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12 md:px-8">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 max-w-[1240px]">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-white.png"
            alt="Scale with Ads"
            width={535}
            height={812}
            className="h-10 w-auto object-contain"
          />
          <span className="text-xs text-white/30 font-medium">|</span>
          <span className="text-xs text-white/45 font-medium">
            Client Acquisition Innovators
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-white/55">
          <Link href="#system" className="hover:text-white transition">
            System Workflow
          </Link>
          <Link href="#proof" className="hover:text-white transition">
            Results
          </Link>
          <Link href="#clients" className="hover:text-white transition">
            Community
          </Link>
          <Link href={BOOKING_PATH} className="hover:text-white transition">
            Apply Now
          </Link>
        </nav>

        <p className="text-xs text-white/35 font-medium">
          © {new Date().getFullYear()} Scale With Ads™. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
