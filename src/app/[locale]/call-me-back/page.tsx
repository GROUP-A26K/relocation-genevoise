import { ContactInfo } from '@/components/blocks/Info';
import Section from '@/components/customs/Section';
import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ConsultationFormView } from '@/components/sections/RemindMe';
import { Metadata } from 'next';
import { AppConfig } from '@/utils/AppConfig';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.CallMeBack',
  });

  const { routes } = AppConfig;

  const canonical =
    routes['callMeBack'][locale as keyof (typeof routes)['callMeBack']];

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/${canonical}`,
    },
  };
}

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'RemindMe',
  });
  return (
    <>
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
