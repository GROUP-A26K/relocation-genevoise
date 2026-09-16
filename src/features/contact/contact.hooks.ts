'use client';

import { useMutation } from '@tanstack/react-query';

import { submitContactApi } from './contact.api';

export const useSubmitContact = () =>
  useMutation({ mutationFn: submitContactApi });
