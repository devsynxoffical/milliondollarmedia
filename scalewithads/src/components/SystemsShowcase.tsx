import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const systems = [
  {
    href: "/metads",
    cover: "/media/covers/masterclass-poster-2.png",
    tag: "META ADS SYSTEM",
    title: "Meta Ads That Sell",
    desc: "The LTO training behind ads systems that convert across every industry.",
  },
  {
    href: "/leadpilot",
    cover: "/media/covers/cover-leadpilot.jpg",
    tag: "LEAD PILOT",
    title: "Done-For-You Ads",
    desc: "We write, target, and manage the campaigns that book revenue for you.",
  },
  {
    href: "/privatemastermind",
    cover: "/media/covers/cover-mastermind.jpeg",
    tag: "PRIVATE MASTERMIND",
    title: "Agency Growth",
    desc: "The 1:1 framework for media agencies to win and keep premium clients.",
  },
];

export function SystemsShowcase() {
  return (
    <section
      id="systems"
      className="relative overflow-hidden border-b border-zinc-200 bg-[#fafafa] py-16 text-zinc-950 md:py-24"
    >
      <div className="jobber-grid-light pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="SYSTEMS WE INSTALL"
          title={
            <>
              Pick the system that{" "}
              <span className="text-[#ed1c24]">fits your goal</span>
            </>
          }
          description="Done-for-you ads, the ad-creation training, or the agency mastermind — all built on the same proven playbook."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {systems.map((item, i) => (
            <Reveal key={item.href} delay={i * 90} className="h-full">
              <Link
                href={item.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ed1c24] hover:shadow-[0_16px_40px_-16px_rgba(237,28,36,0.2)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#ed1c24] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    {item.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display text-xl font-extrabold tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                    {item.desc}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ed1c24] transition group-hover:gap-3">
                    Explore system →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
