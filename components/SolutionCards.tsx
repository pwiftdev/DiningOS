import { Camera, Plug, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Accent = "teal" | "amber" | "violet";

const CARDS: {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent: Accent;
}[] = [
  {
    n: "01",
    title: "Computer vision reads the floor",
    body: "Table states, wait times, queues and resets, read continuously from the cameras you already have.",
    icon: Camera,
    accent: "teal",
  },
  {
    n: "02",
    title: "Integrations read the business",
    body: "POS, reservations, kitchen displays and payments, stitched into one operational timeline.",
    icon: Plug,
    accent: "amber",
  },
  {
    n: "03",
    title: "AI turns both into decisions",
    body: "Not another dashboard. Proactive, ranked actions delivered the moment they matter.",
    icon: Sparkles,
    accent: "violet",
  },
];

const ACCENT: Record<Accent, { text: string; ring: string; hover: string; glow: string }> = {
  teal: {
    text: "text-teal",
    ring: "border-[color:rgba(45,212,191,0.35)]",
    hover: "hover:border-[color:rgba(45,212,191,0.5)]",
    glow: "rgba(45,212,191,0.14)",
  },
  amber: {
    text: "text-amber",
    ring: "border-[color:rgba(245,166,35,0.35)]",
    hover: "hover:border-[color:rgba(245,166,35,0.5)]",
    glow: "rgba(245,166,35,0.14)",
  },
  violet: {
    text: "text-violet",
    ring: "border-[color:rgba(167,139,250,0.35)]",
    hover: "hover:border-[color:rgba(167,139,250,0.5)]",
    glow: "rgba(167,139,250,0.14)",
  },
};

export function SolutionCards() {
  return (
    <section id="solution" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="The solution"
          title="One live model of your entire dining room."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => {
            const a = ACCENT[card.accent];
            const Icon = card.icon;
            return (
              <Reveal key={card.n} index={i}>
                <div
                  className={`group relative flex h-full flex-col gap-5 rounded-2xl border border-hairline bg-panel p-7 transition-all duration-200 hover:-translate-y-1 ${a.hover}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-panel-2 ${a.ring} ${a.text}`}
                      style={{ boxShadow: `0 0 24px -12px ${a.glow}` }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className={`font-mono text-sm font-semibold tabular-nums ${a.text}`}>
                      {card.n}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-ink">{card.title}</h3>
                  <p className="text-pretty leading-relaxed text-muted">{card.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
