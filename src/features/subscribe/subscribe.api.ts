import { post } from '@/libs/axios';

import type {
  ISubscribeSubmitResponse,
  TSubscribeSubmitVariables,
} from './subscribe.types';

export function submitSubscribeApi({
  values,
  locale,
  guard,
}: TSubscribeSubmitVariables) {
  return post<ISubscribeSubmitResponse>(
    '/api/subscribe',
    { email: values.email, ...guard },
    { locale }
  );
}
