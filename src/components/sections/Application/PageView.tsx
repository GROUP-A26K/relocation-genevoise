'use client';

import { useCareerDetail } from '@/features/career/career.hooks';

import ApplicationForm from './ApplicationForm';
import ContentContainer from './ContentContainer';

import type { IJobDetail } from '@/models/job';
import type { TApplicationDraftKey } from '@/features/formDraft';

interface IPageViewProps {
  jobDetail: IJobDetail;
  slug: string;
  locale: string;
  draftKey: TApplicationDraftKey;
}

export const PageView = ({
  jobDetail: initialJobDetail,
  slug,
  locale,
  draftKey,
}: IPageViewProps) => {
  const query = useCareerDetail(slug, locale);
  const jobDetail = query.data ?? initialJobDetail;

  return (
    <ContentContainer>
      <ApplicationForm jobDetail={jobDetail} draftKey={draftKey} />
    </ContentContainer>
  );
};
