"use client";
import Button from "@/components/customs/Button";
import { CalendarDays, Phone, PhoneIncoming } from "lucide-react";
import Image from "next/image";
import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import ConsultationBG from "@/assets/img/bg/relocation-genevoise-geneve-courtage.webp";
import { PhoneInputField } from "@/components/customs/Form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/libs/axios";
import { toast } from "sonner";
import Alert from "@/components/customs/Alert";
import { Env } from "@/libs/Env";
import { Link } from "@/libs/i18nNavigation";
import { useLocale, useTranslations } from "next-intl";
import { TextWithStrong } from "@/components/customs/Text/TextWithStrong";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { cn } from "@/libs/utils";
import {
  BookingFormInput,
  bookingSchema,
} from "@/validations/booking.validation";
import { useOpenStatus } from "@/hooks/use-open-status";

const TIME_OPEN = 9;
const TIME_CLOSE = 18;
const RESET_OPEN_STATUS_TIME = 60000;

type ContactChannel = BookingFormInput["contactVia"];

interface ContactChannelButtonProps {
  label?: string;
  icon: ReactNode;
  value: ContactChannel;
  isActive: boolean;
  onSelect: (value: ContactChannel) => void;
}

const ContactChannelButton = ({
  label,
  icon,
  value,
  isActive,
  onSelect,
}: ContactChannelButtonProps) => (
  <button
    type="button"
    aria-pressed={isActive}
    onClick={() => onSelect(value)}
    className={cn(
      "px-4 py-2 rounded-[1.5rem] text-base font-semibold shadow-none cursor-pointer",
      "md:w-fit w-full flex items-center justify-center gap-2 border border-solid h-10 lg:h-12 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
      isActive ? "bg-yellow-25 border-yellow-500" : "border-grey-200"
    )}
  >
    {icon}
    <span className="text-sm text-black-500 font-normal !leading-[130%]">
      {label}
    </span>
  </button>
);

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
    telephoneLabel: string;
    whatsappLabel: string;
  };

  link?: {
    text: string;
    url: string;
  };
}

