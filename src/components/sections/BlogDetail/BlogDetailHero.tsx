import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IBlog } from '@/models/blog';

const BlogDetailHero: React.FC<IBlog> = (blog) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex w-full items-center justify-center">
        <RevealItem className="flex w-full max-w-3xl flex-col gap-4 text-left lg:items-center lg:gap-6">
          <div className="flex flex-col gap-3">
            <BodyText
              variant="sm"
              className="text-center font-semibold text-secondary-600"
            >
              Blog
            </BodyText>
            <HeadingText
              as="h1"
              className="text-center text-4xl leading-[100%] text-pretty text-inherit lg:text-5xl lg:leading-[130%]"
            >
              {blog.title}
            </HeadingText>
          </div>
          <BodyText variant="sm" className="text-center text-pretty">
            {blog.description}
          </BodyText>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            {blog.category.map((cat) => (
              <Badge
                key={cat.title}
                className="bg-blue-50 text-sm leading-[130%] font-medium text-blue-500 shadow-none hover:bg-blue-50"
              >
                {cat.title}
              </Badge>
            ))}
          </div>
        </RevealItem>
      </div>
      <RevealItem className="relative aspect-1240/620 w-full overflow-hidden rounded-3xl">
        <Image
          src={blog.imageUrl}
          placeholder={blog.imageLqip ? 'blur' : 'empty'}
          blurDataURL={blog.imageLqip}
          alt={blog.title}
          title={blog.title}
          fill
          sizes="(min-width: 1440px) 1240px, 100vw"
          priority
          className="object-cover"
        />
      </RevealItem>
    </div>
  );
};

export { BlogDetailHero };
