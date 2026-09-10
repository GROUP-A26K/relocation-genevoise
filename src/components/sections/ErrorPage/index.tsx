'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import Content403 from '@/assets/img/illustrations/content-403.svg';
import Content404 from '@/assets/img/illustrations/content-404.svg';
import Content500 from '@/assets/img/illustrations/content-500.svg';

interface ErrorPageProps {
  errorCode: number;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, message }) => {
  const t = useTranslations('Error');

  const renderErrorMessage = () => {
    switch (errorCode) {
      case 403:
        return {
          title: t('403.title'),
          description: t('403.description'),
          image: Content403,
        };
      case 404:
        return {
          title: t('404.title'),
          description: t('404.description'),
          image: Content404,
        };
      case 500:
        return {
          title: t('500.title'),
          description: t('500.description'),
          image: Content500,
        };
      default:
        return {
          title: message || 'An error occurred!',
          image: Content500,
        };
    }
  };

  const { title, description, image } = renderErrorMessage();

  return (
    <section
      id="home-section"
      className="flex h-fit flex-col items-center justify-center text-black-500 text-primary lg:h-screen"
    >
      <div className="container h-fit px-4 py-12 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] lg:py-0 xl:max-w-(--breakpoint-xl) xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
        <div className="grid grid-cols-1 items-center justify-between gap-12 lg:grid-cols-12">
          <div className="col-span-6 flex flex-col justify-start gap-4 lg:justify-center lg:gap-6">
            <h1 className="text-[120px] leading-[131.2px] font-semibold text-grey-200 lg:text-[164px]">
              {errorCode}
            </h1>
            <h1 className="text-3xl font-bold text-black-500 lg:text-h1 lg:leading-[130%]!">
              {title}
            </h1>
            <p className="text-[14px] leading-[18.2px] font-normal text-black-200">
              {description}
            </p>

            <div className="md:flex lg:justify-start">
              <Link href="/">
                <Button as="solid" type="primary" variant="md">
                  {t('buttonText')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-span-6 flex justify-center lg:justify-end">
            <Image
              src={image.src}
              alt="error illustration"
              width={588}
              height={640}
              className={cn(
                'w-full rounded-2xl object-cover',
                'max-w-[361px] md:max-w-[640px] lg:max-w-[640px]'
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
