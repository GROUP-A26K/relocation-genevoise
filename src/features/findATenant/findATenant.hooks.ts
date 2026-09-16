'use client';

import { useMutation } from '@tanstack/react-query';

import {
  submitLandlordsInquiryApi,
  submitTenantInquiryApi,
} from './findATenant.api';

export const useSubmitTenantInquiry = () =>
  useMutation({ mutationFn: submitTenantInquiryApi });

export const useSubmitLandlordsInquiry = () =>
  useMutation({ mutationFn: submitLandlordsInquiryApi });
