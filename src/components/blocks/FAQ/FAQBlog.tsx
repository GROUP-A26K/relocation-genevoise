import cn from "classnames";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-custom";
import { FormattedText } from "@/components/customs/Text";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  heading?: string;
  id?: string;
  subHeading?: string;
  description?: string;
  faqs?: FAQ[];
}
export const FAQBlog: React.FC<Props> = ({
  heading = "FAQ",
  id = "faq",
  faqs = [
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "How does billing work?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "How do I change my account email?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
  ],
}) => {
  return (
    <div id={id} className={cn("flex flex-col w-full gap-4 items-start")}>
      <h2 className="text-2xl font-semibold text-left text-primary-500 !leading-[130%]">
        {heading}
      </h2>
      <Accordion
        defaultValue={faqs.length > 0 ? "item-0" : ""}
        type="single"
        collapsible
        className="divide-gray-900/10 flex flex-col max-w-[904px] w-full"
      >
        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cn(
              "pb-6 transition-all bg-white border-solid border-grey-100 border-b",
              "data-[state=open]:h-auto",
              { "pt-6": index !== 0 }
            )}
          >
            <AccordionTrigger
              className={cn("text-lg font-semibold !leading-[130%] py-0")}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "py-0 pt-2 max-w-[720px] text-sm text-black-200 !leading-[130%]",
                "lg:max-w-[672px]"
              )}
            >
              <p>
                <FormattedText text={item.answer} />
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
