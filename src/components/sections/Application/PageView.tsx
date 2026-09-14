'use client';

import { useCareerDetail } from '@/features/career/career.hooks';

import ApplicationForm from './ApplicationForm';
import ContentContainer from './ContentContainer';

import type { JobDetail } from '@/models/Job';

export const PageView = ({
  jobDetail: initialJobDetail,
  slug,
  locale,
}: {
  jobDetail: JobDetail;
  slug: string;
  locale: string;
}) => {
  const query = useCareerDetail(slug, locale);
  const jobDetail = query.data ?? initialJobDetail;

  return (
    <ContentContainer>
      <ApplicationForm jobDetail={jobDetail} />
    </ContentContainer>
  );
};
