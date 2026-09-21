'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { type BaseSyntheticEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { Form } from '@/components/ui/form';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { useFormDraft } from '@/features/formDraft';
import { FormGuard, InputField } from '@/components/common/Form';
import { isCaptchaError, readFormGuard } from '@/utils/formGuard';
import { useSubmitSubscribe } from '@/features/subscribe/subscribe.hooks';
import {
  type TSubscribeFormInput,
  subscribeSchema,
} from '@/validations/subscribe.validation';

export const SubscribeForm: React.FC = () => {
  const t = useTranslations('Footer');
  const formT = useTranslations('Validation.Subscribe');
  const toastT = useTranslations('ToastMessage.Subscribe');
  const commonToastT = useTranslations('ToastMessage.Common');
  const locale = useLocale();
  const { mutateAsync, isPending } = useSubmitSubscribe();
  const form = useForm<TSubscribeFormInput>({
    resolver: zodResolver(subscribeSchema(formT)),
    defaultValues: {
      email: '',
    },
  });

  const draft = useFormDraft('subscribe', form, { restoreKey: locale });

  const onSubmit = async (
    values: TSubscribeFormInput,
    event?: BaseSyntheticEvent
  ) => {
    const submission = draft.beginSubmission(values);

    try {
      await mutateAsync({ values, locale, guard: readFormGuard(event) });
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
        className="flex w-full flex-col gap-2"
      >
        <div className="flex w-full flex-col items-start justify-end gap-2 lg:flex-row">
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
        </div>
        <FormGuard />
      </form>
    </Form>
  );
};

export default SubscribeForm;
