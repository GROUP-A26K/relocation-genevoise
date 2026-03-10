'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from "next-intl";

interface DescriptionProps {
  content: string;
}

export const PropertyDescription = ({ content }: DescriptionProps) => {
  const t = useTranslations("PropertiesDetails");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      const lines = height / lineHeight;
      
      if (lines > 4) {
        setShowReadMore(true);
      }
    }
  }, [content]);

  return (
    <div className="flex flex-col gap-3">
      <p
        ref={textRef}
        className={`text-sm !leading-[130%] text-black-200 ${
          !isExpanded && showReadMore ? 'line-clamp-4' : ''
        }`}
      >
        {content}
      </p>
      {showReadMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-black-500 font-semibold text-base self-start hover:underline"
        >
          {isExpanded ? t("description.readLess") : t("description.readMore")}
        </button>
      )}
    </div>
  );
};