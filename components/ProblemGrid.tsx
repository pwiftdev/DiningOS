import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const QUESTIONS = [
  "Which tables have been waiting too long?",
  "Which section is drowning right now?",
  "How many guests leave without dessert?",
  "Why is turnover different every night?",
  "How much revenue is slow service quietly costing you?",
];

export function ProblemGrid() {
  return (
    <section id="problem" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="The problem"
          title="Managers spend the whole shift reacting."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Left callout */}
          <Reveal>
            <div className="relative flex h-full flex-col justify-center gap-6 rounded-2xl border border-hairline bg-panel p-7 md:p-9">
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 h-16 w-1 rounded-r-full bg-amber"
              />
              <p className="text-pretty text-2xl font-bold leading-snug text-ink md:text-[1.75rem]">
                Most restaurants learn about a bottleneck{" "}
                <span className="text-amber">after the guest has already complained.</span>
              </p>
              <p className="text-pretty leading-relaxed text-muted">
                Huge amounts of data, almost none of it connected. Today&apos;s systems record
                transactions — they don&apos;t understand operations.
              </p>
            </div>
          </Reveal>

          {/* Right numbered questions */}
          <ul className="flex flex-col gap-3">
            {QUESTIONS.map((q, i) => (
              <Reveal as="li" key={q} index={i}>
                <div className="group flex items-center gap-5 rounded-xl border border-hairline bg-panel-2 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--muted-2)]">
                  <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-muted-2 transition-colors group-hover:text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty font-medium text-ink">{q}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
