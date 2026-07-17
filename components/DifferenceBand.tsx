import { ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const CHIPS = ["No facial recognition", "No staff surveillance", "Privacy-first by design"];

export function DifferenceBand() {
  return (
    <section id="difference" className="section-pad">
      <div className="container-max">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-3xl border border-[color:rgba(245,166,35,0.3)] bg-[linear-gradient(160deg,rgba(245,166,35,0.10),rgba(20,26,34,0.4)_55%)] px-7 py-14 md:px-14 md:py-20">
            {/* corner glow */}
            <div
              aria-hidden="true"
              className="glow-blob absolute -right-16 -top-16 h-72 w-72 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(245,166,35,0.22), transparent 65%)" }}
            />
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:rgba(245,166,35,0.35)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-eyebrow text-amber">
                <ShieldCheck size={14} aria-hidden="true" />
                The difference
              </span>
              <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tightest text-ink sm:text-4xl md:text-5xl">
                We optimize the floor — <span className="text-amber">not your people.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
                DiningOS measures tables, zones and process — never individuals. No facial
                recognition. No employee scoring. No customer profiling. Staff cooperate with it
                because it makes their shift easier, not because it&apos;s watching them. That&apos;s
                why it actually gets adopted.
              </p>
              <ul className="mt-9 flex flex-wrap justify-center gap-3">
                {CHIPS.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-hairline bg-panel/60 px-4 py-2 text-sm font-medium text-ink backdrop-blur"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
