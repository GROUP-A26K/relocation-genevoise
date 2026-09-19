import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import { FormattedText } from '@/components/common/Text';
import HeadingText from '@/components/common/Text/HeadingText';

interface IBookConsultationProps {
  heading?: string;
  subHeading?: string;
  description?: string;
  buttonText1?: string;
  buttonText2?: string;
  buttonIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  imgSrc?: StaticImageData;
  withSection?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const BookConsultation: React.FC<IBookConsultationProps> = ({
  heading,
  subHeading = 'A question ? Our advisors are here to guide you',
  description = 'Benefit from personalized advice and support that meets your needs.',
  buttonText1 = 'Call me',
  buttonText2,
  buttonIcon,
  imgSrc,
  withSection = true,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
}) => {
  const imageT = useTranslations('Images');
  const hasSecondaryButton = Boolean(buttonText2);

  const content = (
    <div
      className={cn(
        'flex flex-col gap-12 rounded-xl bg-grey-50 py-12 lg:gap-16 lg:py-16',
        className
      )}
    >
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-center gap-4 text-left lg:gap-8">
          {imgSrc && (
            <RevealItem className="flex justify-center">
              <Image
                alt={imageT('faq')}
                title={imageT('faq')}
                height={64}
                width={128}
                src={imgSrc}
                placeholder="blur"
              />
            </RevealItem>
          )}

          <RevealItem
            className={cn(
              'flex max-w-180 flex-col items-center gap-3',
              contentClassName
            )}
          >
            {heading && (
              <BodyText
                variant="sm"
                className="text-center font-semibold text-secondary-600 lg:text-center"
              >
                {heading}
              </BodyText>
            )}
            <HeadingText
              as="h2"
              className={cn(
                'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
                cn(
                  'text-center text-2xl leading-[130%] font-semibold text-balance text-black-500 lg:text-3xl',
                  titleClassName
                )
              )}
            >
              <FormattedText text={subHeading} />
            </HeadingText>
            <BodyText
              className={cn(
                'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
                cn(
                  'text-center text-sm leading-[130%] font-normal text-balance text-black-200',
                  descriptionClassName
                )
              )}
            >
              {description}
            </BodyText>
          </RevealItem>

          <RevealItem
            className={cn(
              'flex w-full flex-row items-center justify-center gap-2',
              hasSecondaryButton && 'flex-col sm:flex-row lg:gap-4'
            )}
          >
            <Link
              href="/contact"
              className={cn(hasSecondaryButton && 'w-full sm:w-fit')}
            >
              <Button
                as="solid"
                variant="md"
                type="primary"
                iconStart={buttonIcon}
                className={cn(hasSecondaryButton && 'w-full sm:w-fit')}
              >
                {buttonText1}
              </Button>
            </Link>
            {hasSecondaryButton && (
              <Link href="/find-accommodation" className="w-full sm:w-fit">
                <Button
                  as="outline"
                  variant="md"
                  type="primary"
                  iconEnd={ArrowRight}
                  className="w-full sm:w-fit"
                >
                  {buttonText2}
                </Button>
              </Link>
            )}
          </RevealItem>
        </div>
      </div>
    </div>
  );

  if (!withSection) return content;

  return (
    <Section
      className="bg-grey-50 lg:bg-white"
      wrapperProps={{ className: 'pt-0 2xl:pt-0' }}
      dividerProps={{ className: 'hidden' }}
    >
      {content}
    </Section>
  );
};
