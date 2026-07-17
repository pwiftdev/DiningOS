import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { LiveFloor } from "./LiveFloor";

const KPIS = [
  { label: "Avg wait", value: "6m 40s", trend: "−1m 12s", good: true },
  { label: "Table turns", value: "3.4", trend: "+0.4", good: true },
  { label: "Dessert attach", value: "31%", trend: "+6pt", good: true },
  { label: "Walkaways", value: "2", trend: "−3", good: true },
];

export function ProductShowcase() {
  return (
    <section id="product" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="The product"
          title="The floor on a tablet. The shift in your inbox."
          intro="A tablet on the host stand shows the floor live. A report lands in your inbox when the shift ends. Nothing to learn."
        />

        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Tablet bezel */}
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col rounded-[1.75rem] border border-hairline bg-gradient-to-b from-[#1a222c] to-[#0e131a] p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              <div className="flex flex-1 flex-col rounded-[1.35rem] border border-hairline bg-bg p-3">
                {/* tablet status bar */}
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-[0.7rem] font-medium text-muted-2">Host stand · iPad</span>
                  <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-teal">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Connected
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <LiveFloor />
                </div>
              </div>
              {/* camera dot */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-hairline"
              />
            </div>
          </Reveal>

          {/* Shift report card */}
          <Reveal index={1}>
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-hairline bg-panel p-7 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow mb-1.5">Shift report</p>
                  <p className="text-sm text-muted-2">Friday dinner · 5:00–11:00pm</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-hairline px-2.5 py-1 text-xs text-muted-2">
                  Auto-sent
                </span>
              </div>

              {/* Headline number */}
              <div className="rounded-xl border border-[color:rgba(245,166,35,0.28)] bg-[linear-gradient(180deg,rgba(245,166,35,0.10),transparent)] p-6">
                <p className="text-sm font-medium text-muted">Revenue recovered this shift</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tightest text-gradient-amber md:text-5xl">
                    +$1,240
                  </span>
                  <span className="text-sm text-muted-2">illustrative</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  From faster resets on 4 turned tables and 11 recovered dessert prompts.
                </p>
              </div>

              {/* KPI tiles */}
              <div className="grid grid-cols-2 gap-3">
                {KPIS.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-hairline bg-panel-2 p-4"
                  >
                    <p className="text-xs font-medium text-muted-2">{kpi.label}</p>
                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-ink">{kpi.value}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-teal">
                      <ArrowUpRight size={12} aria-hidden="true" />
                      {kpi.trend} vs last Fri
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs italic text-muted-2">
                Illustrative — replace with pilot data.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
