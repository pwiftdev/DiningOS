import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const STEPS: {
  n: string;
  title: string;
  body: string;
  color: string;
  dim: string;
}[] = [
  {
    n: "01",
    title: "Computer vision reads the floor",
    body: "Table states, wait times, queues and resets, read continuously from the cameras you already have.",
    color: "var(--teal)",
    dim: "rgba(45,212,191,0.35)",
  },
  {
    n: "02",
    title: "Integrations read the business",
    body: "POS, reservations, kitchen displays and payments, stitched into one operational timeline.",
    color: "var(--amber)",
    dim: "rgba(245,166,35,0.35)",
  },
  {
    n: "03",
    title: "AI turns both into decisions",
    body: "Not another dashboard. Proactive, ranked actions delivered the moment they matter.",
    color: "var(--violet)",
    dim: "rgba(167,139,250,0.35)",
  },
];

export function SolutionCards() {
  return (
    <section id="solution" className="section-pad hairline-t">
      <div className="container-max">
        <SectionHeading
          eyebrow="The solution"
          title="One live model of your entire dining room."
        />

        <div className="relative mt-16">
          {/* The thread: vision → integrations → intelligence */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--teal) 12%, var(--amber) 50%, var(--violet) 88%, transparent)",
              opacity: 0.55,
            }}
          />

          <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} index={i}>
                <div className="relative pt-2 md:pt-10">
                  {/* Node on the thread */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full md:block"
                    style={{
                      backgroundColor: step.color,
                      boxShadow: `0 0 12px ${step.dim}`,
                    }}
                  />
                  {/* Ghost number */}
                  <span
                    aria-hidden="true"
                    className="block font-mono text-6xl font-extrabold leading-none tracking-tightest md:text-7xl"
                    style={{ color: step.dim }}
                  >
                    {step.n}
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-ink md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
