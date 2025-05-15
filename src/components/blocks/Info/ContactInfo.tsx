import { InfoContactCard } from '@/components/customs/Card';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FC } from 'react';

interface Reason {
  title: string;
  description?: string;
  info?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  reasonItems?: Reason[];
}

const ContactInfo: FC<Props> = ({
  heading,
  subHeading = 'Need help? We are here for you!',
  description,
  reasonItems = [
    {
      title: 'Email',
      icon: Mail,
      info: 'contact@assurance-genevoise.ch',
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
      info: '+1 (555) 000-0000',
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
              <h1 className="text-3xl font-semibold text-center !leading-[130%] text-balance">
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
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {reasonItems.map((reasonItem, i) => (
            <InfoContactCard key={i} {...reasonItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ContactInfo };
