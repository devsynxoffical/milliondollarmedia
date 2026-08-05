import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white px-5 py-12 md:px-8">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 max-w-[1240px]">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-dark.png"
            alt="Scale with Ads"
            width={535}
            height={812}
            className="h-10 w-auto object-contain"
          />
          <span className="text-xs text-zinc-400 font-medium">|</span>
          <span className="text-xs text-zinc-500 font-medium">
            Client Acquisition Innovators
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-zinc-600">
          <Link href="#system" className="hover:text-zinc-950 transition">
            System Workflow
          </Link>
          <Link href="#proof" className="hover:text-zinc-950 transition">
            Results
          </Link>
          <Link href="#clients" className="hover:text-zinc-950 transition">
            Community
          </Link>
          <Link href={BOOKING_PATH} className="hover:text-zinc-950 transition">
            Apply Now
          </Link>
        </nav>

        <p className="text-xs text-zinc-400 font-medium">
          © {new Date().getFullYear()} Scale With Ads™. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

