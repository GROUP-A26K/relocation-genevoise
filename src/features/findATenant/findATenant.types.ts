import type { TFormGuardValues } from '@/utils/formGuard';
import type {
  TLandlordsFormInput,
  TTenantFormInput,
} from '@/validations/findATenant.validation';

export type TTenantSubmitVariables = {
  values: TTenantFormInput;
  locale: string;
  guard: TFormGuardValues;
};

export type TLandlordsSubmitVariables = {
  values: TLandlordsFormInput;
  locale: string;
  guard: TFormGuardValues;
};

export interface IFindATenantSubmitResponse {
  status: 'ok';
}

export type { TLandlordsFormInput, TTenantFormInput };
