import type {
  TLandlordsFormInput,
  TTenantFormInput,
} from '@/validations/findATenant.validation';

export type TTenantSubmitVariables = {
  values: TTenantFormInput;
  locale: string;
};

export type TLandlordsSubmitVariables = {
  values: TLandlordsFormInput;
  locale: string;
};

export interface IFindATenantSubmitResponse {
  id: number;
  full_name: string;
  email: string;
}

export type { TLandlordsFormInput, TTenantFormInput };
