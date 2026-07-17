"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied into the delay. */
  index?: number;
  delay?: number;
  as?: "div" | "li" | "section";
  y?: number;
};

/**
 * Fade + rise on scroll into view, once. Respects prefers-reduced-motion
 * (renders content statically with no transform).
 */
export function Reveal({
  children,
  className,
  index = 0,
  delay = 0,
  as = "div",
  y = 16,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: delay + index * 0.08,
      }}
    >
      {children}
    </MotionTag>
  );
}
