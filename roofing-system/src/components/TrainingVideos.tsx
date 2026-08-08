import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";
import { SplitReveal } from "./ui/SplitReveal";
import { Button } from "./ui/Button";

const resources = [
  {
    id: "DVjcGrUEr1Y",
    src: "/media/training/DVjcGrUEr1Y.mp4",
    cover: "/media/training/DVjcGrUEr1Y-poster.jpg",
    category: "Podcast",
    tag: "Lowest-Cost Leads",
    title: "50% Drop In Cost Per Lead",
    quote: "Roofing agency client? 50% drop in his cost per lead.",
    body: "How we generate high-quality roofing leads at the lowest possible cost, and what changed in the account to get there.",
  },
  {
    id: "DQXUnRNkjR3",
    src: "/media/training/DQXUnRNkjR3.mp4",
    cover: "/media/training/DQXUnRNkjR3-poster.jpg",
    category: "Academy",
    tag: "System Strategy",
    title: "Why Most Programs Fail",
    quote: "I've spent over $10,000+ on different programs.",
    body: "The strategic thinking behind our client acquisition system, and why the way roofing companies buy marketing is usually the problem.",
  },
  {
    id: "DPHgI7fEuIA",
    src: "/media/training/DPHgI7fEuIA.mp4",
    cover: "/media/training/DPHgI7fEuIA-poster.jpg",
    category: "Live Training",
    tag: "Realistic Results",
    title: "Inside A Live Roofing Team Training",
    quote: "2-hour roofing team training, behind the scenes.",
    body: "What results you can realistically expect once we launch and optimize your campaigns, straight from a live training session with a roofing team.",
  },
];

export function TrainingVideos() {
  return (
    <section id="training" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        {/* Header, GetJobber Style */}
        <Reveal className="flex flex-col items-start max-w-3xl">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#ed1c24]">
            <span className="inline-block h-px w-8 bg-[#ed1c24]" />
            Academy & Resources
          </span>
          <SplitReveal as="h2" mode="lines" className="font-heading mt-4 text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:text-4xl lg:text-5xl">
            Our business is{" "}
            <span className="text-[#ed1c24]">helping yours succeed</span>
          </SplitReveal>
          <p className="mt-4 max-w-2xl text-base text-zinc-500 leading-relaxed">
            Watch real case studies, training recordings, and strategy breakdowns from roofing companies scaling with our system.
          </p>
        </Reveal>

        {/* Video Cards Grid, GetJobber style */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((video, i) => (
            <Reveal key={video.id} delay={i * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition duration-300 hover:shadow-md hover:-translate-y-1">
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden rounded-t-2xl bg-black">
                  <VideoPlayer
                    src={video.src}
                    cover={video.cover}
                    title={video.title}
                    aspect="aspect-video"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    {video.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)]">
                    {video.tag}
                  </p>
                  <h3 className="text-base font-extrabold text-zinc-950 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-sm italic leading-relaxed text-zinc-400">
                    &ldquo;{video.quote}&rdquo;
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-500 mt-auto pt-2">
                    {video.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA Prompt */}
        <Reveal delay={120} className="mt-12 text-center">
          <p className="mx-auto max-w-xl text-sm text-zinc-500 leading-relaxed">
            Seen enough? Book a free strategy call and we&apos;ll walk you through what this looks like for your roofing company.
          </p>
          <Button href={BOOKING_PATH} variant="primary" size="lg" className="mt-6">
            Book Your Free Strategy Call
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
