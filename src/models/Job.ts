import { Block } from './Block';

export interface Job {
  id: string;
  title: string;
  href: string;
  slug: string;
  department: string;
  employmentType:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Internship'
    | 'Temporary';
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
