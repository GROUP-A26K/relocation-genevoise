'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import React, { useMemo, type BaseSyntheticEvent } from 'react';

import { Form } from '@/components/ui/form';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { useFormDraft } from '@/features/formDraft';
import { isCaptchaError, readFormGuard } from '@/utils/formGuard';
import { useSubmitContact } from '@/features/contact/contact.hooks';
import { CheckboxField } from '@/components/common/Form/CheckboxField';
import {
  type TContactFormInput,
  contactSchema,
} from '@/validations/contact.validation';
import {
  FormGuard,
  SelectField,
  InputField,
  TextareaField,
  PhoneInputField,
} from '@/components/common/Form';

export const ContactForm: React.FC = () => {
  const t = useTranslations('Contact.ContactForm');
  const formT = useTranslations('Validation.Contact');
  const toastT = useTranslations('ToastMessage.Contact');
  const commonToastT = useTranslations('ToastMessage.Common');
  const locale = useLocale();
  const { mutateAsync, isPending } = useSubmitContact();
  const form = useForm<TContactFormInput>({
    resolver: zodResolver(contactSchema(formT)),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      accept: false,
    },
  });

  const draft = useFormDraft('contact', form, { restoreKey: locale });
  const subjectOptions = useMemo(
    () =>
      ['accommodation', 'tenant', 'corporate', 'concierge'].map(
        (value, index) => ({
          value,
          label: t(`subject.options.${index}.label`),
        })
      ),
    [t]
  );

  const onSubmit = async (
    values: TContactFormInput,
    event?: BaseSyntheticEvent
  ) => {
    const submission = draft.beginSubmission(values);
    const subject = subjectOptions.find(
      (option) => option.value === values.subject
    );

    try {
      await mutateAsync({
        values: { ...values, subject: subject?.label ?? values.subject },
        locale,
        guard: readFormGuard(event),
      });

      draft.completeSubmission(submission);
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
    } catch (error) {
      toast.custom((t) => (
        <Alert
          type="danger"
          title={toastT('errorTitle')}
          as="solid"
          onClick={() => toast.dismiss(t)}
        >
          {isCaptchaError(error)
            ? commonToastT('captchaFailed')
            : toastT('error')}
        </Alert>
      ));
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 lg:flex-row">
          <InputField
            name="first_name"
            label={t('first_name.label')}
            placeholder={t('first_name.placeholder')}
            isRequired={true}
            register={form.register}
            error={form.formState.errors.first_name?.message}
          />
          <InputField
            name="last_name"
            label={t('last_name.label')}
            placeholder={t('last_name.placeholder')}
            isRequired={true}
            register={form.register}
            error={form.formState.errors.last_name?.message}
          />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <InputField
            name="email"
            label={t('email.label')}
            placeholder={t('email.placeholder')}
            isRequired={true}
            register={form.register}
            error={form.formState.errors.email?.message}
          />

          <PhoneInputField
            name="phone"
            label={t('phone.label')}
            placeholder={t('phone.placeholder')}
            control={form.control}
            error={form.formState.errors.phone?.message}
            className="mt-0 w-full text-base"
            inputClassName="bg-white"
            countrySelectClassName="bg-white"
          />
        </div>
        <InputField
          name="company"
          label={t('company.label')}
          placeholder={t('company.placeholder')}
          register={form.register}
          error={form.formState.errors.company?.message}
        />

        <SelectField
          name="subject"
          label={t('subject.label')}
          placeholder={t('subject.placeholder')}
          isRequired={true}
          options={subjectOptions}
          control={form.control}
          error={form.formState.errors.subject?.message}
        />
        <TextareaField
          name="message"
          label={t('message.label')}
          placeholder={t('message.placeholder')}
          error={form.formState.errors.message?.message}
        />
        <CheckboxField
          name="accept"
          label={t('accept')}
          error={form.formState.errors.accept?.message}
        />
        <FormGuard />
        <Button
          as="solid"
          variant="md"
          type="secondary"
          className="w-full"
          disabled={isPending}
        >
          {t('send')}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
