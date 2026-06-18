import { useCallback, useState } from "react";

export default function useProgressSteps(stepCount: number) {
  const [activeStep, setActiveStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const restartAnimation = useCallback(() => {
    setAnimationKey((key) => key + 1);
  }, []);

  const selectStep = useCallback(
    (index: number) => {
      if (stepCount === 0) {
        return;
      }

      setActiveStep(Math.min(Math.max(index, 0), stepCount - 1));
      restartAnimation();
    },
    [restartAnimation, stepCount],
  );

  const advanceStep = useCallback(() => {
    if (stepCount === 0) {
      return;
    }

    setActiveStep((step) => (step + 1) % stepCount);
    restartAnimation();
  }, [restartAnimation, stepCount]);

  return {
    activeStep,
    animationKey,
    selectStep,
    advanceStep,
  };
}
