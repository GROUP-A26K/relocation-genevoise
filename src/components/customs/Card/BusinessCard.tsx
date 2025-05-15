import { cn } from '@/libs/utils';
import { ArrowRight } from 'lucide-react';
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
      <div className="flex p-6 flex-col w-full h-full lg:gap-6 gap-4 bg-grey-50 border border-grey-50 hover:bg-white hover:border-primary-500 rounded-xl leading-none no-underline transition-colors outline-none select-none cursor-pointer">
        <div className="lg:h-12 lg:w-12 w-10 h-10 rounded-2xl bg-primary-500 flex items-center justify-center">
          <div className="lg:p-3 p-2.5">
            {Icon && <Icon className="lg:h-6 lg:w-6 w-5 h-5 text-white" />}
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={cn('flex flex-col text-black-500 lg:gap-2 gap-1')}>
            <h2 className="text-xl font-semibold !leading-[130%]">{title}</h2>
            {description && (
              <p
                className={cn(
                  'lg:text-sm text-sm text-black-200 font-normal !leading-[130%]'
                )}
              >
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center text-[14px] text-primary-500 font-semibold !leading-[130%] pt-4">
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
