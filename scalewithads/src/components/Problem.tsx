import { Reveal } from "./Reveal";

const fragmented = [
  { title: "Only run ads", desc: "Most agencies only run ads." },
  { title: "Some build funnels", desc: "Some build funnels." },
  { title: "Others write copy", desc: "Others write copy." },
  {
    title: "Someone else handles follow-up",
    desc: "Someone else handles follow-up.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="section-shell border-b border-zinc-100 bg-white">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>WHY MOST BUSINESSES NEVER SCALE</span>
          </div>
          <h2 className="display text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
            Most Businesses Don&apos;t Have A Lead Problem...
            <br />
            <span className="text-[var(--accent)]">
              They Have A Client Acquisition System Problem.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fragmented.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-400">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Fragmented
                  </span>
                </div>
                <h3 className="mt-4 text-base font-extrabold leading-snug tracking-tight text-zinc-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 max-w-2xl text-center">
            <p className="display text-2xl leading-snug tracking-tight text-zinc-950 md:text-3xl">
              Nobody owns the{" "}
              <span className="text-[var(--accent)]">
                entire customer journey.
              </span>
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
              That&apos;s exactly why businesses struggle to scale consistently.
              At Scale With Ads™, we build one complete ecosystem where every
              part works together—from the first click to a qualified client
              sitting on your calendar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
