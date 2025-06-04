'use client';
import { FC } from 'react';
import Image from 'next/image';
import ContactBG from '@/assets/img/bg/relocation-genevoise-contact.webp';
import { useTranslations } from 'next-intl';
interface Props {
  children: React.ReactNode;
}

export const ContactContainer: FC<Props> = (props) => {
  const t = useTranslations('Contact.ContactContainer');
  return (
    <section className='relative flex flex-col justify-center items-center text-black-500'>
      <div
        className={`container 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md xl:pr-0 xl:px-[100px] lg:px-[48px] px-4`}
      >
        <div
          className={`xl:pb-0 pb-14 border-t xl:border-none border-grey-100`}
        />
        <div className='flex flex-col xl:flex-row items-center justify-end xl:gap-[100px] gap-[100px]'>
          <div className='flex flex-col items-center xl:justify-center lg:justify-start w-full'>
            <div className='flex flex-col items-start lg:gap-8 gap-12'>
              <div className='flex flex-col gap-3'>
                <p className='text-sm font-semibold text-secondary-600 !leading-[130%]'>
                  {t('title')}
                </p>
                <h2 className='text-3xl font-semibold !leading-[130%]'>
                  {t('subTitle')}
                </h2>
                <p className='text-sm font-normal text-black-200 !leading-[130%] max-w-2xl'>
                  {t('description')}
                </p>
              </div>
              {props.children}
            </div>
          </div>
          <Image
            src={ContactBG}
            alt='Assurance Genevoise, assureur expert à Genève. Contactez-nous.'
            title='Assurance Genevoise, assureur expert à Genève. Contactez-nous.'
            width={736}
            height={984}
            className='lg:max-h-[984px] 2xl:min-w-[736px] min-w-[600px] rounded-3xl object-cover xl:flex hidden'
          />
        </div>
        <div className={`lg:pt-16 pt-14 border-b border-grey-100`} />
      </div>
    </section>
  );
};
