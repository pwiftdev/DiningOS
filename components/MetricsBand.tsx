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
    <section className="section-pad">
      <div className="container-max">
        <div className="rounded-3xl border border-hairline bg-panel-2 px-6 py-12 md:px-12 md:py-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} index={i} className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <dd
                    className={`text-5xl font-extrabold tracking-tightest md:text-6xl ${
                      stat.accent === "amber" ? "text-gradient-amber" : "text-teal"
                    }`}
                  >
                    {stat.prefix}
                    <CountUp target={stat.value} />
                    {stat.suffix}
                  </dd>
                  <dt className="max-w-[10rem] text-sm font-medium leading-snug text-muted">
                    {stat.label}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>
          <p className="mt-10 text-center text-xs italic text-muted-2">
            Illustrative — replace with pilot data.
          </p>
        </div>
      </div>
    </section>
  );
}
