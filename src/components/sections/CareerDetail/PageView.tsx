'use client';

import { Content } from './Content';
import { ContentContainer } from './ContentContainer';
import { RelatedItemsPanel } from './RelatedItemsPanel';

import type { Job, JobDetail } from '@/models/Job';

interface Props {
  jobDetail: JobDetail;
  featuredJobs: Job[];
}
export const PageView: React.FC<Props> = ({ jobDetail, featuredJobs }) => {
  return (
    <ContentContainer>
      <div className="flex flex-col items-start justify-start gap-16 lg:flex-row">
        <Content jobDetail={jobDetail} />
        {featuredJobs.length > 0 && <RelatedItemsPanel jobs={featuredJobs} />}
      </div>
    </ContentContainer>
  );
};
