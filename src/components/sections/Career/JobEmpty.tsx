import Image from 'next/image';

import EmptyJobImage from '@/assets/img/career/empty-job-image.svg';

type JobEmptyProps = {
  title?: string;
  description?: string;
};

const JobEmpty: React.FC<JobEmptyProps> = ({
  title = "We're Not Hiring Today, But We're Always Listening",
  description = "While we don't have open positions right now, we’re always looking to connect with passionate individuals who share our values.",
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-8 lg:gap-y-12">
      <Image
        src={EmptyJobImage}
        alt="No job offers available"
        className="h-[232.73px] w-[320px] max-w-[320px] object-contain md:max-w-[320px] lg:max-w-[320px]"
        width={320}
        height={232.73}
      />
      <div className="flex max-w-[720px] flex-col items-center justify-center gap-6">
        <h3 className="font-playfair text-center text-2xl leading-[130%]! font-semibold text-black-500">
          {title}
        </h3>
        <p className="text-center text-sm leading-[130%]! font-normal text-black-200">
          {description}
        </p>
      </div>
    </div>
  );
};

export default JobEmpty;
