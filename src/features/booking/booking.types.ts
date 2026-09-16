import type { TBookingFormInput } from '@/validations/booking.validation';

export type TBookingSubmitVariables = {
  values: TBookingFormInput;
  locale: string;
};

export interface IBookingSubmitResponse {
  id: number;
  phone: string;
  contact_via: string;
}

export type { TBookingFormInput };
