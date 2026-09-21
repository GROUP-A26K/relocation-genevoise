'use client';
import Image from 'next/image';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, Phone, PhoneIncoming } from 'lucide-react';
import { useCallback, useMemo, type BaseSyntheticEvent } from 'react';

import { Env } from '@/libs/env';
import { cn } from '@/libs/utils';
import { Form } from '@/components/ui/form';
import { Link } from '@/libs/i18nNavigation';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { useFormDraft } from '@/features/formDraft';
import { useOpenStatus } from '@/hooks/useOpenStatus';
import BodyText from '@/components/common/Text/BodyText';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import HeadingText from '@/components/common/Text/HeadingText';
import { isCaptchaError, readFormGuard } from '@/utils/formGuard';
import { useSubmitBooking } from '@/features/booking/booking.hooks';
import { bodyTextVariants } from '@/components/common/Text/BodyText';
import { FormGuard, PhoneInputField } from '@/components/common/Form';
import { RevealItem, RevealSection } from '@/components/common/Reveal';
import { TextWithStrong } from '@/components/common/Text/TextWithStrong';
import {
  type TBookingFormInput,
  bookingSchema,
} from '@/validations/booking.validation';
import ConsultationBG from '@/assets/images/shared/relocation-genevoise-geneve-courtage.webp';

const RESET_OPEN_STATUS_TIME = 60000;

type TContactChannel = TBookingFormInput['contactVia'];

interface IConsultationFormViewProps {
  heading?: string;
  subHeading?: string;
  description?: string;
  cardContent?: {
    title: string;
    openStatusTitle: string;
    closeStatusTitle: string;
    callTitle: string;
    calendarTitle: string;
    buttonText: string;
    buttonPlaceholder: string;
    noteTitle: string;
    policyTitle: string;
    telephoneLabel: string;
    whatsappLabel: string;
  };
  link?: {
    text: string;
    url: string;
  };
}

