import { post } from '@/libs/axios';

import type {
  IBookingSubmitResponse,
  TBookingSubmitVariables,
} from './booking.types';

export function submitBookingApi({ values, locale }: TBookingSubmitVariables) {
  return post<IBookingSubmitResponse>(
    '/api/booking',
    {
      accept: values.accept,
      phone: values.phone,
      contactVia: values.contactVia,
    },
    { locale }
  );
}
