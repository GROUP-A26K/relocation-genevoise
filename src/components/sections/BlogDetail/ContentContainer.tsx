import { cn } from "@/libs/utils";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative flex flex-col justify-center items-center text-black-500">
      <div
        className={cn(
          "container flex flex-col gap-8 relative pb-14 pt-0 px-4",
          "lg:flex-row lg:pb-16 lg:pt-8 lg:px-[48px]",
          "xl:max-w-screen-xl xl:px-[100px]",
          "2xl:max-w-screen-2xl",
          "md:max-w-screen-md"
        )}
      >
        {children}
      </div>
    </section>
  );
};
