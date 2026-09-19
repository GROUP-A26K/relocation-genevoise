import { cn } from '@/libs/utils';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { FormattedText } from '@/components/common/Text';
import HeadingText from '@/components/common/Text/HeadingText';
import { ANCHOR_SCROLL_MARGIN } from '@/components/common/ContentMenu/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-custom';

type TFaqItem = {
  question: string;
  answer: string;
};

interface IFaqBlockProps {
  heading?: string;
  id?: string;
  subHeading?: string;
  description?: string;
  faqs?: TFaqItem[];
}

export const FaqBlock: React.FC<IFaqBlockProps> = ({
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
      <HeadingText
        as="h2"
        className="text-left text-2xl font-semibold text-primary-500"
      >
        {heading}
      </HeadingText>
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
            <AccordionTrigger className="py-0 text-lg leading-[130%] font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-[720px] py-0 pt-2 text-sm leading-[130%] text-black-200 lg:max-w-[672px]">
              <BodyText className="text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit">
                <FormattedText text={item.answer} />
              </BodyText>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </RevealItem>
  );
};
