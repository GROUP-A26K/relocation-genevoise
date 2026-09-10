import Image from 'next/image';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { FormattedText } from '@/components/customs/Text';
import ContentWithImgBG from '@/assets/img/bg/relocation-genevoise-geneve-courtage.webp';

import type { FC } from 'react';
interface Props {
  heading?: string;
  subHeading?: string;
  description?: { paragraph: string }[];
  buttonText?: string;
  buttonUrl?: string;
}

export const ContentWithImg: FC<Props> = ({
  buttonText,
  heading = 'Why Insurance Geneva ?',
  subHeading = 'Our expertise at your service',
  description,
  buttonUrl = '/',
}) => {
  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      <div className="flex flex-col items-center justify-end gap-12 lg:flex-row lg:gap-16">
        <Image
          src={ContentWithImgBG}
          alt="Relocation Genevoise, votre partenaire de confiance en Suisse"
          title="Relocation Genevoise, votre partenaire de confiance en Suisse"
          width={588}
          height={440}
          className="order-2 max-h-[226px] rounded-2xl object-cover lg:order-2 lg:max-h-[440px] xl:min-w-[588px]"
        />
        <div className="order-1 flex flex-col items-start gap-6 text-left lg:order-1 lg:justify-center">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
                {heading}
              </p>
              <h2 className="text-3xl leading-[130%]! font-semibold">
                <FormattedText text={subHeading} />
              </h2>
            </div>
            <p className="flex flex-col gap-4 text-sm leading-[130%]! font-normal text-black-200 lg:text-base">
              {description?.map((item, index) => (
                <span key={index}>{item.paragraph}</span>
              ))}
            </p>
          </div>
          {buttonText && (
            <Link href={buttonUrl} className="w-full">
              <Button
                as="solid"
                type="primary"
                variant="md"
                className="w-full lg:w-fit"
              >
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
