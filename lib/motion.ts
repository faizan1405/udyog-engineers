/**
 * UDYOG ENGINEERS — MOTION DESIGN SYSTEM TOKENS (PHASE 7B)
 *
 * Mechanical optical damping easing inspired by precision focus-ring damping
 * and calibrated metrology adjustment.
 *
 * Principles:
 * - Precise, controlled, smooth, technical, premium
 * - No playful SaaS bouncing, no slow cinematic lags
 * - Strict reduced-motion compliance
 */

export const PRECISION_EASE = [0.16, 1, 0.3, 1] as const;
export const PRECISION_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DURATION = {
  fast: 0.18, // 180ms - micro-interactions, hovers, arrows
  standard: 0.24, // 240ms - menus, drawers, state changes
  reveal: 0.36, // 360ms - scroll entries, content cards
} as const;

export const STAGGER = {
  categories: 0.05, // 50ms stagger
  products: 0.06, // 60ms stagger
  credibility: 0.05, // 50ms stagger
  hero: 0.08, // 80ms stagger
} as const;

/**
 * Standard Framer Motion Variants
 */
export const createScrollRevealVariants = (reduced = false) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0 : DURATION.reveal,
      ease: PRECISION_EASE,
    },
  },
});

export const createStaggerContainerVariants = (
  staggerDelay = 0.05,
  reduced = false
) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : staggerDelay,
      delayChildren: reduced ? 0 : 0.04,
    },
  },
});

export const createTabContentVariants = (reduced = false) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0 : DURATION.standard,
      ease: PRECISION_EASE,
    },
  },
  exit: {
    opacity: reduced ? 1 : 0,
    transition: {
      duration: reduced ? 0 : DURATION.fast,
      ease: PRECISION_EASE,
    },
  },
});
