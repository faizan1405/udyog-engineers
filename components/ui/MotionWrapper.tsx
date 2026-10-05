"use client";

import React from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";

/**
 * ANIMATION READINESS WRAPPER (PHASE 7B)
 *
 * Provides typed Framer Motion containers adhering to:
 * - Damped mechanical focus-ring easing [0.16, 1, 0.3, 1]
 * - Standard durations (fast 180ms, standard 240ms, reveal 360ms)
 * - Strict reduced-motion compliance (useReducedMotion hook)
 */

export interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  duration = DURATION.standard,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        ease: PRECISION_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  offsetY = 16,
  delay = 0,
  ...props
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : offsetY,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : DURATION.reveal,
        delay: shouldReduceMotion ? 0 : delay,
        ease: PRECISION_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { motion };
