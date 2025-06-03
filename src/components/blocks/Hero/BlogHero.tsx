"use client";
import { BlogBGCard } from "@/components/customs/Card";
import Button from "@/components/customs/Button";
import { FC } from "react";
import { Blog } from "@/models/BLog";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { FormattedText } from "@/components/customs/Text";

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  post: Blog;
}

const BlogHero: FC<Props> = ({
  heading = "Blog",
  subHeading = "Our Latest News",
  description = "Lorem ipsum dolor sit amet consectetur. Sed massa turpis enim congue erat sit ultricies. Turpis tempor adipiscing.",
  post,
  buttonText,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left">
          <div className="flex flex-col gap-3">
            <h1 className="text-sm font-semibold text-center text-primary-500 !leading-[130%]">
              {heading}
            </h1>
            <h2 className="text-3xl font-semibold text-center !leading-[130%]">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-sm font-normal text-center text-black-200 !leading-[130%]">
            {description}
          </p>
          <div className="flex flex-row gap-2 w-full items-center justify-center">
            <Link href={post.href}>
              <Button
                iconEnd={ArrowDown}
                as="solid"
                variant="md"
                type="primary"
              >
                {buttonText ?? "Start now"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <BlogBGCard {...post} />
    </div>
  );
};

export { BlogHero };
