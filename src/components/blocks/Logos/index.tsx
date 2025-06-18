'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import LogoCompany1 from '@/assets/img/logos/allianz-logo.webp';
import LogoCompany2 from '@/assets/img/logos/paul-frank-logo.webp';
import LogoCompany3 from '@/assets/img/logos/tsm-logo.webp';
import LogoCompany4 from '@/assets/img/logos/zurich-logo.webp';
import LogoCompany5 from '@/assets/img/logos/la-mobiliere-logo.webp';
import LogoCompany6 from '@/assets/img/logos/baloise-logo.webp';
import LogoCompany7 from '@/assets/img/logos/vaudoise-logo.webp';
import LogoCompany8 from '@/assets/img/logos/axa-logo.webp';
import LogoCompany9 from '@/assets/img/logos/tellco-logo.webp';
import LogoCompany10 from '@/assets/img/logos/generali-logo.webp';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { FC } from 'react';

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
    <section className="relative flex flex-col items-center overflow-hidden lg:py-16 py-14 text-black-500 bg-grey-50">
      <div className="container flex flex-col items-center text-center">
        <h2 className="lg:text-xl text-base font-semibold !leading-[130%] text-pretty">
          {heading}
        </h2>
      </div>

      <div className="pt-8">
        <div className="relative mx-auto flex items-center justify-center pointer-events-none">
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
            <CarouselContent className="flex lg:gap-6 gap-2 pl-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex-none lg:last:pr-6 last:pr-2"
                >
                  <div className="px-3 flex items-center justify-center">
                    <Image
                      src={logo.image}
                      alt={logo.description}
                      title={logo.description}
                      className={`${logo.className ?? ''} h-10 w-auto lg:h-12 object-contain`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { Logos };
