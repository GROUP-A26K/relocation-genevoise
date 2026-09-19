import BodyText from '@/components/common/Text/BodyText';

import type { ReactNode } from 'react';

interface IQuoteProps {
  title?: ReactNode;
  author?: ReactNode;
}
export const Quote: React.FC<IQuoteProps> = ({ author, title }) => {
  return (
    <div className="flex flex-col gap-8 border-l-2 border-secondary-600 py-2 pl-6">
      <BodyText asChild className="italic">
        <blockquote>{title}</blockquote>
      </BodyText>
      {author && (
        <BodyText variant="xs" className="font-[number:inherit] text-gray-500">
          — {author}
        </BodyText>
      )}
    </div>
  );
};
