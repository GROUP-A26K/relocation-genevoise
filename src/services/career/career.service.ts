import {
  CAREER_DETAIL_QUERY,
  CAREERS_QUERY,
  DEPARTMENT_QUERY,
  FEATURED_CAREER_QUERY,
} from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { AssuranceJobDepartment, AssuranceJobPost } from '@/sanity/types';
import { Meta } from '@/models/Meta';
import { Job, JobDetail } from '@/models/Job';

export interface JobPostProps extends Omit<AssuranceJobPost, 'department'> {
  department: {
    title: {
      en: string;
      fr: string;
    };
  };
}

export interface ParamsProps {
  page?: number;
  filterBy?: string;
  search?: string;
  pageSize?: number;
  locale?: string;
  start?: number;
  limit?: number;
}

export const fetchJobPosts = async (
  params?: ParamsProps
): Promise<{ jobs: Job[]; meta: Meta }> => {
  try {
    const end = (params?.page || 1) * (params?.pageSize || 10);
    const start = end - (params?.pageSize || 10);
    const response = await client.fetch<{
      jobs: JobPostProps[];
      total: number;
    }>(
      CAREERS_QUERY,
      {
        start: start,
        end: end,
        locale: params?.locale ?? 'en',
        department: params?.filterBy ?? '',
        title: params?.search ? `*${params?.search}*` : '',
      },
      { next: { tags: ['jobs'] } }
    );

    return {
      jobs: response.jobs.map((job) => ({
        id: job._id,
        title: job.title || 'Untitled',
        href: `/career/${(job?.slug?.current || '').replace(/^[a-z]{2}-/i, '')}`,
        slug: job.slug?.current || '',
        employmentType: job.employmentType || 'Full-time',
        locationType: job.locationType || 'Remote',
        salaryMin: job.salaryMin || 0,
        department:
          job.department?.title?.[(params?.locale as 'en' | 'fr') || 'en'] ||
          '',
        salaryMax: job.salaryMax || 0,
        currency: job.currency || 'CHF',
        excerpt: job.excerpt || '',
        location: job.location || '',
        publishedAt: job.publishedAt || '',
        closingAt: job.closingAt || '',
        isFeatured: job.isFeatured || false,
        isHidden: job.isHidden || false,
        language: job.language || '',
      })),
      meta: {
        pagination: {
          total: response.total,
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          pageCount: Math.ceil(response.total / (params?.pageSize || 10)),
        },
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }

  return {
    jobs: [],
    meta: { pagination: { total: 0, page: 0, pageSize: 0, pageCount: 0 } },
  };
};

export const fetchFeaturedJobPosts = async (
  slug: string,
  params?: ParamsProps
): Promise<{ jobs: Job[] }> => {
  try {
    const response = await client.fetch<{
      jobs: JobPostProps[];
    }>(
      FEATURED_CAREER_QUERY,
      {
        slug: `${params?.locale ?? 'fr'}-${slug}`,
        locale: params?.locale ?? 'fr',
        department: params?.filterBy ?? '',
      },
      { next: { tags: ['jobs-featured'] } }
    );

    return {
      jobs: response.jobs.map((job) => ({
        id: job._id,
        title: job.title || 'Untitled',
        href: `/career/${(job?.slug?.current || '').replace(/^[a-z]{2}-/i, '')}`,
        slug: job.slug?.current || '',
        employmentType: job.employmentType || 'Full-time',
        locationType: job.locationType || 'Remote',
        salaryMin: job.salaryMin || 0,
        department:
          job.department?.title?.[(params?.locale as 'en' | 'fr') || 'en'] ||
          '',
        salaryMax: job.salaryMax || 0,
        currency: job.currency || 'CHF',
        excerpt: job.excerpt || '',
        location: job.location || '',
        publishedAt: job.publishedAt || '',
        closingAt: job.closingAt || '',
        isFeatured: job.isFeatured || false,
        isHidden: job.isHidden || false,
        language: job.language || '',
      })),
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }

  return {
    jobs: [],
  };
};

export const fetchJobDetailBySlug = async (
  slug: string,
  locale: string = 'en'
): Promise<JobDetail | null> => {
  try {
    const response = await client.fetch<JobPostProps>(
      CAREER_DETAIL_QUERY,
      {
        slug: `${locale}-${slug}`,
      },
      { next: { tags: ['job-detail'] } }
    );
    if (!response) {
      return null;
    }
    return {
      id: response._id,
      title: response.title || 'Untitled',
      href: `/career/${(response?.slug?.current || '').replace(/^[a-z]{2}-/i, '')}`,
      slug: (response.slug?.current || '').replace(/^[a-z]{2}-/i, ''),
      employmentType: response.employmentType || 'Full-time',
      locationType: response.locationType || 'Remote',
      salaryMin: response.salaryMin || 0,
      department:
        response.department?.title?.[(locale as 'en' | 'fr') || 'en'] || '',
      body: response?.body || [],
      salaryMax: response.salaryMax || 0,
      currency: response.currency || 'CHF',
      excerpt: response.excerpt || '',
      location: response.location || '',
      publishedAt: response.publishedAt || '',
      closingAt: response.closingAt || '',
      isFeatured: response.isFeatured || false,
      isHidden: response.isHidden || false,
      language: response.language || '',
    };
  } catch (error) {
    console.error('Error fetching blog detail:', error);
  }

  return null;
};

export const fetchDepartments = async (params?: ParamsProps) => {
  const departments = await client.fetch<AssuranceJobDepartment[]>(
    DEPARTMENT_QUERY,
    { locale: params?.locale ?? 'en' },
    { next: { tags: ['departments'] } }
  );

  return {
    departments,
  };
};
