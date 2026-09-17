import { cn } from '@/libs/utils';
import { bodyTextVariants } from '@/components/common/Text/BodyText';
import { Button as ShadcnButton } from '@/components/ui/button-custom';

type TButtonType = 'primary' | 'secondary';
type TButtonVariant = 'lg' | 'md' | 'sm' | 'xs';

interface IButtonSolidProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target?: never;
  onClick?: () => void;
  as: 'solid';
}

interface IButtonOutlineProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target?: never;
  onClick?: () => void;
  as: 'outline';
}

interface IButtonGhostProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  as: 'ghost';
}

interface IButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: never;
  iconStart?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconEnd?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  target?: string;
  onClick?: never;
  as: 'link';
}

interface IButtonBaseProps {
  children: React.ReactNode;
  variant: TButtonVariant;
  type: TButtonType;
  className?: string;
  disabled?: boolean;
}

type TButtonProps = IButtonBaseProps &
  (
    | IButtonSolidProps
    | IButtonOutlineProps
    | IButtonGhostProps
    | IButtonLinkProps
  );

const Button: React.FC<TButtonProps> = ({
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
  const STYLE_BTN: Record<TButtonVariant, string> = {
    lg: cn(
      bodyTextVariants({ variant: 'lg' }),
      'text-nowrap',
      'px-[24px] py-[22px] rounded-3xl text-[18px]/[1.5] text-white font-semibold w-fit'
    ),
    md: cn(
      bodyTextVariants({ variant: 'md' }),
      'text-nowrap',
      'px-[16px] py-[20px] rounded-3xl text-[16px]/[1.5] text-white font-semibold w-fit'
    ),
    sm: cn(
      bodyTextVariants({ variant: 'sm' }),
      'text-nowrap',
      'px-[12px] py-[17px] rounded-3xl text-[14px]/[1.5] text-white font-semibold w-fit'
    ),
    xs: cn(
      bodyTextVariants({ variant: 'xs' }),
      'text-nowrap',
      'px-[10px] py-[10px] rounded-3xl text-[12px]/[1.5] text-white font-semibold w-fit'
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
    primary:
      'bg-white border border-primary-500 text-primary-500 hover:bg-grey-100 hover:border-primary-400 hover:text-primary-400 active:bg-grey-200 active:border-primary-500 active:text-primary-500',
    secondary:
      'bg-white border border-secondary-500 text-secondary-600 hover:bg-secondary-50 hover:border-secondary-400 hover:text-secondary-400 active:bg-secondary-50 active:border-secondary-600 active:text-secondary-600',
    disabled:
      type === 'primary'
        ? 'bg-white border border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'bg-white border border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_GHOST: Record<string, string> = {
    primary:
      'bg-grey-50 text-primary-500 hover:bg-grey-50 hover:text-primary-400 active:bg-grey-100 active:text-primary-600',
    secondary:
      'bg-secondary-50 text-secondary-600 hover:bg-secondary-50 hover:text-secondary-400 active:bg-secondary-100 active:text-secondary-600',
    disabled:
      type === 'primary'
        ? 'border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_LINK: Record<string, string> = {
    primary:
      'bg-none text-primary-500 hover:bg-none hover:text-primary-400 active:bg-none active:text-primary-600',
    secondary:
      'bg-none text-secondary-600 hover:none hover:text-secondary-400 active:none active:text-secondary-600',
    disabled:
      type === 'primary'
        ? 'border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  // Non-default sizes must outrank the primitive’s [&_svg]:size-4 selector.
  const STYLE_ICON: Record<TButtonVariant, string> = {
    lg: 'w-[20px]! h-[20px]!',
    md: 'w-[16px] h-[16px]',
    sm: 'w-[12px]! h-[12px]!',
    xs: 'w-[10px]! h-[10px]!',
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

  switch (as) {
    case 'solid':
      return (
        <ShadcnButton
          onClick={onClick}
          type="submit"
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
          type="submit"
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
          type="submit"
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
          variant="link"
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
