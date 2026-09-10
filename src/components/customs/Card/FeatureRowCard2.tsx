import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';

interface Props {
  title: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

export const FeatureRowCard2: React.FC<Props> = ({
  title,
  description,
  icon: Icon,
  link,
}) => {
  return (
    <Link href={link}>
      <div className="flex h-full w-full flex-row gap-4 rounded-xl border border-grey-50 bg-grey-50 p-6 leading-none no-underline outline-hidden transition-colors select-none hover:border-secondary-500 hover:bg-white lg:gap-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500 lg:h-12 lg:w-12">
          <div className="p-2.5 lg:p-3">
            {Icon && <Icon className="h-5 w-5 text-black-500 lg:h-6 lg:w-6" />}
          </div>
        </div>
        <div
          className={cn(
            'flex flex-col justify-center gap-1 text-black-500 lg:gap-2'
          )}
        >
          <h3 className="text-xl leading-[130%]! font-semibold">{title}</h3>
          {description && (
            <p
              className={cn(
                'text-base leading-[130%]! font-normal text-black-200'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
