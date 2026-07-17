"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { LiveFloor } from "./LiveFloor";

const POS_PLACEHOLDERS = ["Toast", "Square", "OpenTable", "Resy"];

export function Hero() {
  const reduce = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };

  return (
    <section id="top" className="grain relative overflow-hidden">
      {/* Ambient glow drift behind hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className={`glow-blob absolute -left-[10%] top-[-15%] h-[520px] w-[520px] rounded-full ${
            reduce ? "" : "animate-glow-drift"
          }`}
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.20), transparent 62%)" }}
        />
        <div
          className={`glow-blob absolute right-[-8%] top-[8%] h-[440px] w-[440px] rounded-full ${
            reduce ? "" : "animate-glow-drift"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(45,212,191,0.16), transparent 62%)",
            animationDelay: "-8s",
          }}
        />
      </div>

      <div className="container-max relative z-10 grid grid-cols-1 items-center gap-12 pb-20 pt-28 md:pb-28 md:pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Copy */}
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
          className="flex flex-col items-start"
        >
          <motion.p variants={reduce ? undefined : item} className="eyebrow mb-5">
            The AI operating system for restaurants
          </motion.p>
          <motion.h1
            variants={reduce ? undefined : item}
            className="text-balance text-4xl font-extrabold leading-[1.04] tracking-tightest text-ink sm:text-5xl md:text-6xl"
          >
            Your restaurant, finally{" "}
            <span className="text-gradient-amber">readable</span> in real time.
          </motion.h1>
          <motion.p
            variants={reduce ? undefined : item}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            DiningOS turns the cameras and systems you already run into one live operational brain —
            so managers stop reacting and start running the floor.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#demo" size="lg">
              Book a demo
            </Button>
            <Button href="#product" variant="ghost" size="lg">
              See it live
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </motion.div>

          <motion.div variants={reduce ? undefined : item} className="mt-10">
            <p className="text-sm text-muted-2">
              Works with your existing cameras, POS, reservations &amp; kitchen systems.
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-2" aria-label="Integrations (placeholders)">
              {POS_PLACEHOLDERS.map((name) => (
                <li
                  key={name}
                  className="rounded-md border border-hairline bg-white/[0.02] px-2.5 py-1 text-xs font-medium text-muted-2"
                  title="Placeholder"
                >
                  {name}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Live Floor visual */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          {/* soft platform glow under the widget */}
          <div
            aria-hidden="true"
            className="absolute inset-x-6 -bottom-6 top-10 -z-10 rounded-[2rem] opacity-70 blur-2xl"
            style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(245,166,35,0.14), transparent 70%)" }}
          />
          <LiveFloor />
        </motion.div>
      </div>
    </section>
  );
}
