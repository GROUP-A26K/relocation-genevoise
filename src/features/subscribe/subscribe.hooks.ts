'use client';

import { useMutation } from '@tanstack/react-query';

import { submitSubscribeApi } from './subscribe.api';

export const useSubmitSubscribe = () =>
  useMutation({ mutationFn: submitSubscribeApi });
