'use client';

import { useMutation } from '@tanstack/react-query';

import { submitBookingApi } from './booking.api';

export const useSubmitBooking = () =>
  useMutation({ mutationFn: submitBookingApi });
