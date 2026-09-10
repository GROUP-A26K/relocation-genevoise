import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-black-500">
      <div className="container px-4 pt-12 pb-14 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] lg:pt-16 lg:pb-16 xl:max-w-(--breakpoint-xl) xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
        {children}
      </div>
    </section>
  );
};
