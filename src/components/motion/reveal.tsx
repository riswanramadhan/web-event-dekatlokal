"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  once?: boolean;
};

function hiddenOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
      return { x: 0, y: 0 };
    case "up":
    default:
      return { x: 0, y: distance };
  }
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 22,
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = hiddenOffset(direction, distance);

  return (
    <motion.div
      className={className}
      data-motion-reveal=""
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, ...offset }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{
        once,
        amount: 0.16,
        margin: "-5% 0px -7% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.62,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
