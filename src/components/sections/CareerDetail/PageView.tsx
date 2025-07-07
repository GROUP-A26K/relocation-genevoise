'use client';

import { ContentContainer } from './ContentContainer';
import { Content } from './Content';
import { RelatedItemsPanel } from './RelatedItemsPanel';
import { Job, JobDetail } from '@/models/Job';

interface Props {
  jobDetail: JobDetail;
  featuredJobs: Job[];
}
export const PageView: React.FC<Props> = ({ jobDetail, featuredJobs }) => {
  return (
    <ContentContainer>
      <div className="flex lg:flex-row flex-col gap-16 justify-start items-start">
        <Content jobDetail={jobDetail} />
        <RelatedItemsPanel jobs={featuredJobs} />
      </div>
    </ContentContainer>
  );
};
