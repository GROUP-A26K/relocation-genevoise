'use client';

import { useBoolean } from 'usehooks-ts';
import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface IDescriptionProps {
  content: string;
}

export const PropertyDescription = ({ content }: IDescriptionProps) => {
  const t = useTranslations('PropertiesDetails');
  const isExpanded = useBoolean(false);
  const showReadMore = useBoolean(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
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
      <p
        ref={textRef}
        className={`text-sm leading-[130%]! whitespace-pre-wrap text-black-200 ${
          !isExpanded.value && showReadMore.value ? 'line-clamp-4' : ''
        }`}
      >
        {content}
      </p>
      {showReadMore.value && (
        <button
          onClick={isExpanded.toggle}
          className="self-start text-base font-semibold text-black-500 hover:underline"
        >
          {isExpanded.value
            ? t('description.readLess')
            : t('description.readMore')}
        </button>
      )}
    </div>
  );
};
