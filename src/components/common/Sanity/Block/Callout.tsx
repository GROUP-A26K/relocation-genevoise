import React from 'react';
import { Book, Siren, SunMedium } from 'lucide-react';

import { cn } from '@/libs/utils';
import HeadingText from '@/components/common/Text/HeadingText';

type TCalloutType = 'goodToKnow' | 'information' | 'error';

const STYLE_SECTION: Record<TCalloutType, string> = {
  goodToKnow: 'bg-green-50 text-green-600 border-green-100',
  information: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  error: 'bg-red-50 text-red-600 border-red-100',
};

const STYLE_ICON: Record<TCalloutType, string> = {
  goodToKnow: 'bg-green-100 text-green-600',
  information: 'bg-cyan-100 text-cyan-600',
  error: 'bg-red-100 text-red-600',
};

const STYLE_TITLE: Record<TCalloutType, string> = {
  goodToKnow: 'text-green-600',
  information: 'text-cyan-600',
  error: 'text-red-600',
};

interface ICalloutProps {
  title: string;
  content: React.ReactNode;
  sectionType: TCalloutType;
}

const Callout: React.FC<ICalloutProps> = ({ sectionType, content, title }) => {
  const Icon = {
    goodToKnow: SunMedium,
    information: Book,
    error: Siren,
  }[sectionType];

  return (
    <div className="w-full py-4 lg:py-6">
      <div
        className={cn(
          'flex flex-col items-start justify-start gap-2 rounded-2xl border border-solid p-4',
          'lg:gap-4 lg:p-6',
          STYLE_SECTION[sectionType]
        )}
      >
        <div className="flex items-center justify-start gap-2">
          {Icon && (
            <div
              className={cn('rounded-full p-[6px]', STYLE_ICON[sectionType])}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
          <HeadingText
            as="h3"
            className={cn(
              'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
              cn(
                'text-lg leading-[130%] font-semibold',
                STYLE_TITLE[sectionType]
              )
            )}
          >
            {title}
          </HeadingText>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Callout;
