'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { CalendarDays, Phone, PhoneIncoming } from 'lucide-react';

import axios from '@/libs/axios';
import { Env } from '@/libs/Env';
import { cn } from '@/libs/utils';
import { Form } from '@/components/ui/form';
import { Link } from '@/libs/i18nNavigation';
import Alert from '@/components/customs/Alert';
import Button from '@/components/customs/Button';
import { useOpenStatus } from '@/hooks/use-open-status';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import { PhoneInputField } from '@/components/customs/Form';
import { RevealItem, RevealSection } from '@/components/customs/Reveal';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
import ConsultationBG from '@/assets/img/bg/relocation-genevoise-geneve-courtage.webp';
import {
  type BookingFormInput,
  bookingSchema,
} from '@/validations/booking.validation';

const TIME_OPEN = 9;
const TIME_CLOSE = 18;
const RESET_OPEN_STATUS_TIME = 60000;

type ContactChannel = BookingFormInput['contactVia'];

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
  const locale = useLocale();
  const timezone = Env.NEXT_PUBLIC_SERVER_TIMEZONE;
  const isOpen = useOpenStatus({
    timezone,
    openHour: TIME_OPEN,
    closeHour: TIME_CLOSE,
    interval: RESET_OPEN_STATUS_TIME,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const form = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema(formT)),
    defaultValues: {
      phone: '',
      accept: true,
      contactVia: 'telephone',
    },
  });
  const contactVia = form.watch('contactVia');

  const showToast = useCallback(
    (type: 'success' | 'danger') => {
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
          {toastT(messageKey)}
        </Alert>
      ));
    },
    [toastT]
  );

  const handleContactViaChange = useCallback(
    (value: ContactChannel) => {
      form.setValue('contactVia', value, {
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [form]
  );

  const onSubmit = useCallback(
    async (values: BookingFormInput) => {
      if (hasSubmitted) return;

      setIsLoading(true);

      try {
        const response = await axios.post(`api/booking?locale=${locale}`, {
          accept: values.accept,
          phone: values.phone,
          contactVia: values.contactVia,
        });

        if (response.status === 201) {
          setHasSubmitted(true);
          showToast('success');
        }
      } catch (error) {
        setHasSubmitted(true);
        showToast('danger');
        console.error('Error submitting form:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [hasSubmitted, locale, showToast]
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
              className="h-[11.67px]! w-[11.67px]! text-white"
              strokeWidth={2.5}
            />
          </div>
        ),
      },
      {
        value: 'whatsapp' as const,
        label: cardContent.whatsappLabel,
        icon: <WhatsappIcon className="h-6! w-6!" />,
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
            <p className="text-sm leading-[130%]! font-semibold text-primary-500">
              {heading}
            </p>
            <h1 className="text-3xl leading-[130%]! font-semibold">
              {TextWithStrong(subHeading)}
            </h1>
          </RevealItem>
          <RevealItem
            as="p"
            className="text-sm leading-[130%]! font-normal text-black-200"
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
            <h2 className="max-w-112.5 text-xl leading-[130%]! font-semibold lg:text-2xl">
              {cardContent.title}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PhoneIncoming className="h-4 w-4 text-primary-500" />
                <h3 className="text-sm leading-[130%]! font-normal text-black-500">
                  {cardContent.callTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary-500" />
                <h3 className="flex text-center text-sm leading-[130%]! text-black-500">
                  {cardContent.calendarTitle}
                </h3>
              </div>
            </div>
          </div>

          <div className={cn('flex flex-col gap-3', 'lg:gap-4.5')}>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <h3 className="text-sm leading-[130%]! text-black-500">
                {isOpen
                  ? cardContent.openStatusTitle
                  : cardContent.closeStatusTitle}
              </h3>
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
                    disabled={isLoading || hasSubmitted}
                  >
                    {cardContent.buttonText}
                  </Button>
                </form>
              </Form>
            </div>
            <h3 className="w-full text-sm leading-[130%]! font-normal text-black-500">
              {cardContent.noteTitle}{' '}
              <Link href="/legal-notice">
                <strong className="w-full cursor-pointer text-sm leading-[130%]! font-semibold">
                  {cardContent.policyTitle}
                </strong>
              </Link>
            </h3>
          </div>
        </RevealItem>

        <RevealItem className="relative aspect-556/284 w-full overflow-hidden rounded-2xl">
          <Image
            src={ConsultationBG}
            alt="Relocation Genevoise, courtier en relocation à Genève"
            title="Relocation Genevoise, courtier en relocation à Genève"
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
  value: ContactChannel;
  isActive: boolean;
  label?: string;
  onSelect: (value: ContactChannel) => void;
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
    <span className="text-sm leading-[130%]! font-normal text-black-500">
      {label}
    </span>
  </button>
);
