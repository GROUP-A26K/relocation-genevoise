import type { TSubscribeFormInput } from '@/validations/subscribe.validation';

export type TSubscribeSubmitVariables = {
  values: TSubscribeFormInput;
  locale: string;
};

export interface ISubscribeSubmitResponse {
  alreadyExists: boolean;
  email: string;
}

export type { TSubscribeFormInput };
