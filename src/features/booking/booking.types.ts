import type { TFormGuardValues } from '@/utils/formGuard';
import type { TBookingFormInput } from '@/validations/booking.validation';

export type TBookingSubmitVariables = {
  values: TBookingFormInput;
  locale: string;
  guard: TFormGuardValues;
};

export interface IBookingSubmitResponse {
  status: 'ok';
}

export type { TBookingFormInput };
