'use client';
import Image from 'next/image';
import { Link } from 'lucide-react';
import { useTranslations } from 'next-intl';

import BodyText from '@/components/common/Text/BodyText';

interface IImageTitleProps {
  imgUrl?: string;
  imgLqip?: string;
  title?: string;
  alt?: string;
}
export const ImageTitle: React.FC<IImageTitleProps> = ({
  imgUrl,
  imgLqip,
  title,
  alt,
}) => {
  const imageT = useTranslations('Images');
  const resolvedTitle = title || imageT('common.photo');
  const resolvedImageLabel = imgUrl
    ? alt || resolvedTitle
    : imageT('common.photo');

  return (
    <article className="relative flex flex-col items-start justify-between gap-4 py-6">
      <div className="w-full">
        <Image
          alt={resolvedImageLabel}
          title={resolvedImageLabel}
          src={
            imgUrl ??
            'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80'
          }
          placeholder={imgLqip ? 'blur' : 'empty'}
          blurDataURL={imgLqip}
          width={720}
          height={480}
          className="aspect-video w-full max-w-[720px] rounded-2xl bg-gray-100 object-cover lg:h-[480px] lg:max-h-[480px]"
        />
      </div>
      <BodyText
        variant="xs"
        asChild
        className="flex items-center gap-2 font-medium text-gray-500"
      >
        <div>
          <Link className="h-4 w-4" />
          {resolvedTitle}
        </div>
      </BodyText>
    </article>
  );
};
