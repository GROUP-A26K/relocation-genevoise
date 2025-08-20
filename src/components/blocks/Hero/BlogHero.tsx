"use client";

import { BlogBGCard } from "@/components/customs/Card";
import { FC } from "react";
import { Blog } from "@/models/BLog";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";

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
  heading = "Blog",
  subHeading = "Our Latest News",
  description = "Lorem ipsum dolor sit amet consectetur. Sed massa turpis enim congue erat sit ultricies. Turpis tempor adipiscing.",
  blog,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left max-w-3xl">
          <div className="flex flex-col gap-3">
            <h1 className="text-sm font-semibold text-center text-secondary-600 !leading-[130%]">
              {heading}
            </h1>
            <h2 className="text-3xl font-semibold text-center !leading-[130%]">
              {TextWithStrong(subHeading)}
            </h2>
          </div>
          <p className="text-sm font-normal text-center text-black-200 !leading-[130%] text-balance">
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
