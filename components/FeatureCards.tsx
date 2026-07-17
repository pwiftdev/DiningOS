import { LayoutGrid, Timer, TrendingUp, BellRing } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

const FEATURES: {
  tag: string;
  title: string;
  body: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    tag: "Floor",
    title: "Live Dining Room Intelligence",
    body: "Every table's status at a glance — seated, waiting, dessert, ready to pay, dirty — without walking the floor.",
    icon: LayoutGrid,
    color: "var(--teal)",
  },
  {
    tag: "Service",
    title: "Service Performance Intelligence",
    body: "Wait, greeting, food delivery, payment and reset times. Every shift becomes measurable.",
    icon: Timer,
    color: "var(--amber)",
  },
  {
    tag: "Revenue",
    title: "Revenue Intelligence",
    body: "Dessert conversions, upsells, walkaways, idle tables and lost seatings — the revenue POS can't see.",
    icon: TrendingUp,
    color: "var(--violet)",
  },
  {
    tag: "Alerts",
    title: "Real-Time AI Alerts & Reports",
    body: "Proactive nudges during service, and an automatic operational summary when the shift ends.",
    icon: BellRing,
    color: "var(--amber)",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="section-pad hairline-t">
      <div className="container-max">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Sticky heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow mb-5">What we offer</p>
              </Reveal>
              <Reveal index={1}>
                <h2 className="text-balance text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
                  What DiningOS gives you.
                </h2>
              </Reveal>
              <Reveal index={2}>
                <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted">
                  Four layers of intelligence, one system. Everything reads from the floor up.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Editorial feature index */}
          <div className="lg:col-span-7 lg:col-start-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} index={i}>
                  <div className="group border-b border-hairline py-9 first:pt-0 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <Icon
                        size={17}
                        aria-hidden="true"
                        style={{ color: f.color }}
                      />
                      <span
                        className="text-xs font-semibold uppercase tracking-eyebrow"
                        style={{ color: f.color }}
                      >
                        {f.tag}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-hairline transition-colors duration-300"
                      />
                      <span className="font-mono text-xs font-semibold tabular-nums text-muted-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink transition-transform duration-300 ease-out group-hover:translate-x-1.5 md:text-[1.7rem]">
                      {f.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
