import { ContactInfo } from '@/components/blocks/Info';
import Section from '@/components/customs/Section';
import { ContactFormView } from '@/components/sections/Contact';
import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Contact',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/contact`,
    },
  };
}
export default async function Page(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Contact',
  });
  return (
    <>
      <Section>
        <ContactInfo
          heading={t('ContactInfo.heading')}
          subHeading={t('ContactInfo.subHeading')}
          description={t('ContactInfo.description')}
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
      <ContactFormView />
    </>
  );
}
