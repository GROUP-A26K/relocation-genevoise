'use client';
import { RevealItem } from '@/components/common/Reveal';
import HeadingText from '@/components/common/Text/HeadingText';

import type { ReactNode } from 'react';

interface IPropertyDetailSectionProps {
  title?: string;
  content: ReactNode;
}

export const PropertyDetailSection = ({
  title,
  content,
}: IPropertyDetailSectionProps) => {
  return (
    <RevealItem className="flex flex-col gap-6">
      {title && (
        <HeadingText as="h2" className="text-2xl font-semibold text-inherit">
          {title}
        </HeadingText>
      )}
      <div className="w-full">{content}</div>
    </RevealItem>
  );
};
