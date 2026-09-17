import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/common/Button';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

interface ICtaBlockProps {
  id: string;
  title: string;
  description: string;
  buttonText: string;
}

const CtaBlock: React.FC<ICtaBlockProps> = ({
  id = 'cta-block',
  title = 'Ready to take the next step?',
  description = 'Contact us today to learn more about how we can help you achieve your goals.',
  buttonText = 'Contact Us',
}) => {
  return (
    <RevealItem className="w-full py-4 lg:py-6">
      <div
        id={id}
        className="flex flex-col gap-6 rounded-2xl bg-grey-50 p-6 lg:p-8"
      >
        <div className="flex flex-col gap-4">
          <HeadingText as="h2" className="text-xl font-semibold lg:text-2xl">
            {title}
          </HeadingText>
          <BodyText variant="sm">{description}</BodyText>
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
