'use client';

import { useRef } from 'react';
import { useBoolean } from 'usehooks-ts';
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from 'motion/react';

import useScrollDirection from '@/hooks/useScrollDirection';

import { reducedStaggerVariant, staggerVariant } from './variants';

const ENTER_MARGIN = '-20% 0px -20% 0px';

export type TRevealTrigger = 'inView' | 'load';

interface IRevealSectionProps extends HTMLMotionProps<'div'> {
  once?: boolean;
  trigger?: TRevealTrigger;
  amount?: 'some' | 'all' | number;
}

export default function RevealSection({
  children,
  once = false,
  amount = 'some',
  trigger = 'inView',
  ...rest
}: IRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const direction = useScrollDirection();

  const shouldReduceMotion = useReducedMotion();

  const isInTriggerArea = useInView(ref, {
    once,
    amount,
    margin: ENTER_MARGIN,
  });
  const isOnScreen = useInView(ref, { amount: 'some' });

  const {
    value: revealed,
    setTrue: reveal,
    setFalse: resetReveal,
  } = useBoolean(false);

  if (isInTriggerArea) {
    if (!revealed) {
      reveal();
    }
  } else if (revealed && !once && !isOnScreen) {
    resetReveal();
  }

  const hiddenLabel = direction === 'up' ? 'hiddenUp' : 'hiddenDown';
  const animate =
    shouldReduceMotion || trigger === 'load' || revealed
      ? 'visible'
      : hiddenLabel;

  return (
    <motion.div
      ref={ref}
      data-reveal="section"
      initial="hiddenDown"
      animate={animate}
      variants={shouldReduceMotion ? reducedStaggerVariant : staggerVariant}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
