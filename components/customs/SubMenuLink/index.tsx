import { cn } from "@/libs/utils";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant: "lg" | "md";
}

export const SubMenuLink: React.FC<MenuItem> = ({
  title,
  url,
  description,
  icon: Icon,
  variant,
}) => {
  const STYLE_TEXT: Record<"lg" | "md", string> = {
    lg: cn("text-[14px]"),
    md: cn("text-[12px]"),
  };

  const STYLE_ITEM: Record<"lg" | "md", string> = {
    lg: cn("gap-[8px]"),
    md: cn("gap-[4px]"),
  };
  return (
    <Link
      className="group flex p-3 flex-row gap-[8px] rounded-md leading-none no-underline transition-colors outline-none select-none hover:bg-grey-50 hover:text-accent-foreground"
      href={url}
    >
      <div className="!h-8 rounded-sm !w-8 bg-grey-50 group-hover:bg-secondary-500 flex items-center justify-center">
        <div className="p-4">
          {Icon && (
            <Icon className="!h-4 !w-4 text-primary-500 group-hover:text-white" />
          )}
        </div>
      </div>
      <div className={cn("flex flex-col text-black-500 ", STYLE_ITEM[variant])}>
        <div className="text-[14px] font-semibold !leading-[130%]">{title}</div>
        {description && (
          <p
            className={cn(
              "text-[14px] text-black-200 font-normal !leading-[130%]",
              STYLE_TEXT[variant],
              "!leading-[130%]"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};
