import { cn } from '@/libs/utils';
import { type ReactNode, type FC } from 'react';

interface Props {
  children: ReactNode;
  isDivider?: boolean;
  className?: string;
}
const Section: FC<Props> = ({ children, isDivider, className }) => {
  return (
    <section
      className={cn(
        'flex flex-col justify-center items-center text-black-500',
        className
      )}
    >
      <div className="container lg:pt-16 pt-14 2xl:max-w-screen-2xl xl:max-w-screen-2xl lg:max-w-screen-xl md:max-w-screen-md  2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4">
        <div className="flex flex-col lg:gap-16 gap-14">{children}</div>
        <div
          className={`lg:pt-16 pt-14 ${isDivider && 'border-b border-grey-100'}`}
        />
      </div>
    </section>
  );
};
export default Section;
