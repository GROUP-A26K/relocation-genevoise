import type { TFormGuardValues } from '@/utils/formGuard';
import type { TApplicationFormInput } from '@/validations/application.validation';

export type TApplicationSubmitVariables = {
  values: TApplicationFormInput;
  locale: string;
  guard: TFormGuardValues;
};

export interface IApplicationSubmitResponse {
  status: 'ok';
}

export type { TApplicationFormInput };
