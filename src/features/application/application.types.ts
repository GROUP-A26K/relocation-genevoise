import type { ApplicationFormInput } from '@/validations/application.validation';

export interface ApplicationSubmitVariables {
  values: ApplicationFormInput;
  locale: string;
}

export interface ApplicationSubmitResponse {
  status: string;
  message: string;
}

export type { ApplicationFormInput };
