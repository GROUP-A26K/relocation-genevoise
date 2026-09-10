import cn from 'classnames';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import { RevealItem } from '@/components/customs/Reveal';

type CtaBlockProps = {
  id: string;
  title: string;
  description: string;
  buttonText: string;
};

const CtaBlock: React.FC<CtaBlockProps> = ({
  id = 'cta-block',
  title = 'Ready to take the next step?',
  description = 'Contact us today to learn more about how we can help you achieve your goals.',
  buttonText = 'Contact Us',
}) => {
  return (
    <RevealItem className={cn('w-full py-4', 'lg:py-6')}>
      <div
        id={id}
        className={cn(
          'flex flex-col gap-6 rounded-2xl bg-grey-50 p-6',
          'lg:p-8'
        )}
      >
        <div className="flex flex-col gap-4">
          <h2
            className={cn(
              'text-xl leading-[130%]! font-semibold text-black-500',
              'lg:text-2xl'
            )}
          >
            {title}
          </h2>
          <p className="text-sm leading-[130%]! font-normal text-black-200">
            {description}
          </p>
        </div>
        <Link href="/contact" className="w-fit">
          <Button
            as="solid"
            variant="md"
            type="secondary"
            className="w-full font-semibold lg:w-fit"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </RevealItem>
  );
};

export default CtaBlock;
