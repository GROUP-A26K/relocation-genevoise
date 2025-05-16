import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { CircleMinus, CirclePlus } from 'lucide-react';
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
    <div className="flex lg:flex-row flex-col  lg:gap-16 gap-12 items-start">
      <div className="flex w-full justify-start">
        <div className="flex flex-col lg:gap-6 gap-4 max-w-3xl text-left">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-primary-500 !leading-[130%]">
              {heading}
            </p>
            <h2 className="text-3xl font-semibold !leading-[130%]">
              {TextWithStrong(subHeading)}
            </h2>
          </div>
          <p className="text-sm font-normal text-black-200 !leading-[130%]">
            {description}
          </p>
        </div>
      </div>
      <dl className="flex flex-col max-w-3xl w-full gap-8">
        {faqs.map((faq) => (
          <Disclosure
            key={faq.question}
            as="div"
            className="first:pt-0 last:pb-0 duration-500"
          >
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-black-500">
                <span className="text-lg font-semibold !leading-[130%]">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-6 items-center">
                  <CirclePlus
                    aria-hidden="true"
                    className="size-6 text-primary-500 group-data-[open]:hidden"
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
              className="origin-top transition duration-500 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
            >
              <p className="pt-2 max-w-[720px] text-sm text-black-200 !leading-[130%]">
                {faq.answer}
              </p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </dl>
    </div>
  );
};
