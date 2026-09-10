import Image from 'next/image';
import { Phone } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import GroupAvatar from '@/assets/img/avt/group-avt.png';
import { FormattedText } from '@/components/customs/Text';

import type { FC } from 'react';

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText1?: string;
  buttonUrl?: string;
  imgSrc?: string;
}

export const BookConsultation: FC<Props> = ({
  subHeading = 'A question ? Our advisors are here to guide you',
  description = 'Benefit from personalized advice and support that meets your needs.',
  buttonText1 = 'Call me',
  imgSrc = GroupAvatar.src,
}) => {
  return (
    <div className="flex flex-col gap-12 rounded-xl bg-grey-50 py-12 lg:gap-16">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col gap-4 text-left lg:items-center lg:gap-8">
          <div className="flex justify-center">
            <Image
              alt="Support de Relocation Genevoise, contactez-nous par telephone."
              title="Support de Relocation Genevoise, contactez-nous par telephone."
              height={64}
              width={128}
              src={imgSrc}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-2xl leading-[130%]! font-semibold">
              <FormattedText text={subHeading} />
            </h2>
            <p className="text-center text-sm leading-[130%]! font-normal text-black-200">
              {description}
            </p>
          </div>

          <div className="flex w-full flex-row items-center justify-center gap-2">
            <Link href="/contact">
              <Button as="solid" variant="md" type="primary" iconStart={Phone}>
                {buttonText1}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
