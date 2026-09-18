'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/libs/utils';
import { BodyText } from '@/components/common/Text';
import { Link, type THref } from '@/libs/i18nNavigation';

interface ICardProps {
  title: string;
  summary: string;
  image: string;
  imageAlt?: string;
  imageLqip?: string;
  url: THref;
  variant: 'lg' | 'md';
}

export const Card: React.FC<ICardProps> = ({
  title,
  summary,
  image,
  imageAlt,
  imageLqip,
  url,
  variant,
}) => {
  const t = useTranslations('Navbar');

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
              placeholder={imageLqip ? 'blur' : 'empty'}
              blurDataURL={imageLqip}
              alt={imageAlt || title}
              title={imageAlt || title}
              width={256}
              height={160}
              className="h-[90px] w-[144px] rounded-xl object-cover object-center xl:h-[160px] xl:w-[256px]"
            />
          </div>
        </div>
        <div className="flex w-[296px] flex-col justify-center gap-[8px]">
          <BodyText
            title={title}
            variant="sm"
            className="line-clamp-1 font-semibold wrap-break-word text-inherit"
          >
            {title}
          </BodyText>
          <BodyText
            title={summary}
            variant={variant === 'lg' ? 'sm' : 'xs'}
            className={cn('line-clamp-2', variant === 'md' && 'text-inherit')}
          >
            {summary}
          </BodyText>
          <BodyText
            variant="sm"
            className="flex items-center font-semibold text-primary-500"
          >
            {t('blogButton.text')}
            <ArrowRight
              strokeWidth={3}
              height={12}
              width={12}
              className={cn(
                'ml-1.5 transition-transform group-hover:translate-x-1'
              )}
            />
          </BodyText>
        </div>
      </Link>
    </div>
  );
};
