import cn from 'classnames';

import { RevealItem } from '@/components/customs/Reveal';
import { FormattedText } from '@/components/customs/Text';
import { ANCHOR_SCROLL_MARGIN } from '@/components/blocks/DynamicContent/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-custom';

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
  heading = 'FAQ',
  id = 'faq',
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
    <RevealItem
      id={id}
      className={cn(
        'flex w-full flex-col items-start gap-4',
        ANCHOR_SCROLL_MARGIN
      )}
    >
      <h2 className="text-left text-2xl leading-[130%]! font-semibold text-primary-500">
        {heading}
      </h2>
      <Accordion
        defaultValue={faqs.length > 0 ? 'item-0' : ''}
        type="single"
        collapsible
        className="flex w-full max-w-[904px] flex-col divide-gray-900/10"
      >
        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cn(
              'border-b border-solid border-grey-100 bg-white pb-6 transition-all',
              'data-[state=open]:h-auto',
              { 'pt-6': index !== 0 }
            )}
          >
            <AccordionTrigger
              className={cn('py-0 text-lg leading-[130%]! font-semibold')}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                'max-w-[720px] py-0 pt-2 text-sm leading-[130%]! text-black-200',
                'lg:max-w-[672px]'
              )}
            >
              <p>
                <FormattedText text={item.answer} />
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </RevealItem>
  );
};
