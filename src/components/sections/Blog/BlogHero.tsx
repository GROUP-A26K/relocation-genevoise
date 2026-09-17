'use client';
import { BlogBGCard } from '@/components/common/Card';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';
import { TextWithStrong } from '@/components/common/Text/TextWithStrong';

import type { IBlog } from '@/models/blog';

interface IBlogHeroProps {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonContactText?: string;
  blog: IBlog;
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
            <HeadingText
              as="h1"
              className="text-center text-sm font-semibold text-secondary-600"
            >
              {heading}
            </HeadingText>
            <HeadingText
              as="h2"
              className="text-center text-3xl font-semibold text-inherit"
            >
              {TextWithStrong(subHeading)}
            </HeadingText>
          </div>
          <BodyText variant="sm" className="text-center text-balance">
            {description}
          </BodyText>
        </RevealItem>
      </div>

      <RevealItem>
        <BlogBGCard {...blog} />
      </RevealItem>
    </div>
  );
};

export { BlogHero };
