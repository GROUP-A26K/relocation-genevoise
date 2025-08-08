import { FeatureRowCard } from '@/components/customs/Card';
import { FormattedText } from '@/components/customs/Text';

interface Reason {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

interface Props {
  heading?: string;
  subHeading?: string;
  reasons: {
    reasonName: string;
    reasonItems: Reason[];
  }[];
}

const ServiceFeature = ({
  heading = 'Discover our offers',
  subHeading = 'Our services',
  reasons,
}: Props) => {
  return (
    <div className='flex flex-col lg:gap-16 gap-12'>
      <div className='flex flex-col gap-3'>
        <p className='text-sm font-semibold text-secondary-600 !leading-[130%]'>
          {heading}
        </p>
        <h2 className='text-3xl font-semibold !leading-[130%]'>
          <FormattedText text={subHeading} />
        </h2>
      </div>
      {reasons.map((reason, i) => (
        <div key={i} className='flex flex-col lg:gap-6 gap-8'>
          <h3 className='lg:text-2xl text-xl font-semibold !leading-[130%]'>
            {reason.reasonName}
          </h3>

          <ul role='list' className='grid gap-4 lg:grid-cols-3 lg:gap-8'>
            {reason.reasonItems.map((reasonItem) => (
              <li key={reasonItem.title}>
                <FeatureRowCard {...reasonItem} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export { ServiceFeature };
