import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative flex flex-col justify-center items-center text-black-500">
      <div
        className={`container pb-14 lg:pb-16  lg:pt-8 pt-0 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md  xl:px-[100px] lg:px-[48px] px-4 `}
      >
        {children}
      </div>
    </section>
  );
};
