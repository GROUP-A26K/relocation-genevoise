import { FC } from 'react';
import { cn } from '@/libs/utils';
import { Button as ShadcnButton } from '@/components/ui/button-custom';
type IType = 'primary' | 'secondary';
type IVariant = 'lg' | 'md' | 'sm';

// Defining types for the `src` as a React component (LucideReact icon)
interface IconButtonSolidProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Accepts a LucideReact icon component
  href?: never;
  target?: never;
  onClick?: () => void;
  as: 'solid';
}

interface IconButtonOutlineProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Accepts a LucideReact icon component
  href?: never;
  target?: never;
  onClick?: () => void;
  as: 'outline';
}

interface IconButtonGhostProps
  extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Accepts a LucideReact icon component
  href?: never;
  target?: never;
  onClick?: () => void;
  as: 'ghost';
}

interface BaseProps {
  variant: IVariant;
  type: IType;
  className?: string;
  disabled?: boolean;
}

type Props = BaseProps &
  (IconButtonSolidProps | IconButtonOutlineProps | IconButtonGhostProps);

const IconButton: FC<Props> = ({
  variant,
  type,
  as,
  className = '',
  disabled = false,
  icon: Icon,
}) => {
  // Define button size styles for different variants (lg, md, sm)
  const STYLE_BTN: Record<IVariant, string> = {
    lg: cn('rounded-full px-[10px] py-[10px] w-fit h-fit text-white'),
    md: cn('rounded-full px-[10px] py-[10px] w-fit h-fit text-white'),
    sm: cn('rounded-full px-[10px] py-[10px] w-fit h-fit text-white'),
  };

  // Define button color styles based on type (primary, secondary)
  const STYLE_SOLID: Record<string, string> = {
    primary: 'bg-primary-500 hover:bg-primary-400 active:bg-primary-600',
    secondary:
      'bg-secondary-500 hover:bg-secondary-400 active:bg-secondary-600',
    disabled:
      type === 'primary'
        ? 'bg-primary-50 border-text-300 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'bg-secondary-50 border-text-300 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_OUTLINE: Record<string, string> = {
    primary: cn(
      'bg-white border border-indigo-600 border-primary-500 text-primary-500',
      'hover:bg-primary-50 hover:border-primary-400 hover:text-primary-400',
      'active:bg-primary-50 active:border-primary-500 active:text-primary-500 active:text-primary-500'
    ),
    secondary: cn(
      'bg-white border border-indigo-600 border-secondary-500 text-secondary-500',
      'hover:bg-secondary-50 hover:border-secondary-400 hover:text-secondary-400',
      'active:bg-secondary-50 active:border-secondary-600 active:text-secondary-500 '
    ),
    disabled:
      type === 'primary'
        ? 'bg-white border border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'bg-white border border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_GHOST: Record<string, string> = {
    primary: cn(
      'bg-primary-50 text-primary-500',
      'hover:bg-primary-50 hover:text-primary-400',
      'active:bg-primary-100 active:text-primary-600'
    ),
    secondary: cn(
      'bg-secondary-50 text-secondary-500',
      'hover:bg-secondary-50 hover:text-secondary-400',
      'active:bg-secondary-100 active:text-secondary-600'
    ),
    disabled:
      type === 'primary'
        ? 'border-indigo-600 border-primary-200 text-primary-200 text-base font-bold leading-6 pointer-events-none select-none'
        : 'border-indigo-600 border-secondary-200 text-secondary-200 text-base font-bold leading-6 pointer-events-none select-none',
  };

  const STYLE_ICON: Record<IVariant, string> = {
    lg: cn('!w-[20px] !h-[20px]'),
    md: cn('!w-[16px] !h-[16px]'),
    sm: cn('!w-[12px] !h-[12px]'),
  };

  const renderButtonContent = () => (
    <Icon strokeWidth={3} className={cn(STYLE_ICON[variant])} />
  );

  switch (as) {
    case 'solid':
      return (
        <ShadcnButton
          type="submit"
          className={cn(
            STYLE_BTN[variant],
            {
              [STYLE_SOLID[type]]: as === 'solid',
              [STYLE_SOLID.disabled]: as === 'solid' && disabled,
            },
            className
          )}
        >
          {renderButtonContent()}
        </ShadcnButton>
      );

    case 'outline':
      return (
        <ShadcnButton
          type="submit"
          className={cn(
            STYLE_BTN[variant],
            {
              [STYLE_OUTLINE[type]]: as === 'outline',
              [STYLE_OUTLINE.disabled]: as === 'outline' && disabled,
            },
            className
          )}
        >
          {renderButtonContent()}
        </ShadcnButton>
      );

    case 'ghost':
      return (
        <ShadcnButton
          type="submit"
          className={cn(
            STYLE_BTN[variant],
            {
              [STYLE_GHOST[type]]: as === 'ghost',
              [STYLE_GHOST.disabled]: as === 'ghost' && disabled,
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

export default IconButton;
