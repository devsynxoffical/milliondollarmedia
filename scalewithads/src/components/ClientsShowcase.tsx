import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { clients } from "../lib/library";
import { SectionHeading } from "./SectionHeading";

export function ClientsShowcase() {
  const showcaseClients = clients.filter(
    (client) => client.slug !== "edgar" && client.slug !== "ibam"
  );

  return (
    <section
      id="clients"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#09090b] py-16 text-white md:py-24"
    >
      <div className="jobber-grid-dark pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(237,28,36,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="REAL CLIENTS · REAL RESULTS"
          title={
            <>
              The operators behind{" "}
              <span className="text-[var(--accent)]">our results</span>
            </>
          }
          description="From 9-figure agency owners to doctors, traders, and coaches — one done-for-you ads system behind their growth."
        />

        {/* Single-line horizontal scroller */}
        <div className="relative mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#09090b] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#09090b] to-transparent" />
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-smooth px-5 pb-1 md:-mx-8 md:px-8">
            {showcaseClients.map((client) => (
              <Link
                key={client.slug}
                href="/medialibrary"
                className="group relative w-[132px] shrink-0 snap-start overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_24px_50px_-20px_rgba(237,28,36,0.35)]"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={client.photo}
                    alt={client.name}
                    fill
                    sizes="132px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 truncate rounded-full bg-black/60 px-2 py-0.5 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
                    {client.badge}
                  </span>
                </div>
                <div className="p-2.5">
                  <h3 className="truncate text-xs font-extrabold tracking-tight text-white">
                    {client.name}
                  </h3>
                  <p className="mt-0.5 truncate text-[10px] text-zinc-400">
                    {client.title}
                  </p>
                </div>
              </Link>
            ))}

            {/* CTA card at the end of the scroller */}
            <Link
              href={BOOKING_PATH}
              className="group relative w-[132px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--accent)] bg-gradient-to-br from-[var(--accent)]/25 to-zinc-900/70 p-3 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(237,28,36,0.5)]"
            >
              <span className="inline-flex rounded-full bg-[var(--accent)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                Your brand here
              </span>
              <h3 className="display mt-3 text-sm font-extrabold leading-snug tracking-tight text-white">
                Your business could be the next result.
              </h3>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-white/70 transition group-hover:text-white">
                Book a call →
              </p>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/medialibrary"
            className="btn btn-outline-dark inline-flex px-8 py-4 text-sm font-semibold"
          >
            Browse the full media library →
          </Link>
        </div>
      </div>
    </section>
  );
}
