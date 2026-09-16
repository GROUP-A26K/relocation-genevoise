import { post } from '@/libs/axios';

import type {
  BookingSubmitResponse,
  BookingSubmitVariables,
} from './booking.types';

export function submitBookingApi({ values, locale }: BookingSubmitVariables) {
  return post<BookingSubmitResponse>(
    '/api/booking',
    {
      accept: values.accept,
      phone: values.phone,
      contactVia: values.contactVia,
    },
    { locale }
  );
}
