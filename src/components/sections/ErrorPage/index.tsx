'use client';
import Image from 'next/image';
import React from 'react';
import Content403 from '@/assets/img/illustrations/content-403.svg';
import Content404 from '@/assets/img/illustrations/content-404.svg';
import Content500 from '@/assets/img/illustrations/content-500.svg';
import Button from '@/components/customs/Button';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
      className="lg:h-screen h-fit flex flex-col justify-center items-center text-primary text-black-500"
    >
      <div className="container h-fit 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md  xl:px-[100px] lg:px-[48px] px-4 lg:py-0 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center justify-between gap-12">
          <div className="col-span-6 flex flex-col lg:gap-6 gap-4 justify-start lg:justify-center">
            <h1 className="lg:text-[164px] text-[120px] text-grey-200 leading-[131.2px] font-semibold">
              {errorCode}
            </h1>
            <h1 className="lg:text-[48px] text-3xl font-bold text-black-500 leading-[62.4px]">
              {title}
            </h1>
            <p className="text-[14px] text-black-200 leading-[18.2px] font-normal">
              {description}
            </p>

            <div className="md:flex lg:justify-start">
              <Link href={'/'}>
                <Button as="solid" type="primary" variant="md">
                  {t('buttonText')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-span-6 flex lg:justify-end justify-center">
            <Image
              src={image.src}
              alt="error illustration"
              width={588}
              height={640}
              className={cn(
                'rounded-2xl object-cover w-full',
                'lg:max-w-[640px] md:max-w-[640px] max-w-[361px]'
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
