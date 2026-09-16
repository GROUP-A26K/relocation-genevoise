import type { TApplicationFormInput } from '@/validations/application.validation';

export type TApplicationSubmitVariables = {
  values: TApplicationFormInput;
  locale: string;
};

export interface IApplicationSubmitResponse {
  status: string;
  message: string;
}

export type { TApplicationFormInput };
