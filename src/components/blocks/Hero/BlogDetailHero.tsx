import { Badge } from "@/components/ui/badge";
import { Blog } from "@/models/BLog";
import Image from "next/image";
import { FC } from "react";

const BlogDetailHero: FC<Blog> = (blog) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-center text-primary-500 !leading-[130%]">
              Blog
            </p>
            <h1 className="text-3xl font-bold text-center !leading-[130%]">
              {blog.title}
            </h1>
          </div>
          <p className="text-sm font-normal text-center text-black-200 !leading-[130%]">
            {blog.description}
          </p>
          <div className="flex flex-row gap-2 w-full items-center justify-center">
            {blog.category.map((cat) => (
              <Badge
                key={cat.title}
                className="text-sm font-medium text-secondary-500 bg-secondary-40 hover:bg-secondary-40 shadow-none !leading-[130%]"
              >
                {cat.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col relative items-start justify-between">
        <div className="w-full">
          <Image
            alt="Blog Assurance Genevoise Image"
            title="Blog Assurance Genevoise Image"
            src={blog.imageUrl}
            width={1240}
            height={620}
            className="aspect-video lg:h-[620px] lg:max-h-[620px] max-h-[226px] rounded-2xl w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        </div>
      </div>
    </div>
  );
};

export { BlogDetailHero };
