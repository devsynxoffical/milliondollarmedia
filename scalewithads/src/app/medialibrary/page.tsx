import type { Metadata } from "next";
import Image from "next/image";
import { LibraryVideoTile } from "../../components/LibraryVideoTile";
import {
  allClients,
  logos,
  shortsCount,
  videoCount,
  type LibraryClient,
} from "../../lib/library";

export const metadata: Metadata = {
  title: "Media Library | Scale with Ads",
  description:
    "Every client video, short, ad and brand logo in one place. Real client results and Million Dollar Media ads across countless verticals.",
};

function ClientSection({ client }: { client: LibraryClient }) {
  const hasMedia =
    client.videos.length > 0 || client.shorts.length > 0 || client.logos.length > 0;

  return (
    <section
      id={client.slug}
      className="scroll-mt-28 rounded-2xl border border-zinc-800 bg-[var(--band-2)] p-5 md:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--accent)]/50">
            <Image
              src={client.photo}
              alt={client.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <h3 className="display text-lg font-bold text-white sm:text-xl">
              {client.name}
            </h3>
            <p className="text-sm text-zinc-400">{client.title}</p>
            <span className="mt-1.5 inline-block rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent-bright)]">
              {client.badge}
            </span>
          </div>
        </div>

        {hasMedia ? (
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-zinc-400">
            {client.videos.length > 0 && (
              <span className="chip-glass">
                {client.videos.length} video{client.videos.length > 1 ? "s" : ""}
              </span>
            )}
            {client.shorts.length > 0 && (
              <span className="chip-glass">
                {client.shorts.length} short{client.shorts.length > 1 ? "s" : ""}
              </span>
            )}
            {client.logos.length > 0 && (
              <span className="chip-glass">
                {client.logos.length} logo{client.logos.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        ) : (
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-600">
            No media yet
          </span>
        )}
      </div>

      {client.videos.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow-accent mb-3">Videos</p>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {client.videos.map((video) => (
              <LibraryVideoTile key={video.id} asset={video} />
            ))}
          </div>
        </div>
      )}

      {client.shorts.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow-accent mb-3">Shorts</p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {client.shorts.map((short) => (
              <LibraryVideoTile key={short.id} asset={short} />
            ))}
          </div>
        </div>
      )}

      {client.logos.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow-accent mb-3">Logos</p>
          <div className="flex flex-wrap items-center gap-4">
            {client.logos.map((logo) => (
              <Image
                key={logo}
                src={logo}
                alt={client.name}
                width={120}
                height={48}
                className="h-10 w-auto object-contain opacity-80"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function MediaLibraryPage() {
  return (
    <main className="bg-[#09090b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="jobber-grid-dark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="pill-badge-red mb-4">
              <span className="dot-red" />
              <span>MEDIA LIBRARY</span>
            </span>
            <h1 className="display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Every client video.
              <br />
              <span className="text-[var(--accent)]">One place.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              Client results, Million Dollar Media ads, shorts, and brand logos
              across countless verticals — all organized and ready to watch.
            </p>

            <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-3">
              {[
                { value: `${allClients.length}`, label: "Clients & brands" },
                { value: `${videoCount}`, label: "Videos" },
                { value: `${shortsCount}`, label: "Shorts" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-zinc-800 bg-[var(--band-2)] px-4 py-3"
                >
                  <p className="display text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client roster */}
      <section className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-20">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
            Jump to
          </span>
          {allClients.map((client) => (
            <a
              key={client.slug}
              href={`#${client.slug}`}
              className="rounded-full border border-zinc-800 bg-[var(--band-2)] px-3.5 py-1.5 text-[12px] font-semibold text-zinc-300 transition hover:border-[var(--accent)] hover:text-white"
            >
              {client.name.split(" · ")[0].split(" ").slice(0, 2).join(" ")}
            </a>
          ))}
          <a
            href="#brand-logos"
            className="rounded-full border border-zinc-800 bg-[var(--band-2)] px-3.5 py-1.5 text-[12px] font-semibold text-zinc-300 transition hover:border-[var(--accent)] hover:text-white"
          >
            Brand Logos
          </a>
        </div>

        <div className="space-y-6">
          {allClients.map((client) => (
            <ClientSection key={client.slug} client={client} />
          ))}
        </div>

        {/* Logo wall */}
        <section id="brand-logos" className="scroll-mt-28 mt-10">
          <div className="rounded-2xl border border-zinc-800 bg-[var(--band-2)] p-5 md:p-8">
            <p className="eyebrow-accent mb-2">Brand logos</p>
            <h2 className="display text-2xl font-bold text-white md:text-3xl">
              Brands we work with.
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Two Comma Club Winner. ClickFunnels Awards. The system repeats
              across industries.
            </p>
            <div className="mt-6 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="flex h-16 items-center justify-center rounded-xl border border-zinc-800 bg-[#09090b] px-3 transition hover:border-[var(--accent)]/50"
                >
                  <Image
                    src={logo}
                    alt="Client brand logo"
                    width={120}
                    height={48}
                    className="h-9 w-auto object-contain opacity-75"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