export const ConsultationFormView: FC<Props> = ({
  heading = "Why Insurance Geneva ?",
  subHeading = "Our expertise at your service",
  description = "Our advisors will call you back during our opening hours and answer all your questions.",
  cardContent = {
    title: "Contact with an advisor",
    openStatusTitle: "We are available",
    closeStatusTitle: "We are currently closed",
    callTitle: "Call us",
    calendarTitle: "Schedule an appointment",
    buttonText: "Contact us now",
    noteTitle: "Note: we are available Monday to Friday from 9 am to 6 pm.",
    policyTitle: "Privacy Policy",
    buttonPlaceholder: "Phone number",
    telephoneLabel: "Phone",
    whatsappLabel: "Whatsapp",
  },
}) => {
  const formT = useTranslations("Validation.Booking");
  const toastT = useTranslations("ToastMessage.Booking");
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
      phone: "",
      accept: true,
      contactVia: "telephone",
    },
  });
  const contactVia = form.watch("contactVia");

  const showToast = useCallback(
    (type: "success" | "danger") => {
      const isSuccess = type === "success";
      const titleKey = isSuccess ? "successTitle" : "errorTitle";
      const messageKey = isSuccess ? "success" : "error";

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
      form.setValue("contactVia", value, {
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
          showToast("success");
        }
      } catch (error) {
        setHasSubmitted(true);
        showToast("danger");
        console.error("Error submitting form:", error);
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
        value: "telephone" as const,
        label: cardContent.telephoneLabel,
        icon: (
          <div className="p-[6.17px] rounded-full bg-yellow-500 text-center">
            <Phone
              className="!w-[11.67px] !h-[11.67px] text-white"
              strokeWidth={2.5}
            />
          </div>
        ),
      },
      {
        value: "whatsapp" as const,
        label: cardContent.whatsappLabel,
        icon: <WhatsappIcon className="!w-6 !h-6" />,
      },
    ],
    [cardContent.telephoneLabel, cardContent.whatsappLabel]
  );

  return (
    <section className={cn("bg-white -space-y-16", "lg:-space-y-24")}>
      <div
        className={cn(
          "bg-yellow-50 pt-12 pb-24",
          "lg:pt-16 lg:pb-32",
          "flex flex-col",
          "items-center"
        )}
      >
        <div
          className={cn(
            "flex flex-col text-center gap-4",
            "lg:gap-6 lg:text-left",
            "w-full",
            "2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md  xl:px-[100px]",
            "xl:px-[100px] lg:px-[48px] px-4"
          )}
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-primary-500 !leading-[130%]">
              {heading}
            </p>
            <h1 className="text-3xl font-semibold !leading-[130%]">
              {TextWithStrong(subHeading)}
            </h1>
          </div>
          <p className="text-sm font-normal text-black-200 !leading-[130%]">
            {description}
          </p>
        </div>
      </div>
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] flex-col items-start gap-12 rounded-3xl bg-white p-4 pt-6 shadow-xl",
          "md:p-8",
          "max-lg:mx-4 lg:mx-8 lg:flex-row lg:gap-16 lg:p-8",
          "xl:mx-auto"
        )}
      >
        <div className={cn("flex flex-col gap-6 w-full", "lg:p-8")}>
          <div className="flex flex-col gap-3">
            <h2 className="lg:text-2xl text-xl font-semibold !leading-[130%] max-w-[450px]">
              {cardContent.title}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <PhoneIncoming className="h-4 w-4 text-primary-500" />
                <h3 className="text-sm font-normal text-black-500 !leading-[130%]">
                  {cardContent.callTitle}
                </h3>
              </div>

              <div className="flex gap-2 items-center">
                <CalendarDays className="h-4 w-4 text-primary-500" />
                <h3 className="flex text-sm text-center text-black-500 !leading-[130%]">
                  {cardContent.calendarTitle}
                </h3>
              </div>
            </div>
          </div>

          <div className={cn("flex flex-col gap-3", "lg:gap-[18px]")}>
            <div className="flex gap-2 items-center">
              <div
                className={`rounded-full h-2 w-2 ${isOpen ? "bg-green-500" : "bg-red-500"}`}
              />
              <h3 className="text-black-500 text-sm !leading-[130%]">
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
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  className={cn(
                    "flex gap-2 items-start justify-between",
                    "max-md:flex-col"
                  )}
                >
                  <div className="w-full flex-1 flex flex-col gap-2 lg:gap-3">
                    <PhoneInputField
                      name="phone"
                      placeholder={cardContent.buttonPlaceholder}
                      control={form.control}
                      error={form.formState.errors.phone?.message}
                      className="lg:max-w-[431px] w-full text-base"
                      inputClassName="bg-white lg:h-12"
                      countrySelectClassName="bg-white lg:h-12"
                    />
                    <div className="flex gap-2 items-center lg:flex-row xxs:flex-row flex-col w-full">
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
                    className="md:w-fit w-full lg:h-12"
                    disabled={isLoading || hasSubmitted}
                  >
                    {cardContent.buttonText}
                  </Button>
                </form>
              </Form>
            </div>
            <h3 className="text-sm font-normal text-black-500 !leading-[130%] w-full">
              {cardContent.noteTitle}{" "}
              <Link href={"/mentions-legales"}>
                <strong className="text-sm font-semibold !leading-[130%] cursor-pointer w-full">
                  {cardContent.policyTitle}
                </strong>
              </Link>
            </h3>
          </div>
        </div>

        <Image
          src={ConsultationBG}
          alt="Assurance Genevoise, courtier en assurance à Genève"
          title="Assurance Genevoise, courtier en assurance à Genève"
          width={0}
          height={0}
          sizes="100vh"
          priority
          className={cn(
            "object-cover rounded-[16px]",
            "lg:max-h-none max-h-[300px]",
            "xl:w-[488px] xl:h-[394px] lg:w-[380px] lg:h-[384px] max-sm:max-h-[180px]"
          )}
        />
      </div>
    </section>
  );
};
