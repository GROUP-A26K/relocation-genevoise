import { BlogCard } from "@/components/customs/Card/BlogCard";
import Button from "@/components/customs/Button";
import { FC } from "react";
import { Blog } from "@/models/BLog";
import Link from "next/link";
import { FormattedText } from "@/components/customs/Text";

interface Props {
  tagline?: string;
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  blogs: Blog[];
}

const BlogList: FC<Props> = ({
  heading = "Blog & News",
  subHeading = "Our latest articles",
  description = "Our shared values keep us connected and guide us as one team.",
  buttonText = "See more",
  buttonUrl = "/blog",
  blogs,
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12">
      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-col lg:gap-6 gap-4 max-w-xl">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-secondary-500 !leading-[130%]">
              {heading}
            </p>
            <h2 className="text-3xl font-semibold !leading-[130%]">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-sm text-black-200 !leading-[130%]">
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
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {blogs.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
      <Link href={buttonUrl}>
        <Button
          as="solid"
          variant="md"
          type="primary"
          className="lg:hidden w-full"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export { BlogList };
