const BENEFITS_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4";

const benefitsBody =
  "Your ads run on proven, roofing-specific offer positioning and creatives that attract premium homeowners — not price shoppers. We build the funnel, capture the leads, and hand your crew qualified, ready-to-book roof replacement opportunities.";

export function BenefitsSection() {
  return (
    <section className="font-futura relative w-full bg-black px-4 py-12 sm:px-6 sm:py-20 md:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2
          className="mb-12 text-center text-3xl font-light text-white sm:mb-24 sm:text-4xl md:text-5xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          The Roofing Advantage
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {/* Card 1 — Text (body mid-card) */}
          <div className="relative h-[380px] overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:h-[460px] sm:p-8">
            <div className="absolute -left-[420px] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-[#b91c1c] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-light leading-tight text-white sm:text-2xl">
                Full-Funnel
                <br />
                Roofing Ads
              </h3>
              <p className="mt-12 max-w-[280px] text-[13px] font-light leading-relaxed text-white/70 sm:mt-20 sm:text-[14px]">
                {benefitsBody}
              </p>
            </div>
          </div>

          {/* Card 2 — Video (center) */}
          <div className="relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-neutral-950 sm:h-[460px]">
            <div className="relative w-full overflow-hidden" style={{ height: "75%" }}>
              <video
                className="block h-full w-full object-cover"
                src={BENEFITS_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
            </div>
            <div className="flex flex-1 items-center justify-start p-6 sm:p-8">
              <h3 className="text-left text-xl font-light leading-tight text-white sm:text-2xl">
                Proven Creative
                <br />
                & Campaigns
              </h3>
            </div>
          </div>

          {/* Card 3 — Text (body pinned bottom) */}
          <div className="relative h-[380px] overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:h-[460px] sm:p-8">
            <div className="absolute -right-28 -top-28 h-56 w-56 rounded-full bg-[#b91c1c] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-light leading-tight text-white sm:text-2xl">
                Done-For-You
                <br />
                Lead Management
              </h3>
              <p className="mt-auto max-w-[320px] text-[13px] font-light leading-relaxed text-white/70 sm:text-[14px]">
                Every roofing lead lands in your CRM with email, SMS, and AI
                follow-up running automatically — then gets qualified before
                it ever reaches your sales team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
