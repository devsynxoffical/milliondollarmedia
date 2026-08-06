import { Reveal } from "./Reveal";
import { Reviews } from "./Reviews";

export function Results() {
  return (
    <div id="results">
      <section className="relative border-b border-zinc-800 bg-[#09090b] py-16 text-white md:py-20">
        <div className="jobber-grid-dark pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="pill-badge-red mb-3">
              <span className="dot-red" />
              <span>REAL CLIENT RESULTS</span>
            </div>
            <h2 className="display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Don&apos;t Take Our Word For It...
              <br />
              <span className="text-[var(--accent)]">
                See What Our Clients Have Achieved.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              Video walkthroughs and results from real clients, one ads system
              behind all of it.
            </p>
          </Reveal>
        </div>
      </section>

      <Reviews />
    </div>
  );
}
