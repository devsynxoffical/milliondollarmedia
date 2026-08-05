import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";

const videos = [
  {
    id: "DVjcGrUEr1Y",
    src: "/media/training/DVjcGrUEr1Y.mp4",
    cover: "/media/training/DVjcGrUEr1Y-poster.jpg",
    index: "01",
    tag: "Lowest-Cost Leads",
    title: "50% Drop In Cost Per Lead",
    quote: "Roofing agency client? 50% drop in his cost per lead.",
    body: "How we generate high-quality roofing leads at the lowest possible cost — and what changed in the account to get there.",
  },
  {
    id: "DQXUnRNkjR3",
    src: "/media/training/DQXUnRNkjR3.mp4",
    cover: "/media/training/DQXUnRNkjR3-poster.jpg",
    index: "02",
    tag: "System Strategy",
    title: "Why Most Programs Fail",
    quote: "I've spent over $10,000+ on different programs.",
    body: "The strategic thinking behind our client acquisition system — and why the way roofing companies buy marketing is usually the problem.",
  },
  {
    id: "DPHgI7fEuIA",
    src: "/media/training/DPHgI7fEuIA.mp4",
    cover: "/media/training/DPHgI7fEuIA-poster.jpg",
    index: "03",
    tag: "Realistic Results",
    title: "Inside A Live Roofing Team Training",
    quote: "2-hour roofing team training — behind the scenes.",
    body: "What results you can realistically expect once we launch and optimize your campaigns — straight from a live training session with a roofing team.",
  },
];

export function TrainingVideos() {
  return (
    <section id="training" className="section-shell bg-[var(--fog)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Training library</p>
          <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
            Watch How We
            <br />
            <span className="text-[var(--purple)]">Scale Roofing Companies</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
            Three short training clips that show exactly how Roofing Systems™
            works — before you ever get on a strategy call.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={i * 120} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow)]">
                <div className="relative p-3">
                  <div className="relative overflow-hidden rounded-[1.25rem] bg-black">
                    <VideoPlayer
                      src={video.src}
                      cover={video.cover}
                      title={video.title}
                      aspect="aspect-square"
                    />
                  </div>
                  <span className="absolute left-6 top-6 rounded-full bg-[var(--purple)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[var(--shadow-soft)]">
                    Video {video.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">
                    {video.tag}
                  </p>
                  <h3 className="display text-xl leading-snug text-[var(--ink)] md:text-2xl">
                    {video.title}
                  </h3>
                  <p className="text-sm italic leading-relaxed text-[var(--purple)]/80">
                    “{video.quote}”
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {video.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-base leading-relaxed text-[var(--muted)]">
            Seen enough? Book a free strategy call and we&apos;ll walk you
            through what this looks like for your roofing company.
          </p>
          <Link href={BOOKING_PATH} className="cta-btn mt-8 min-w-[300px]">
            <span className="display text-lg tracking-normal md:text-xl">
              Book Your Free Strategy Call
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
              Only for $1M+ roofing companies
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
