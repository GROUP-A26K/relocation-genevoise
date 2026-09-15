'use client';

import {
  useCareerDetail,
  useCareerFeatured,
} from '@/features/career/career.hooks';

import { Content } from './Content';
import { ContentContainer } from './ContentContainer';
import { RelatedItemsPanel } from './RelatedItemsPanel';

import type { Job, JobDetail } from '@/models/job';

interface IPageViewProps {
  jobDetail: JobDetail;
  featuredJobs: Job[];
  slug: string;
  locale: string;
}

export const PageView: React.FC<IPageViewProps> = ({
  jobDetail: initialJobDetail,
  featuredJobs: initialFeatured,
  slug,
  locale,
}) => {
  const detailQuery = useCareerDetail(slug, locale);
  const jobDetail = detailQuery.data ?? initialJobDetail;
  const featuredQuery = useCareerFeatured({
    slug,
    locale,
    filterBy: jobDetail.department,
  });
  const featuredJobs = featuredQuery.data?.jobs ?? initialFeatured;

  return (
    <ContentContainer>
      <div className="flex flex-col items-start justify-start gap-16 lg:flex-row">
        <Content jobDetail={jobDetail} />
        {featuredJobs.length > 0 && <RelatedItemsPanel jobs={featuredJobs} />}
      </div>
    </ContentContainer>
  );
};
