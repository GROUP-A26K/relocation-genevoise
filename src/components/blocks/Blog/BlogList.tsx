import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';
import { BlogCard } from '@/components/customs/Card/BlogCard';

import type { Blog } from '@/models/BLog';

interface IBlogListProps {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  blogs: Blog[];
}

const BlogList: React.FC<IBlogListProps> = ({
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
            <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
              {heading}
            </p>
            <h2 className="text-3xl leading-[130%]! font-semibold">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-sm leading-[130%]! text-black-200">
            {description}
          </p>
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

export { BlogList };
