'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, PhoneCall } from 'lucide-react';

import { cn } from '@/libs/utils';
import { getTelHref } from '@/utils/contact';
import { BodyText } from '@/components/common/Text';

interface IPhoneButtonProps {
  phoneNumber: string;
  className?: string;
}

const PhoneButton = ({ phoneNumber, className }: IPhoneButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BodyText
      asChild
      variant="md"
      className={cn(
        'flex w-fit items-center gap-2 rounded-3xl px-4 py-5 font-semibold text-black-500 no-underline hover:text-black-500',
        className
      )}
    >
      <Link
        href={getTelHref(phoneNumber)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <span className="relative flex items-center gap-2">
          <motion.span
            aria-hidden
            className="relative block size-4 shrink-0"
            animate={
              isHovered ? { rotate: [0, -12, 10, -8, 6, 0] } : { rotate: 0 }
            }
            transition={
              isHovered
                ? {
                    duration: 0.6,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }
                : { duration: 0.2 }
            }
          >
            <Phone
              strokeWidth={3}
              className={cn(
                'absolute inset-0 size-4 transition-opacity duration-200',
                isHovered ? 'opacity-0' : 'opacity-100'
              )}
            />
            <PhoneCall
              strokeWidth={3}
              className={cn(
                'absolute inset-0 size-4 transition-opacity duration-200',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            />
          </motion.span>
          <span>{phoneNumber}</span>
          <motion.span
            aria-hidden
            className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-current"
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </Link>
    </BodyText>
  );
};

export default PhoneButton;
