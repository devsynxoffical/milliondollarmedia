const phrases = [
  "Double your roofing revenue in 90 days",
  "Only for $1M+ roofers",
  "If we don't perform — you don't pay",
  "Funnel · Creatives · Ads · Follow-up",
  "Best solutions",
  "Best services",
];

export function Marquee() {
  const items = [...phrases, ...phrases, ...phrases];
  return (
    <div className="relative z-20">
      <div className="marquee-wrap">
        <div className="marquee-track items-center">
          {items.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
