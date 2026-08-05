import { Reveal } from "./Reveal";

const players = [
  {
    label: "Most marketing agencies",
    note: "only run ads",
  },
  {
    label: "Some",
    note: "build landing pages",
  },
  {
    label: "Others",
    note: "generate leads",
  },
  {
    label: "Someone else",
    note: "handles follow-up",
  },
];

export function Problem() {
  return (
    <section id="problem" className="section-shell bg-white">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="eyebrow">The real problem</p>
          <h2 className="display mx-auto mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
            Most Roofing Companies Don&apos;t Have A Lead Problem...
            <br />
            <span className="text-[var(--purple)]">
              They Have A Client Acquisition System Problem.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {players.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 rounded-[1.5rem] border border-[var(--line)] bg-[var(--fog)] px-6 py-8 text-center transition hover:-translate-y-1 hover:border-[var(--purple)]/30 hover:bg-white hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--purple)] shadow-[var(--shadow-soft)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <p className="mt-4 text-sm font-bold text-[var(--ink)]">
                  {item.label}
                </p>
                <p className="text-xs text-[var(--muted)]">{item.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Nobody owns the entire customer journey. That&apos;s exactly why
            roofing companies struggle to scale consistently.
          </p>
          <p className="mt-5 text-base font-semibold leading-relaxed text-[var(--ink)] md:text-lg">
            At Roofing Systems™, we build one complete client acquisition
            ecosystem where every part works together—from the first click to a
            qualified homeowner sitting on your sales calendar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
