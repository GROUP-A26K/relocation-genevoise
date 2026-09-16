import type { SubscribeFormInput } from '@/validations/subscribe.validation';

export interface SubscribeSubmitVariables {
  values: SubscribeFormInput;
  locale: string;
}

export interface SubscribeSubmitResponse {
  alreadyExists: boolean;
  email: string;
}

export type { SubscribeFormInput };
