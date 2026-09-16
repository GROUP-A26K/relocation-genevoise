'use client';

import { toast } from 'sonner';
import React, { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';

import { Form } from '@/components/ui/form';
import Alert from '@/components/customs/Alert';
import Button from '@/components/customs/Button';
import { InputField } from '@/components/customs/Form';
import { useSubmitSubscribe } from '@/features/subscribe/subscribe.hooks';
import {
  type SubscribeFormInput,
  subscribeSchema,
} from '@/validations/subscribe.validation';

export const SubscribeForm: FC = () => {
  const t = useTranslations('Footer');
  const formT = useTranslations('Validation.Subscribe');
  const toastT = useTranslations('ToastMessage.Subscribe');
  const locale = useLocale();
  const { mutate, isPending } = useSubmitSubscribe();
  const form = useForm<SubscribeFormInput>({
    resolver: zodResolver(subscribeSchema(formT)),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: SubscribeFormInput) =>
    mutate(
      { values, locale },
      {
        onSuccess: () => {
          form.reset();
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
        },
        onError: (error) => {
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
        },
      }
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className="flex w-full flex-col items-start justify-end gap-2 lg:flex-row"
      >
        <InputField
          name="email"
          placeholder={t('contact.inputPlaceholder')}
          register={form.register}
          error={form.formState.errors.email?.message}
          className="h-fit w-full text-base lg:w-[340px]"
        />
        <Button
          as="solid"
          variant="md"
          type="primary"
          className="w-full lg:w-fit"
          disabled={isPending}
        >
          {t('contact.buttonText')}
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
