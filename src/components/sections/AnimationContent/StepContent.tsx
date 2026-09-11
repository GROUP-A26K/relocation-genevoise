'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Content as AccordionContent } from '@radix-ui/react-accordion';

interface IStepContentProps {
  isActive: boolean;
  title: string;
  description: string;
  image: string;
}

export const StepContent = ({
  isActive,
  title,
  description,
  image,
}: IStepContentProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AccordionContent forceMount hidden={!isActive} className="overflow-hidden">
      {isActive && (
        <motion.div
          initial={shouldReduceMotion ? false : { height: 0 }}
          animate={{ height: 'auto' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <div className="relative mt-8 aspect-560/280 w-full overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={title}
              title={description}
              fill
              sizes="(min-width: 640px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      )}
    </AccordionContent>
  );
};
