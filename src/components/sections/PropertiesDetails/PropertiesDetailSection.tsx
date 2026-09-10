'use client';
import { RevealItem } from '@/components/customs/Reveal';

import type { ReactNode } from 'react';

interface PropertyDetailSectionProps {
  title?: string;
  content: ReactNode;
}

export const PropertyDetailSection = ({
  title,
  content,
}: PropertyDetailSectionProps) => {
  return (
    <RevealItem className="flex flex-col gap-6">
      {title && (
        <h2 className="text-2xl leading-[130%]! font-semibold">{title}</h2>
      )}
      <div className="w-full">{content}</div>
    </RevealItem>
  );
};
