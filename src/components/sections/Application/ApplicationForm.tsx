'use client';
import Image from 'next/image';
import { toast } from 'sonner';
import { useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Clock, MapPin, CircleDollarSign } from 'lucide-react';

import { Form } from '@/components/ui/form';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { readFormGuard } from '@/utils/formGuard';
import { useFormDraft } from '@/features/formDraft';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';
import { CheckboxField } from '@/components/common/Form/CheckboxField';
import ConsultationBG from '@/assets/images/application/form-image.webp';
import { useSubmitApplication } from '@/features/application/application.hooks';
import {
  type TApplicationFormInput,
  applicationSchema,
} from '@/validations/application.validation';
import {
  FormGuard,
  InputField,
  SelectField,
  UploadField,
  PhoneInputField,
} from '@/components/common/Form';

import type { IJobDetail } from '@/models/job';
import type { TApplicationDraftKey } from '@/features/formDraft';

const EXPERIENCE_CODES = [
  'zero_to_one',
  'two_to_three',
  'four_to_five',
  'six_plus',
  'other',
] as const;

const buildOptions = (t: ReturnType<typeof useTranslations>) =>
  EXPERIENCE_CODES.map((value, i) => ({
    value,
    label: t(`experienceYears.options.${i}.label`),
  }));

const Divider = () => <div className="h-4 w-px bg-slate-200" />;

interface IInfoChipProps {
  icon: React.FC<{ className?: string }>;
  label: string | number;
}

const InfoChip: React.FC<IInfoChipProps> = ({ icon: Icon, label }) => (
  <li className="flex items-center gap-1.5 text-sm font-medium text-black-200">
    <Icon className="size-4 text-black-50" />
    {label}
  </li>
);

interface IApplicationFormProps {
  jobDetail: IJobDetail;
  draftKey: TApplicationDraftKey;
}

const ApplicationForm: React.FC<IApplicationFormProps> = ({
  jobDetail,
  draftKey,
}) => {
  const t = useTranslations('Application.ApplyForm');
  const formT = useTranslations('Validation.Application');
  const toastT = useTranslations('ToastMessage.Application');
  const imageT = useTranslations('Images');
  const locale = useLocale();
  const form = useForm<TApplicationFormInput>({
    resolver: zodResolver(applicationSchema(formT)),
    defaultValues: {
      expected_ctc: '',
      experience_years: '',
      department: jobDetail.department,
      position: jobDetail.title,
      accept: false,
    },
  });
  const { mutateAsync, isPending } = useSubmitApplication();
  const experienceOptions = useMemo(() => buildOptions(t), [t]);
  const draft = useFormDraft(draftKey, form, {
    restoreKey: locale,
    restore: (values) => ({
      ...values,
      department: jobDetail.department,
      position: jobDetail.title,
    }),
  });

  const onSubmit: SubmitHandler<TApplicationFormInput> = useCallback(
    async (values, event) => {
      const submission = draft.beginSubmission(values);
      const experience = experienceOptions.find(
        (option) => option.value === values.experience_years
      );

      try {
        await mutateAsync({
          values: {
            ...values,
            experience_years: experience?.label ?? values.experience_years,
            department: jobDetail.department,
            position: jobDetail.title,
          },
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
            {toastT('error')}
          </Alert>
        ));
        console.error('Error submitting form:', error);
      }
    },
    [draft, experienceOptions, jobDetail, locale, mutateAsync, toastT]
  );

  const { title, employmentType, location, salaryMin, salaryMax, currency } =
    jobDetail;

  return (
    <div className="container w-full gap-8 px-4 pt-8 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] xl:max-w-(--breakpoint-xl) xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
      <RevealItem as="section" className="flex w-full">
        <div className="flex flex-col gap-4 lg:gap-6">
          <BodyText
            variant="sm"
            className="leading-5 font-semibold text-secondary-600"
          >
            Application
          </BodyText>
          <HeadingText
            as="h1"
            className="text-3xl leading-9 font-semibold text-inherit"
          >
            {title}
          </HeadingText>

          <ul className="inline-flex flex-wrap items-center gap-3">
            <InfoChip icon={Clock} label={employmentType} />
            <Divider />
            <InfoChip icon={MapPin} label={location} />
            <Divider />
            <InfoChip
              icon={CircleDollarSign}
              label={`${salaryMin} - ${salaryMax} ${currency}`}
            />
          </ul>
        </div>
      </RevealItem>

      <RevealItem
        as="section"
        className="mt-8 flex flex-col gap-12 rounded-xl bg-white p-4 pt-6 shadow-xl lg:flex-row lg:gap-16 lg:p-8"
      >
        <div className="flex w-full flex-col gap-6 lg:gap-8">
          <HeadingText
            as="h2"
            className="text-xl leading-7 font-semibold text-inherit"
          >
            {t('formTitle', { default: 'Application Forms' })}
          </HeadingText>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              className="flex flex-col gap-6"
            >
              <FormGuard />
              {/* row 1 */}
              <div className="flex flex-col gap-6 lg:flex-row">
                <InputField
                  name="first_name"
                  label={t('first_name.label')}
                  placeholder={t('first_name.placeholder')}
                  isRequired
                  register={form.register}
                  error={form.formState.errors.first_name?.message}
                />
                <InputField
                  name="last_name"
                  label={t('last_name.label')}
                  placeholder={t('last_name.placeholder')}
                  isRequired
                  register={form.register}
                  error={form.formState.errors.last_name?.message}
                />
              </div>

              {/* row 2 */}
              <div className="flex flex-col gap-6 lg:flex-row">
                <InputField
                  name="email"
                  label={t('email.label')}
                  placeholder={t('email.placeholder')}
                  isRequired
                  register={form.register}
                  error={form.formState.errors.email?.message}
                />
                <PhoneInputField
                  name="phone"
                  label={t('phone.label')}
                  placeholder={t('phone.placeholder')}
                  isRequired
                  control={form.control}
                  error={form.formState.errors.phone?.message}
                />
              </div>

              {/* select */}
              <SelectField
                name="experience_years"
                label={t('experienceYears.label')}
                placeholder={t('experienceYears.placeholder')}
                options={experienceOptions}
                isRequired
                control={form.control}
                error={form.formState.errors.experience_years?.message}
              />

              {/* compensation */}
              <InputField
                name="expected_ctc"
                label={t('expected.label')}
                placeholder={t('expected.placeholder')}
                type="text"
                register={form.register}
                error={form.formState.errors.expected_ctc?.message}
              />

              {/* file upload */}
              <UploadField
                name="resume_file"
                label={t('resume.label', { default: 'Resume' })}
                error={form.formState.errors.resume_file?.message}
              />

              {/* consent */}
              <CheckboxField
                name="accept"
                label={t('accept')}
                error={form.formState.errors.accept?.message}
              />

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
        </div>

        {/* illustration */}
        <Image
          src={ConsultationBG}
          placeholder="blur"
          alt={imageT('application')}
          title={imageT('application')}
          width={556}
          height={724}
          className="max-h-[180px] rounded-2xl object-cover lg:max-h-[724px] lg:min-w-[400px] 2xl:min-w-[556px]"
        />
      </RevealItem>
    </div>
  );
};

export default ApplicationForm;
