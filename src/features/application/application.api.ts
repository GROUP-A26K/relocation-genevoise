import { isNil } from 'lodash-es';

import { post } from '@/libs/axios';

import type {
  IApplicationSubmitResponse,
  TApplicationSubmitVariables,
} from './application.types';

const toFormData = ({
  values,
  guard,
}: Pick<TApplicationSubmitVariables, 'values' | 'guard'>) => {
  const formData = new FormData();

  formData.append('resume_file', values.resume_file);

  Object.entries(values).forEach(([key, value]) => {
    if (key === 'resume_file' || isNil(value)) return;

    formData.append(key, value instanceof File ? value : String(value));
  });

  Object.entries(guard).forEach(([key, value]) => {
    if (!isNil(value)) formData.append(key, value);
  });

  return formData;
};

export function submitApplicationApi({
  values,
  locale,
  guard,
}: TApplicationSubmitVariables) {
  return post<IApplicationSubmitResponse>(
    '/api/application',
    toFormData({ values, guard }),
    { locale }
  );
}
