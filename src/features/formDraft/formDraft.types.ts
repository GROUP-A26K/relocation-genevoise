import type { TBookingFormInput } from '@/validations/booking.validation';
import type { TContactFormInput } from '@/validations/contact.validation';
import type { TSubscribeFormInput } from '@/validations/subscribe.validation';
import type { TApplicationFormInput } from '@/validations/application.validation';
import type {
  TLandlordsFormInput,
  TTenantFormInput,
} from '@/validations/findATenant.validation';
import type {
  IPropertySearchDraftMeta,
  TPropertySearchFormValues,
} from '@/features/property/property.types';

export type TApplicationDraftKey = `application:${string}`;

export type TFormDraftKey =
  | 'contact'
  | 'subscribe'
  | 'tenant'
  | 'landlords'
  | 'consultation'
  | 'property-search'
  | TApplicationDraftKey;

export interface IFormDraftValues {
  contact: TContactFormInput;
  subscribe: TSubscribeFormInput;
  tenant: TTenantFormInput;
  landlords: TLandlordsFormInput;
  consultation: TBookingFormInput;
  'property-search': TPropertySearchFormValues;
}

export type TFormDraftValues<K extends TFormDraftKey> =
  K extends TApplicationDraftKey
    ? TApplicationFormInput
    : K extends keyof IFormDraftValues
      ? IFormDraftValues[K]
      : never;

export type TFormDraftMeta<K extends TFormDraftKey> =
  K extends 'property-search' ? IPropertySearchDraftMeta : undefined;

export interface IFormDraftRecord<TValues = unknown, TMeta = unknown> {
  values: TValues;
  errorFields: string[];
  revision: number;
  meta?: TMeta;
}

export interface IFormDraftSubmission<K extends TFormDraftKey = TFormDraftKey> {
  key: K;
  revision: number;
  values: TFormDraftValues<K>;
}
