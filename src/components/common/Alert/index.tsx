import { Info, XIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import {
  Alert as ShadcnAlert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

type TAlertType = 'danger' | 'success' | 'warning' | 'info';

interface IAlertGhostProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  onClick?: () => void;
  as: 'ghost';
}

interface IAlertSolidProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  onClick?: () => void;
  as: 'solid';
}

interface IAlertBaseProps {
  children: React.ReactNode;
  type: TAlertType;
  className?: string;
  title?: string;
  disabled?: boolean;
  isIconLeft?: boolean;
  isIconRight?: boolean;
}

type TAlertProps = IAlertBaseProps & (IAlertGhostProps | IAlertSolidProps);

const Alert: React.FC<TAlertProps> = ({
  children,
  type,
  title,
  as,
  onClick,
}) => {
  const STYLE_GHOST: Record<TAlertType, string> = {
    danger: cn('bg-red-50'),
    success: cn('bg-green-50'),
    warning: cn('bg-yellow-50'),
    info: cn('bg-blue-50'),
  };

  const STYLE_SOLID: Record<TAlertType, string> = {
    danger: cn('bg-red-500'),
    success: cn('bg-green-500'),
    warning: cn('bg-yellow-500'),
    info: cn('bg-blue-500'),
  };

  const STYLE_ICON: Record<TAlertType, string> = {
    danger: cn('text-red-500'),
    success: cn('text-green-500'),
    warning: cn('text-yellow-500'),
    info: cn('text-blue-500'),
  };

  switch (as) {
    case 'solid':
      return (
        <ShadcnAlert
          className={cn(
            { [STYLE_SOLID[type]]: as === 'solid' },
            'flex h-fit w-full items-center justify-between rounded-3xl sm:w-[400px]'
          )}
        >
          <div
            className={cn(
              'mr-[13px] flex items-center justify-center rounded-full'
            )}
          >
            <Info className="h-[24px] w-[24px] text-white" />
          </div>

          {/* Alert text content */}
          <div className="flex h-fit w-full justify-between">
            <div className="flex flex-col">
              <AlertTitle className="lineHeight-md mb-[3px] text-[16px] font-semibold text-white">
                {title
                  ? title
                  : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </AlertTitle>
              <AlertDescription className="lineHeight-md text-[16px] font-medium text-white">
                {children}
              </AlertDescription>
            </div>

            {/* Close button */}
            <div
              className="flex cursor-pointer items-start justify-start"
              onClick={onClick}
            >
              <button className="p-[6px] text-white">
                <XIcon className="h-[20px] w-[20px]" />
              </button>
            </div>
          </div>
        </ShadcnAlert>
      );

    case 'ghost':
      return (
        <ShadcnAlert
          className={cn(
            { [STYLE_GHOST[type]]: as === 'ghost' },
            'flex h-fit w-full items-center justify-between rounded-3xl sm:w-[400px]'
          )}
        >
          <div
            className={cn('mr-4 flex items-center justify-center rounded-full')}
          >
            <Info className={cn(STYLE_ICON[type], 'h-[24px] w-[24px]')} />
          </div>
          {/* Alert text content */}

          <div className="flex h-fit w-full justify-between">
            <div className="flex flex-col">
              <AlertTitle className="lineHeight-md mb-[3px] text-[16px] font-semibold text-black-500">
                {title
                  ? title
                  : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </AlertTitle>
              <AlertDescription className="lineHeight-md text-[16px] font-medium text-black-500">
                {children}
              </AlertDescription>
            </div>

            {/* Close button */}
            <div
              className="flex cursor-pointer items-start justify-start"
              onClick={onClick}
            >
              <button className="p-[6px] text-black-500">
                <XIcon className="h-[20px] w-[20px]" />
              </button>
            </div>
          </div>
        </ShadcnAlert>
      );

    default:
      return null;
  }
};

export default Alert;
