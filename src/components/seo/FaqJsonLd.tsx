import JsonLd from '@/components/seo/JsonLd';
import {
  getAbsoluteUrl,
  getLanguageTag,
  getSchemaId,
  toPlainText,
} from '@/utils/seo';

export type TFaqItem = {
  question: string;
  answer: string;
};

interface IFaqJsonLdProps {
  items: TFaqItem[];
  locale: string;
  path: string;
}

export default function FaqJsonLd({ items, locale, path }: IFaqJsonLdProps) {
  if (!items.length) {
    return null;
  }

  const url = getAbsoluteUrl(path);

  return (
    <JsonLd
      data={{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        inLanguage: getLanguageTag(locale),
        isPartOf: { '@id': getSchemaId('website') },
        mainEntity: items.map(({ question, answer }) => ({
          '@type': 'Question',
          name: toPlainText(question),
          acceptedAnswer: {
            '@type': 'Answer',
            text: toPlainText(answer),
          },
        })),
      }}
    />
  );
}
