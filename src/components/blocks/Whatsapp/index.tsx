import WhatsappIcon from '@/assets/img/logos/social/whatsapp.svg';
import Image from 'next/image';
import { FC } from 'react';
import { Link } from '@/libs/i18nNavigation';
interface Props {
  phoneNumber: string;
}
export const Whatsapp: FC<Props> = ({ phoneNumber }) => {
  return (
    <Link
      href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="fixed z-40 lg:bottom-12 lg:right-8 bottom-4 right-4">
        <Image
          src={WhatsappIcon}
          alt="Whatsapp logo"
          title="Whatsapp logo"
          width={100}
          height={100}
          className="lg:size-[80px] size-[60px]"
        />
      </div>
    </Link>
  );
};
