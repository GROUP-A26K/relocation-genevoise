import 'server-only';

import { sanityFetch } from '@/sanity/lib/fetch';
import {
  CAREER_DETAIL_QUERY,
  CAREER_SLUG_QUERY,
  CAREERS_QUERY,
  DEPARTMENT_QUERY,
  FEATURED_CAREER_QUERY,
} from '@/sanity/lib/queries';

import type { IMeta } from '@/models/meta';
import type { IJob, IJobDetail } from '@/models/job';
import type { CAREERS_QUERY_RESULT } from '@/sanity/types';

type TJobPostProjection = Omit<
  CAREERS_QUERY_RESULT['jobs'][number],
  '_originalId' | 'body' | 'publishedAt'
> & {
  publishedAt?: string | null;
};

export type TCareerParams = {
  page?: number;
  filterBy?: string;
  search?: string;
  pageSize?: number;
  locale?: string;
  start?: number;
  limit?: number;
};

const toJob = (job: TJobPostProjection, locale?: string): IJob => ({
  id: job._id,
  title: job.title || 'Untitled',
  href: {
    pathname: '/career/[slug]',
    params: { slug: (job?.slug?.current || '').replace(/^[a-z]{2}-/i, '') },
  },
  slug: job.slug?.current || '',
  employmentType: job.employmentType || 'Full-time',
  locationType: job.locationType || 'Remote',
  salaryMin: job.salaryMin || 0,
  department: job.department?.title?.[(locale as 'en' | 'fr') || 'en'] || '',
  salaryMax: job.salaryMax || 0,
  currency: job.currency || 'CHF',
  excerpt: job.excerpt || '',
  location: job.location || '',
  publishedAt: job.publishedAt || '',
  closingAt: job.closingAt || '',
  isFeatured: job.isFeatured || false,
  isHidden: job.isHidden || false,
  language: job.language || '',
});

export const fetchJobPosts = async (
  params?: TCareerParams
): Promise<{ jobs: IJob[]; meta: IMeta }> => {
  const pageSize = params?.pageSize || 10;
  const end = (params?.page || 1) * pageSize;
  const start = end - pageSize;

  const response = await sanityFetch(
    CAREERS_QUERY,
    {
      start: start,
      end: end,
      locale: params?.locale ?? 'en',
      department: params?.filterBy ?? '',
      title: params?.search ? `*${params?.search}*` : '',
    },
    { tags: ['jobs'] }
  );

  return {
    jobs: response.jobs.map((job) => toJob(job, params?.locale)),
    meta: {
      pagination: {
        total: response.total,
        page: params?.page || 1,
        pageSize,
        pageCount: Math.ceil(response.total / pageSize),
      },
    },
  };
};

export const fetchFeaturedJobPosts = async (
  slug: string,
  params?: TCareerParams
): Promise<{ jobs: IJob[] }> => {
  const response = await sanityFetch(
    FEATURED_CAREER_QUERY,
    {
      slug: `${params?.locale ?? 'fr'}-${slug}`,
      locale: params?.locale ?? 'fr',
      department: params?.filterBy ?? '',
    },
    { tags: ['jobs-featured'] }
  );

  return {
    jobs: response.jobs.map((job) => toJob(job, params?.locale)),
  };
};

export const fetchJobDetailBySlug = async (
  slug: string,
  locale: string = 'en'
): Promise<IJobDetail | null> => {
  const response = await sanityFetch(
    CAREER_DETAIL_QUERY,
    { slug: `${locale}-${slug}` },
    { tags: ['job-detail'] }
  );

  if (!response) {
    return null;
  }

  return {
    ...toJob(response, locale),
    slug: (response.slug?.current || '').replace(/^[a-z]{2}-/i, ''),
    body: response?.body || [],
  };
};

export const fetchDepartments = async (params?: TCareerParams) => {
  const departments = await sanityFetch(
    DEPARTMENT_QUERY,
    { locale: params?.locale ?? 'en' },
    { tags: ['departments'] }
  );

  return {
    departments,
  };
};

export const fetchCareerSlugBySlug = async (slug: string) => {
  const response = await sanityFetch(
    CAREER_SLUG_QUERY,
    { slug },
    { tags: ['job-detail'] }
  );

  return (response?.targetSlug ?? []).flatMap((item) => {
    const current = item?.slug?.current;

    if (!item?.language || !current) {
      return [];
    }

    return [
      {
        locale: item.language,
        slug: current,
        href: {
          pathname: '/career/[slug]',
          params: { slug: current.replace(/^[a-z]{2}-/i, '') },
        },
      },
    ];
  });
};
