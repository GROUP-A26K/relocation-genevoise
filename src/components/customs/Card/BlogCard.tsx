"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Link } from "@/libs/i18nNavigation";
import { Blog } from "@/models/BLog";
import { useLocale } from "next-intl";

export const BlogCard: React.FC<Blog> = ({
  title,
  description,
  imageUrl,
  category,
  href,
  author,
  timeToRead,
  publishedDate,
}) => {
  const locale = useLocale();
  return (
    <Link href={href}>
      <article className="flex flex-col items-start cursor-pointer h-full">
        <div className="w-full">
          <Image
            alt="Assurance Genevoise Article"
            title="Assurance Genevoise Article"
            src={imageUrl}
            width={640}
            height={250}
            className="aspect-video lg:h-[250px] h-[226px] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        </div>
        <div className="w-full flex flex-col justify-between h-full pt-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 text-xs">
              {category.map((cat) => (
                <Badge
                  key={cat.title}
                  className="text-sm font-medium text-blue-500 bg-blue-50 hover:bg-blue-50 shadow-none !leading-[130%]"
                >
                  {cat.title}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h3
                title={title}
                className="line-clamp-2 lg:text-2xl text-xl font-semibold text-gray-900 group-hover:text-gray-600 !leading-[130%]"
              >
                {title}
              </h3>
              <p
                title={description}
                className="line-clamp-3 lg:text-base font-normal text-sm !leading-[130%] text-gray-600 max-w-3xl"
              >
                {description}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex items-center gap-3">
              <Image
                alt="Author Image"
                title="Author Image"
                src={author.imageUrl}
                width={40}
                height={40}
                className="size-10 rounded-full bg-gray-100 object-cover object-center"
              />
              <div className="text-base !leading-[130%] gap-[2px]">
                <p className="font-semibold text-grey-700 !leading-[130%]">
                  {author.name}
                </p>
                <p className="text-sm font-normal text-gray-700 !leading-[130%]">
                  {publishedDate}
                </p>
              </div>
            </div>

            <div className="flex lg:text-sm text-xs items-end font-medium text-black-100 !leading-[130%]">
              {timeToRead}{" "}
              {locale === "fr" ? "minutes de lecture" : "minutes read"}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
