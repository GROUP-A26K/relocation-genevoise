import { FormattedText } from '@/components/customs/Text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-custom';

import type { FC } from 'react';

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
    <div className="flex flex-col items-center gap-12 lg:gap-16">
      <div className="flex w-full items-center justify-start lg:justify-center">
        <div className="flex max-w-3xl flex-col gap-4 text-left lg:items-center lg:gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-left text-sm leading-[130%]! font-semibold text-secondary-600 lg:text-center">
              {heading}
            </p>
            <h2 className="text-left text-5xl leading-[130%]! font-semibold lg:text-center">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-left text-sm leading-[130%]! font-normal text-black-200 lg:text-center">
            {description}
          </p>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="flex w-full max-w-3xl flex-col"
      >
        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-gray-900/10 py-8 duration-500 first:pt-0 last:border-b-0 last:pb-0"
          >
            <AccordionTrigger className="py-0 text-lg leading-[130%]! font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-[720px] py-0 pt-2 text-sm leading-[130%]! text-black-200">
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
