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
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left: the statement, pure typography */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-5">The problem</p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="text-balance text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
                Managers spend the whole shift reacting.
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-8 border-l-2 border-amber pl-5 text-pretty text-xl font-semibold leading-snug text-ink md:text-2xl">
                Most restaurants learn about a bottleneck{" "}
                <span className="text-amber">after the guest has already complained.</span>
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted">
                Huge amounts of data, almost none of it connected. Today&apos;s systems record
                transactions — they don&apos;t understand operations.
              </p>
            </Reveal>
          </div>

          {/* Right: the questions nobody can answer, as an editorial index */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow mb-2 text-muted-2">
                Questions no one can answer mid-shift
              </p>
            </Reveal>
            <ol>
              {QUESTIONS.map((q, i) => (
                <Reveal as="li" key={q} index={i}>
                  <div className="group flex items-baseline gap-6 border-b border-hairline py-6 transition-colors duration-300 last:border-b-0">
                    <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-muted-2 transition-colors duration-300 group-hover:text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-pretty text-lg font-semibold leading-snug text-ink transition-transform duration-300 ease-out group-hover:translate-x-1.5 md:text-xl">
                      {q}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
