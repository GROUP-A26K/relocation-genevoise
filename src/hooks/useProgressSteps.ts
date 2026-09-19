import { useCallback, useEffect, useRef, useState } from 'react';
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type AnimationPlaybackControls,
} from 'motion/react';

const FILL_SPEED_PX_PER_SECOND = 60;

const JUMP_SPRING = {
  type: 'spring',
  stiffness: 120,
  damping: 17,
} as const;

type TProgressStart = {
  step: number;
  jump: boolean;
};

export default function useProgressSteps(stepCount: number) {
  const progress = useMotionValue(0);
  const [activeStep, setActiveStep] = useState(0);
  const [start, setStart] = useState<TProgressStart>({ step: 0, jump: false });

  const railRefs = useRef<(HTMLElement | null)[]>([]);
  const markerRefs = useRef<(HTMLElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(progress, 'change', (value) => {
    setActiveStep(Math.min(Math.max(Math.ceil(value) - 1, 0), stepCount - 1));
  });

  const selectStep = useCallback(
    (index: number) => {
      if (stepCount === 0) {
        return;
      }

      setStart({
        step: Math.min(Math.max(index, 0), stepCount - 1),
        jump: true,
      });
    },
    [stepCount]
  );

  useEffect(() => {
    if (stepCount === 0) {
      return;
    }

    if (shouldReduceMotion) {
      progress.jump(start.step + 1);
      return;
    }

    let cancelled = false;
    let controls: AnimationPlaybackControls | undefined;

    const getMarkerRatio = (step: number) => {
      const railHeight = railRefs.current[step]?.offsetHeight ?? 0;
      const markerHeight = markerRefs.current[step]?.offsetHeight ?? 0;

      return railHeight > 0 ? markerHeight / railHeight : 0;
    };

    const springTo = async (step: number) => {
      controls = animate(progress, step + getMarkerRatio(step), JUMP_SPRING);
      await controls.finished;
    };

    const fill = async (step: number) => {
      const remaining = Math.max(step + 1 - progress.get(), 0);
      const railHeight = railRefs.current[step]?.offsetHeight ?? 0;

      controls = animate(progress, step + 1, {
        duration: (remaining * railHeight) / FILL_SPEED_PX_PER_SECOND,
        ease: 'linear',
      });
      await controls.finished;
    };

    const play = async () => {
      let step = start.step;

      if (start.jump) {
        await springTo(step);
      }

      while (!cancelled) {
        await fill(step);

        if (cancelled) {
          return;
        }

        step += 1;

        if (step === stepCount) {
          step = 0;
          progress.jump(0);
        }
      }
    };

    void play();

    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [progress, shouldReduceMotion, start, stepCount]);

  return {
    progress,
    activeStep,
    railRefs,
    markerRefs,
    selectStep,
  };
}
