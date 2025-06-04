import { cn } from "@/libs/utils";
import { type FC } from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}
export const Paragraph: FC<Props> = ({ children, className = "" }) => {
  return (
    <span
      className={cn(
        "text-black-200 lg:text-base text-sm font-normal !leading-[130%] p-0",
        className
      )}
    >
      {children}
    </span>
  );
};
