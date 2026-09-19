import { getTranslations, setRequestLocale } from 'next-intl/server';

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
  setRequestLocale(locale);

  const t = await getTranslations('FindATenant.Tenant.Form');
  const imageT = await getTranslations('Images');

  return (
    <FormLayout
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      description={t('description')}
      image={{
        src: FormImage,
        alt: imageT('findATenant.tenant.form'),
        title: imageT('findATenant.tenant.form'),
      }}
      imageWrapperClassname="aspect-556/668"
    >
      <TenantForm />
    </FormLayout>
  );
}
