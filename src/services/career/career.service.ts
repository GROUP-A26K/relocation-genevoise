import "server-only";

import {
  CAREER_DETAIL_QUERY,
  CAREER_SLUG_QUERY,
  CAREERS_QUERY,
  DEPARTMENT_QUERY,
  FEATURED_CAREER_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { AssuranceJobDepartment, AssuranceJobPost } from "@/sanity/types";
import { Meta } from "@/models/Meta";
import { Job, JobDetail } from "@/models/Job";

export interface JobPostProps extends Omit<AssuranceJobPost, "department"> {
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

const toJob = (job: JobPostProps, locale?: string): Job => ({
  id: job._id,
  title: job.title || "Untitled",
  href: `/career/${(job?.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
  slug: job.slug?.current || "",
  employmentType: job.employmentType || "Full-time",
  locationType: job.locationType || "Remote",
  salaryMin: job.salaryMin || 0,
  department: job.department?.title?.[(locale as "en" | "fr") || "en"] || "",
  salaryMax: job.salaryMax || 0,
  currency: job.currency || "CHF",
  excerpt: job.excerpt || "",
  location: job.location || "",
  publishedAt: job.publishedAt || "",
  closingAt: job.closingAt || "",
  isFeatured: job.isFeatured || false,
  isHidden: job.isHidden || false,
  language: job.language || "",
});

export const fetchJobPosts = async (
  params?: ParamsProps
): Promise<{ jobs: Job[]; meta: Meta }> => {
  const pageSize = params?.pageSize || 10;
  const end = (params?.page || 1) * pageSize;
  const start = end - pageSize;

  const response = await sanityFetch<{
    jobs: JobPostProps[];
    total: number;
  }>(
    CAREERS_QUERY,
    {
      start: start,
      end: end,
      locale: params?.locale ?? "en",
      department: params?.filterBy ?? "",
      title: params?.search ? `*${params?.search}*` : "",
    },
    { tags: ["jobs"] }
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
  params?: ParamsProps
): Promise<{ jobs: Job[] }> => {
  const response = await sanityFetch<{
    jobs: JobPostProps[];
  }>(
    FEATURED_CAREER_QUERY,
    {
      slug: `${params?.locale ?? "fr"}-${slug}`,
      locale: params?.locale ?? "fr",
      department: params?.filterBy ?? "",
    },
    { tags: ["jobs-featured"] }
  );

  return {
    jobs: response.jobs.map((job) => toJob(job, params?.locale)),
  };
};

export const fetchJobDetailBySlug = async (
  slug: string,
  locale: string = "en"
): Promise<JobDetail | null> => {
  const response = await sanityFetch<JobPostProps | null>(
    CAREER_DETAIL_QUERY,
    { slug: `${locale}-${slug}` },
    { tags: ["job-detail"] }
  );

  if (!response) {
    return null;
  }

  return {
    ...toJob(response, locale),
    slug: (response.slug?.current || "").replace(/^[a-z]{2}-/i, ""),
    body: response?.body || [],
  };
};

export const fetchDepartments = async (params?: ParamsProps) => {
  const departments = await sanityFetch<AssuranceJobDepartment[]>(
    DEPARTMENT_QUERY,
    { locale: params?.locale ?? "en" },
    { tags: ["departments"] }
  );

  return {
    departments,
  };
};

export const fetchCareerSlugBySlug = async (slug: string) => {
  const response = await sanityFetch<{
    targetSlug: {
      language: string;
      slug: {
        current: string;
      };
    }[];
  } | null>(CAREER_SLUG_QUERY, { slug }, { tags: ["job-detail"] });

  if (!response?.targetSlug) {
    return [];
  }

  return response.targetSlug.map((item) => ({
    locale: item.language,
    slug: item.slug.current,
    href: `/carriere/${item.slug.current.replace(/^[a-z]{2}-/i, "")}`,
  }));
};
