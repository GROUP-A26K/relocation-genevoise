import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import WhatsappIcon from '@/assets/icons/social/whatsapp.png';

interface IWhatsappProps {
  phoneNumber: string;
}

export const Whatsapp: React.FC<IWhatsappProps> = ({ phoneNumber }) => {
  const imageT = useTranslations('Images');

  return (
    <Link
      href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 lg:right-8 lg:bottom-12"
    >
      <Image
        src={WhatsappIcon}
        alt={imageT('common.whatsapp')}
        title={imageT('common.whatsapp')}
        width={100}
        height={100}
        className="size-15 lg:size-20"
      />
    </Link>
  );
};
