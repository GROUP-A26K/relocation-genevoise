"use client";
import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "@/libs/axios";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import {
  SelectField,
  InputField,
  TextareaField,
} from "@/components/customs/Form";
import Button from "@/components/customs/Button";
import Alert from "@/components/customs/Alert";
import {
  ContactFormInput,
  contactSchema,
} from "@/validations/contact.validation";
import { CheckboxField } from "@/components/customs/Form/CheckboxStyleField";

export const ContactForm: FC = () => {
  const t = useTranslations("Contact.ContactForm");
  const formT = useTranslations("Validation.Contact");
  const toastT = useTranslations("ToastMessage.Contact");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const locale = useLocale();
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema(formT)),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
      accept: false,
    },
  });

  const onSubmit = async (values: ContactFormInput) => {
    if (submitted) return;
    setLoading(true);

    try {
      const response = await axios.post(`api/contact?locale=${locale}`, {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        accept: values.accept,
        phone: values.phone,
        company: values.company,
      });

      if (response.status === 201) {
        setSubmitted(true);
        toast.custom((t) => (
          <Alert
            type="success"
            title={toastT("successTitle")}
            as="solid"
            onClick={() => toast.dismiss(t)}
          >
            {toastT("success")}
          </Alert>
        ));
      }
    } catch (error) {
      setSubmitted(true);
      toast.custom((t) => (
        <Alert
          type="danger"
          title={toastT("errorTitle")}
          as="solid"
          onClick={() => toast.dismiss(t)}
        >
          {toastT("error")}
        </Alert>
      ));
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex lg:flex-row flex-col gap-6">
          <InputField
            name="first_name"
            label={t("first_name.label")}
            placeholder={t("first_name.placeholder")}
            isRequired={true}
            register={form.register}
            error={form.formState.errors.first_name?.message}
          />
          <InputField
            name="last_name"
            label={t("last_name.label")}
            placeholder={t("last_name.placeholder")}
            isRequired={true}
            register={form.register}
            error={form.formState.errors.last_name?.message}
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-6">
          <InputField
            name="email"
            label={t("email.label")}
            placeholder={t("email.placeholder")}
            isRequired={true}
            register={form.register}
            error={form.formState.errors.email?.message}
          />
          <InputField
            name="phone"
            label={t("phone.label")}
            placeholder={t("phone.placeholder")}
            isRequired={true}
            register={form.register}
            error={form.formState.errors.phone?.message}
          />
        </div>
        <InputField
          name="company"
          label={t("company.label")}
          placeholder={t("company.placeholder")}
          register={form.register}
          error={form.formState.errors.company?.message}
        />

        <SelectField
          name="subject"
          label={t("subject.label")}
          placeholder={t("subject.placeholder")}
          isRequired={true}
          options={[
            {
              value: t("subject.options.0.label"),
              label: t("subject.options.0.label"),
            },
            {
              value: t("subject.options.1.label"),
              label: t("subject.options.1.label"),
            },
            {
              value: t("subject.options.2.label"),
              label: t("subject.options.2.label"),
            },
            {
              value: t("subject.options.3.label"),
              label: t("subject.options.3.label"),
            },
          ]}
          register={form.register}
          error={form.formState.errors.subject?.message}
        />
        <TextareaField
          name="message"
          label={t("message.label")}
          placeholder={t("message.placeholder")}
          register={form.register}
          error={form.formState.errors.message?.message}
        />
        <CheckboxField
          name="accept"
          label={t("accept")}
          register={form.register}
          error={form.formState.errors.accept?.message}
        />
        <Button
          as="solid"
          variant="md"
          type="secondary"
          className="w-full"
          disabled={loading || submitted}
        >
          {t("send")}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
