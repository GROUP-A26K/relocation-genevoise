'use client';

import { BlogBGCard } from '@/components/customs/Card';
import { RevealItem } from '@/components/customs/Reveal';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';

import type { Blog } from '@/models/BLog';

interface IBlogHeroProps {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonContactText?: string;
  blog: Blog;
}

const BlogHero: React.FC<IBlogHeroProps> = ({
  heading = 'Blog',
  subHeading = 'Our Latest News',
  description = 'Lorem ipsum dolor sit amet consectetur. Sed massa turpis enim congue erat sit ultricies. Turpis tempor adipiscing.',
  blog,
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex w-full items-center justify-center">
        <RevealItem className="flex w-full max-w-3xl flex-col gap-4 text-left lg:items-center lg:gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-sm leading-[130%]! font-semibold text-secondary-600">
              {heading}
            </h1>
            <h2 className="text-center text-3xl leading-[130%]! font-semibold">
              {TextWithStrong(subHeading)}
            </h2>
          </div>
          <p className="text-center text-sm leading-[130%]! font-normal text-balance text-black-200">
            {description}
          </p>
        </RevealItem>
      </div>

      <RevealItem>
        <BlogBGCard {...blog} />
      </RevealItem>
    </div>
  );
};

export { BlogHero };
