'use client';

import { BlogBGCard } from '@/components/customs/Card';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';

import type { FC } from 'react';
import type { Blog } from '@/models/BLog';

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonContactText?: string;
  blog: Blog;
}

const BlogHero: FC<Props> = ({
  heading = 'Blog',
  subHeading = 'Our Latest News',
  description = 'Lorem ipsum dolor sit amet consectetur. Sed massa turpis enim congue erat sit ultricies. Turpis tempor adipiscing.',
  blog,
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-3xl flex-col gap-4 text-left lg:items-center lg:gap-6">
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
          {/* <div className="flex flex-row gap-2 w-full items-center justify-center h-10">
            <Link href="/contact">
              <Button as="outline" variant="md" type="primary">
                {buttonContactText}
              </Button>
            </Link>
            <Link href={blog.href}>
              <Button as="solid" variant="md" type="primary">
                {buttonText}
              </Button>
            </Link>
          </div> */}
        </div>
      </div>

      <BlogBGCard {...blog} />
    </div>
  );
};

export { BlogHero };
