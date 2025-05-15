import type { FC } from "react";
import { cn } from "@/libs/utils";
import { Info, XIcon } from "lucide-react";
import {
  Alert as ShadcnAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
type IType = "danger" | "success" | "warning" | "info";

interface GhostProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  onClick?: () => void;
  as: "ghost";
}

interface SolidProps extends React.AnchorHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
  onClick?: () => void;
  as: "solid";
}

interface BaseProps {
  children: React.ReactNode;
  type: IType;
  className?: string;
  title?: string;
  disabled?: boolean;
  isIconLeft?: boolean;
  isIconRight?: boolean;
}

type Props = BaseProps & (GhostProps | SolidProps);

const Alert: FC<Props> = ({ children, type, title, as, onClick }) => {
  const STYLE_GHOST: Record<IType, string> = {
    danger: cn("bg-red-50"),
    success: cn("bg-secondary-50"),
    warning: cn("bg-yellow-50"),
    info: cn("bg-blue-50"),
  };

  const STYLE_SOLID: Record<IType, string> = {
    danger: cn("bg-red-500"),
    success: cn("bg-secondary-500"),
    warning: cn("bg-yellow-500"),
    info: cn("bg-blue-500"),
  };

  const STYLE_ICON: Record<IType, string> = {
    danger: cn("text-red-500"),
    success: cn("text-secondary-500"),
    warning: cn("text-yellow-500"),
    info: cn("text-blue-500"),
  };

  switch (as) {
    case "solid":
      return (
        <ShadcnAlert
          className={cn(
            { [STYLE_SOLID[type]]: as === "solid" },
            "rounded-[1.5rem] h-fit w-[400px] flex items-center justify-between "
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-full mr-[13px] text-opacity-100 "
            )}
          >
            <Info className="h-[24px] w-[24px] text-white" />
          </div>

          {/* Alert text content */}
          <div className="flex h-fit justify-between w-full">
            <div className="flex flex-col">
              <AlertTitle className="text-[16px] text-white font-semibold lineHeight-md mb-[3px]">
                {title
                  ? title
                  : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </AlertTitle>
              <AlertDescription className="text-[16px] text-white font-medium lineHeight-md">
                {children}
              </AlertDescription>
            </div>

            {/* Close button */}
            <div
              className="flex items-start justify-start cursor-pointer"
              onClick={onClick}
            >
              <button className="p-[6px] text-white">
                <XIcon className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </ShadcnAlert>
      );

    case "ghost":
      return (
        <ShadcnAlert
          className={cn(
            { [STYLE_GHOST[type]]: as === "ghost" },
            "rounded-[1.5rem] h-[66px] w-[400px] flex items-center justify-between "
          )}
        >
          <div
            className={cn("flex items-center justify-center rounded-full mr-4")}
          >
            <Info className={cn(STYLE_ICON[type], "h-[24px] w-[24px]")} />
          </div>
          {/* Alert text content */}

          <div className="flex h-[42px] justify-between w-full">
            <div className="flex flex-col">
              <AlertTitle className="text-[16px] text-black-500 font-semibold lineHeight-md mb-[3px]">
                {title
                  ? title
                  : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </AlertTitle>
              <AlertDescription className="text-[16px] text-black-500 font-medium lineHeight-md">
                {children}
              </AlertDescription>
            </div>

            {/* Close button */}
            <div
              className="flex items-start justify-start cursor-pointer"
              onClick={onClick}
            >
              <button className="p-[6px] text-black-500">
                <XIcon className="w-[20px] h-[20px]" />
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
