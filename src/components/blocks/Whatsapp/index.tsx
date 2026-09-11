import Image from 'next/image';

import { Link } from '@/libs/i18nNavigation';
import WhatsappIcon from '@/assets/img/logos/social/whatsapp.svg';

interface IWhatsappProps {
  phoneNumber: string;
}

export const Whatsapp: React.FC<IWhatsappProps> = ({ phoneNumber }) => {
  return (
    <Link
      href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="fixed right-4 bottom-4 z-40 lg:right-8 lg:bottom-12">
        <Image
          src={WhatsappIcon}
          alt="Whatsapp logo"
          title="Whatsapp logo"
          width={100}
          height={100}
          priority
          className="size-15 lg:size-20"
        />
      </div>
    </Link>
  );
};
