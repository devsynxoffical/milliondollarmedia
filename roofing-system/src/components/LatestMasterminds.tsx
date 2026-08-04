import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

const posts = [
  {
    image: "/media/video/masterclass-poster.png",
    meta: "Private mastermind · Free",
    title: "The Audience Segmentation Playbook Behind Higher-Quality Roofing Calls",
    author: "RSC",
    href: "/privatemastermind",
  },
  {
    image: "/media/covers/cover-ads-copy.jpeg",
    meta: "Ads copy mastermind · Free",
    title: "The “Hidden Facebook Interest” Framework Behind 300–500 Roofing Calls",
    author: "RSC",
    href: "/privatemastermind-504306",
  },
  {
    image: "/media/video/masterclass-poster-2.png",
    meta: "Video breakdown · Watch now",
    title: "Systems Breakdown — You Just Take the Sales Call",
    author: "RSC",
    href: "/#masterclass",
  },
];

export function LatestMasterminds() {
  return (
    <section className="section-shell bg-[var(--fog)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="eyebrow">Free masterminds</p>
            <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
              The latest
              <br />
              <span className="text-[var(--purple)]">recordings</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] md:justify-self-end md:text-base">
              Watch the private recordings before you apply. No email walls —
              just the breakdown, then book if it fits.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((item, index) => (
            <Reveal key={item.href} delay={index * 120}>
              <Link
                href={item.href}
                className="group soft-card flex h-full flex-col overflow-hidden border border-[var(--line)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--purple)]/45 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--lime)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
                    Free
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)]/40">
                    {item.meta}
                  </p>
                  <h3 className="display mt-3 flex-1 text-lg leading-snug text-[var(--ink)] md:text-xl">
                    {item.title}
                  </h3>
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--purple)] text-[10px] font-bold text-white">
                        {item.author}
                      </span>
                      <span className="text-xs text-[var(--ink)]/45">Roofing Systems Co.</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--purple)]">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
