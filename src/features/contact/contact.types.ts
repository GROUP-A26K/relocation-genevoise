import type { ContactFormInput } from '@/validations/contact.validation';

export interface ContactSubmitVariables {
  values: ContactFormInput;
  locale: string;
}

export interface ContactSubmitResponse {
  id: number;
  email: string;
}

export type { ContactFormInput };
