import Link from 'next/link';

import BodyText from './BodyText';

interface ILinkTextProps {
  link?: string;
  children?: React.ReactNode;
}
export const LinkText: React.FC<ILinkTextProps> = ({ children, link }) => {
  return (
    <BodyText
      asChild
      className="p-0 text-[length:inherit] font-semibold text-secondary-600"
    >
      <span>
        <Link href={link ?? ''} target="_blank" rel="noopener noreferrer">
          {children}
        </Link>
      </span>
    </BodyText>
  );
};
