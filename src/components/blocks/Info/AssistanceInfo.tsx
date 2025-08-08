import { FeatureColCard } from '@/components/customs/Card';
import { FormattedText } from '@/components/customs/Text';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { FC } from 'react';

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
    <div className='flex flex-col lg:gap-16 gap-12'>
      {heading && (
        <div className='flex w-full justify-center'>
          <div className='flex flex-col lg:gap-6 gap-4 max-w-xl text-center'>
            <div className='flex flex-col gap-3'>
              <p className='text-sm font-semibold text-secondary-600 !leading-[130%]'>
                {heading}
              </p>
              <h1 className='text-5xl font-semibold !leading-[130%]'>
                <FormattedText text={subHeading} />
              </h1>
            </div>
            <p className='text-sm font-normal text-black-200 !leading-[130%]'>
              {description}
            </p>
          </div>
        </div>
      )}
      <div className='flex flex-col lg:gap-6 gap-8'>
        <h2 className='sr-only'>
          <FormattedText text={subHeading} />
        </h2>
        <ul role='list' className='grid gap-4 lg:grid-cols-3 lg:gap-8'>
          {reasonItems.map((reasonItem) => (
            <li key={reasonItem.title}>
              <FeatureColCard {...reasonItem} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
