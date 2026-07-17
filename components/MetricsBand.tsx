"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

type Stat = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  /** amber = attention/gain, teal = under control. */
  accent: "amber" | "teal";
};

const STATS: Stat[] = [
  { prefix: "+", value: 18, suffix: "%", label: "Faster table turns", accent: "amber" },
  { prefix: "−", value: 30, suffix: "%", label: "Fewer walkaways", accent: "teal" },
  { prefix: "+", value: 22, suffix: "%", label: "Higher dessert attach", accent: "amber" },
  { value: 0, label: "New hardware needed", accent: "teal" },
];

function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setDisplay(target);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export function MetricsBand() {
  return (
    <section className="section-pad hairline-t">
      <div className="container-max">
        <Reveal>
          <p className="eyebrow mb-12 text-center">What a shift looks like on DiningOS</p>
        </Reveal>
        <dl className="grid grid-cols-2 gap-y-14 md:grid-cols-4 md:divide-x md:divide-hairline">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} index={i} className="px-4 text-center md:px-6">
              <div className="flex flex-col items-center gap-3">
                <dd
                  className={`text-6xl font-extrabold tracking-tightest md:text-7xl ${
                    stat.accent === "amber" ? "text-gradient-amber" : "text-teal"
                  }`}
                >
                  {stat.prefix}
                  <CountUp target={stat.value} />
                  {stat.suffix}
                </dd>
                <dt className="max-w-[11rem] text-sm font-medium leading-snug text-muted">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
        <p className="mt-14 text-center text-xs italic text-muted-2">
          Illustrative — replace with pilot data.
        </p>
      </div>
    </section>
  );
}
