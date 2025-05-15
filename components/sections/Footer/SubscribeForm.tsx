'use client';
import React, { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from '@/libs/axios';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { InputField } from '@/components/customs/Form';
import Button from '@/components/customs/Button';
import Alert from '@/components/customs/Alert';
import {
  SubscribeFormInput,
  subscribeSchema,
} from '@/validations/subscribe.validation';

export const SubscribeForm: FC = () => {
  const t = useTranslations('Footer.contact');
  const formT = useTranslations('Validation.Subscribe');
  const toastT = useTranslations('ToastMessage.Subscribe');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SubscribeFormInput>({
    resolver: zodResolver(subscribeSchema(formT)),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: SubscribeFormInput) => {
    if (submitted) return;
    setLoading(true);

    try {
      const response = await axios.post('api/subscribe', {
        email: values.email,
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className="flex lg:flex-row flex-col w-full items-start justify-end gap-2"
      >
        <InputField
          name="email"
          placeholder={t('inputPlaceholder')}
          register={form.register}
          error={form.formState.errors.email?.message}
          className="lg:w-[340px] w-full text-base h-fit"
        />
        <Button
          as="solid"
          variant="md"
          type="primary"
          className="lg:w-fit w-full"
          disabled={loading || submitted}
        >
          {t('buttonText')}
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
