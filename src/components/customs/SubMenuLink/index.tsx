import { cn } from '@/libs/utils';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant: 'lg' | 'md';
}

export const SubMenuLink: React.FC<MenuItem> = ({
  title,
  description,
  icon: Icon,
  variant,
}) => {
  const STYLE_TEXT: Record<'lg' | 'md', string> = {
    lg: cn('text-[14px]'),
    md: cn('text-subtle'),
  };

  const STYLE_ITEM: Record<'lg' | 'md', string> = {
    lg: cn('gap-[8px]'),
    md: cn('gap-[4px]'),
  };
  return (
    <div className="group flex flex-row gap-[8px] rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-grey-50 hover:text-accent-foreground">
      <div className="flex h-8! w-8! items-center justify-center rounded-sm bg-secondary-500">
        <div className="p-4">
          {Icon && <Icon className="h-4! w-4! text-primary-500" />}
        </div>
      </div>
      <div className={cn('flex flex-col text-black-500', STYLE_ITEM[variant])}>
        <div className="text-[14px] leading-[130%]! font-semibold">{title}</div>
        {description && (
          <p
            className={cn(
              'text-[14px] leading-[130%]! font-normal text-black-200',
              STYLE_TEXT[variant],
              'leading-[130%]!'
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
