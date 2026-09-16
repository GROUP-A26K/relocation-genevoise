'use client';

import { useCareerDetail } from '@/features/career/career.hooks';

import ApplicationForm from './ApplicationForm';
import ContentContainer from './ContentContainer';

import type { IJobDetail } from '@/models/job';

interface IPageViewProps {
  jobDetail: IJobDetail;
  slug: string;
  locale: string;
}

export const PageView = ({
  jobDetail: initialJobDetail,
  slug,
  locale,
}: IPageViewProps) => {
  const query = useCareerDetail(slug, locale);
  const jobDetail = query.data ?? initialJobDetail;

  return (
    <ContentContainer>
      <ApplicationForm jobDetail={jobDetail} />
    </ContentContainer>
  );
};
