'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Content as AccordionContent } from '@radix-ui/react-accordion';

interface StepContentProps {
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
}: StepContentProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AccordionContent forceMount hidden={!isActive} className="overflow-hidden">
      {/* Remove the previous image synchronously so scroll anchoring can keep
          the new title in place. Only the opening panel changes height. */}
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
          <div className="flex max-w-180 justify-center pt-10">
            <Image
              src={image}
              alt={title}
              title={description}
              width={560}
              height={280}
              className="aspect-video h-50 min-h-50 w-fit rounded-md sm:h-70 sm:min-h-70 lg:w-full"
            />
          </div>
        </motion.div>
      )}
    </AccordionContent>
  );
};
