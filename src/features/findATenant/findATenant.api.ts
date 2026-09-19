import { post } from '@/libs/axios';

import type {
  IFindATenantSubmitResponse,
  TLandlordsSubmitVariables,
  TTenantSubmitVariables,
} from './findATenant.types';

export function submitTenantInquiryApi({
  values,
  locale,
  guard,
}: TTenantSubmitVariables) {
  return post<IFindATenantSubmitResponse>(
    '/api/find-a-tenant/tenant',
    { ...values, ...guard },
    { locale }
  );
}

export function submitLandlordsInquiryApi({
  values,
  locale,
  guard,
}: TLandlordsSubmitVariables) {
  return post<IFindATenantSubmitResponse>(
    '/api/find-a-tenant/landlords',
    { ...values, ...guard },
    { locale }
  );
}
