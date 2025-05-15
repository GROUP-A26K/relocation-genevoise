import { FormattedText } from '@/components/customs/Text';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-custom';
import { FC } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  heading?: string;
  subHeading?: string;
  description?: string;
  faqs?: FAQ[];
}
export const FAQ: FC<Props> = ({
  heading = 'FAQ',
  subHeading = 'Do you have any questions? We have the answers!',
  description = 'Everything you need to know about the product and billing.',
  faqs = [
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      question: 'Can I change my plan later?',
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: 'Can other info be added to an invoice?',
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: 'How does billing work?',
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: 'How do I change my account email?',
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
  ],
}) => {
  return (
    <div className="flex flex-col lg:gap-16 gap-12 items-center">
      <div className="flex w-full items-center lg:justify-center justify-start">
        <div className="flex flex-col lg:gap-6 gap-4 max-w-3xl lg:items-center text-left">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold lg:text-center text-left text-primary-500 !leading-[130%]">
              {heading}
            </p>
            <h2 className="text-3xl font-semibold lg:text-center text-left !leading-[130%]">
              {TextWithStrong(subHeading)}
            </h2>
          </div>
          <p className="text-sm font-normal lg:text-center text-left text-black-200 !leading-[130%]">
            {description}
          </p>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="divide-y divide-gray-900/10 flex flex-col max-w-3xl w-full"
      >
        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="py-8 first:pt-0 last:pb-0 duration-500 border-b-0"
          >
            <AccordionTrigger className="text-lg font-semibold !leading-[130%] py-0">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="py-0 pt-2 max-w-[720px] text-sm text-black-200 !leading-[130%]">
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
