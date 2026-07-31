const rows = [
  ["Lead generation", "Inconsistent / DIY", "Funnel + ads managed daily"],
  ["Creatives", "Guesswork", "Built for roofing close rates"],
  ["Follow-up", "You chase them", "Handled for you"],
  ["Visibility", "Black box agencies", "Complete live access"],
  ["Risk", "You pay either way", "No perform = you don’t pay"],
  ["Your role", "Do everything", "Just take sales calls"],
];

export function Comparison() {
  return (
    <section className="section-shell bg-white text-black">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--red)]">
            Before vs with us
          </p>
          <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)]">
            STOP DOING
            <br />
            <span className="text-[var(--red)]">EVERYTHING YOURSELF</span>
          </h2>
        </div>

        <div className="mt-12 overflow-hidden border border-black/10">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-black text-white">
            <div className="p-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50 md:p-5">
              Area
            </div>
            <div className="border-l border-white/10 p-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/50 md:p-5">
              Typical setup
            </div>
            <div className="border-l border-white/10 bg-[var(--red)] p-4 text-xs font-semibold uppercase tracking-[0.16em] text-white md:p-5">
              Roofing Systems Co.
            </div>
          </div>

          {rows.map(([area, before, after]) => (
            <div
              key={area}
              className="grid grid-cols-[1.1fr_1fr_1fr] border-t border-black/10 text-sm md:text-base"
            >
              <div className="bg-[#f7f7f7] p-4 font-semibold text-black md:p-5">
                {area}
              </div>
              <div className="border-l border-black/10 p-4 text-black/55 md:p-5">
                {before}
              </div>
              <div className="border-l border-black/10 bg-[#fff5f4] p-4 font-medium text-black md:p-5">
                {after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
