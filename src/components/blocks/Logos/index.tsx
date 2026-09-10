'use client';

import Image from 'next/image';
import AutoScroll from 'embla-carousel-auto-scroll';

import LogoCompany3 from '@/assets/img/logos/tsm-logo.webp';
import LogoCompany8 from '@/assets/img/logos/axa-logo.webp';
import LogoCompany4 from '@/assets/img/logos/zurich-logo.webp';
import LogoCompany9 from '@/assets/img/logos/tellco-logo.webp';
import LogoCompany1 from '@/assets/img/logos/allianz-logo.webp';
import LogoCompany6 from '@/assets/img/logos/baloise-logo.webp';
import LogoCompany7 from '@/assets/img/logos/vaudoise-logo.webp';
import LogoCompany10 from '@/assets/img/logos/generali-logo.webp';
import LogoCompany2 from '@/assets/img/logos/paul-frank-logo.webp';
import LogoCompany5 from '@/assets/img/logos/la-mobiliere-logo.webp';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import type { FC } from 'react';

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos: FC<Props> = ({
  heading = '30+ insurers trust us in Switzerland',
  logos = [
    {
      id: 'logo-3',
      description: 'TSM logo',
      image: LogoCompany3,
      className: 'lg:h-12 h-7 lg:w-12 w-7',
    },
    {
      id: 'logo-1',
      description: 'Allianz logo',
      image: LogoCompany1,
      className: 'lg:h-12 h-7 w-fit',
    },
    {
      id: 'logo-2',
      description: 'Paul Frank logo',
      image: LogoCompany2,
      className: 'lg:h-12 h-7 w-fit',
    },
    {
      id: 'logo-4',
      description: 'Zurich logo',
      image: LogoCompany4,
      className: 'lg:h-12 h-7 w-fit',
    },
    {
      id: 'logo-8',
      description: 'AXA logo',
      image: LogoCompany8,
      className: 'lg:h-12 h-7 lg:w-12 w-7',
    },
    {
      id: 'logo-5',
      description: 'La Mobilière logo',
      image: LogoCompany5,
      className: 'lg:h-12 h-7 w-fit',
    },
    {
      id: 'logo-7',
      description: 'Vaudoise logo',
      image: LogoCompany7,
      className: 'lg:h-12 h-7 w-fit',
    },
    {
      id: 'logo-10',
      description: 'Generali logo',
      image: LogoCompany10,
      className: 'lg:h-12 h-7 lg:w-12 w-7',
    },
    {
      id: 'logo-6',
      description: 'Baloise logo',
      image: LogoCompany6,
      className: 'lg:h-12 h-7 w-auto',
    },
    {
      id: 'logo-9',
      description: 'Tellco logo',
      image: LogoCompany9,
      className: 'lg:h-12 h-7 w-auto',
    },
  ],
}) => {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-grey-50 py-12 text-black-500 lg:py-16">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-base leading-[130%]! font-semibold text-pretty lg:text-xl">
          {heading}
        </h2>
      </div>

      <div className="pt-8">
        <div className="pointer-events-none relative mx-auto flex items-center justify-center">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 0.75,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent className="flex gap-2 pl-0 lg:gap-6">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex-none last:pr-2 lg:last:pr-6"
                >
                  <div className="flex items-center justify-center px-3">
                    <Image
                      src={logo.image}
                      alt={logo.description}
                      title={logo.description}
                      className={`${logo.className ?? ''} h-10 w-auto object-contain lg:h-12`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { Logos };
