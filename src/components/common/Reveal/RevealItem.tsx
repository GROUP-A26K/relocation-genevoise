'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

import { INSTANT_TRANSITION, revealVariant } from './variants';

const TAGS = {
  div: motion.div,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
} as const;

interface IRevealItemProps extends HTMLMotionProps<'div'> {
  as?: keyof typeof TAGS;
}

export default function RevealItem({
  as = 'div',
  children,
  ...rest
}: IRevealItemProps) {
  const Component = TAGS[as] as typeof motion.div;

  const shouldReduceMotion = useReducedMotion();

  return (
    <Component
      data-reveal="item"
      variants={revealVariant}
      transition={shouldReduceMotion ? INSTANT_TRANSITION : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}
