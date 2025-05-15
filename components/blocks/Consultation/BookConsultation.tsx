import Button from '@/components/customs/Button';
import Image from 'next/image';
import GroupAvatar from '@/assets/img/avt/group-avt.png';
import { FC } from 'react';
import Link from 'next/link';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText1?: string;
  buttonText2?: string;
  buttonUrl?: string;
  imgSrc?: string;
}

export const BookConsultation: FC<Props> = ({
  subHeading = 'A question ? Our advisors are here to guide you',
  description = 'Benefit from personalized advice and support that meets your needs.',
  buttonText1 = 'Call me',
  buttonText2 = 'Contact me',
  imgSrc = GroupAvatar.src,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12 bg-white py-12 rounded-xl">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col lg:gap-8 gap-4 w-full lg:items-center text-left">
          <div className="flex justify-center">
            <Image
              alt="Support de Assurance Genevoise, contactez-nous par telephone."
              title="Support de Assurance Genevoise, contactez-nous par telephone."
              height={64}
              width={128}
              src={imgSrc}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-center !leading-[130%]">
              {TextWithStrong(subHeading)}
            </h2>
            <p className="text-sm font-normal text-center text-black-200 !leading-[130%]">
              {description}
            </p>
          </div>

          <div className="flex flex-row gap-2 w-full items-center justify-center">
            <Link href={'/rappelez-moi'}>
              <Button as="solid" variant="md" type="primary">
                {buttonText1}
              </Button>
            </Link>
            <Link href={'/contact'}>
              <Button as="outline" variant="md" type="primary">
                {buttonText2}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
