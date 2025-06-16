'use client';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';
import Image from 'next/image';
import { cn } from '@/libs/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/libs/i18nNavigation';

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
    md: cn('text-[12px]'),
  };
  const t = useTranslations('Navbar.blogButton');

  return (
    <div className='card'>
      <Link
        href={url}
        className='group flex xl:flex-col flex-row gap-[8px] xl:justify-between justify-start p-[12px]'
      >
        <div>
          <div className='flex'>
            <Image
              src={image}
              alt={title}
              width={256}
              height={160}
              className='xl:h-[160px] xl:w-[256px] h-[90px] w-[144px] object-cover object-center rounded-xl'
            />
          </div>
        </div>
        <div className='flex flex-col gap-[8px] w-[296px] justify-center'>
          <div
            title={title}
            className='line-clamp-1 break-words text-[14px] font-semibold !leading-[130%]'
          >
            {title}
          </div>
          <div
            title={summary}
            className={cn(
              'line-clamp-2 text-black-200 font-normal ',
              STYLE_CARD[variant],
              'leading-[130%]'
            )}
          >
            {summary}
          </div>
          <div className='flex items-center text-[14px] text-primary-500 font-semibold !leading-[130%]'>
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
