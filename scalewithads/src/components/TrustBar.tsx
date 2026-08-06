const trust = [
  "12+ Years Experience",
  "$50M+ Managed in Meta Ads",
  "Multi-Industry Experience",
  "Proven Client Acquisition Framework",
  "100% Done-For-You",
];

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function TrustBar() {
  return (
    <section className="border-b border-white/10 bg-[var(--band-2)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-6 gap-y-3 px-5 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:px-8">
        {trust.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center gap-2.5 text-sm font-semibold text-white/80"
          >
            <CheckIcon />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
