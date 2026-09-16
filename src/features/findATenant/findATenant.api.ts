import { post } from '@/libs/axios';

import type {
  IFindATenantSubmitResponse,
  TLandlordsSubmitVariables,
  TTenantSubmitVariables,
} from './findATenant.types';

export function submitTenantInquiryApi({
  values,
  locale,
}: TTenantSubmitVariables) {
  return post<IFindATenantSubmitResponse>('/api/find-a-tenant/tenant', values, {
    locale,
  });
}

export function submitLandlordsInquiryApi({
  values,
  locale,
}: TLandlordsSubmitVariables) {
  return post<IFindATenantSubmitResponse>(
    '/api/find-a-tenant/landlords',
    values,
    { locale }
  );
}
