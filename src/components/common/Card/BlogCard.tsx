'use client';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { Link } from '@/libs/i18nNavigation';
import { Badge } from '@/components/ui/badge';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IBlog } from '@/models/blog';

export const BlogCard: React.FC<IBlog> = ({
  title,
  description,
  imageUrl,
  imageLqip,
  category,
  href,
  author,
  timeToRead,
  publishedDate,
}) => {
  const locale = useLocale();

  return (
    <Link href={href}>
      <article className="flex h-full cursor-pointer flex-col items-start">
        <div className="relative aspect-392/250 w-full shrink-0 overflow-hidden rounded-2xl">
          <Image
            alt={title}
            title={title}
            src={imageUrl}
            placeholder={imageLqip ? 'blur' : 'empty'}
            blurDataURL={imageLqip}
            fill
            sizes="(min-width: 1440px) 392px, (min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-1 flex-col justify-between pt-5">
          <div className="flex flex-col gap-2">
            <BodyText
              variant="xs"
              asChild
              className="flex flex-wrap gap-2 leading-4 font-[number:inherit] text-inherit"
            >
              <div>
                {category.map((cat) => (
                  <Badge
                    key={cat.title}
                    className="bg-blue-50 text-sm leading-[130%] font-medium text-blue-500 shadow-none hover:bg-blue-50"
                  >
                    {cat.title}
                  </Badge>
                ))}
              </div>
            </BodyText>
            <div className="flex flex-col gap-2">
              <HeadingText
                as="h3"
                title={title}
                className="line-clamp-2 text-xl text-gray-900 group-hover:text-gray-600 lg:text-2xl"
              >
                {title}
              </HeadingText>
              <BodyText
                variant="sm"
                title={description}
                className="line-clamp-3 max-w-3xl text-gray-600 lg:text-base"
              >
                {description}
              </BodyText>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="flex items-center gap-3">
              <Image
                alt="Author Image"
                title="Author Image"
                src={author.imageUrl}
                placeholder={author.imageLqip ? 'blur' : 'empty'}
                blurDataURL={author.imageLqip}
                width={40}
                height={40}
                className="size-10 rounded-full bg-gray-100 object-cover object-center"
              />
              <div className="gap-0.5 text-base leading-[130%]">
                <BodyText className="text-[length:inherit] font-semibold text-grey-700">
                  {author.name}
                </BodyText>
                <BodyText variant="sm" className="text-gray-700">
                  {publishedDate}
                </BodyText>
              </div>
            </div>

            <BodyText
              variant="xs"
              asChild
              className="flex items-end font-medium text-black-100 lg:text-sm"
            >
              <div>
                {timeToRead}{' '}
                {locale === 'fr' ? 'minutes de lecture' : 'minutes read'}
              </div>
            </BodyText>
          </div>
        </div>
      </article>
    </Link>
  );
};
