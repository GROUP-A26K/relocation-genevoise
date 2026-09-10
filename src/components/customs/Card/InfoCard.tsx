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
    <div className="flex w-full flex-col items-center justify-center gap-4 p-6 leading-none no-underline outline-hidden transition-colors select-none lg:gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-200 lg:h-12 lg:w-12">
        <div className="p-2.5 lg:p-3">
          {Icon && <Icon className="h-5 w-5 text-primary-500 lg:h-6 lg:w-6" />}
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col gap-1 text-center text-black-500 lg:gap-1.5'
        )}
      >
        <h2 className="text-xl leading-[130%]! font-semibold">{title}</h2>
        {description && (
          <p className="text-base leading-[130%]! font-normal text-black-200 lg:text-base">
            {description}
          </p>
        )}
      </div>

      {info && (
        <div className="text-center text-base leading-[130%]! font-semibold text-primary-500">
          {info}
        </div>
      )}
    </div>
  );
};
