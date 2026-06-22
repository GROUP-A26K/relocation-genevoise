"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import axios from "@/libs/axios";
import {
  ArrowRight,
  Building,
  Building2,
  House,
  type LucideIcon,
} from "lucide-react";

import { Form } from "@/components/ui/form";
import {
  ChipSelectField,
  InputField,
  PhoneInputField,
  SelectField,
  TextareaField,
} from "@/components/customs/Form";
import { CheckboxField } from "@/components/customs/Form/CheckboxStyleField";
import Button from "@/components/customs/Button";
import Alert from "@/components/customs/Alert";
import { ROOM_FILTER_OPTIONS } from "@/constants/property";
import {
  landlordsFormSchema,
  type LandlordsFormInput,
} from "@/validations/findATenant.validation";

import FormSectionHeader from "./FormSectionHeader";

const PROPERTY_TYPE_ICONS: LucideIcon[] = [Building2, House, Building];

type TOption = { value: string; label: string };

export default function LandlordsForm() {
  const t = useTranslations("FindATenant.Landlords.Form");
  const formT = useTranslations("Validation.FindATenant");
  const toastT = useTranslations("ToastMessage.FindATenant");
  const roomsT = useTranslations("Properties");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<LandlordsFormInput>({
    resolver: zodResolver(landlordsFormSchema(formT)),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      property_address: "",
      property_type: "",
      number_of_rooms: "",
      additional_info: "",
      accept: false,
    },
  });

  const propertyTypeOptions = t
    .raw("property.propertyType.options")
    .map((option: TOption, index: number) => ({
      ...option,
      Icon: PROPERTY_TYPE_ICONS[index],
    }));

  const roomOptions = ROOM_FILTER_OPTIONS.filter(
    (option) => option.value !== "",
  ).map((option) => ({
    value: option.value,
    label: roomsT(option.labelKey as Parameters<typeof roomsT>[0]),
  }));

  const onSubmit = async (values: LandlordsFormInput) => {
    if (submitted) return;
    setLoading(true);

    try {
      const response = await axios.post(
        `api/find-a-tenant/landlords?locale=${locale}`,
        {
          ...values,
          property_type:
            propertyTypeOptions.find(
              (option: TOption) => option.value === values.property_type,
            )?.label ?? values.property_type,
          number_of_rooms:
            roomOptions.find(
              (option) => option.value === values.number_of_rooms,
            )?.label ?? values.number_of_rooms,
        },
      );

      if (response.status !== 201) return;

      setSubmitted(true);
      toast.custom((id) => (
        <Alert
          type="success"
          title={toastT("successTitle")}
          as="solid"
          onClick={() => toast.dismiss(id)}
        >
          {toastT("success")}
        </Alert>
      ));
      form.reset();
    } catch (error) {
      toast.custom((id) => (
        <Alert
          type="danger"
          title={toastT("errorTitle")}
          as="solid"
          onClick={() => toast.dismiss(id)}
        >
          {toastT("error")}
        </Alert>
      ));
      console.error("Error submitting landlords form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <FormSectionHeader title={t("contact.title")} />

            <InputField
              name="full_name"
              label={t("contact.fullName.label")}
              placeholder={t("contact.fullName.placeholder")}
              isRequired
              register={form.register}
              error={form.formState.errors.full_name?.message}
            />

            <div className="flex flex-col gap-6 lg:flex-row">
              <InputField
                name="email"
                label={t("contact.email.label")}
                placeholder={t("contact.email.placeholder")}
                isRequired
                register={form.register}
                error={form.formState.errors.email?.message}
              />
              <PhoneInputField
                name="phone"
                label={t("contact.phone.label")}
                placeholder={t("contact.phone.placeholder")}
                isRequired
                control={form.control}
                error={form.formState.errors.phone?.message}
                className="w-full text-base"
                inputClassName="bg-white"
                countrySelectClassName="bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <FormSectionHeader title={t("property.title")} />

            <InputField
              name="property_address"
              label={t("property.address.label")}
              placeholder={t("property.address.placeholder")}
              isRequired
              register={form.register}
              error={form.formState.errors.property_address?.message}
            />

            <ChipSelectField
              name="property_type"
              label={t("property.propertyType.label")}
              isRequired
              options={propertyTypeOptions}
              error={form.formState.errors.property_type?.message}
            />

            <SelectField
              name="number_of_rooms"
              label={t("property.numberOfRooms.label")}
              placeholder={t("property.numberOfRooms.placeholder")}
              isRequired
              options={roomOptions}
              register={form.register}
              error={form.formState.errors.number_of_rooms?.message}
            />

            <TextareaField
              name="additional_info"
              label={t("property.additionalInfo.label")}
              placeholder={t("property.additionalInfo.placeholder")}
              maxLength={1000}
              error={form.formState.errors.additional_info?.message}
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <CheckboxField
            name="accept"
            label={t("consent.text")}
            policy={t("consent.policy")}
            error={form.formState.errors.accept?.message}
            className="gap-2"
          />

          <Button
            as="solid"
            variant="md"
            type="secondary"
            iconEnd={ArrowRight}
            className="w-full rounded-full"
            disabled={loading || submitted}
          >
            {t("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
