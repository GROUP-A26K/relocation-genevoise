"use client";

import Image, { type StaticImageData } from "next/image";

import { cn } from "@/libs/utils";
import useProgressSteps from "@/hooks/useProgressSteps";
import Section from "@/components/customs/Section";

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

export default function OurRentalProcess({
  eyebrow,
  heading,
  image,
  steps,
}: IOurRentalProcessProps) {
  const { activeStep, animationKey, selectStep, advanceStep } =
    useProgressSteps(steps.length);

  if (!steps?.length) {
    return null;
  }

  return (
    <Section className="bg-white">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
        <div className="flex flex-col gap-12 lg:flex-1 lg:self-start">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold !leading-[130%] text-yellow-600">
              {eyebrow}
            </p>
            <h2 className="text-pretty text-[32px] font-bold !leading-[130%] text-black-500 lg:text-[40px]">
              {heading}
            </h2>
          </div>

          <div className="relative aspect-[572/420] w-full overflow-hidden rounded-3xl">
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
        </div>

        <ol className="flex flex-col lg:flex-1">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isComplete = index < activeStep;
            const isReached = index <= activeStep;
            const isLast = index === steps.length - 1;

            return (
              <li key={step.title} className="flex gap-4 lg:gap-8">
                <div className="flex shrink-0 flex-col items-center self-stretch">
                  <button
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-label={`Step ${index + 1}: ${step.title}`}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "flex size-9 cursor-pointer items-center justify-center rounded-[10px] border transition-colors duration-300 lg:size-11",
                      isReached
                        ? "border-transparent bg-secondary-500"
                        : "border-grey-200 bg-transparent hover:border-secondary-500",
                    )}
                  >
                    <span
                      className={cn(
                        "text-lg font-semibold !leading-[130%] transition-colors duration-300 lg:text-2xl",
                        isReached ? "text-black-500" : "text-black-100",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "relative w-px flex-1 overflow-hidden",
                      isLast
                        ? "bg-gradient-to-b from-grey-200 to-transparent"
                        : "bg-grey-200",
                    )}
                  >
                    {isComplete && (
                      <span className="absolute inset-0 bg-secondary-500" />
                    )}

                    {isActive && (
                      <span
                        key={`${activeStep}-${animationKey}`}
                        onAnimationEnd={advanceStep}
                        className="progress-step-animation absolute inset-0 origin-top bg-secondary-500"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "flex min-w-0 flex-1 flex-col gap-3 pb-8 lg:pb-12",
                    {
                      "pb-0 lg:pb-0": isLast,
                    },
                  )}
                >
                  <button
                    type="button"
                    onClick={() => selectStep(index)}
                    className="flex min-h-9 cursor-pointer items-center text-left lg:min-h-11"
                  >
                    <h3
                      className={cn(
                        "text-2xl font-semibold !leading-[130%] transition-colors duration-300",
                        isReached ? "text-black-500" : "text-black-100",
                      )}
                    >
                      {step.title}
                    </h3>
                  </button>
                  <p
                    className={cn(
                      "text-base font-normal !leading-[150%] transition-colors duration-300",
                      isReached ? "text-black-300" : "text-black-100",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
