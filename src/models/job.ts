import type { Block } from './block';
import type { THref } from '@/libs/i18nNavigation';

export interface Job {
  id: string;
  title: string;
  href: THref;
  slug: string;
  department: string;
  employmentType:
    'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary';
  locationType: 'Remote' | 'Hybrid' | 'On-site';
  location: string;
  salaryMin: number;
  salaryMax: number;
  currency: 'CHF' | 'EUR';
  excerpt: string;
  publishedAt: string;
  closingAt: string;
  isFeatured: boolean;
  isHidden: boolean;
  language: string;
}

export interface JobDetail extends Job {
  body: Block[];
}
