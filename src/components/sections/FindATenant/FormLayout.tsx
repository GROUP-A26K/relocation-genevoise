import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/libs/utils';

const CONTAINER =
  'container w-full max-w-(--breakpoint-2xl) mx-auto px-4 lg:px-[48px] 2xl:px-[100px]';

interface IFormLayoutProps extends React.PropsWithChildren {
  eyebrow: string;
  heading: string;
  description: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
  imageWrapperClassname?: string;
}

export default function FormLayout({
  children,
  eyebrow,
  heading,
  description,
  image,
  imageWrapperClassname,
}: IFormLayoutProps) {
  return (
    <section className="bg-white text-black-500">
      <div className="bg-yellow-25">
        <div className={cn(CONTAINER, 'pt-12 pb-24 lg:pt-16 lg:pb-32')}>
          <div className="flex max-w-[760px] flex-col gap-3">
            <p className="text-sm leading-[130%]! font-semibold text-yellow-600">
              {eyebrow}
            </p>
            <div className="flex flex-col gap-4">
              <h1 className="text-[32px] leading-[130%]! font-bold text-pretty whitespace-pre-line lg:text-5xl">
                {heading}
              </h1>
              <p className="text-base leading-[150%]! font-normal text-black-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(CONTAINER, '-mt-16 pb-12 lg:pb-16')}>
        <div className="overflow-hidden rounded-3xl bg-white p-4 pt-6 shadow-[0px_2px_20px_0px_rgba(203,213,225,0.4)] lg:grid lg:grid-cols-2 lg:gap-16 lg:p-8">
          {children}

          <div
            className={cn(
              'relative hidden aspect-556/852 w-full overflow-hidden rounded-3xl lg:block',
              imageWrapperClassname
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              title={image.alt}
              fill
              sizes="50vw"
              className="object-cover"
              priority
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
