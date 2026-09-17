import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/libs/utils';
import StarIcon from '@/assets/icons/star.svg';
import GoogleLogo from '@/assets/icons/google.svg';
import BodyText from '@/components/common/Text/BodyText';

interface IGoogleRatingProps {
  point: number;
  googleUrl: string;
  title: string;
  subTitle: string;
}
export const GoogleRating: React.FC<IGoogleRatingProps> = ({
  point,
  title,
  subTitle,
  googleUrl,
}) => {
  return (
    <Link href={googleUrl} target="_blank" rel="noopener noreferrer">
      <div className="flex w-full flex-row gap-[11.33px] outline-hidden select-none">
        <div className="flex justify-center">
          <Image
            src={GoogleLogo}
            alt="Google Logo"
            title="Google Logo"
            width={53}
            height={53}
          />
        </div>
        <div className={cn('flex flex-col gap-0.5 text-black-500')}>
          <BodyText
            variant="xs"
            asChild
            className="leading-[15.11px] font-bold text-grey-400"
          >
            <div>{title}</div>
          </BodyText>
          <div className="flex items-center gap-1.5">
            {/* <div className="text-base font-bold leading-[150%] text-yellow-910">
              {point}
            </div> */}
            <div className="flex">
              {Array.from({ length: Math.round(point) }, (_, i) => (
                <Image
                  key={i}
                  src={StarIcon}
                  alt="Star icon"
                  title="star icon"
                  width={19.73}
                  height={19.73}
                />
              ))}
            </div>
          </div>

          <BodyText
            variant="xs"
            className={cn(
              cn('text-xs leading-[100%] font-normal text-grey-400')
            )}
          >
            {subTitle}
          </BodyText>
        </div>
      </div>
    </Link>
  );
};
