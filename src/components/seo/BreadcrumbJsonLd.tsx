import JsonLd from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/utils/seo';

type TBreadcrumbItem = {
  name: string;
  path: string;
};

interface IBreadcrumbJsonLdProps {
  items: TBreadcrumbItem[];
}

export default function BreadcrumbJsonLd({ items }: IBreadcrumbJsonLdProps) {
  if (items.length < 2) {
    return null;
  }

  return (
    <JsonLd
      data={{
        '@type': 'BreadcrumbList',
        itemListElement: items.map(({ name, path }, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          item: getAbsoluteUrl(path),
        })),
      }}
    />
  );
}
