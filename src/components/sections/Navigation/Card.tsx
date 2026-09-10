'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';

import type { FC } from 'react';

interface BaseProps {
  title: string;
  summary: string;
  image: string;
  url: string;
  variant: 'lg' | 'md';
}

type Props = BaseProps;
export const Card: FC<Props> = ({ title, summary, image, url, variant }) => {
  const STYLE_CARD: Record<'lg' | 'md', string> = {
    lg: cn('text-[14px]'),
    md: cn('text-subtle'),
  };
  const t = useTranslations('Navbar.blogButton');

  return (
    <div className="card">
      <Link
        href={url}
        className="group flex flex-row justify-start gap-[8px] p-[12px] xl:flex-col xl:justify-between"
      >
        <div>
          <div className="flex">
            <Image
              src={image}
              alt={title}
              width={256}
              height={160}
              className="h-[90px] w-[144px] rounded-xl object-cover object-center xl:h-[160px] xl:w-[256px]"
            />
          </div>
        </div>
        <div className="flex w-[296px] flex-col justify-center gap-[8px]">
          <div
            title={title}
            className="line-clamp-1 text-[14px] leading-[130%]! font-semibold wrap-break-word"
          >
            {title}
          </div>
          <div
            title={summary}
            className={cn(
              'line-clamp-2 font-normal text-black-200',
              STYLE_CARD[variant],
              'leading-[130%]'
            )}
          >
            {summary}
          </div>
          <div className="flex items-center text-[14px] leading-[130%]! font-semibold text-primary-500">
            {t('text')}
            <ArrowRight
              strokeWidth={3}
              height={12}
              width={12}
              className={cn(
                'ml-1.5 transition-transform group-hover:translate-x-1'
              )}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
