import { isNil } from 'lodash-es';

import { post } from '@/libs/axios';

import type {
  IApplicationSubmitResponse,
  TApplicationSubmitVariables,
} from './application.types';

const toFormData = (values: TApplicationSubmitVariables['values']) => {
  const formData = new FormData();

  formData.append('resume_file', values.resume_file);

  Object.entries(values).forEach(([key, value]) => {
    if (key === 'resume_file' || isNil(value)) return;

    formData.append(key, value instanceof File ? value : String(value));
  });

  return formData;
};

export function submitApplicationApi({
  values,
  locale,
}: TApplicationSubmitVariables) {
  return post<IApplicationSubmitResponse>(
    '/api/application',
    toFormData(values),
    { locale }
  );
}
