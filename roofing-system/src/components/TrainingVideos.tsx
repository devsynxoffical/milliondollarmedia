import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";
import { SectionBadge } from "./axion/SectionBadge";
import { CTAButton } from "./ui/CTAButton";

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
    <section id="training" className="section-shell relative overflow-hidden bg-white border-b border-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-12%] h-[440px] w-[440px] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(237,28,36,0.12), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        {/* Header */}
        <Reveal className="flex flex-col items-start max-w-3xl">
          <SectionBadge num="07" label="Academy & Resources" />
          <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            Our business is helping yours succeed
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] font-medium leading-[1.6] text-gray-600 sm:text-[16px]">
            Watch real case studies, training recordings, and strategy breakdowns from roofing companies scaling with our system.
          </p>
        </Reveal>

        {/* Video Cards Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((video, i) => (
            <Reveal key={video.id} delay={i * 100} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ed1c24]/40 hover:shadow-[0_24px_50px_-18px_rgba(237,28,36,0.35)]">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#ed1c24] to-[#ff6b70] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />

                {/* Video Thumbnail */}
                <div className="relative overflow-hidden rounded-t-2xl bg-black">
                  <VideoPlayer
                    src={video.src}
                    cover={video.cover}
                    title={video.title}
                    aspect="aspect-video"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#ed1c24] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    {video.category}
                  </span>
                  <span className="absolute right-4 top-4 text-[11px] font-medium tabular-nums text-white/60 transition-colors duration-300 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-[#ed1c24]">
                    {video.tag}
                  </p>
                  <h3 className="text-lg font-medium leading-snug text-gray-900">
                    {video.title}
                  </h3>
                  <blockquote className="relative mt-1 border-l-2 border-[#ed1c24] pl-3">
                    <p className="text-sm italic leading-relaxed text-zinc-400">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  </blockquote>
                  <p className="mt-auto pt-3 text-sm leading-relaxed text-zinc-500">
                    {video.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA Prompt */}
        <Reveal delay={120} className="mt-12 text-center">
          <p className="mx-auto max-w-xl text-[15px] font-medium leading-relaxed text-gray-600">
            Seen enough? Book a free strategy call and we&apos;ll walk you through what this looks like for your roofing company.
          </p>
          <CTAButton
            href={BOOKING_PATH}
            label="Book Your Free Strategy Call"
            size="lg"
            className="mt-6"
          />
        </Reveal>
      </div>
    </section>
  );
}
