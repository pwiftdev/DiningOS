import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const STEPS: { n: string; title: string; body: string; note: string }[] = [
  {
    n: "01",
    title: "Connect what you already run",
    body: "Point DiningOS at your existing cameras and systems. No new hardware to buy or install.",
    note: "Day 0",
  },
  {
    n: "02",
    title: "We map your floor",
    body: "We model your sections, tables and stations — and go live in days, not months.",
    note: "Days 1–3",
  },
  {
    n: "03",
    title: "See it live, get a report",
    body: "Watch the floor in real time and receive an operational summary at the end of every shift.",
    note: "Every shift after",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad hairline-t">
      <div className="container-max">
        <SectionHeading eyebrow="How it works" title="Live in days, not months." />

        <ol className="relative mt-16">
          {/* Vertical thread */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[7px] top-2 w-px md:left-1/2"
            style={{
              background:
                "linear-gradient(180deg, var(--amber) 0%, rgba(245,166,35,0.35) 60%, transparent 100%)",
            }}
          />

          {STEPS.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal as="li" key={step.n} index={i}>
                <div className="relative grid grid-cols-[32px_1fr] gap-x-4 pb-14 last:pb-0 md:grid-cols-2 md:gap-x-0">
                  {/* Dot on the thread */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[3px] top-2 h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_12px_rgba(245,166,35,0.6)] md:left-1/2 md:-translate-x-1/2"
                  />

                  {/* Content alternates sides of the thread on desktop */}
                  <div className={right ? "col-start-2 md:pl-14" : "col-start-2 md:col-start-1 md:pr-14 md:text-right"}>
                    <div className={`flex items-baseline gap-4 ${right ? "" : "md:flex-row-reverse"}`}>
                      <span className="font-mono text-sm font-semibold tabular-nums text-amber">
                        {step.n}
                      </span>
                      <span className="eyebrow !text-muted-2">{step.note}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-ink md:text-2xl">
                      {step.title}
                    </h3>
                    <p className={`mt-3 max-w-md text-pretty leading-relaxed text-muted ${right ? "" : "md:ml-auto"}`}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
