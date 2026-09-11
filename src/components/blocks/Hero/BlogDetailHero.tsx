import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { RevealItem } from '@/components/customs/Reveal';

import type { Blog } from '@/models/BLog';

const BlogDetailHero: React.FC<Blog> = (blog) => {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="flex w-full items-center justify-center">
        <RevealItem className="flex w-full max-w-3xl flex-col gap-4 text-left lg:items-center lg:gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm leading-[130%]! font-semibold text-secondary-600">
              Blog
            </p>
            <h1 className="text-center text-4xl leading-[100%]! font-bold text-pretty lg:text-5xl lg:leading-[130%]!">
              {blog.title}
            </h1>
          </div>
          <p className="text-center text-sm leading-[130%]! font-normal text-pretty text-black-200">
            {blog.description}
          </p>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            {blog.category.map((cat) => (
              <Badge
                key={cat.title}
                className="bg-blue-50 text-sm leading-[130%]! font-medium text-blue-500 shadow-none hover:bg-blue-50"
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
