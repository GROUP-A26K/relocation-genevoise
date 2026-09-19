'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import BodyText from '@/components/common/Text/BodyText';

interface IQuoteImageProps {
  content?: string;
  author?: string;
  authorInfo?: string;
  photoUrl?: string;
  photoLqip?: string;
}

const QuoteImage: React.FC<IQuoteImageProps> = ({
  content = 'This is a sample quote content.',
  author = 'Author Name',
  authorInfo = 'Author Information',
  photoUrl = '',
  photoLqip,
}) => {
  const imageT = useTranslations('Images');
  const authorImageAlt = photoUrl
    ? imageT('common.author')
    : imageT('common.photo');

  return (
    <div className="py-4 lg:py-6">
      <div className="flex w-full flex-col items-start justify-start gap-5 rounded-2xl bg-white py-0 lg:bg-grey-50 lg:p-6">
        <BodyText asChild className="text-center text-black-500 italic">
          <blockquote>{content}</blockquote>
        </BodyText>
        <div className="flex w-full flex-col items-center gap-3">
          <Image
            src={photoUrl}
            placeholder={photoLqip ? 'blur' : 'empty'}
            blurDataURL={photoLqip}
            alt={authorImageAlt}
            title={authorImageAlt}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
          />
          <div className="flex w-full flex-col items-center justify-center">
            <BodyText className="font-semibold text-black-500">
              {author}
            </BodyText>
            <BodyText variant="sm">{authorInfo}</BodyText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteImage;
