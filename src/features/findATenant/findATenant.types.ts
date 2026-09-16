import type {
  LandlordsFormInput,
  TenantFormInput,
} from '@/validations/findATenant.validation';

export interface TenantSubmitVariables {
  values: TenantFormInput;
  locale: string;
}

export interface LandlordsSubmitVariables {
  values: LandlordsFormInput;
  locale: string;
}

export interface FindATenantSubmitResponse {
  id: number;
  full_name: string;
  email: string;
}

export type { LandlordsFormInput, TenantFormInput };
