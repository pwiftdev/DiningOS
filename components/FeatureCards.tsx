import { LayoutGrid, Timer, TrendingUp, BellRing } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Accent = "teal" | "amber" | "violet";

const FEATURES: {
  tag: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent: Accent;
}[] = [
  {
    tag: "Floor",
    title: "Live Dining Room Intelligence",
    body: "Every table's status at a glance — seated, waiting, dessert, ready to pay, dirty — without walking the floor.",
    icon: LayoutGrid,
    accent: "teal",
  },
  {
    tag: "Service",
    title: "Service Performance Intelligence",
    body: "Wait, greeting, food delivery, payment and reset times. Every shift becomes measurable.",
    icon: Timer,
    accent: "amber",
  },
  {
    tag: "Revenue",
    title: "Revenue Intelligence",
    body: "Dessert conversions, upsells, walkaways, idle tables and lost seatings — the revenue POS can't see.",
    icon: TrendingUp,
    accent: "violet",
  },
  {
    tag: "Alerts",
    title: "Real-Time AI Alerts & Reports",
    body: "Proactive nudges during service, and an automatic operational summary when the shift ends.",
    icon: BellRing,
    accent: "amber",
  },
];

const ACCENT: Record<Accent, { text: string; chip: string; hover: string }> = {
  teal: {
    text: "text-teal",
    chip: "border-[color:rgba(45,212,191,0.3)] text-teal",
    hover: "hover:border-[color:rgba(45,212,191,0.5)]",
  },
  amber: {
    text: "text-amber",
    chip: "border-[color:rgba(245,166,35,0.3)] text-amber",
    hover: "hover:border-[color:rgba(245,166,35,0.5)]",
  },
  violet: {
    text: "text-violet",
    chip: "border-[color:rgba(167,139,250,0.3)] text-violet",
    hover: "hover:border-[color:rgba(167,139,250,0.5)]",
  },
};

export function FeatureCards() {
  return (
    <section id="features" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="What we offer"
          title="What DiningOS gives you."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURES.map((f, i) => {
            const a = ACCENT[f.accent];
            const Icon = f.icon;
            return (
              <Reveal key={f.title} index={i}>
                <div
                  className={`group flex h-full gap-5 rounded-2xl border border-hairline bg-panel p-7 transition-all duration-200 hover:-translate-y-1 ${a.hover}`}
                >
                  <span className={`mt-0.5 shrink-0 ${a.text}`}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-3">
                    <span
                      className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider ${a.chip}`}
                    >
                      {f.tag}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-ink">{f.title}</h3>
                    <p className="text-pretty leading-relaxed text-muted">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
