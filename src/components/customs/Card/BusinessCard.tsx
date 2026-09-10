import { ArrowRight } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';

interface Props {
  title: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
  linkText?: string;
}

export const BusinessCard: React.FC<Props> = ({
  title,
  description,
  icon: Icon,
  link,
  linkText,
}) => {
  return (
    <Link href={link}>
      <div className="flex h-full w-full cursor-pointer flex-col gap-4 rounded-xl border border-grey-50 bg-grey-50 p-6 leading-none no-underline outline-hidden transition-colors select-none hover:border-primary-500 hover:bg-white lg:gap-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 lg:h-12 lg:w-12">
          <div className="p-2.5 lg:p-3">
            {Icon && <Icon className="h-5 w-5 text-white lg:h-6 lg:w-6" />}
          </div>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={cn('flex flex-col gap-1 text-black-500 lg:gap-2')}>
            <h2 className="text-xl leading-[130%]! font-semibold">{title}</h2>
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

          <div className="flex items-center pt-4 text-[14px] leading-[130%]! font-semibold text-primary-500">
            {linkText}
            <ArrowRight
              strokeWidth={3}
              height={12}
              width={12}
              className={cn(
                'ml-1.5 transition-transform group-hover:translate-x-1'
              )}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
