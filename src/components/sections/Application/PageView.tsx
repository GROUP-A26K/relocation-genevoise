import ApplicationForm from './ApplicationForm';
import ContentContainer from './ContentContainer';

import type { JobDetail } from '@/models/Job';

export const PageView = ({ jobDetail }: { jobDetail: JobDetail }) => (
  <ContentContainer>
    <ApplicationForm jobDetail={jobDetail} />
  </ContentContainer>
);
