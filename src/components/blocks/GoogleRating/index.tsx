import Image from 'next/image';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import GoogleLogo from '@/assets/img/logos/gg-logo.svg';
import StarIcon from '@/assets/img/icons/star-icon.svg';

import type { FC } from 'react';
interface Props {
  point: number;
  googleUrl: string;
  title: string;
  subTitle: string;
}
export const GoogleRating: FC<Props> = ({
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
          <div className="text-xs leading-[15.11px] font-bold text-grey-400">
            {title}
          </div>
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

          <p className={cn('text-xs leading-[100%] font-normal text-grey-400')}>
            {subTitle}
          </p>
        </div>
      </div>
    </Link>
  );
};
