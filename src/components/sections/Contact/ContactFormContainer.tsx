'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { RevealItem, RevealSection } from '@/components/customs/Reveal';
import ContactBG from '@/assets/img/bg/relocation-genevoise-contact.webp';

import type { FC } from 'react';
interface Props {
  children: React.ReactNode;
}

export const ContactContainer: FC<Props> = (props) => {
  const t = useTranslations('Contact.ContactContainer');
  return (
    <section className="relative flex flex-col items-center justify-center text-black-500">
      <div className="container px-4 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] xl:max-w-(--breakpoint-xl) xl:px-[100px] xl:pr-0 2xl:max-w-(--breakpoint-2xl)">
        <div className="border-t border-grey-100 pb-14 xl:border-none xl:pb-0" />
        <RevealSection className="flex flex-col items-center justify-end gap-[100px] xl:flex-row xl:gap-[100px]">
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
          <RevealItem className="hidden xl:flex">
            <Image
              src={ContactBG}
              alt="Relocation Genevoise, assureur expert à Genève. Contactez-nous."
              title="Relocation Genevoise, assureur expert à Genève. Contactez-nous."
              width={736}
              height={984}
              className="min-w-[600px] rounded-3xl object-cover lg:max-h-[984px] 2xl:min-w-[736px]"
            />
          </RevealItem>
        </RevealSection>
        <div className="border-b border-grey-100 pt-12 lg:pt-16" />
      </div>
    </section>
  );
};
