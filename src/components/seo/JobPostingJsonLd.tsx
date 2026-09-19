import JsonLd from '@/components/seo/JsonLd';
import { ORGANIZATION } from '@/constants/seo';
import {
  getAbsoluteUrl,
  getLanguageTag,
  getSchemaId,
  portableTextToPlainText,
  toIsoDate,
} from '@/utils/seo';

import type { IJobDetail } from '@/models/job';

const EMPLOYMENT_TYPES: Record<IJobDetail['employmentType'], string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Contract: 'CONTRACTOR',
  Internship: 'INTERN',
  Temporary: 'TEMPORARY',
};

interface IJobPostingJsonLdProps {
  job: IJobDetail;
  locale: string;
  path: string;
}

const getLocation = (job: IJobDetail) =>
  job.locationType === 'Remote'
    ? {
        jobLocationType: 'TELECOMMUTE',
        applicantLocationRequirements: {
          '@type': 'Country',
          name: ORGANIZATION.address.addressCountry,
        },
      }
    : {
        jobLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', ...ORGANIZATION.address },
        },
      };

const getBaseSalary = (job: IJobDetail) =>
  job.salaryMin > 0 && job.salaryMax > 0
    ? {
        '@type': 'MonetaryAmount',
        currency: job.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
        },
      }
    : undefined;

export default function JobPostingJsonLd({
  job,
  locale,
  path,
}: IJobPostingJsonLdProps) {
  const url = getAbsoluteUrl(path);

  return (
    <JsonLd
      data={{
        '@type': 'JobPosting',
        '@id': `${url}#jobposting`,
        url,
        title: job.title,
        description: portableTextToPlainText(job.body) || job.excerpt,
        datePosted: toIsoDate(job.publishedAt),
        validThrough: toIsoDate(job.closingAt),
        employmentType: EMPLOYMENT_TYPES[job.employmentType],
        hiringOrganization: { '@id': getSchemaId('organization') },
        ...getLocation(job),
        baseSalary: getBaseSalary(job),
        directApply: true,
        inLanguage: getLanguageTag(locale),
      }}
    />
  );
}
