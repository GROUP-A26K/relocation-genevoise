import type { TFormGuardValues } from '@/utils/formGuard';
import type { TSubscribeFormInput } from '@/validations/subscribe.validation';

export type TSubscribeSubmitVariables = {
  values: TSubscribeFormInput;
  locale: string;
  guard: TFormGuardValues;
};

export interface ISubscribeSubmitResponse {
  status: 'ok';
}

export type { TSubscribeFormInput };
