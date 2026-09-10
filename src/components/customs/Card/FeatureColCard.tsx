import { ArrowRight } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';

interface Props {
  title: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link?: string;
  info?: string;
}

export const FeatureColCard: React.FC<Props> = ({
  title,
  description,
  icon: Icon,
  link,
  info,
}) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-grey-50 bg-grey-50 p-6 leading-none no-underline outline-hidden transition-colors select-none hover:border-secondary-500 hover:bg-white lg:gap-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500 lg:h-12 lg:w-12">
        <div className="p-2.5 lg:p-3">
          {Icon && <Icon className="h-5 w-5 text-black-500 lg:h-6 lg:w-6" />}
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className={cn('flex flex-col gap-1 text-black-500 lg:gap-2')}>
          <h3 className="text-xl leading-[130%]! font-semibold">{title}</h3>
          {description && (
            <p
              className={cn(
                'text-sm leading-[130%]! font-normal text-black-200 lg:text-sm'
              )}
            >
              {description}
            </p>
          )}
        </div>

        {link && (
          <Link href={link}>
            <div className="flex items-center pt-4 text-[14px] leading-[130%]! font-semibold text-primary-500">
              Discover our offers
              <ArrowRight
                strokeWidth={3}
                height={12}
                width={12}
                className={cn(
                  'ml-1.5 transition-transform group-hover:translate-x-1'
                )}
              />
            </div>
          </Link>
        )}

        {info && (
          <div className="flex items-center pt-4 text-xl leading-[130%]! font-semibold text-primary-500">
            {info}
          </div>
        )}
      </div>
    </div>
  );
};
