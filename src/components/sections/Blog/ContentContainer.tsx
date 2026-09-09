import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative flex flex-col justify-center items-center text-black-500">
      <div
        className={`container lg:pt-8 pt-12 2xl:max-w-(--breakpoint-2xl) xl:max-w-(--breakpoint-xl) lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)  xl:px-[100px] lg:px-[48px] px-4`}
      >
        {children}
      </div>
    </section>
  );
};
