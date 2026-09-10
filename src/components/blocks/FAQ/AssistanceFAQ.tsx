import { CircleMinus, CirclePlus } from 'lucide-react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';

import { FormattedText } from '@/components/customs/Text';

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
export const AssistanceFAQ: FC<Props> = ({
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
    <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
      <div className="flex w-full justify-start">
        <div className="flex max-w-3xl flex-col gap-4 text-left lg:gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm leading-[130%]! font-semibold text-secondary-600">
              {heading}
            </p>
            <h2 className="text-3xl leading-[130%]! font-semibold">
              <FormattedText text={subHeading} />
            </h2>
          </div>
          <p className="text-sm leading-[130%]! font-normal text-black-200">
            {description}
          </p>
        </div>
      </div>
      <dl className="flex w-full max-w-3xl flex-col gap-8">
        {faqs.map((faq) => (
          <Disclosure
            key={faq.question}
            as="div"
            className="duration-500 first:pt-0 last:pb-0"
          >
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-black-500">
                <span className="text-lg leading-[130%]! font-semibold">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-6 items-center">
                  <CirclePlus
                    aria-hidden="true"
                    className="size-6 text-primary-500 group-data-open:hidden"
                  />
                  <CircleMinus
                    aria-hidden="true"
                    className="size-6 text-primary-500 group-[&:not([data-open])]:hidden"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel
              transition
              as="dd"
              className="origin-top transition duration-500 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              <p className="max-w-[720px] pt-2 text-sm leading-[130%]! text-black-200">
                {faq.answer}
              </p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </dl>
    </div>
  );
};
