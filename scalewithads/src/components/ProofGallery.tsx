import { readdirSync } from "fs";
import path from "path";
import { ProofGrid } from "./ProofGrid";

const DASHBOARDS = ["proof-695d97e2.png", "proof-695d9820.png"];

export function ProofGallery() {
  const dir = path.join(process.cwd(), "public/media/proof");
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  } catch {
    files = [];
  }

  const dashboards = DASHBOARDS.filter((f) => files.includes(f));

  return (
    <section id="proof" className="section-shell bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow-accent">Proof wall</p>
            <h2 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)] text-[var(--ink)]">
              Million-dollar funnel
              <br />
              dashboards.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--muted)]">
            Real spend. Real results. Tap “See more” to scroll deeper into a
            dashboard, or “View full” for the complete screenshot.
          </p>
        </div>
        <ProofGrid files={dashboards} />
      </div>
    </section>
  );
}
