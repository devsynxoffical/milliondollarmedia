import { Reveal } from "./Reveal";

const paragraphs = [
  "Most marketing agencies dump ad leads on your desk and call it a job done. But if your sales team can't book them, your money is wasted.",
  "You're losing projects to competitors because your whole marketing process is disconnected — ads, funnel, CRM, follow-up, and booking are all working against each other.",
  "The result? Expensive leads, missed inspections, empty calendars, and lost revenue.",
  "But here's the thing… You don't need more leads. You need a complete client acquisition system.",
];

export function Problem() {
  return (
    <section id="problem" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="pill-badge-red mb-3">
            <span className="dot-red" />
            <span>SECTION 2 — THE PROBLEM</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            Most Roofing Companies Don&apos;t Have A Lead Problem…
            <br />
            <span className="text-[var(--accent)]">
              They Have A Client Acquisition System Problem.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 mx-auto max-w-3xl space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-base sm:text-lg leading-relaxed ${
                  i === paragraphs.length - 1
                    ? "font-bold text-zinc-950"
                    : "text-zinc-500"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
