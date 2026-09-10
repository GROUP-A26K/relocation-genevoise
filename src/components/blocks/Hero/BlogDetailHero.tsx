import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { RevealItem } from '@/components/customs/Reveal';

import type { FC } from 'react';
import type { Blog } from '@/models/BLog';

const BlogDetailHero: FC<Blog> = (blog) => {
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
      <RevealItem className="relative flex flex-col items-start justify-between">
        <div className="w-full">
          <Image
            alt="Blog Relocation Genevoise Image"
            title="Blog Relocation Genevoise Image"
            src={blog.imageUrl}
            width={1240}
            height={620}
            className="aspect-video max-h-[226px] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 lg:h-[620px] lg:max-h-[620px]"
          />
        </div>
      </RevealItem>
    </div>
  );
};

export { BlogDetailHero };
