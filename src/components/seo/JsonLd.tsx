interface IJsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: IJsonLdProps) {
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }}
    />
  );
}
