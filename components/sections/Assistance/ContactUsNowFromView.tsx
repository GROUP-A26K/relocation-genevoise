'use client';
import { useEffect, useState } from 'react';
import { InputField } from '@/components/customs/Form';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BookingFormInput,
  bookingSchema,
} from '@/validations/booking.validation';
import axios from '@/libs/axios';
import { toast } from 'sonner';
import Alert from '@/components/customs/Alert';
import { Env } from '@/libs/Env';
import Link from 'next/link';
import Button from '@/components/customs/Button';
import Section from '@/components/customs/Section';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
const TIME_OPEN = 1;
const TIME_CLOSE = 18;
const RESET_OPEN_STATUS_TIME = 60000;
interface Props {
  heading?: string;
  subHeading?: string;
  statusTitle?: string;
  buttonText?: string;
  inputPlaceholder: string;
  inputText?: string;
  noteTitle?: string;
  policyTitle?: string;
  link?: {
    text: string;
    url: string;
  };
}

export const ContactUsNowFromView: FC<Props> = ({
  heading,
  subHeading = 'Our advisors will call you back during our opening hours and answer all your questions.',
  statusTitle,
  buttonText,
  inputPlaceholder,
  noteTitle,
  policyTitle,
}) => {
  const formT = useTranslations('Validation.Booking');
  const toastT = useTranslations('ToastMessage.Booking');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const form = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema(formT)),
    defaultValues: {
      phone: '',
      accept: true,
    },
  });

  const onSubmit = async (values: BookingFormInput) => {
    if (submitted) return;
    setLoading(true);

    try {
      const response = await axios.post('api/booking', {
        accept: values.accept,
        phone: values.phone,
      });

      if (response.status === 201) {
        setSubmitted(true);
        toast.custom((t) => (
          <Alert
            type="success"
            title={toastT('successTitle')}
            as="solid"
            onClick={() => toast.dismiss(t)}
          >
            {toastT('success')}
          </Alert>
        ));
      }
    } catch (error) {
      setSubmitted(true);
      toast.custom((t) => (
        <Alert
          type="danger"
          title={toastT('errorTitle')}
          as="solid"
          onClick={() => toast.dismiss(t)}
        >
          {toastT('error')}
        </Alert>
      ));
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBasedOnFranceTime = () => {
    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: Env.NEXT_PUBLIC_SERVER_TIMEZONE,
    });
    const hourParts = hourFormatter.formatToParts(new Date());
    const hourPart = hourParts.find((part) => part.type === 'hour');
    const hour = parseInt(hourPart?.value || '0', 10);

    const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone: Env.NEXT_PUBLIC_SERVER_TIMEZONE,
    });
    const weekday = weekdayFormatter.format(new Date());

    const isWeekday = weekday !== 'Sat' && weekday !== 'Sun';

    return isWeekday && hour >= TIME_OPEN && hour < TIME_CLOSE;
  };

  useEffect(() => {
    const updateStatus = () => {
      const status = getStatusBasedOnFranceTime();
      setOpenTime(status === true ? true : false);
    };
    updateStatus();
    const intervalId = setInterval(updateStatus, RESET_OPEN_STATUS_TIME);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-between gap-y-4 bg-primary-500 lg:p-16 p-6 rounded-xl gap-4">
        <div className="flex flex-col gap-4 max-w-xl text-white">
          <h2 className="lg:text-3xl text-2xl font-semibold !leading-[130%]">
            {heading}
          </h2>
          <p className="text-sm font-normal !leading-[130%]">
            {TextWithStrong(subHeading)}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 items-center justify-start">
            <div
              className={`flex rounded-full h-2 w-2 ${openTime ? 'bg-white' : 'bg-red-500'}`}
            />

            <p className="text-white text-sm !leading-[130%]">{statusTitle}</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex lg:flex-row flex-col w-full items-start justify-start gap-2">
                <InputField
                  name="phone"
                  placeholder={inputPlaceholder}
                  register={form.register}
                  error={form.formState.errors.phone?.message}
                  className="lg:w-[431px] w-full text-base h-10 rounded-[1.5rem] bg-white focus-visible:border-white"
                />
                <Button
                  as="outline"
                  variant="md"
                  type="primary"
                  className="lg:w-fit w-full"
                  disabled={loading || submitted || !openTime}
                >
                  {buttonText}
                </Button>
              </div>
              <p className="text-sm font-normal text-white !leading-[130%]">
                {noteTitle}{' '}
                <Link href={'/mentions-legales'}>
                  <span className="text-sm font-semibold !leading-[130%] cursor-pointer">
                    {policyTitle}
                  </span>
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </Section>
  );
};
