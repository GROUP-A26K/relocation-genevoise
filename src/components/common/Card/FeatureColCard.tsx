import { ArrowRight } from 'lucide-react';

import { cn } from '@/libs/utils';
import BodyText from '@/components/common/Text/BodyText';
import { Link, type THref } from '@/libs/i18nNavigation';
import HeadingText from '@/components/common/Text/HeadingText';

interface IFeatureColCardProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link?: THref;
  info?: string;
  className?: string;
}

export const FeatureColCard: React.FC<IFeatureColCardProps> = ({
  title,
  description,
  icon: Icon,
  link,
  info,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col gap-4 rounded-2xl border border-grey-50 bg-grey-50 p-6 leading-none no-underline outline-hidden transition-colors select-none hover:border-secondary-500 hover:bg-white lg:gap-6',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500 lg:h-12 lg:w-12">
        <div className="p-2.5 lg:p-3">
          {Icon && <Icon className="h-5 w-5 text-black-500 lg:h-6 lg:w-6" />}
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <BodyText
          asChild
          className="flex flex-col gap-1 text-[length:inherit] leading-[inherit] font-[number:inherit] text-black-500 lg:gap-2"
        >
          <div>
            <HeadingText as="h3" className="text-xl text-inherit">
              {title}
            </HeadingText>
            {description && (
              <BodyText variant="sm" className="lg:text-sm">
                {description}
              </BodyText>
            )}
          </div>
        </BodyText>

        {link && (
          <Link href={link}>
            <BodyText
              variant="sm"
              asChild
              className="flex items-center pt-4 font-semibold text-primary-500"
            >
              <div>
                Discover our offers
                <ArrowRight
                  strokeWidth={3}
                  height={12}
                  width={12}
                  className="ml-1.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </BodyText>
          </Link>
        )}

        {info && (
          <BodyText
            variant="xl"
            asChild
            className="flex items-center pt-4 font-semibold text-primary-500"
          >
            <div>{info}</div>
          </BodyText>
        )}
      </div>
    </div>
  );
};
