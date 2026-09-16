import { post } from '@/libs/axios';

import type {
  SubscribeSubmitResponse,
  SubscribeSubmitVariables,
} from './subscribe.types';

export function submitSubscribeApi({
  values,
  locale,
}: SubscribeSubmitVariables) {
  return post<SubscribeSubmitResponse>(
    '/api/subscribe',
    { email: values.email },
    { locale }
  );
}
