import type { BookingFormInput } from '@/validations/booking.validation';

export interface BookingSubmitVariables {
  values: BookingFormInput;
  locale: string;
}

export interface BookingSubmitResponse {
  id: number;
  phone: string;
  contact_via: string;
}

export type { BookingFormInput };
