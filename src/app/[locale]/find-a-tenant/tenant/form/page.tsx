import { getTranslations } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import FormLayout from '@/components/sections/FindATenant/FormLayout';
import TenantForm from '@/components/sections/FindATenant/TenantForm';
import FormImage from '@/assets/images/find-a-tenant/tenant/form-image.webp';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/find-a-tenant/tenant/form'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.FindATenantTenantForm',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/find-a-tenant/tenant/form'),
  };
}

export default async function Page(
  props: PageProps<'/[locale]/find-a-tenant/tenant/form'>
) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'FindATenant.Tenant.Form',
  });

  return (
    <FormLayout
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      description={t('description')}
      image={{ src: FormImage, alt: t('heading') }}
      imageWrapperClassname="aspect-556/668"
    >
      <TenantForm />
    </FormLayout>
  );
}