export const ConsultationFormView: React.FC<IConsultationFormViewProps> = ({
  heading = 'Why Insurance Geneva ?',
  subHeading = 'Our expertise at your service',
  description = 'Our advisors will call you back during our opening hours and answer all your questions.',
  cardContent = {
    title: 'Contact with an advisor',
    openStatusTitle: 'We are available',
    closeStatusTitle: 'We are currently closed',
    callTitle: 'Call us',
    calendarTitle: 'Schedule an appointment',
    buttonText: 'Contact us now',
    noteTitle: 'Note: we are available Monday to Friday from 9 am to 6 pm.',
    policyTitle: 'Privacy Policy',
    buttonPlaceholder: 'Phone number',
    telephoneLabel: 'Phone',
    whatsappLabel: 'Whatsapp',
  },
}) => {
  const formT = useTranslations('Validation.Booking');
  const toastT = useTranslations('ToastMessage.Booking');
  const commonToastT = useTranslations('ToastMessage.Common');
  const imageT = useTranslations('Images');
  const locale = useLocale();
  const timezone = Env.NEXT_PUBLIC_SERVER_TIMEZONE;
  const isOpen = useOpenStatus({
    timezone,
    interval: RESET_OPEN_STATUS_TIME,
  });
  const { mutateAsync, isPending } = useSubmitBooking();
  const form = useForm<TBookingFormInput>({
    resolver: zodResolver(bookingSchema(formT)),
    defaultValues: {
      phone: '',
      accept: true,
      contactVia: 'telephone',
    },
  });
  const draft = useFormDraft('consultation', form, { restoreKey: locale });
  const contactVia = form.watch('contactVia');

  const showToast = useCallback(
    (type: 'success' | 'danger', message?: string) => {
      const isSuccess = type === 'success';
      const titleKey = isSuccess ? 'successTitle' : 'errorTitle';
      const messageKey = isSuccess ? 'success' : 'error';

      toast.custom((t) => (
        <Alert
          type={type}
          title={toastT(titleKey)}
          as="solid"
          onClick={() => toast.dismiss(t)}
        >
          {message ?? toastT(messageKey)}
        </Alert>
      ));
    },
    [toastT]
  );

  const handleContactViaChange = useCallback(
    (value: TContactChannel) => {
      form.setValue('contactVia', value, {
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [form]
  );

  const onSubmit = useCallback(
    async (values: TBookingFormInput, event?: BaseSyntheticEvent) => {
      const submission = draft.beginSubmission(values);

      try {
        await mutateAsync({ values, locale, guard: readFormGuard(event) });
        draft.completeSubmission(submission);
        showToast('success');
      } catch (error) {
        showToast(
          'danger',
          isCaptchaError(error) ? commonToastT('captchaFailed') : undefined
        );
        console.error('Error submitting form:', error);
      }
    },
    [commonToastT, draft, locale, mutateAsync, showToast]
  );

  const handleFormSubmit = form.handleSubmit(onSubmit);

  const contactOptions = useMemo(
    () => [
      {
        value: 'telephone' as const,
        label: cardContent.telephoneLabel,
        icon: (
          <div className="rounded-full bg-yellow-500 p-[6.17px] text-center">
            <Phone
              className="h-[11.67px] w-[11.67px] text-white"
              strokeWidth={2.5}
            />
          </div>
        ),
      },
      {
        value: 'whatsapp' as const,
        label: cardContent.whatsappLabel,
        icon: (
          <WhatsappIcon
            className="h-6 w-6"
            aria-hidden="true"
            focusable="false"
          />
        ),
      },
    ],
    [cardContent.telephoneLabel, cardContent.whatsappLabel]
  );

  return (
    <section className={cn('-space-y-16 bg-white', 'lg:-space-y-24')}>
      <div
        className={cn(
          'bg-yellow-50 pt-12 pb-24',
          'lg:pt-16 lg:pb-32',
          'flex flex-col',
          'items-center'
        )}
      >
        <RevealSection
          trigger="load"
          className={cn(
            'flex w-full flex-col gap-4 px-4 text-center',
            'lg:gap-6 lg:px-12 lg:text-left',
            '2xl:max-w-(--breakpoint-2xl) 2xl:px-25'
          )}
        >
          <RevealItem className="flex flex-col gap-3">
            <BodyText variant="sm" className="font-semibold text-primary-500">
              {heading}
            </BodyText>
            <HeadingText
              as="h1"
              className="text-3xl font-semibold text-inherit"
            >
              {TextWithStrong(subHeading)}
            </HeadingText>
          </RevealItem>
          <RevealItem
            as="p"
            className={cn(
              bodyTextVariants(),
              'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
              'text-sm leading-[130%] font-normal text-black-200'
            )}
          >
            {description}
          </RevealItem>
        </RevealSection>
      </div>
      <RevealSection
        trigger="load"
        className={cn(
          'mx-4 grid max-w-310 grid-cols-1 gap-12 rounded-3xl bg-white p-4 pt-6 shadow-xl',
          'md:p-8',
          'lg:mx-12 lg:grid-cols-2 lg:items-center lg:gap-16',
          '2xl:mx-auto'
        )}
      >
        <RevealItem className={cn('flex w-full flex-col gap-6', 'lg:p-8')}>
          <div className="flex flex-col gap-3">
            <HeadingText
              as="h2"
              className="max-w-112.5 text-xl font-semibold text-inherit lg:text-2xl"
            >
              {cardContent.title}
            </HeadingText>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PhoneIncoming className="h-4 w-4 text-primary-500" />
                <HeadingText as="h3" className="text-sm font-normal">
                  {cardContent.callTitle}
                </HeadingText>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary-500" />
                <HeadingText
                  as="h3"
                  className="flex text-center text-sm font-[number:inherit]"
                >
                  {cardContent.calendarTitle}
                </HeadingText>
              </div>
            </div>
          </div>

          <div className={cn('flex flex-col gap-3', 'lg:gap-4.5')}>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <HeadingText as="h3" className="text-sm font-[number:inherit]">
                {isOpen
                  ? cardContent.openStatusTitle
                  : cardContent.closeStatusTitle}
              </HeadingText>
            </div>
            <div className="flex flex-col gap-3">
              <Form {...form}>
                <form
                  onSubmit={handleFormSubmit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  className="flex flex-col gap-2"
                >
                  <div
                    className={cn(
                      'flex flex-col items-start justify-between gap-2',
                      'xl:flex-row'
                    )}
                  >
                    <div className="flex w-full flex-1 flex-col gap-2 lg:gap-3">
                      <PhoneInputField
                        name="phone"
                        placeholder={cardContent.buttonPlaceholder}
                        control={form.control}
                        error={form.formState.errors.phone?.message}
                        className="w-full text-base lg:max-w-107.75"
                        inputClassName="bg-white lg:h-12"
                        countrySelectClassName="bg-white lg:h-12"
                      />
                      <div className="flex w-full flex-col items-center gap-2 xxs:flex-row lg:flex-row">
                        {contactOptions.map(({ value, label, icon }) => (
                          <ContactChannelButton
                            key={value}
                            value={value}
                            label={label}
                            icon={icon}
                            isActive={contactVia === value}
                            onSelect={handleContactViaChange}
                          />
                        ))}
                      </div>
                    </div>
                    <Button
                      as="solid"
                      variant="md"
                      type="primary"
                      className="w-full lg:h-12 xl:w-fit"
                      disabled={isPending}
                    >
                      {cardContent.buttonText}
                    </Button>
                  </div>
                  <FormGuard />
                </form>
              </Form>
            </div>
            <HeadingText as="h3" className="w-full text-sm font-normal">
              {cardContent.noteTitle}{' '}
              <Link href="/legal-notice">
                <strong className="w-full cursor-pointer text-sm leading-[130%] font-semibold">
                  {cardContent.policyTitle}
                </strong>
              </Link>
            </HeadingText>
          </div>
        </RevealItem>

        <RevealItem className="relative aspect-556/284 w-full overflow-hidden rounded-2xl">
          <Image
            src={ConsultationBG}
            placeholder="blur"
            alt={imageT('booking')}
            title={imageT('booking')}
            fill
            sizes="(min-width: 1240px) 488px, (min-width: 1024px) 380px, 100vw"
            priority
            className="object-cover"
          />
        </RevealItem>
      </RevealSection>
    </section>
  );
};

interface IContactChannelButtonProps {
  icon: React.ReactNode;
  value: TContactChannel;
  isActive: boolean;
  label?: string;
  onSelect: (value: TContactChannel) => void;
}

const ContactChannelButton = ({
  label,
  icon,
  value,
  isActive,
  onSelect,
}: IContactChannelButtonProps) => (
  <button
    type="button"
    aria-pressed={isActive}
    onClick={() => onSelect(value)}
    className={cn(
      'cursor-pointer rounded-3xl px-4 py-2 text-base font-semibold shadow-none',
      'flex h-10 w-full items-center justify-center gap-2 border border-solid bg-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-hidden md:w-fit lg:h-12',
      isActive ? 'border-yellow-500 bg-yellow-25' : 'border-grey-200'
    )}
  >
    {icon}
    <BodyText variant="sm" asChild className="text-black-500">
      <span>{label}</span>
    </BodyText>
  </button>
);
