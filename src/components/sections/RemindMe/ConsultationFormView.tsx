'use client';
import Button from '@/components/customs/Button';
import { CalendarDays, PhoneIncoming } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import ConsultationBG from '@/assets/img/bg/relocation-genevoise-rappelez-moi.webp';
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
import { Link } from '@/libs/i18nNavigation';
import { useLocale, useTranslations } from 'next-intl';
import { FormattedText } from '@/components/customs/Text';
const TIME_OPEN = 8;
const TIME_CLOSE = 21;
const RESET_OPEN_STATUS_TIME = 60000;

interface Props {
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
  };

  link?: {
    text: string;
    url: string;
  };
}

export const ConsultationFormView: FC<Props> = ({
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
  },
}) => {
  const formT = useTranslations('Validation.Booking');
  const toastT = useTranslations('ToastMessage.Booking');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const locale = useLocale();
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
      const response = await axios.post(`api/booking?locale=${locale}`, {
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
    <div className="bg-white lg:pb-[300px] pb-[490px]">
      <div className="bg-yellow-25 lg:pb-12 pb-8">
        <div className="relative flex flex-col justify-center items-center">
          <div className="container flex flex-col lg:pt-16 pt-12 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md  xl:px-[100px] lg:px-[48px] px-4 gap-8">
            <div className="w-full">
              <div className="flex w-full items-center lg:justify-start justify-center">
                <div className="flex flex-col lg:gap-6 gap-4 lg:text-left text-center">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-secondary-600 !leading-[130%]">
                      {heading}
                    </p>
                    <h1 className="text-3xl font-semibold !leading-[130%]">
                      <FormattedText text={subHeading} />
                    </h1>
                  </div>
                  <p className="text-sm font-normal text-black-200 !leading-[130%]">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:-mb-[300px] -mb-[522px] w-full items-center">
              <div className="flex flex-col lg:flex-row items-center justify-end lg:gap-16 gap-12 lg:p-8 p-4 pt-6 bg-white shadow-xl rounded-xl">
                <div className="flex flex-col items-start gap-6 lg:justify-center text-left w-full">
                  <div className="flex flex-col lg:gap-6 gap-6 w-full">
                    <div className="flex flex-col gap-3">
                      <h2 className="lg:text-2xl text-xl font-semibold !leading-[130%] whitespace-pre-line">
                        {cardContent.title}
                      </h2>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-2 items-center">
                          <PhoneIncoming className="h-4 w-4 text-primary-500" />
                          <h3 className="flex text-sm text-center text-black-500 !leading-[130%]">
                            {cardContent.callTitle}
                          </h3>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                          <CalendarDays className="h-4 w-4 text-primary-500" />
                          <h3 className="flex text-sm text-center text-black-500 !leading-[130%]">
                            {cardContent.calendarTitle}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-2 items-center">
                        <div
                          className={`rounded-full h-2 w-2 ${openTime ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                        <h3 className="text-black-500 text-sm !leading-[130%]">
                          {openTime
                            ? cardContent.openStatusTitle
                            : cardContent.closeStatusTitle}
                        </h3>
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
                              placeholder={cardContent.buttonPlaceholder}
                              register={form.register}
                              error={form.formState.errors.phone?.message}
                              className="w-full"
                            />
                            <Button
                              as="solid"
                              variant="md"
                              type="secondary"
                              className="lg:w-fit w-full"
                              disabled={loading || submitted}
                            >
                              {cardContent.buttonText}
                            </Button>
                          </div>
                          <h3 className="text-sm font-normal text-black-500 !leading-[130%] w-full">
                            {cardContent.noteTitle}{' '}
                            <Link href={'/mentions-legales'}>
                              <strong className="text-sm font-semibold !leading-[130%] cursor-pointer w-full">
                                {cardContent.policyTitle}
                              </strong>
                            </Link>
                          </h3>
                        </form>
                      </Form>
                    </div>
                  </div>
                </div>

                <Image
                  src={ConsultationBG}
                  alt={'Relocation Genevoise, courtier en relocation à Genève'}
                  title={
                    'Relocation Genevoise, courtier en relocation à Genève'
                  }
                  width={556}
                  height={284}
                  className="lg:max-h-[284px] 2xl:min-w-[556px] lg:min-w-[400px] max-h-[180px]  rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
