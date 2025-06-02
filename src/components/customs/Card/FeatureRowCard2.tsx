import { cn } from "@/libs/utils";
import Link from "next/link";

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
      <div className="flex p-6 flex-row w-full h-full lg:gap-6 gap-4 bg-grey-50 border border-grey-50 hover:bg-white hover:border-secondary-500 rounded-xl leading-none no-underline transition-colors outline-none select-none">
        <div className="lg:h-12 lg:w-12 w-10 h-10 rounded-xl bg-secondary-500 flex items-center justify-center">
          <div className="lg:p-3 p-2.5">
            {Icon && <Icon className="lg:h-6 lg:w-6 w-5 h-5 text-black-500" />}
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col justify-center text-black-500 lg:gap-2 gap-1 "
          )}
        >
          <h4 className="text-xl font-semibold !leading-[130%]">{title}</h4>
          {description && (
            <p
              className={cn(
                "text-base text-black-200 font-normal !leading-[130%]"
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
