import Image from "next/image";

import EmptyJobImage from "@/assets/img/career/empty-job-image.svg";

type EmptyDataProps = {
  title?: string;
  description?: string;
};

const EmptyData: React.FC<EmptyDataProps> = ({
  title = "We're Not Hiring Today, But We're Always Listening",
  description = "While we don't have open positions right now, we’re always looking to connect with passionate individuals who share our values.",
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center lg:gap-y-12 gap-y-8 py-12">
      <Image
        src={EmptyJobImage}
        alt="No job offers available"
        className="w-[320px] h-[232.73px] object-contain lg:max-w-[320px] md:max-w-[320px] max-w-[320px]"
        width={320}
        height={232.73}
        sizes="100vw"
      />
      <div className="flex flex-col gap-6 justify-center items-center max-w-[720px]">
        <h3 className="text-2xl text-black-500 text-center font-semibold !leading-[130%] font-playfair">
          {title}
        </h3>
        <p className="text-sm text-black-200 text-center font-normal !leading-[130%]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyData;
