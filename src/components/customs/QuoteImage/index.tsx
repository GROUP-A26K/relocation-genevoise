import cn from 'classnames';
import Image from 'next/image';

type QuoteImageProps = {
  content?: string;
  author?: string;
  authorInfo?: string;
  photoUrl?: string;
};

const QuoteImage: React.FC<QuoteImageProps> = ({
  content = 'This is a sample quote content.',
  author = 'Author Name',
  authorInfo = 'Author Information',
  photoUrl = '',
}) => {
  return (
    <div className={cn('py-4', 'lg:py-6')}>
      <div
        className={cn(
          'flex w-full flex-col items-start justify-start gap-5 rounded-2xl bg-white py-0',
          'lg:bg-grey-50 lg:p-6'
        )}
      >
        <blockquote className="text-center text-base leading-[130%]! font-normal text-black-500 italic">
          {content}
        </blockquote>
        <div className="flex w-full flex-col items-center gap-3">
          <Image
            src={photoUrl}
            alt="Author image"
            title="Author image"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
          />
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-base leading-[130%]! font-semibold text-black-500">
              {author}
            </p>
            <p className="text-sm leading-[130%]! font-normal text-black-200">
              {authorInfo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteImage;
