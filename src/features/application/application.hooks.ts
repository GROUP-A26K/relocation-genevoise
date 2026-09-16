'use client';

import { useMutation } from '@tanstack/react-query';

import { submitApplicationApi } from './application.api';

export const useSubmitApplication = () =>
  useMutation({ mutationFn: submitApplicationApi });
