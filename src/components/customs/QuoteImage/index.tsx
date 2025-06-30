import cn from "classnames";
import Image from "next/image";

type QuoteImageProps = {
  content?: string;
  author?: string;
  authorInfo?: string;
  photoUrl?: string;
};

const QuoteImage: React.FC<QuoteImageProps> = ({
  content = "This is a sample quote content.",
  author = "Author Name",
  authorInfo = "Author Information",
  photoUrl = "",
}) => {
  return (
    <div className={cn("py-4", "lg:py-6")}>
      <div
        className={cn(
          "w-full rounded-2xl bg-white flex flex-col items-start justify-start gap-5 py-0",
          "lg:p-6 lg:bg-grey-50"
        )}
      >
        <blockquote className="italic text-center text-base text-black-500 font-normal !leading-[130%]">
          {content}
        </blockquote>
        <div className="w-full flex flex-col items-center gap-3">
          <Image
            src={photoUrl}
            alt="Author image"
            title="Author image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-contain"
          />
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-black-500 text-base font-semibold !leading-[130%]">
              {author}
            </p>
            <p className="text-black-200 text-sm font-normal !leading-[130%]">
              {authorInfo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteImage;
