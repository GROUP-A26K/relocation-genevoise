import type { TContactFormInput } from '@/validations/contact.validation';

export type TContactSubmitVariables = {
  values: TContactFormInput;
  locale: string;
};

export interface IContactSubmitResponse {
  id: number;
  email: string;
}

export type { TContactFormInput };
