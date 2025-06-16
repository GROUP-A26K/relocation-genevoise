import type { FC } from 'react';
import { cn } from '@/libs/utils';
import { Button as ShadcnButton } from '@/components/ui/button-custom';

type IType = 'primary' | 'secondary';
type IVariant = 'lg' | 'md' | 'sm' | 'xs';

interface SolidProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target?: never;
  onClick?: () => void;
  as: 'solid';
}

interface OutlineProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target?: never;
  onClick?: () => void;
  as: 'outline';
}

interface GhostProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  as: 'ghost';
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target?: string;
  onClick?: never;
  as: 'link';
}

interface BaseProps {
  children: React.ReactNode;
  variant: IVariant;
  type: IType;
  className?: string;
  disabled?: boolean;
}

type Props = BaseProps & (SolidProps | OutlineProps | GhostProps | LinkProps);

const Button: FC<Props> = ({
  children,
  variant,
  type,
  as,
  className = '',
  disabled = false,
  iconStart: IconStart,
  iconEnd: IconEnd,
  onClick,
}) => {
  // Define button size styles for different variants (lg, md, sm, xs)
  const STYLE_BTN: Record<IVariant, string> = {
    lg: cn(
      'px-[24px] py-[22px] rounded-[1.5rem] text-[18px] text-white font-semibold lineHeight-large w-fit'
    ),
    md: cn(
      'px-[16px] py-[20px] rounded-[1.5rem] text-[16px] text-white font-semibold lineHeight-md w-fit'
    ),
    sm: cn(
      'px-[12px] py-[17px] rounded-[1.5rem] text-[14px] text-white font-semibold lineHeight-sm w-fit'
    ),
    xs: cn(
      'px-[10px] py-[10px] rounded-[1.5rem] text-[12px] text-white font-semibold lineHeight-xs w-fit'
    ),
  };

  const STYLE_SOLID: Record<string, string> = {
    primary: 'bg-primary-500 hover:bg-primary-400 active:bg-primary-600',
    secondary:
      'bg-secondary-500 hover:bg-secondary-400 active:bg-secondary-600 text-black-500',
    disabled:
      type === 'primary'
        ? 'bg-primary-50 border-text-300 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'bg-secondary-50 border-text-300 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_OUTLINE: Record<string, string> = {
    primary: cn(
      'bg-white border border-indigo-600 border-primary-500 text-primary-500',
      'hover:bg-grey-100 hover:border-primary-400 hover:text-primary-400',
      'active:bg-grey-200 active:border-primary-500 active:text-primary-500 active:text-primary-500'
    ),
    secondary: cn(
      'bg-white border border-indigo-600 border-secondary-500 text-secondary-600',
      'hover:bg-secondary-50 hover:border-secondary-400 hover:text-secondary-400',
      'active:bg-secondary-50 active:border-secondary-600 active:text-secondary-600 '
    ),
    disabled:
      type === 'primary'
        ? 'bg-white border border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'bg-white border border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_GHOST: Record<string, string> = {
    primary: cn(
      'bg-grey-50 text-primary-500',
      'hover:bg-grey-50 hover:text-primary-400',
      'active:bg-grey-100 active:text-primary-600'
    ),
    secondary: cn(
      'bg-secondary-50 text-secondary-600',
      'hover:bg-secondary-50 hover:text-secondary-400',
      'active:bg-secondary-100 active:text-secondary-600'
    ),
    disabled:
      type === 'primary'
        ? 'border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_LINK: Record<string, string> = {
    primary: cn(
      'bg-none text-primary-500',
      'hover:bg-none hover:text-primary-400',
      'active:bg-none active:text-primary-600'
    ),
    secondary: cn(
      'bg-none text-secondary-600',
      'hover:none hover:text-secondary-400',
      'active:none active:text-secondary-600'
    ),
    disabled:
      type === 'primary'
        ? 'border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  // Define icon size for each variant
  const STYLE_ICON: Record<IVariant, string> = {
    lg: cn('!w-[20px] !h-[20px]'),
    md: cn('!w-[16px] !h-[16px]'),
    sm: cn('!w-[12px] !h-[12px]'),
    xs: cn('!w-[10px] !h-[10px]'),
  };

  const renderButtonContent = () => (
    <>
      {IconStart && (
        <IconStart strokeWidth={3} className={cn(STYLE_ICON[variant])} />
      )}
      {children}
      {IconEnd && (
        <IconEnd strokeWidth={3} className={cn(STYLE_ICON[variant])} />
      )}
    </>
  );

  // Switch based on the 'as' prop (button type)
  switch (as) {
    case 'solid':
      return (
        <ShadcnButton
          onClick={onClick}
          type='submit'
          className={cn(
            STYLE_BTN[variant],
            {
              [STYLE_SOLID[type]]: as === 'solid',
              [STYLE_SOLID.disabled]: as === 'solid' && disabled,
            },
            'shadow-none',
            className
          )}
        >
          {renderButtonContent()}
        </ShadcnButton>
      );

    case 'outline':
      return (
        <ShadcnButton
          onClick={onClick}
          type='submit'
          className={cn(
            STYLE_BTN[variant],
            {
              [STYLE_OUTLINE[type]]: as === 'outline',
              [STYLE_OUTLINE.disabled]: as === 'outline' && disabled,
            },
            'shadow-none',
            className
          )}
        >
          {renderButtonContent()}
        </ShadcnButton>
      );

    case 'ghost':
      return (
        <ShadcnButton
          onClick={onClick}
          type='submit'
          className={cn(
            STYLE_BTN[variant],
            {
              [STYLE_GHOST[type]]: as === 'ghost',
              [STYLE_GHOST.disabled]: as === 'ghost' && disabled,
            },
            'shadow-none',
            className
          )}
        >
          {renderButtonContent()}
        </ShadcnButton>
      );

    case 'link':
      return (
        <ShadcnButton
          variant='link'
          className={cn(
            STYLE_BTN[variant],
            {
              [STYLE_LINK[type]]: as === 'link',
              [STYLE_LINK.disabled]: as === 'link' && disabled,
            },
            className
          )}
        >
          {renderButtonContent()}
        </ShadcnButton>
      );

    default:
      return null;
  }
};

export default Button;
