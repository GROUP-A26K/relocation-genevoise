'use client';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { Link } from '@/libs/i18nNavigation';
import { Badge } from '@/components/ui/badge';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IBlog } from '@/models/blog';

export const BlogBGCard: React.FC<IBlog> = ({
  title,
  description,
  imageUrl,
  imageLqip,
  category,
  timeToRead,
  publishedDate,
  href,
  author,
}) => {
  const locale = useLocale();
  return (
    <Link href={href}>
      <article className="grid grid-cols-1 items-start gap-5 rounded-2xl lg:grid-cols-[432fr_776fr] lg:items-center lg:gap-8 lg:bg-grey-50">
        <div className="order-2 flex w-full flex-col justify-between gap-6 lg:order-1 lg:p-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {category.map((cat) => (
                <Badge
                  key={cat.title}
                  className="bg-blue-50 text-sm leading-[130%] font-medium text-blue-500 shadow-none hover:bg-blue-50"
                >
                  {cat.title}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <HeadingText
                as="h2"
                title={title}
                className="text-xl font-semibold group-hover:text-black-600 lg:text-3xl"
              >
                {title}
              </HeadingText>
              <BodyText
                variant="sm"
                title={description}
                className="lg:text-base"
              >
                {description}
              </BodyText>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Image
                alt="Article author"
                title="Article author"
                src={author.imageUrl}
                placeholder={author.imageLqip ? 'blur' : 'empty'}
                blurDataURL={author.imageLqip}
                width={40}
                height={40}
                className="size-10 rounded-full bg-gray-100 object-cover object-center"
              />
              <div className="flex flex-col gap-0.5">
                <BodyText className="font-semibold text-grey-700">
                  {author.name}
                </BodyText>
                <BodyText variant="sm" className="text-grey-700">
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

        <div className="relative order-1 aspect-776/495 w-full overflow-hidden rounded-2xl lg:order-2">
          <Image
            src={imageUrl}
            placeholder={imageLqip ? 'blur' : 'empty'}
            blurDataURL={imageLqip}
            alt={title}
            title={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            loading="eager"
            className="object-cover"
          />
        </div>
      </article>
    </Link>
  );
};
