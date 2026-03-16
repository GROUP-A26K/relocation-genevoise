import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const PropertyDetailContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative flex flex-col justify-center items-center text-black-500 w-full">
      <div className="container 2xl:max-w-screen-2xl xl:max-w-screen-2xl lg:max-w-screen-xl md:max-w-screen-md">
        <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-16 gap-14">
          {children}
        </div>
      </div>
    </section>
  );
};
