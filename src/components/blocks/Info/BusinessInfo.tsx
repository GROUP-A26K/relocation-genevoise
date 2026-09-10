import { Building } from 'lucide-react';

import { BusinessCard } from '@/components/customs/Card';
import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';

import type { FC } from 'react';

interface Item {
  title: string;
  description: string;
  info?: string;
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  linkText?: string;
  items?: Item[];
}

export const BusinessInfo: FC<Props> = ({
  heading,
  subHeading = 'Need help? We are here for you!',
  description,
  linkText,
  items = [
    {
      title: 'Professional liability insurance',
      description: 'Complete protection for your property and your future.',
      icon: Building,
      link: '/particulier/assurance/assurance-animaux',
    },
  ],
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {heading && (
        <RevealItem className="flex w-full items-center justify-center">
          <div className="flex max-w-xl flex-col gap-4 text-left lg:items-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-center text-sm leading-[130%]! font-semibold text-primary-500">
                {heading}
              </p>
              <h1 className="text-center text-3xl leading-[130%]! font-bold">
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
        <div className="grid items-stretch gap-3 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => (
            <BusinessCard key={i} {...item} linkText={linkText} />
          ))}
        </div>
      </RevealItem>
    </div>
  );
};
