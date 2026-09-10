import { Building } from 'lucide-react';

import { CompanyCard } from '@/components/customs/Card';
import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';

import type { FC } from 'react';

interface Item {
  title: string;
  description?: string;
  info?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: Item[];
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  linkText?: string;
  items?: Item[];
}

export const CompaniesInfo: FC<Props> = ({
  heading,
  subHeading = 'Need help? We are here for you!',
  description,
  items = [
    {
      title: 'Professional liability insurance',
      description: 'Complete protection for your property and your future.',
      icon: Building,
      link: '/particulier/assurance/assurance-animaux',
      subItems: [
        {
          title: 'Animal insurance',
          description: 'Protect your pets with comprehensive coverage.',
          icon: Building,
          link: '/particulier/assurance/assurance-animaux',
        },
        {
          title: 'Home insurance',
          description: 'Secure your home against unforeseen events.',
          icon: Building,
          link: '/particulier/assurance/assurance-habitation',
        },
        {
          title: 'Health insurance',
          description: 'Ensure your health with our tailored plans.',
          icon: Building,
          link: '/particulier/assurance/assurance-sante',
        },
      ],
    },
  ],
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {heading && (
        <RevealItem className="flex w-full items-center justify-center">
          <div className="flex max-w-3xl flex-col gap-4 text-left lg:items-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600">
                {heading}
              </p>
              <h1 className="text-center text-4xl leading-[100%]! font-bold text-pretty lg:text-5xl lg:leading-[130%]!">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="text-center text-sm leading-[130%]! font-normal text-pretty text-black-200">
              {description}
            </p>
          </div>
        </RevealItem>
      )}
      <div className="flex flex-col gap-8 lg:gap-8">
        {items.map((item, i) => (
          <RevealItem key={i} className="flex flex-col gap-8 lg:gap-8">
            <h2 className="flex border-l-4 border-secondary-500 pl-4 text-xl leading-[130%]! font-semibold lg:text-2xl">
              {item.title}
            </h2>

            <ul role="list" className="grid gap-4 lg:grid-cols-3 lg:gap-8">
              {item.subItems &&
                item?.subItems.map((subItem, j) => (
                  <li key={subItem.title}>
                    <CompanyCard
                      key={`${i}-${j}`}
                      title={subItem.title}
                      description={subItem.description}
                      icon={subItem.icon}
                    />
                  </li>
                ))}
            </ul>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};
