'use client';
import Button from '@/components/common/Button';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { Link, type THref } from '@/libs/i18nNavigation';
import { FormattedText } from '@/components/common/Text';
import { BlogCard } from '@/components/common/Card/BlogCard';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IBlog } from '@/models/blog';

interface IRelatedBlogsProps {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: THref;
  blogs: IBlog[];
}

const RelatedBlogs: React.FC<IRelatedBlogsProps> = ({
  heading = 'Blog & News',
  subHeading = 'Our latest articles',
  description = 'Our shared values keep us connected and guide us as one team.',
  buttonText = 'See more',
  buttonUrl = '/blog',
  blogs,
}) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <RevealItem className="flex flex-row items-end justify-between">
        <div className="flex max-w-xl flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3">
            <BodyText variant="sm" className="font-semibold text-secondary-600">
              {heading}
            </BodyText>
            <HeadingText
              as="h2"
              className="text-3xl font-semibold text-inherit"
            >
              <FormattedText text={subHeading} />
            </HeadingText>
          </div>
          <BodyText variant="sm" className="font-[number:inherit]">
            {description}
          </BodyText>
        </div>
        <Link href={buttonUrl}>
          <Button
            as="solid"
            variant="md"
            type="primary"
            className="hidden lg:flex"
          >
            {buttonText}
          </Button>
        </Link>
      </RevealItem>

      <RevealItem className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
        {blogs.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </RevealItem>
      <RevealItem className="lg:hidden">
        <Link href={buttonUrl}>
          <Button
            as="solid"
            variant="md"
            type="primary"
            className="w-full lg:hidden"
          >
            {buttonText}
          </Button>
        </Link>
      </RevealItem>
    </div>
  );
};

export default RelatedBlogs;
