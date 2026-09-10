import { Clock3, CloudUpload, MessagesSquare } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';
import { FeatureColCard } from '@/components/customs/Card';

import type { FC } from 'react';

interface Reason {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: Reason[];
  buttonText?: string;
  buttonUrl?: string;
}

const ContactFeature: FC<Props> = ({
  heading = 'Simplicity & Speed',
  subHeading = 'We’re an ambitious and smart teamwith a shared mission',
  description = 'Our shared values keep us connected and guide us as one team.',
  reasonItems = [
    {
      title: 'Contact with an advisor',
      description:
        'We exchange together to understand your situation, identify your specific needs and find the right solutions.',
      icon: MessagesSquare,
    },
    {
      title: 'Return within 24h',
      description:
        'We will get back to you within 24 hours and will usually give you your quote within 48 hours after your first contact.',
      icon: Clock3,
    },
    {
      title: 'Contract signing',
      description:
        'We proceed to sign a free brokerage mandate and present you the solutions of our partners.',
      icon: CloudUpload,
    },
    {
      title: 'Contract signing',
      description:
        'We proceed to sign a free brokerage mandate and present you the solutions of our partners.',
      icon: CloudUpload,
    },
  ],
  buttonText = 'Call me',
  buttonUrl = '/call-me-back',
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <RevealItem className="flex w-full items-center justify-center">
        <div className="flex max-w-3xl flex-col gap-4 text-center lg:items-center lg:gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600 lg:text-center">
              {heading}
            </p>
            <h2 className="text-center text-3xl leading-[130%]! font-semibold text-balance lg:text-center">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-center text-sm leading-[130%]! font-normal text-balance text-black-200 lg:text-center">
            {description}
          </p>
        </div>
      </RevealItem>
      <RevealItem className="flex flex-col gap-6 lg:gap-8">
        <ul role="list" className="grid gap-4 lg:grid-cols-2 lg:gap-8">
          {reasonItems.map((reasonItem) => (
            <li key={reasonItem.title}>
              <FeatureColCard {...reasonItem} />
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center">
          <Link
            href={buttonUrl}
            className="flex w-full items-center justify-center"
          >
            <Button
              as="solid"
              type="secondary"
              variant="md"
              className="w-full lg:w-fit"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </RevealItem>
    </div>
  );
};

export { ContactFeature };
