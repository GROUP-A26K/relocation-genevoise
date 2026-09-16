import type { ReactNode } from 'react';

interface IQuoteProps {
  title?: ReactNode;
  author?: ReactNode;
}
export const Quote: React.FC<IQuoteProps> = ({ author, title }) => {
  return (
    <div className="flex flex-col gap-8 border-l-2 border-secondary-600 py-2 pl-6">
      <blockquote className="text-base leading-[130%]! font-normal text-black-200 italic">
        {title}
      </blockquote>
      {author && (
        <p className="text-xs leading-[130%]! text-gray-500">— {author}</p>
      )}
    </div>
  );
};
