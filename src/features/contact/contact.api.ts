import { post } from '@/libs/axios';

import type {
  IContactSubmitResponse,
  TContactSubmitVariables,
} from './contact.types';

export function submitContactApi({
  values,
  locale,
  guard,
}: TContactSubmitVariables) {
  return post<IContactSubmitResponse>(
    '/api/contact',
    {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      accept: values.accept,
      phone: values.phone,
      company: values.company,
      ...guard,
    },
    { locale }
  );
}
