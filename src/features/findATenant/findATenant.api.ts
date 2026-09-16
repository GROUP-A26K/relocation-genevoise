import { post } from '@/libs/axios';

import type {
  FindATenantSubmitResponse,
  LandlordsSubmitVariables,
  TenantSubmitVariables,
} from './findATenant.types';

export function submitTenantInquiryApi({
  values,
  locale,
}: TenantSubmitVariables) {
  return post<FindATenantSubmitResponse>('/api/find-a-tenant/tenant', values, {
    locale,
  });
}

export function submitLandlordsInquiryApi({
  values,
  locale,
}: LandlordsSubmitVariables) {
  return post<FindATenantSubmitResponse>(
    '/api/find-a-tenant/landlords',
    values,
    { locale }
  );
}
