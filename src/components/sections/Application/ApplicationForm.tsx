"use client";

import { FC, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import axios from "@/libs/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Clock, MapPin, CircleDollarSign } from "lucide-react";

import Button from "@/components/customs/Button";
import {
  InputField,
  SelectField,
  UploadField,
} from "@/components/customs/Form";
import ConsultationBG from "@/assets/img/bg/assurance-genevoise-career-form.webp";
import { Form } from "@/components/ui/form";
import { CheckboxField } from "@/components/customs/Form/CheckboxStyleField";
import { JobDetail } from "@/models/Job";
import {
  ApplicationFormInput,
  applicationSchema,
} from "@/validations/application.validation";
import Alert from "@/components/customs/Alert";

const buildOptions = (t: ReturnType<typeof useTranslations>) =>
  [...Array(5).keys()].map((i) => {
    const label = t(`experienceYears.options.${i}.label`);
    return { value: label, label };
  });

const Divider = () => <div className="w-px h-4 bg-slate-200" />;

const InfoChip: FC<{
  icon: FC<{ className?: string }>;
  label: string | number;
}> = ({ icon: Icon, label }) => (
  <li className="flex items-center gap-1.5 text-black-200 text-sm font-medium">
    <Icon className="size-4 text-black-50" />
    {label}
  </li>
);

interface Props {
  jobDetail: JobDetail;
}

const ApplicationForm: FC<Props> = ({ jobDetail }) => {
  const t = useTranslations("Application.ApplyForm");
  const formT = useTranslations("Validation.Application");
  const toastT = useTranslations("ToastMessage.Application");
  const locale = useLocale();
  const form = useForm<ApplicationFormInput>({
    resolver: zodResolver(applicationSchema(formT)),
    defaultValues: {
      expected_ctc: "",
      experience_years: "",
      department: jobDetail.department,
      position: jobDetail.title,
      accept: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const experienceOptions = useMemo(() => buildOptions(t), [t]);

  const onSubmit: SubmitHandler<ApplicationFormInput> = useCallback(
    async (values) => {
      if (submitted) return;
      setLoading(true);

      try {
        const fd = new FormData();
        fd.append("resume_file", values.resume_file as File);
        Object.entries(values).forEach(([k, v]) =>
          k !== "resume_file" ? fd.append(k, String(v)) : null
        );

        const { status } = await axios.post(
          `api/application?locale=${locale}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (status === 201) {
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
    },
    [locale, toastT, submitted]
  );

  const { title, employmentType, location, salaryMin, salaryMax, currency } =
    jobDetail;

  return (
    <div className="container w-full 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md xl:px-[100px] lg:px-[48px] px-4 gap-8 pt-8">
      <header className="flex w-full">
        <div className="flex flex-col gap-4 lg:gap-6">
          <p className="text-sm font-semibold text-secondary-600">
            Application
          </p>
          <h1 className="text-3xl font-semibold">{title}</h1>

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
      </header>

      <section className="flex flex-col lg:flex-row gap-12 lg:gap-16 bg-white shadow-xl rounded-xl lg:p-8 p-4 pt-6 mt-8">
        <div className="flex flex-col gap-6 lg:gap-8 w-full">
          <h2 className="text-xl font-semibold">
            {t("formTitle", { default: "Application Forms" })}
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="flex flex-col gap-6"
            >
              {/* row 1 */}
              <div className="flex flex-col lg:flex-row gap-6">
                <InputField
                  name="first_name"
                  label={t("first_name.label")}
                  placeholder={t("first_name.placeholder")}
                  isRequired
                  register={form.register}
                  error={form.formState.errors.first_name?.message}
                />
                <InputField
                  name="last_name"
                  label={t("last_name.label")}
                  placeholder={t("last_name.placeholder")}
                  isRequired
                  register={form.register}
                  error={form.formState.errors.last_name?.message}
                />
              </div>

              {/* row 2 */}
              <div className="flex flex-col lg:flex-row gap-6">
                <InputField
                  name="email"
                  label={t("email.label")}
                  placeholder={t("email.placeholder")}
                  isRequired
                  register={form.register}
                  error={form.formState.errors.email?.message}
                />
                <InputField
                  name="phone"
                  label={t("phone.label")}
                  placeholder={t("phone.placeholder")}
                  isRequired
                  register={form.register}
                  error={form.formState.errors.phone?.message}
                />
              </div>

              {/* select */}
              <SelectField
                name="experience_years"
                label={t("experienceYears.label")}
                placeholder={t("experienceYears.placeholder")}
                options={experienceOptions}
                isRequired
                register={form.register}
                error={form.formState.errors.experience_years?.message}
              />

              {/* compensation */}
              <InputField
                name="expected_ctc"
                label={t("expected.label")}
                placeholder={t("expected.placeholder")}
                type="text"
                register={form.register}
                error={form.formState.errors.expected_ctc?.message}
              />

              {/* file upload */}
              <UploadField
                name="resume_file"
                label={t("resume.label", { default: "Resume" })}
                register={form.register}
                onChange={(file) =>
                  file
                    ? form.setValue("resume_file", file, {
                        shouldValidate: true,
                      })
                    : form.resetField("resume_file")
                }
                error={form.formState.errors.resume_file?.message}
              />

              {/* consent */}
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
        </div>

        {/* illustration */}
        <Image
          src={ConsultationBG}
          alt="Assurance Genevoise, courtier en assurance à Genève"
          title="Assurance Genevoise, courtier en assurance à Genève"
          width={556}
          height={724}
          className="rounded-2xl object-cover lg:max-h-[724px] 2xl:min-w-[556px] lg:min-w-[400px] max-h-[180px]"
        />
      </section>
    </div>
  );
};

export default ApplicationForm;
