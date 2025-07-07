import { JobDetail } from '@/models/Job';
import ApplicationForm from './ApplicationForm';
import ContentContainer from './ContentContainer';

export const PageView = ({ jobDetail }: { jobDetail: JobDetail }) => (
  <ContentContainer>
    <ApplicationForm jobDetail={jobDetail} />
  </ContentContainer>
);
