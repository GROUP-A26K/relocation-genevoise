import type { TFormGuardValues } from '@/utils/formGuard';
import type { TContactFormInput } from '@/validations/contact.validation';

export type TContactSubmitVariables = {
  values: TContactFormInput;
  locale: string;
  guard: TFormGuardValues;
};

export interface IContactSubmitResponse {
  status: 'ok';
}

export type { TContactFormInput };
