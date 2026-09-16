'use client';
import { RevealItem } from '@/components/common/Reveal';

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
        <h2 className="text-2xl leading-[130%]! font-semibold">{title}</h2>
      )}
      <div className="w-full">{content}</div>
    </RevealItem>
  );
};
