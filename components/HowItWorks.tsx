import { PlugZap, Map, MonitorPlay } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const STEPS: { n: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    n: "01",
    title: "Connect what you already run",
    body: "Point DiningOS at your existing cameras and systems. No new hardware to buy or install.",
    icon: PlugZap,
  },
  {
    n: "02",
    title: "We map your floor",
    body: "We model your sections, tables and stations — and go live in days, not months.",
    icon: Map,
  },
  {
    n: "03",
    title: "See it live, get a report",
    body: "Watch the floor in real time and receive an operational summary at the end of every shift.",
    icon: MonitorPlay,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad">
      <div className="container-max">
        <SectionHeading eyebrow="How it works" title="Live in days, not months." />

        <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.n} index={i}>
                <div className="relative flex h-full flex-col gap-5 rounded-2xl border border-hairline bg-panel p-7">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-panel-2 text-amber">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-muted-2">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-ink">{step.title}</h3>
                  <p className="text-pretty leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
