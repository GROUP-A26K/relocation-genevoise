import { cn } from '@/libs/utils';

interface Props {
  title: string;
  description?: string;
  info?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const InfoCard: React.FC<Props> = ({
  title,
  description,
  info,
  icon: Icon,
}) => {
  return (
    <div className="flex p-6 items-center justify-center flex-col w-full lg:gap-4 gap-4 leading-none no-underline transition-colors outline-none select-none">
      <div className="flex lg:h-12 lg:w-12 w-10 h-10 rounded-lg items-center justify-center border border-primary-200">
        <div className="lg:p-3 p-2.5">
          {Icon && <Icon className="lg:h-6 lg:w-6 w-5 h-5 text-primary-500" />}
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col text-black-500 lg:gap-1.5 gap-1 text-center'
        )}
      >
        <h2 className="text-xl font-semibold !leading-[130%]">{title}</h2>
        {description && (
          <p className="lg:text-base text-base text-black-200 font-normal !leading-[130%]">
            {description}
          </p>
        )}
      </div>

      {info && (
        <div className="text-base text-center font-semibold text-primary-500 !leading-[130%]">
          {info}
        </div>
      )}
    </div>
  );
};
