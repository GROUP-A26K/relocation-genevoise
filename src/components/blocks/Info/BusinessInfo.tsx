import { BusinessCard } from '@/components/customs/Card';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
import { Building } from 'lucide-react';
import { FC } from 'react';

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
    <div className="flex flex-col lg:gap-16 gap-12">
      {heading && (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col lg:gap-6 gap-4 max-w-xl lg:items-center text-left">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-center text-primary-500 !leading-[130%]">
                {heading}
              </p>
              <h1 className="text-3xl font-bold text-center !leading-[130%]">
                {TextWithStrong(subHeading)}
              </h1>
            </div>
            <p className="text-sm font-normal text-center text-black-200 !leading-[130%]">
              {description}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:gap-6 gap-8">
        <div className="grid lg:grid-cols-3 lg:gap-8 gap-3 items-stretch">
          {items.map((item, i) => (
            <BusinessCard key={i} {...item} linkText={linkText} />
          ))}
        </div>
      </div>
    </div>
  );
};
