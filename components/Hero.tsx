"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { LiveFloor } from "./LiveFloor";
import heroBg from "@/public/herosectionbackground.webp";

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
    <section id="top" className="relative overflow-hidden">
      {/* Full-bleed camera-view background, dimmed */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dim + blend: darker at top for the nav, readable in the middle,
            dissolving into the page background at the bottom. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,20,0.88)_0%,rgba(11,15,20,0.72)_35%,rgba(11,15,20,0.78)_70%,var(--bg)_100%)]" />
        {/* Extra legibility behind the headline column */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,15,20,0.72)_0%,rgba(11,15,20,0.25)_55%,transparent_75%)]" />
      </div>

      <div className="container-max relative z-10 grid grid-cols-1 items-center gap-12 pb-24 pt-32 md:pb-32 md:pt-44 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Copy */}
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
          className="flex flex-col items-start"
        >
          <motion.p variants={reduce ? undefined : item} className="eyebrow mb-5 text-muted">
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
            <Button href="#product" variant="ghost" size="lg" className="backdrop-blur-sm">
              See it live
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </motion.div>

          <motion.div variants={reduce ? undefined : item} className="mt-10">
            <p className="text-sm text-muted">
              Works with your existing cameras, POS, reservations &amp; kitchen systems.
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-2" aria-label="Integrations (placeholders)">
              {POS_PLACEHOLDERS.map((name) => (
                <li
                  key={name}
                  className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-medium text-muted backdrop-blur-sm"
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
          <LiveFloor />
        </motion.div>
      </div>
    </section>
  );
}
