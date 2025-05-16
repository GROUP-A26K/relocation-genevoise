import { type ReactNode, type FC } from 'react';

interface Props {
  title?: string;
  author?: ReactNode;
}
export const Quote: FC<Props> = ({ author, title }) => {
  return (
    <div className="border-l-2 border-primary-500 py-2 pl-6 flex flex-col gap-8">
      <blockquote className="italic text-base text-black-200 font-normal !leading-[130%] flex">
        &quot;{title}&quot;
      </blockquote>
      <p className="text-gray-500 text-xs !leading-[130%]">— {author}</p>
    </div>
  );
};
