'use client';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { cn } from '@/libs/utils';
import { Blog } from '@/models/BLog';
import { Link } from '@/libs/i18nNavigation';
import { Badge } from '@/components/ui/badge';

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
            'flex self-stretch flex-col gap-6 justify-between w-full',
            'md:p-8 max-w-[340px] lg:max-w-[432px]'
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {category.map((cat) => (
                <Badge
                  key={cat.title}
                  className="text-sm font-medium text-blue-500 bg-blue-50 hover:bg-blue-50 shadow-none !leading-[130%]"
                >
                  {cat.title}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h2
                title={title}
                className="lg:text-3xl text-xl font-semibold text-black-500 group-hover:text-black-600 !leading-[130%]"
              >
                {title}
              </h2>
              <p
                title={description}
                className="lg:text-base font-normal text-sm !leading-[130%] text-black-200"
              >
                {description}
              </p>
            </div>
          </div>
          <div className="flex justify-between ">
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
                <p className="text-base font-semibold text-grey-700 !leading-[130%]">
                  {author.name}
                </p>
                <p className="text-sm font-normal text-grey-700 !leading-[130%]">
                  {publishedDate}
                </p>
              </div>
            </div>
            <div className="flex lg:text-sm text-xs items-end font-medium text-black-100 !leading-[130%]">
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
              'lg:h-[495px] lg:max-h-[495px] sm:h-[280px] md:h-full max-xs:max-h-[226px]',
              'rounded-2xl w-full bg-gray-100 object-cover',
              'sm:aspect-[2/1] lg:aspect-[3/2]'
            )}
          />
        </div>
      </article>
    </Link>
  );
};