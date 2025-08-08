import cn from "classnames";

import Button from "@/components/customs/Button";
import { Link } from "@/libs/i18nNavigation";

type CtaBlockProps = {
  id: string;
  title: string;
  description: string;
  buttonText: string;
};

const CtaBlock: React.FC<CtaBlockProps> = ({
  id = "cta-block",
  title = "Ready to take the next step?",
  description = "Contact us today to learn more about how we can help you achieve your goals.",
  buttonText = "Contact Us",
}) => {
  return (
    <div className={cn("py-4 w-full", "lg:py-6")}>
      <div
        id={id}
        className={cn(
          "p-6 bg-grey-50 rounded-2xl flex flex-col gap-6",
          "lg:p-8"
        )}
      >
        <div className="flex flex-col gap-4">
          <h2
            className={cn(
              "text-xl font-semibold text-black-500 !leading-[130%]",
              "lg:text-2xl"
            )}
          >
            {title}
          </h2>
          <p className="text-sm text-black-200 font-normal !leading-[130%]">
            {description}
          </p>
        </div>
        <Link href={"/contact"} className="w-fit">
          <Button
            as="solid"
            variant="md"
            type="secondary"
            className="lg:w-fit w-full font-semibold"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CtaBlock;
