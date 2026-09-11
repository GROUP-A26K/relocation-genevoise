'use client';

import Image, { type StaticImageData } from 'next/image';
import { motion, useTransform, type MotionValue } from 'motion/react';

import { cn } from '@/libs/utils';
import Section from '@/components/customs/Section';
import useProgressSteps from '@/hooks/useProgressSteps';
import { RevealItem } from '@/components/customs/Reveal';

export type TRentalStep = {
  title: string;
  description: string;
};

interface IOurRentalProcessProps {
  eyebrow: string;
  heading: string;
  image: {
    src: string | StaticImageData;
    alt: string;
  };
  steps: TRentalStep[];
}

const MARKER_CLASS_NAME =
  'flex size-9 items-center justify-center rounded-[10px] lg:size-11';

const MARKER_LABEL_CLASS_NAME =
  'text-lg leading-[130%]! font-semibold lg:text-2xl';

export default function OurRentalProcess({
  eyebrow,
  heading,
  image,
  steps,
}: IOurRentalProcessProps) {
  const { progress, activeStep, railRefs, markerRefs, selectStep } =
    useProgressSteps(steps.length);

  if (!steps?.length) {
    return null;
  }

  return (
    <Section className="bg-white">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
        <RevealItem className="flex flex-col gap-12 lg:flex-1 lg:self-start">
          <div className="flex flex-col gap-3">
            <p className="text-sm leading-[130%]! font-semibold text-yellow-600">
              {eyebrow}
            </p>
            <h2 className="text-[32px] leading-[130%]! font-bold text-pretty text-black-500 lg:text-[40px]">
              {heading}
            </h2>
          </div>

          <div className="relative aspect-572/420 w-full overflow-hidden rounded-3xl">
            <Image
              src={image.src}
              alt={image.alt}
              title={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              draggable={false}
            />
          </div>
        </RevealItem>

        <RevealItem className="flex flex-col lg:flex-1">
          <ol className="flex flex-col">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isReached = index <= activeStep;
              const isLast = index === steps.length - 1;
              const label = String(index + 1).padStart(2, '0');

              return (
                <li key={step.title} className="flex gap-4 lg:gap-8">
                  <div
                    ref={(node) => {
                      railRefs.current[index] = node;
                    }}
                    className="relative flex shrink-0 flex-col items-center self-stretch"
                  >
                    <button
                      ref={(node) => {
                        markerRefs.current[index] = node;
                      }}
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-label={`Step ${index + 1}: ${step.title}`}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        MARKER_CLASS_NAME,
                        'cursor-pointer border border-grey-200 bg-transparent transition-colors duration-300 hover:border-secondary-500'
                      )}
                    >
                      <span
                        className={cn(
                          MARKER_LABEL_CLASS_NAME,
                          'text-black-100'
                        )}
                      >
                        {label}
                      </span>
                    </button>

                    <div
                      className={cn(
                        'w-px flex-1',
                        isLast
                          ? 'bg-linear-to-b from-grey-200 to-transparent'
                          : 'bg-grey-200'
                      )}
                    />

                    <StepFill progress={progress} index={index} label={label} />
                  </div>

                  <div
                    className={cn(
                      'flex min-w-0 flex-1 flex-col gap-3 pb-8 lg:pb-12',
                      {
                        'pb-0 lg:pb-0': isLast,
                      }
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => selectStep(index)}
                      className="flex min-h-9 cursor-pointer items-center text-left lg:min-h-11"
                    >
                      <h3
                        className={cn(
                          'text-2xl leading-[130%]! font-semibold transition-colors duration-300',
                          isReached ? 'text-black-500' : 'text-black-100'
                        )}
                      >
                        {step.title}
                      </h3>
                    </button>
                    <p
                      className={cn(
                        'text-base leading-[150%]! font-normal transition-colors duration-300',
                        isReached ? 'text-black-300' : 'text-black-100'
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </RevealItem>
      </div>
    </Section>
  );
}

interface StepFillProps {
  progress: MotionValue<number>;
  index: number;
  label: string;
}

// Filled copy of the rail laid over the grey one and revealed top-down, so the
// fill runs through the marker and its line as one continuous stroke.
function StepFill({ progress, index, label }: StepFillProps) {
  const clipPath = useTransform(progress, (value) => {
    const filled = Math.min(Math.max(value - index, 0), 1);

    return `inset(0 0 ${(1 - filled) * 100}% 0)`;
  });

  return (
    <motion.div
      aria-hidden
      style={{ clipPath }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center"
    >
      <span className={cn(MARKER_CLASS_NAME, 'bg-secondary-500')}>
        <span className={cn(MARKER_LABEL_CLASS_NAME, 'text-black-500')}>
          {label}
        </span>
      </span>
      <span className="w-px flex-1 bg-secondary-500" />
    </motion.div>
  );
}
