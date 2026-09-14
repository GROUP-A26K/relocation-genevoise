import { redirect } from 'next/navigation';

import { getLocalizedPath } from '@/utils/seo';

export default async function Page(
  props: PageProps<'/[locale]/find-a-tenant'>
) {
  const { locale } = await props.params;

  redirect(getLocalizedPath(locale, 'findATenantLandlords'));
}
