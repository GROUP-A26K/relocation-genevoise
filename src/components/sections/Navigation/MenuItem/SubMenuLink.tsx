import { cn } from '@/libs/utils';
import { BodyText } from '@/components/common/Text';

import type { THref } from '@/libs/i18nNavigation';

interface ISubMenuLinkProps {
  title: string;
  url?: THref;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant: 'lg' | 'md';
}

export const SubMenuLink: React.FC<ISubMenuLinkProps> = ({
  title,
  description,
  icon: Icon,
  variant,
}) => {
  const STYLE_ITEM: Record<'lg' | 'md', string> = {
    lg: cn('gap-[8px]'),
    md: cn('gap-[4px]'),
  };
  return (
    <div className="group flex flex-row gap-[8px] rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-grey-50 hover:text-accent-foreground">
      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary-500">
        <div className="p-4">
          {Icon && <Icon className="h-4 w-4 text-primary-500" />}
        </div>
      </div>
      <div className={cn('flex flex-col text-black-500', STYLE_ITEM[variant])}>
        <BodyText variant="sm" className="font-semibold text-black-500">
          {title}
        </BodyText>
        {description && (
          <BodyText
            variant={variant === 'lg' ? 'sm' : 'xs'}
            className={cn(variant === 'md' && 'text-inherit')}
          >
            {description}
          </BodyText>
        )}
      </div>
    </div>
  );
};
