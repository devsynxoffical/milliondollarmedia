import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

const trustBadges = [
  "12+ Years Experience",
  "$50M+ Managed in Meta Ads",
  "Roofing Industry Growth System",
  "Proven Roofing Client Acquisition Framework",
  "100% Done-For-You",
];

const mediaGrid = [
  {
    title: "Roof Replacement Teams",
    sub: "High-Ticket Inbound Leads",
    img: "/media/clients/client-aref.jpg",
  },
  {
    title: "Storm & Insurance Claims",
    sub: "Automated Inspection Booking",
    img: "/media/clients/client-pierce.webp",
  },
  {
    title: "Commercial & Metal Roofing",
    sub: "Pre-Qualified Property Owners",
    img: "/media/clients/client-darrell.jpg",
  },
  {
    title: "Residential Roofing Pros",
    sub: "CRM & AI Follow-Up System",
    img: "/media/clients/client-jesse.webp",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090b] pt-28 pb-16 md:pt-36 md:pb-24 text-white">
      <div className="jobber-grid-dark absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column — GetJobber Hero Style */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="pill-badge-red animate-fade-in shadow-xs mb-4">
              <span className="dot-red" />
              <span>ROOFING SYSTEMS CO. · $1M+ CONTRACTORS ONLY</span>
            </div>

            <h1 className="display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              Only For Roofing Companies Doing{" "}
              <span className="text-[var(--accent)]">$1M+ Per Year</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed text-zinc-300">
              Stop paying $4,000–$7,000 a month for generic marketing agencies that treat roofing like every other business. Roofing Systems™ is a complete client acquisition system built specifically for roofing companies—and it&apos;s guaranteed to double your revenue in 90 days.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Link
                href={BOOKING_PATH}
                className="btn btn-accent w-full sm:w-auto px-8 py-4 text-base font-bold shadow-md hover:shadow-xl transition-all"
              >
                Book Your Free Strategy Call →
              </Link>
              <Link
                href="#system"
                className="btn btn-outline-dark w-full sm:w-auto px-7 py-4 text-base font-semibold"
              >
                See System Workflow
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="mt-10 pt-8 border-t border-zinc-800 flex flex-wrap items-center gap-x-6 gap-y-3">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px] font-extrabold text-white">
                    ✓
                  </span>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Vertical Image Scroller (Marquee) */}
          <div
            className="lg:col-span-5"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="grid h-[560px] grid-cols-2 gap-3 overflow-hidden sm:gap-4 lg:h-[640px]">
              {[0, 1].map((col) => (
                <div
                  key={col}
                  className="flex flex-col gap-3 sm:gap-4 animate-[scroll-y_22s_linear_infinite]"
                  style={{ animationDelay: col ? "-11s" : "0s" }}
                >
                  {[...mediaGrid, ...mediaGrid].map((item, i) => (
                    <div
                      key={`${col}-${item.title}-${i}`}
                      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 aspect-[4/3] shadow-md transition duration-300 hover:border-zinc-700"
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 45vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs font-bold tracking-tight text-white">{item.title}</p>
                        <p className="text-[10px] text-zinc-300 font-medium">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

