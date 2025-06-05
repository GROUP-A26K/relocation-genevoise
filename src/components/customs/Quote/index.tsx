import { type ReactNode, type FC } from "react";

interface Props {
  title?: ReactNode;
  author?: ReactNode;
}
export const Quote: FC<Props> = ({ author, title }) => {
  return (
    <div className="border-l-2 border-secondary-600 py-2 pl-6 flex flex-col gap-8">
      <blockquote className="italic text-base text-black-200 font-normal !leading-[130%] flex">
        {title}
      </blockquote>
      {author && (
        <p className="text-gray-500 text-xs !leading-[130%]">— {author}</p>
      )}
    </div>
  );
};
