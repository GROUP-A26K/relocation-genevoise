'use client';
import { useBoolean } from 'usehooks-ts';
import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/libs/utils';
import BodyText, { bodyTextVariants } from '@/components/common/Text/BodyText';

interface IPropertyDescriptionProps {
  content: string;
}

export const PropertyDescription = ({ content }: IPropertyDescriptionProps) => {
  const t = useTranslations('PropertiesDetails');
  const isExpanded = useBoolean(false);
  const showReadMore = useBoolean(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = Number.parseInt(
        window.getComputedStyle(textRef.current).lineHeight
      );
      const height = textRef.current.scrollHeight;
      const lines = height / lineHeight;

      if (lines > 4) {
        showReadMore.setTrue();
      }
    }
  }, [content, showReadMore]);

  return (
    <div className="flex flex-col gap-3">
      <BodyText
        variant="sm"
        className={cn(
          'font-[number:inherit]',
          `text-sm leading-[130%] whitespace-pre-wrap text-black-200 ${
            !isExpanded.value && showReadMore.value ? 'line-clamp-4' : ''
          }`
        )}
        ref={textRef}
      >
        {content}
      </BodyText>
      {showReadMore.value && (
        <button
          onClick={isExpanded.toggle}
          className={cn(
            bodyTextVariants({ variant: 'md' }),
            'self-start text-base leading-6 font-semibold text-black-500 hover:underline'
          )}
        >
          {isExpanded.value
            ? t('description.readLess')
            : t('description.readMore')}
        </button>
      )}
    </div>
  );
};
