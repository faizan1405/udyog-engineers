/**
 * UDYOG ENGINEERS — MOTION DESIGN SYSTEM TOKENS
 * REDESIGN R1 — ENHANCED MOTION & INTERACTION SPECIFICATION
 *
 * Mechanical optical damping easing inspired by precision focus-ring damping,
 * optical lens tracking, and dynamic field exploration.
 *
 * Principles:
 * - Dynamic, modern, energetic yet deeply professional
 * - Fast micro-interactions, smooth reveals, responsive staggered entries
 * - Strict reduced-motion compliance (instant reveals, zero motion when preferred)
 */

export const PRECISION_EASE = [0.16, 1, 0.3, 1] as const;
export const PRECISION_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DURATION = {
  micro: 0.20, // 200ms (180–250ms): micro-interactions, tags, icon shifts
  fast: 0.20, // 200ms: backwards-compatible alias
  hover: 0.28, // 280ms (250–350ms): card elevations, border transitions
  standard: 0.28, // 280ms: menus, drawers, state changes
  headline: 0.48, // 480ms (400–550ms): hero heading reveal
  reveal: 0.50, // 500ms (400–650ms): scroll reveals, content cards
  heroPlate: 0.60, // 600ms: equipment showcase entry
  heroSequence: 0.75, // 750ms: total hero staggered sequence
} as const;

export const STAGGER = {
  hero: 0.08, // 80ms: hero sequence elements
  categories: 0.07, // 70ms: category cards
  products: 0.06, // 60ms: product modules
  credibility: 0.06, // 60ms: credibility principles
} as const;

/**
 * Reveal A — Up Reveal
 * Opacity 0 -> 1, translateY 30px -> 0
 */
export const createUpRevealVariants = (
  reduced = false,
  distance = 30,
  duration: number = DURATION.reveal
) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0 : duration,
      ease: PRECISION_EASE,
    },
  },
});

/**
 * Reveal B — Side Reveal
 * Opacity 0 -> 1, translateX -40px / +40px -> 0
 */
export const createSideRevealVariants = (
  direction: "left" | "right" = "left",
  reduced = false,
  distance = 40,
  duration: number = DURATION.reveal
) => {
  const initialX = direction === "left" ? -distance : distance;
  return {
    hidden: {
      opacity: reduced ? 1 : 0,
      x: reduced ? 0 : initialX,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduced ? 0 : duration,
        ease: PRECISION_EASE,
      },
    },
  };
};

/**
 * Reveal C — Mask Reveal (Clip-Path)
 * Inset reveal from left or bottom
 */
export const createMaskRevealVariants = (
  direction: "left" | "right" | "bottom" = "left",
  reduced = false,
  duration: number = DURATION.reveal
) => {
  if (reduced) {
    return {
      hidden: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
      visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
    };
  }

  const initialClip =
    direction === "left"
      ? "inset(0% 100% 0% 0%)"
      : direction === "right"
      ? "inset(0% 0% 0% 100%)"
      : "inset(100% 0% 0% 0%)";

  return {
    hidden: {
      clipPath: initialClip,
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      transition: {
        duration,
        ease: PRECISION_EASE,
      },
    },
  };
};

/**
 * Reveal D — Scale Reveal
 * Image scale 0.96 -> 1, opacity 0 -> 1
 */
export const createScaleRevealVariants = (
  reduced = false,
  duration: number = DURATION.reveal
) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
    scale: reduced ? 1 : 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: reduced ? 0 : duration,
      ease: PRECISION_EASE,
    },
  },
});

/**
 * General Scroll Reveal (Backwards compatible)
 */
export const createScrollRevealVariants = (reduced = false) =>
  createUpRevealVariants(reduced, 24, DURATION.reveal);

/**
 * Stagger Container
 */
export const createStaggerContainerVariants = (
  staggerDelay: number = STAGGER.categories,
  reduced = false,
  initialDelay = 0.04
) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : staggerDelay,
      delayChildren: reduced ? 0 : initialDelay,
    },
  },
});

/**
 * Tab Content Switch Variants
 */
export const createTabContentVariants = (reduced = false) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : 8,
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
      duration: reduced ? 0 : DURATION.micro,
      ease: PRECISION_EASE,
    },
  },
});
