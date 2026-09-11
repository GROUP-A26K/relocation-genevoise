'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Section from '@/components/customs/Section';
import { RevealItem } from '@/components/customs/Reveal';
import ContactBG from '@/assets/img/bg/relocation-genevoise-contact.webp';

interface IContactContainerProps {
  children: React.ReactNode;
}

export const ContactContainer: React.FC<IContactContainerProps> = (props) => {
  const t = useTranslations('Contact.ContactContainer');

  return (
    <Section wrapperProps={{ className: 'pt-0 2xl:pt-0' }}>
      <div className="border-t border-grey-100 xl:hidden" />
      <div className="grid grid-cols-1 gap-25 xl:grid-cols-[504fr_636fr] xl:items-center">
        <div className="flex w-full flex-col items-center lg:justify-start xl:justify-center">
          <RevealItem className="flex flex-col items-start gap-12 lg:gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
                {t('title')}
              </p>
              <h2 className="text-3xl leading-[130%]! font-semibold">
                {t('subTitle')}
              </h2>
              <p className="max-w-2xl text-sm leading-[130%]! font-normal text-black-200">
                {t('description')}
              </p>
            </div>
            {props.children}
          </RevealItem>
        </div>
        <RevealItem className="relative hidden aspect-1920/2483 w-full overflow-hidden rounded-3xl xl:block">
          <Image
            src={ContactBG}
            alt="Relocation Genevoise, assureur expert à Genève. Contactez-nous."
            title="Relocation Genevoise, assureur expert à Genève. Contactez-nous."
            fill
            sizes="(max-width: 1240px) 50vw, 100vw"
            className="object-cover"
          />
        </RevealItem>
      </div>
    </Section>
  );
};
