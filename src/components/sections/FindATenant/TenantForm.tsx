'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Building,
  Building2,
  House,
  type LucideIcon,
} from 'lucide-react';

import { Form } from '@/components/ui/form';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { useFormDraft } from '@/features/formDraft';
import { ROOM_FILTER_OPTIONS } from '@/constants/property';
import { CheckboxField } from '@/components/common/Form/CheckboxField';
import { useSubmitTenantInquiry } from '@/features/findATenant/findATenant.hooks';
import {
  tenantFormSchema,
  type TTenantFormInput,
} from '@/validations/findATenant.validation';
import {
  ChipSelectField,
  InputField,
  PhoneInputField,
  SelectField,
} from '@/components/common/Form';

import FormSectionHeader from './FormSectionHeader';

const PROPERTY_TYPE_ICONS: LucideIcon[] = [Building2, House, Building];

type TOption = { value: string; label: string };

export default function TenantForm() {
  const t = useTranslations('FindATenant.Tenant.Form');
  const formT = useTranslations('Validation.FindATenant');
  const toastT = useTranslations('ToastMessage.FindATenant');
  const roomsT = useTranslations('Properties');
  const locale = useLocale();
  const { mutateAsync, isPending } = useSubmitTenantInquiry();

  const form = useForm<TTenantFormInput>({
    resolver: zodResolver(tenantFormSchema(formT)),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      property_address: '',
      property_type: '',
      number_of_rooms: '',
      accept: false,
    },
  });

  const propertyTypeOptions = (
    t.raw('rental.propertyType.options') as TOption[]
  ).map((option, index) => ({
    ...option,
    Icon: PROPERTY_TYPE_ICONS[index],
  }));

  const roomOptions = ROOM_FILTER_OPTIONS.filter(
    (option) => option.value !== ''
  ).map((option) => ({
    value: option.value,
    label: roomsT(option.labelKey as Parameters<typeof roomsT>[0]),
  }));

  const draft = useFormDraft('tenant', form, { restoreKey: locale });

  const onSubmit = async (values: TTenantFormInput) => {
    const submission = draft.beginSubmission(values);
    const submitValues = {
      ...values,
      property_type:
        propertyTypeOptions.find(
          (option) => option.value === values.property_type
        )?.label ?? values.property_type,
      number_of_rooms:
        roomOptions.find((option) => option.value === values.number_of_rooms)
          ?.label ?? values.number_of_rooms,
    };

    try {
      await mutateAsync({ values: submitValues, locale });
      draft.completeSubmission(submission);
      toast.custom((id) => (
        <Alert
          type="success"
          title={toastT('successTitle')}
          as="solid"
          onClick={() => toast.dismiss(id)}
        >
          {toastT('success')}
        </Alert>
      ));
    } catch (error) {
      toast.custom((id) => (
        <Alert
          type="danger"
          title={toastT('errorTitle')}
          as="solid"
          onClick={() => toast.dismiss(id)}
        >
          {toastT('error')}
        </Alert>
      ));
      console.error('Error submitting tenant form:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <FormSectionHeader title={t('contact.title')} />

            <InputField
              name="full_name"
              label={t('contact.fullName.label')}
              placeholder={t('contact.fullName.placeholder')}
              isRequired
              register={form.register}
              error={form.formState.errors.full_name?.message}
            />

            <div className="flex flex-col gap-6 lg:flex-row">
              <InputField
                name="email"
                label={t('contact.email.label')}
                placeholder={t('contact.email.placeholder')}
                isRequired
                register={form.register}
                error={form.formState.errors.email?.message}
              />
              <PhoneInputField
                name="phone"
                label={t('contact.phone.label')}
                placeholder={t('contact.phone.placeholder')}
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
            <FormSectionHeader title={t('rental.title')} />

            <InputField
              name="property_address"
              label={t('rental.address.label')}
              placeholder={t('rental.address.placeholder')}
              isRequired
              register={form.register}
              error={form.formState.errors.property_address?.message}
            />

            <ChipSelectField
              name="property_type"
              label={t('rental.propertyType.label')}
              isRequired
              options={propertyTypeOptions}
              error={form.formState.errors.property_type?.message}
            />

            <SelectField
              name="number_of_rooms"
              label={t('rental.numberOfRooms.label')}
              placeholder={t('rental.numberOfRooms.placeholder')}
              isRequired
              options={roomOptions}
              control={form.control}
              error={form.formState.errors.number_of_rooms?.message}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <CheckboxField
            name="accept"
            label={t('consent.text')}
            policy={t('consent.policy')}
            error={form.formState.errors.accept?.message}
            className="gap-2"
          />

          <Button
            as="solid"
            variant="md"
            type="secondary"
            iconEnd={ArrowRight}
            className="w-full rounded-full"
            disabled={isPending}
          >
            {t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
