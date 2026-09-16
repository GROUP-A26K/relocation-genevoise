import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

import { RevealItem } from '@/components/common/Reveal';
import { FormattedText } from '@/components/common/Text';
import { InfoContactCard } from '@/components/common/Card';
import {
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_HREF,
  ORGANIZATION,
} from '@/constants/seo';

type TReason = {
  title: string;
  description?: string;
  info?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

interface IContactInfoProps {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: TReason[];
}

const ContactInfo: React.FC<IContactInfoProps> = ({
  heading,
  subHeading = 'Need help? We are here for you!',
  description,
  reasonItems = [
    {
      title: 'Email',
      icon: Mail,
      info: ORGANIZATION.email,
    },
    {
      title: 'Office',
      icon: MapPin,
      info: 'Rue des Alpes 5, 1201 Geneva',
    },
    {
      title: 'Phone',
      description: 'Mon-Fri from 8am to 5pm.',
      icon: Phone,
      info: ORGANIZATION.telephone,
    },
  ],
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {heading && (
        <RevealItem className="flex w-full items-center justify-center">
          <div className="flex max-w-xl flex-col gap-4 text-left lg:items-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600">
                {heading}
              </p>
              <h1 className="text-center text-3xl leading-[130%]! font-semibold text-balance">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="text-center text-sm leading-[130%]! font-normal text-black-200">
              {description}
            </p>
          </div>
        </RevealItem>
      )}
      <RevealItem className="flex flex-col gap-8 lg:gap-6">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          <Link
            href={CONTACT_EMAIL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <InfoContactCard {...reasonItems[0]} />
          </Link>
          <Link
            href="https://www.google.com/maps/search/?api=1&query=Rue+des+Alpes+5,+1201+Genève"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <InfoContactCard {...reasonItems[1]} />
          </Link>
          <Link
            href={CONTACT_PHONE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <InfoContactCard {...reasonItems[2]} />
          </Link>
        </div>
      </RevealItem>
    </div>
  );
};

export { ContactInfo };
