import { Mail, MessageCircle, Phone } from 'lucide-react';

import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';
import { FeatureColCard } from '@/components/customs/Card';

import type { FC } from 'react';

interface Reason {
  title: string;
  description: string;
  info?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: Reason[];
}

export const AssistanceInfo: FC<Props> = ({
  heading,
  subHeading = 'Need help? We are here for you!',
  description,
  reasonItems = [
    {
      title: 'Phone support',
      description:
        'Our support team is at your disposal to answer all your questions and assist you.',
      icon: Phone,
      info: '022 715 17 48 (Free-call)',
    },
    {
      title: 'Email support',
      description:
        'For a quick response in writing, send us an email. An advisor will answer you as soon as possible.',
      icon: Mail,
      info: 'support@assuance-genevoise.ch',
    },
    {
      title: 'Chat online',
      description:
        'Our team is available to answer all your questions and guide you to the most suitable solutions.',
      icon: MessageCircle,
      info: 'Online 24/7',
    },
  ],
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {heading && (
        <RevealItem className="flex w-full justify-center">
          <div className="flex max-w-xl flex-col gap-4 text-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
                {heading}
              </p>
              <h1 className="text-5xl leading-[130%]! font-semibold">
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className="text-sm leading-[130%]! font-normal text-black-200">
              {description}
            </p>
          </div>
        </RevealItem>
      )}
      <RevealItem className="flex flex-col gap-8 lg:gap-6">
        <h2 className="sr-only">
          <FormattedText text={subHeading} />
        </h2>
        <ul role="list" className="grid gap-4 lg:grid-cols-3 lg:gap-8">
          {reasonItems.map((reasonItem) => (
            <li key={reasonItem.title}>
              <FeatureColCard {...reasonItem} />
            </li>
          ))}
        </ul>
      </RevealItem>
    </div>
  );
};
