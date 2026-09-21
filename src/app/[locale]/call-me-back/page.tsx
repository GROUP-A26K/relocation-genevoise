import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import Section from '@/components/common/Section';
import { ContactInfo } from '@/components/common/Info/ContactInfo';
import { ConsultationFormView } from '@/components/sections/RemindMe';
import PageBreadcrumbJsonLd from '@/components/seo/PageBreadcrumbJsonLd';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/call-me-back'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.CallMeBack',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/call-me-back'),
  };
}

export default async function Page(props: PageProps<'/[locale]/call-me-back'>) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('RemindMe');

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} trail={['/call-me-back']} />

      <ConsultationFormView
        heading={t('Consultation.heading')}
        subHeading={t('Consultation.subHeading')}
        description={t('Consultation.description')}
        cardContent={{
          title: t('Consultation.cardContent.title'),
          openStatusTitle: t('Consultation.cardContent.openStatusTitle'),
          closeStatusTitle: t('Consultation.cardContent.closeStatusTitle'),
          callTitle: t('Consultation.cardContent.callTitle'),
          calendarTitle: t('Consultation.cardContent.calendarTitle'),
          buttonText: t('Consultation.cardContent.buttonText'),
          buttonPlaceholder: t('Consultation.cardContent.buttonPlaceholder'),
          noteTitle: t('Consultation.cardContent.noteTitle'),
          policyTitle: t('Consultation.cardContent.policyTitle'),
          telephoneLabel: t('Consultation.cardContent.telephoneLabel'),
          whatsappLabel: t('Consultation.cardContent.whatsappLabel'),
        }}
      />
      <Section isDivider>
        <ContactInfo
          reasonItems={[
            {
              title: t('ContactInfo.reasonItems.0.title'),
              description: t('ContactInfo.reasonItems.0.description'),
              info: t('ContactInfo.reasonItems.0.info'),
              icon: Mail,
            },
            {
              title: t('ContactInfo.reasonItems.1.title'),
              description: t('ContactInfo.reasonItems.1.description'),
              info: t('ContactInfo.reasonItems.1.info'),
              icon: MapPin,
            },
            {
              title: t('ContactInfo.reasonItems.2.title'),
              description: t('ContactInfo.reasonItems.2.description'),
              info: t('ContactInfo.reasonItems.2.info'),
              icon: Phone,
            },
          ]}
        />
      </Section>
    </>
  );
}
