import type { Variants } from 'motion/react';

const OFFSET = 72;

const ENTER = {
  duration: 0.85,
  ease: [0.16, 1, 0.3, 1],
} as const;

const INSTANT = { duration: 0 } as const;

export const revealVariant: Variants = {
  hiddenDown: { opacity: 0, y: OFFSET, transition: INSTANT },
  hiddenUp: { opacity: 0, y: -OFFSET, transition: INSTANT },
  visible: { opacity: 1, y: 0, transition: ENTER },
};

export const staggerVariant: Variants = {
  hiddenDown: {},
  hiddenUp: {},
  visible: {
    transition: { delayChildren: 0.05, staggerChildren: 0.09 },
  },
};

export const INSTANT_TRANSITION = INSTANT;

export const reducedStaggerVariant: Variants = {
  hiddenDown: {},
  hiddenUp: {},
  visible: {
    transition: { delayChildren: 0, staggerChildren: 0 },
  },
};
