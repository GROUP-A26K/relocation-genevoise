'use client';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import { Badge } from '@/components/ui/badge';

import type { Blog } from '@/models/BLog';

export const BlogBGCard: React.FC<Blog> = ({
  title,
  description,
  imageUrl,
  category,
  timeToRead,
  publishedDate,
  href,
  author,
}) => {
  const locale = useLocale();
  return (
    <Link href={href}>
      <article
        className={cn(
          'flex flex-col-reverse items-start gap-5 rounded-2xl',
          'md:flex-row md:gap-8 md:bg-grey-50'
        )}
      >
        <div
          className={cn(
            'flex w-full flex-col justify-between gap-6 self-stretch',
            'max-w-[340px] md:p-8 lg:max-w-[432px]'
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {category.map((cat) => (
                <Badge
                  key={cat.title}
                  className="bg-blue-50 text-sm leading-[130%]! font-medium text-blue-500 shadow-none hover:bg-blue-50"
                >
                  {cat.title}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h2
                title={title}
                className="text-xl leading-[130%]! font-semibold text-black-500 group-hover:text-black-600 lg:text-3xl"
              >
                {title}
              </h2>
              <p
                title={description}
                className="text-sm leading-[130%]! font-normal text-black-200 lg:text-base"
              >
                {description}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Image
                alt="Article author"
                title="Article author"
                src={author.imageUrl}
                width={40}
                height={40}
                className="size-10 rounded-full bg-gray-100 object-cover object-center"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="text-base leading-[130%]! font-semibold text-grey-700">
                  {author.name}
                </p>
                <p className="text-sm leading-[130%]! font-normal text-grey-700">
                  {publishedDate}
                </p>
              </div>
            </div>
            <div className="flex items-end text-xs leading-[130%]! font-medium text-black-100 lg:text-sm">
              {timeToRead}{' '}
              {locale === 'fr' ? 'minutes de lecture' : 'minutes read'}
            </div>
          </div>
        </div>

        <div className={cn('w-full self-stretch', 'lg:w-[776px]')}>
          <Image
            alt="Assurance Genevoise Article"
            title="Assurance Genevoise Article"
            src={imageUrl}
            width={0}
            height={0}
            priority
            sizes="100vw"
            loading="eager"
            className={cn(
              'aspect-video',
              'max-xs:max-h-[226px] sm:h-[280px] md:h-full lg:h-[495px] lg:max-h-[495px]',
              'w-full rounded-2xl bg-gray-100 object-cover',
              'sm:aspect-2/1 lg:aspect-3/2'
            )}
          />
        </div>
      </article>
    </Link>
  );
};
